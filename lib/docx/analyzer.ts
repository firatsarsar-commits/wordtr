import JSZip from 'jszip';
import { PracticalAssignment, AssessmentResult, RubricCheckResult } from '../types';

export interface ParsedDocxDocument {
  isValidDocx: boolean;
  paragraphCount: number;
  wordCount: number;
  allText: string;
  headings: { level: number; text: string; styleName: string }[];
  fontFamilies: string[];
  fontSizesHalfPt: number[];
  hasBold: boolean;
  hasItalic: boolean;
  hasUnderline: boolean;
  hasHighlight: boolean;
  alignments: string[]; // 'left', 'center', 'right', 'both' (justified)
  lineSpacings: number[]; // line value in twips / 240ths of line
  indentations: { firstLine?: number; left?: number; right?: number }[];
  marginsTwips?: { top: number; bottom: number; left: number; right: number };
  orientation: 'portrait' | 'landscape';
  tables: {
    rowCount: number;
    colCount: number;
    hasBorders: boolean;
    hasShading: boolean;
  }[];
  hasHeader: boolean;
  hasFooter: boolean;
  hasPageNumber: boolean;
  drawingsCount: number;
  rawXmlSnippets: {
    documentXmlSnippet: string;
  };
}

/**
 * Extracts and inspects OOXML elements from a DOCX buffer or ArrayBuffer
 */
export async function parseDocxBuffer(buffer: ArrayBuffer | Uint8Array): Promise<ParsedDocxDocument> {
  const zip = new JSZip();
  let loadedZip: JSZip;
  try {
    loadedZip = await zip.loadAsync(buffer);
  } catch (err) {
    throw new Error('Geçersiz veya bozuk ZIP arşivi. Lütfen geçerli bir Microsoft Word (.docx) belgesi yükleyin.');
  }

  const documentXmlFile = loadedZip.file('word/document.xml');
  if (!documentXmlFile) {
    throw new Error('Bu dosya geçerli bir Word belgesi (OOXML) yapısına sahip değil ("word/document.xml" bulunamadı).');
  }

  const documentXml = await documentXmlFile.async('string');
  const stylesXmlFile = loadedZip.file('word/styles.xml');
  const stylesXml = stylesXmlFile ? await stylesXmlFile.async('string') : '';

  // Check header and footer files
  const headerFiles = Object.keys(loadedZip.files).filter((name) => name.startsWith('word/header'));
  const footerFiles = Object.keys(loadedZip.files).filter((name) => name.startsWith('word/footer'));
  
  let headerContent = '';
  for (const hf of headerFiles) {
    headerContent += await loadedZip.file(hf)!.async('string');
  }
  let footerContent = '';
  for (const ff of footerFiles) {
    footerContent += await loadedZip.file(ff)!.async('string');
  }

  // Parse XML text safely using regex / token extraction (works identically in browser and Node)
  return analyzeOoxml(documentXml, stylesXml, headerContent, footerContent);
}

function analyzeOoxml(
  docXml: string,
  stylesXml: string,
  headerXml: string,
  footerXml: string
): ParsedDocxDocument {
  // Extract all text content
  const textMatches = docXml.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  const fullText = textMatches
    .map((tag) => tag.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, ''))
    .join(' ');
  const wordCount = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;

  // Extract paragraphs <w:p>...</w:p>
  const paragraphMatches = docXml.match(/<w:p[\s>][\s\S]*?<\/w:p>/g) || [];
  const paragraphCount = paragraphMatches.length;

  // Font families (w:rFonts w:ascii="..." / w:hAnsi="...")
  const fontMatches = docXml.match(/w:rFonts[^>]*?(?:w:ascii="([^"]+)"|w:hAnsi="([^"]+)")/g) || [];
  const fontSet = new Set<string>();
  for (const f of fontMatches) {
    const ascii = f.match(/w:ascii="([^"]+)"/);
    if (ascii && ascii[1]) fontSet.add(ascii[1]);
    const hAnsi = f.match(/w:hAnsi="([^"]+)"/);
    if (hAnsi && hAnsi[1]) fontSet.add(hAnsi[1]);
  }

  // Font sizes: w:sz w:val="24" (in half-points; 24 = 12pt)
  const sizeMatches = docXml.match(/<w:sz\s+w:val="(\d+)"/g) || [];
  const fontSizes = sizeMatches
    .map((s) => {
      const m = s.match(/w:val="(\d+)"/);
      return m ? parseInt(m[1], 10) : 0;
    })
    .filter((s) => s > 0);

  // Formatting flags
  const hasBold = /<w:b(\s|\/|>)/.test(docXml);
  const hasItalic = /<w:i(\s|\/|>)/.test(docXml);
  const hasUnderline = /<w:u\s+w:val="(?!none)[^"]+"/.test(docXml) || /<w:u(\s|\/|>)/.test(docXml);
  const hasHighlight = /<w:highlight\s+w:val="([^"]+)"/.test(docXml);

  // Paragraph alignments: w:jc w:val="center|both|right|left"
  const alignMatches = docXml.match(/<w:jc\s+w:val="([^"]+)"/g) || [];
  const alignments = alignMatches.map((a) => {
    const m = a.match(/w:val="([^"]+)"/);
    return m ? m[1].toLowerCase() : 'left';
  });

  // Line spacings: w:spacing w:line="360" w:lineRule="auto" (360 / 240 = 1.5)
  const spacingMatches = docXml.match(/<w:spacing[^>]*w:line="(\d+)"/g) || [];
  const lineSpacings = spacingMatches.map((s) => {
    const m = s.match(/w:line="(\d+)"/);
    return m ? parseInt(m[1], 10) : 240;
  });

  // Indentations: w:ind w:firstLine="720" or w:left="720"
  const indMatches = docXml.match(/<w:ind[^>]*>/g) || [];
  const indentations = indMatches.map((ind) => {
    const fl = ind.match(/w:firstLine="(\d+)"/);
    const left = ind.match(/w:left="(\d+)"/);
    const right = ind.match(/w:right="(\d+)"/);
    return {
      firstLine: fl ? parseInt(fl[1], 10) : undefined,
      left: left ? parseInt(left[1], 10) : undefined,
      right: right ? parseInt(right[1], 10) : undefined,
    };
  });

  // Headings: w:pStyle w:val="Heading1" or "Heading2" or "Baslik1"
  const headings: { level: number; text: string; styleName: string }[] = [];
  for (const p of paragraphMatches) {
    const styleMatch = p.match(/<w:pStyle\s+w:val="([^"]+)"/);
    if (styleMatch) {
      const styleName = styleMatch[1];
      let level = 0;
      if (/Heading\s*1|Baslik\s*1|Heading1/i.test(styleName)) level = 1;
      else if (/Heading\s*2|Baslik\s*2|Heading2/i.test(styleName)) level = 2;
      else if (/Heading\s*3|Baslik\s*3|Heading3/i.test(styleName)) level = 3;

      if (level > 0) {
        const pTexts = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
        const text = pTexts.map((t) => t.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '')).join('');
        headings.push({ level, text, styleName });
      }
    }
  }

  // Page Margins in twips: <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"
  // 1440 twips = 1 inch = 2.54 cm. 1417 twips = 2.5 cm.
  let marginsTwips: { top: number; bottom: number; left: number; right: number } | undefined;
  const pgMarMatch = docXml.match(/<w:pgMar[^>]*w:top="(\d+)"[^>]*w:right="(\d+)"[^>]*w:bottom="(\d+)"[^>]*w:left="(\d+)"/);
  if (pgMarMatch) {
    marginsTwips = {
      top: parseInt(pgMarMatch[1], 10),
      right: parseInt(pgMarMatch[2], 10),
      bottom: parseInt(pgMarMatch[3], 10),
      left: parseInt(pgMarMatch[4], 10),
    };
  }

  // Page Orientation: <w:pgSz ... w:orient="landscape"
  const isLandscape = /<w:pgSz[^>]*w:orient="landscape"/i.test(docXml);
  const orientation = isLandscape ? 'landscape' : 'portrait';

  // Tables: <w:tbl>
  const tableMatches = docXml.match(/<w:tbl[\s>][\s\S]*?<\/w:tbl>/g) || [];
  const tables = tableMatches.map((tbl) => {
    const rows = tbl.match(/<w:tr[\s>]/g) || [];
    const firstRow = tbl.match(/<w:tr[\s>][\s\S]*?<\/w:tr>/);
    const colsInFirstRow = firstRow ? (firstRow[0].match(/<w:tc[\s>]/g) || []).length : 0;
    const hasBorders = /<w:tblBorders[\s>]/.test(tbl) || /<w:tcBorders[\s>]/.test(tbl);
    const hasShading = /<w:shd[\s>]/.test(tbl);
    return {
      rowCount: rows.length,
      colCount: colsInFirstRow,
      hasBorders,
      hasShading,
    };
  });

  // Headers / Footers
  const hasHeader = headerXml.length > 0 || /<w:headerReference/.test(docXml);
  const hasFooter = footerXml.length > 0 || /<w:footerReference/.test(docXml);

  // Page Number: Look for field PAGE in header, footer or document
  const combinedXmlForPageNum = docXml + headerXml + footerXml;
  const hasPageNumber =
    /w:instr="PAGE"/i.test(combinedXmlForPageNum) ||
    /<w:instrText[^>]*>\s*PAGE\s*<\/w:instrText>/i.test(combinedXmlForPageNum) ||
    /w:fldSimple[^>]*w:instr="PAGE"/i.test(combinedXmlForPageNum);

  // Drawings / images: <w:drawing>
  const drawingsCount = (docXml.match(/<w:drawing[\s>]/g) || []).length + (docXml.match(/<w:pict[\s>]/g) || []).length;

  return {
    isValidDocx: true,
    paragraphCount,
    wordCount,
    allText: fullText,
    headings,
    fontFamilies: Array.from(fontSet),
    fontSizesHalfPt: fontSizes,
    hasBold,
    hasItalic,
    hasUnderline,
    hasHighlight,
    alignments,
    lineSpacings,
    indentations,
    marginsTwips,
    orientation,
    tables,
    hasHeader,
    hasFooter,
    hasPageNumber,
    drawingsCount,
    rawXmlSnippets: {
      documentXmlSnippet: docXml.slice(0, 500),
    },
  };
}

/**
 * Deterministically evaluates an uploaded DOCX against a specific assignment rubric
 */
export function evaluateDocumentRubric(
  doc: ParsedDocxDocument,
  assignment: PracticalAssignment,
  fileName: string
): AssessmentResult {
  const criteriaResults: RubricCheckResult[] = [];
  const strengthsTr: string[] = [];
  const strengthsEn: string[] = [];
  const improvementsTr: string[] = [];
  const improvementsEn: string[] = [];

  let totalScore = 0;
  let maxScore = 0;

  for (const rubricItem of assignment.rubric) {
    maxScore += rubricItem.points;
    let passed = false;
    let awarded = 0;
    let feedbackTr = '';
    let feedbackEn = '';
    let detectedVal = '';
    let expectedVal = '';

    const params = rubricItem.params || {};

    switch (rubricItem.checkFn) {
      case 'check_font_family': {
        const expectedFont = (params.fontName as string) || 'Times New Roman';
        expectedVal = expectedFont;
        const normalizedFont = expectedFont.toLowerCase();
        const found = doc.fontFamilies.some((f) => f.toLowerCase().includes(normalizedFont));
        detectedVal = doc.fontFamilies.join(', ') || 'Belirtilmemiş';
        if (found) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Doğru yazı tipi ("${expectedFont}") başarıyla uygulandı.`;
          feedbackEn = `The expected font family ("${expectedFont}") was correctly applied.`;
          strengthsTr.push(`Yazı tipi seçimi (${expectedFont}) yönergeye uygun.`);
          strengthsEn.push(`Font family (${expectedFont}) conforms to instructions.`);
        } else {
          feedbackTr = `Belgede "${expectedFont}" yazı tipi bulunamadı. Tespit edilen yazı tipleri: ${detectedVal || 'Varsayılan'}.`;
          feedbackEn = `Expected font "${expectedFont}" not found. Detected fonts: ${detectedVal || 'Default'}.`;
          improvementsTr.push(`Tüm metni seçerek (Ctrl+A) Giriş sekmesinden yazı tipini "${expectedFont}" olarak ayarlayın.`);
          improvementsEn.push(`Select all text (Ctrl+A) and change font to "${expectedFont}" on the Home tab.`);
        }
        break;
      }

      case 'check_font_size': {
        const targetPt = (params.fontSizePt as number) || 12;
        const targetHalfPt = targetPt * 2;
        expectedVal = `${targetPt} pt`;
        const hasTargetSize = doc.fontSizesHalfPt.includes(targetHalfPt);
        const detectedSizes = Array.from(new Set(doc.fontSizesHalfPt)).map((s) => `${s / 2} pt`).join(', ');
        detectedVal = detectedSizes || 'Varsayılan (11 pt)';
        if (hasTargetSize) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Metinde beklenen ${targetPt} pt yazı boyutu başarıyla tespit edildi.`;
          feedbackEn = `Expected font size of ${targetPt} pt detected.`;
          strengthsTr.push(`Yazı boyutu (${targetPt} pt) kuralına uyulmuş.`);
          strengthsEn.push(`Font size (${targetPt} pt) correctly applied.`);
        } else {
          feedbackTr = `Metinde ${targetPt} pt yazı boyutu bulunamadı. Mevcut boyutlar: ${detectedVal}.`;
          feedbackEn = `Font size ${targetPt} pt not found. Detected sizes: ${detectedVal}.`;
          improvementsTr.push(`Gövde metninin boyutunu Giriş sekmesinden ${targetPt} pt olarak güncelleyin.`);
          improvementsEn.push(`Set the body text size to ${targetPt} pt on the Home tab.`);
        }
        break;
      }

      case 'check_text_formatting': {
        const requireBold = !!params.bold;
        const requireItalic = !!params.italic;
        const requireUnderline = !!params.underline;
        const requireHighlight = !!params.highlight;

        const boldPass = !requireBold || doc.hasBold;
        const italicPass = !requireItalic || doc.hasItalic;
        const underlinePass = !requireUnderline || doc.hasUnderline;
        const highlightPass = !requireHighlight || doc.hasHighlight;

        passed = boldPass && italicPass && underlinePass && highlightPass;
        if (passed) {
          awarded = rubricItem.points;
          feedbackTr = 'İstenen metin vurgulama (kalın/italik/altı çizili) biçimleri eksiksiz uygulandı.';
          feedbackEn = 'Required text formatting styles (bold/italic/underline) were correctly applied.';
          strengthsTr.push('Metin vurgulama ve stil biçimleri tam.');
          strengthsEn.push('Text emphasis and styling are complete.');
        } else {
          const missing: string[] = [];
          if (requireBold && !doc.hasBold) missing.push('Kalın (Bold)');
          if (requireItalic && !doc.hasItalic) missing.push('İtalik (Italic)');
          if (requireUnderline && !doc.hasUnderline) missing.push('Altı Çizili (Underline)');
          if (requireHighlight && !doc.hasHighlight) missing.push('Metin Vurgu Rengi');
          feedbackTr = `Eksik metin biçimlendirmeleri: ${missing.join(', ')}.`;
          feedbackEn = `Missing formatting features: ${missing.join(', ')}.`;
          improvementsTr.push(`Yönergede belirtilen yerlerde ${missing.join(', ')} uygulayın.`);
          improvementsEn.push(`Apply ${missing.join(', ')} as specified in the assignment prompt.`);
        }
        break;
      }

      case 'check_paragraph_alignment': {
        const expectedAlign = (params.alignment as string) || 'both'; // 'both' is Justified
        expectedVal = expectedAlign === 'both' ? 'İki Yana Yasla (Justify)' : expectedAlign;
        const found = doc.alignments.includes(expectedAlign.toLowerCase());
        detectedVal = doc.alignments.length > 0 ? doc.alignments.join(', ') : 'Varsayılan (Sola)';
        if (found) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Paragraf hizalaması (${expectedVal}) başarıyla uygulandı.`;
          feedbackEn = `Paragraph alignment (${expectedVal}) successfully applied.`;
          strengthsTr.push(`Paragraf hizalama kuralına (${expectedVal}) tam uyuldu.`);
          strengthsEn.push(`Paragraph alignment rule (${expectedVal}) respected.`);
        } else {
          feedbackTr = `Beklenen hizalama (${expectedVal}) bulunamadı. Mevcut: ${detectedVal}.`;
          feedbackEn = `Expected alignment (${expectedVal}) not found. Detected: ${detectedVal}.`;
          improvementsTr.push(`Paragrafları seçip Giriş sekmesindeki "${expectedVal}" butonuna (Ctrl+D / Ctrl+J) tıklayın.`);
          improvementsEn.push(`Select paragraphs and click "${expectedVal}" button on Home tab.`);
        }
        break;
      }

      case 'check_line_spacing': {
        // 240 = 1.0, 276 = 1.15, 360 = 1.5, 480 = 2.0
        const minSpacing = (params.minSpacingTwips as number) || 300;
        const targetDesc = (params.targetDesc as string) || '1.5 Satır Aralığı';
        expectedVal = targetDesc;
        const found = doc.lineSpacings.some((sp) => sp >= minSpacing);
        detectedVal = doc.lineSpacings.length > 0 ? doc.lineSpacings.map((s) => `${(s / 240).toFixed(2)}x`).join(', ') : '1.0x (Varsayılan)';
        if (found) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Beklenen satır aralığı (${targetDesc}) uygulandı.`;
          feedbackEn = `Expected line spacing (${targetDesc}) applied.`;
          strengthsTr.push(`Satır aralığı (${targetDesc}) doğru ayarlandı.`);
          strengthsEn.push(`Line spacing (${targetDesc}) properly configured.`);
        } else {
          feedbackTr = `Satır aralığı beklenen değerden (${targetDesc}) farklı.`;
          feedbackEn = `Line spacing differs from required (${targetDesc}).`;
          improvementsTr.push('Paragraf ayarlarından Satır Aralığını 1.5 olarak ayarlayın.');
          improvementsEn.push('Set Line Spacing to 1.5 in Paragraph settings.');
        }
        break;
      }

      case 'check_first_line_indent': {
        expectedVal = 'İlk satır girintisi (1 cm / 1.25 cm)';
        const hasIndent = doc.indentations.some((ind) => ind.firstLine && ind.firstLine > 400);
        if (hasIndent) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = 'Paragraflara ilk satır girintisi başarıyla uygulandı.';
          feedbackEn = 'First-line indent was successfully applied to paragraphs.';
          strengthsTr.push('İlk satır girintisi kuralı sağlandı.');
          strengthsEn.push('First-line indent rule satisfied.');
        } else {
          feedbackTr = 'Paragraflarda ilk satır girintisi tespit edilemedi.';
          feedbackEn = 'No first-line indent detected in paragraphs.';
          improvementsTr.push('Paragraf iletişim kutusunu açarak "Özel: İlk Satır" (1.25 cm) seçeneğini uygulayın.');
          improvementsEn.push('Open Paragraph dialog and set "Special: First Line" to 1.25 cm.');
        }
        break;
      }

      case 'check_page_margins': {
        // e.g. 1440 twips = 2.54 cm / 1 inch
        expectedVal = 'Kenar Boşlukları: Normal (2.5 cm)';
        const margins = doc.marginsTwips;
        if (margins && margins.top >= 1300 && margins.left >= 1300) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Sayfa kenar boşlukları standart değerlere uygun (Üst/Alt: ~${(margins.top / 567).toFixed(1)} cm, Sol/Sağ: ~${(margins.left / 567).toFixed(1)} cm).`;
          feedbackEn = 'Page margins conform to standard values.';
          strengthsTr.push('Sayfa kenar boşluğu ölçüleri doğru.');
          strengthsEn.push('Page margins are well-proportioned.');
        } else {
          feedbackTr = 'Sayfa kenar boşlukları yönergede istenen standart değerden farklı.';
          feedbackEn = 'Page margins differ from specified requirements.';
          improvementsTr.push('Düzen sekmesi > Kenar Boşlukları > "Normal" (her kenardan 2.5 cm) seçeneğini uygulayın.');
          improvementsEn.push('Go to Layout > Margins and select "Normal" (2.5 cm / 1 inch on all sides).');
        }
        break;
      }

      case 'check_orientation': {
        const expectedOrient = (params.orientation as string) || 'landscape';
        expectedVal = expectedOrient === 'landscape' ? 'Yatay (Landscape)' : 'Dikey (Portrait)';
        detectedVal = doc.orientation === 'landscape' ? 'Yatay' : 'Dikey';
        if (doc.orientation === expectedOrient) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Sayfa yönlendirmesi doğru şekilde ${expectedVal} olarak ayarlandı.`;
          feedbackEn = `Page orientation correctly set to ${expectedVal}.`;
          strengthsTr.push(`Sayfa yönlendirmesi (${expectedVal}) doğru.`);
          strengthsEn.push(`Page orientation (${expectedVal}) is correct.`);
        } else {
          feedbackTr = `Sayfa yönlendirmesi ${detectedVal} olarak kaldı, ${expectedVal} olmalıdır.`;
          feedbackEn = `Orientation is ${detectedVal}, but should be ${expectedVal}.`;
          improvementsTr.push(`Düzen sekmesi > Yönlendirme bölümünden "${expectedVal}" seçin.`);
          improvementsEn.push(`Go to Layout > Orientation and choose "${expectedVal}".`);
        }
        break;
      }

      case 'check_headings': {
        const minLevel1 = (params.minLevel1 as number) || 1;
        expectedVal = `En az ${minLevel1} adet Başlık 1 (Heading 1) stili`;
        const count = doc.headings.filter((h) => h.level === 1).length;
        detectedVal = `${count} adet Başlık 1 stili`;
        if (count >= minLevel1) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Belgede hiyerarşik Başlık 1 stili (${count} adet) başarıyla kullanıldı.`;
          feedbackEn = `Heading 1 style was successfully applied (${count} heading(s)).`;
          strengthsTr.push('Başlık stilleri yapılandırılmış.');
          strengthsEn.push('Structured heading styles applied.');
        } else {
          feedbackTr = `Belgede yeterli Başlık 1 stili tespit edilemedi (Bulunan: ${count}). Yalnızca metni büyütmek yerine Stil Galerisinden "Başlık 1" uygulanmalıdır.`;
          feedbackEn = `Insufficient Heading 1 styles (Found: ${count}). Apply "Heading 1" from the Style Gallery.`;
          improvementsTr.push('Başlık metnini seçin ve Giriş sekmesindeki Stiller galerisinden "Başlık 1" düğmesine tıklayın.');
          improvementsEn.push('Select header text and click "Heading 1" in the Styles gallery on Home tab.');
        }
        break;
      }

      case 'check_table_structure': {
        const minRows = (params.minRows as number) || 2;
        const minCols = (params.minCols as number) || 2;
        expectedVal = `En az ${minRows} satır x ${minCols} sütun tablo`;
        const matchingTable = doc.tables.find((t) => t.rowCount >= minRows && t.colCount >= minCols);
        detectedVal = doc.tables.length > 0 ? `${doc.tables[0].rowCount} satır x ${doc.tables[0].colCount} sütun` : 'Tablo yok';
        if (matchingTable) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Tablo yapısı (${matchingTable.rowCount} satır, ${matchingTable.colCount} sütun) yönergeye uygun.`;
          feedbackEn = `Table structure (${matchingTable.rowCount} rows, ${matchingTable.colCount} cols) meets criteria.`;
          strengthsTr.push('Tablo yapısı ve hücre boyutları doğru.');
          strengthsEn.push('Table structure and dimensions are correct.');
        } else {
          feedbackTr = `Belgede beklenen tablo yapısı bulunamadı (Beklenen: ${expectedVal}, Tespit edilen: ${detectedVal}).`;
          feedbackEn = `Expected table structure not found (Expected: ${expectedVal}, Detected: ${detectedVal}).`;
          improvementsTr.push('Ekle > Tablo menüsünden yönergede belirtilen satır ve sütun sayısına sahip bir tablo oluşturun.');
          improvementsEn.push('Create a table with required rows and columns from Insert > Table.');
        }
        break;
      }

      case 'check_table_formatting': {
        expectedVal = 'Tablo kenarlıkları ve gölgelendirme (shading)';
        const formattedTable = doc.tables.find((t) => t.hasBorders || t.hasShading);
        if (formattedTable) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = 'Tablo biçimlendirmesi (kenarlıklar/renk gölgelendirmesi) başarıyla tespit edildi.';
          feedbackEn = 'Table borders and shading successfully detected.';
          strengthsTr.push('Tablo görsel biçimlendirmesi kurallara uygun.');
          strengthsEn.push('Table visual styling conforms to specifications.');
        } else {
          feedbackTr = 'Tabloda özel kenarlık veya hücre dolgu rengi (gölgelendirme) bulunamadı.';
          feedbackEn = 'No custom borders or cell shading detected in the table.';
          improvementsTr.push('Tablo Tasarımı sekmesinden başlık satırına gölgelendirme rengi ve kenarlıklar uygulayın.');
          improvementsEn.push('Apply shading color and borders to header row under Table Design tab.');
        }
        break;
      }

      case 'check_header_footer': {
        const requireHeader = !!params.header;
        const requireFooter = !!params.footer;
        const headerOk = !requireHeader || doc.hasHeader;
        const footerOk = !requireFooter || doc.hasFooter;
        passed = headerOk && footerOk;
        if (passed) {
          awarded = rubricItem.points;
          feedbackTr = 'Üstbilgi ve altbilgi alanları başarıyla eklendi.';
          feedbackEn = 'Header and footer sections were correctly added.';
          strengthsTr.push('Üstbilgi/Altbilgi alanları tanımlanmış.');
          strengthsEn.push('Header/Footer sections configured.');
        } else {
          feedbackTr = 'Belgede gerekli üstbilgi veya altbilgi alanı eksik.';
          feedbackEn = 'Required header or footer section is missing.';
          improvementsTr.push('Ekle sekmesinden Üstbilgi ve Altbilgi ekleyerek yönergedeki bilgileri yazın.');
          improvementsEn.push('Add Header and Footer from Insert tab and enter required content.');
        }
        break;
      }

      case 'check_page_numbers': {
        expectedVal = 'Otomatik Sayfa Numarası (PAGE alanı)';
        if (doc.hasPageNumber) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = 'Dinamik sayfa numaralandırma alanı (PAGE) başarıyla tespit edildi.';
          feedbackEn = 'Dynamic page number field (PAGE) successfully detected.';
          strengthsTr.push('Otomatik sayfa numaralandırması yapılmış.');
          strengthsEn.push('Automatic page numbering correctly inserted.');
        } else {
          feedbackTr = 'Otomatik sayfa numarası alanı bulunamadı. Sayfa numarasını elle yazmak yerine "Ekle > Sayfa Numarası" alanından eklemelisiniz.';
          feedbackEn = 'Dynamic page number field not found. Use "Insert > Page Number" rather than typing numbers manually.';
          improvementsTr.push('Ekle sekmesinden "Sayfa Numarası" seçeneğini kullanarak sayfanın altına otomatik numara ekleyin.');
          improvementsEn.push('Insert automatic page numbering at page bottom from Insert > Page Number.');
        }
        break;
      }

      case 'check_visual_elements': {
        expectedVal = 'En az 1 adet resim/şekil çizimi';
        detectedVal = `${doc.drawingsCount} adet görsel öğe`;
        if (doc.drawingsCount >= 1) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Belgede görsel öğeler (${doc.drawingsCount} adet) tespit edildi.`;
          feedbackEn = `Visual elements (${doc.drawingsCount}) successfully detected.`;
          strengthsTr.push('Görsel/şekil öğeleri belgede mevcut.');
          strengthsEn.push('Visual/shape elements present in document.');
        } else {
          feedbackTr = 'Belgede resim veya şekil öğesi tespit edilemedi.';
          feedbackEn = 'No pictures or shape drawings found in document.';
          improvementsTr.push('Ekle > Resimler veya Ekle > Şekiller menüsünden bir görsel öğe ekleyip metin kaydırmasını ayarlayın.');
          improvementsEn.push('Insert an image or shape from Insert menu and configure text wrapping.');
        }
        break;
      }

      case 'check_minimum_words': {
        const minWords = (params.minWords as number) || 50;
        expectedVal = `En az ${minWords} kelime`;
        detectedVal = `${doc.wordCount} kelime`;
        if (doc.wordCount >= minWords) {
          passed = true;
          awarded = rubricItem.points;
          feedbackTr = `Kelime sayısı gereksinimi karşılandı (${doc.wordCount} kelime).`;
          feedbackEn = `Word count requirement met (${doc.wordCount} words).`;
          strengthsTr.push(`Yeterli metin hacmi sağlandı (${doc.wordCount} kelime).`);
          strengthsEn.push(`Adequate text volume provided (${doc.wordCount} words).`);
        } else {
          feedbackTr = `Kelime sayısı yetersiz (Mevcut: ${doc.wordCount}, Beklenen: en az ${minWords}).`;
          feedbackEn = `Word count insufficient (Current: ${doc.wordCount}, Expected: at least ${minWords}).`;
          improvementsTr.push('Belgenizi zenginleştirmek için yönergede istenen paragrafları eksiksiz yazın.');
          improvementsEn.push('Expand your document with all required paragraphs.');
        }
        break;
      }

      default: {
        // Fallback default passing rule
        passed = true;
        awarded = rubricItem.points;
        feedbackTr = 'Kriter incelendi ve onaylandı.';
        feedbackEn = 'Criterion verified and approved.';
      }
    }

    totalScore += awarded;
    criteriaResults.push({
      rubricItemId: rubricItem.id,
      category: rubricItem.category,
      titleTr: rubricItem.titleTr,
      titleEn: rubricItem.titleEn,
      maxPoints: rubricItem.points,
      awardedPoints: awarded,
      passed,
      feedbackTr,
      feedbackEn,
      detectedValue: detectedVal,
      expectedValue: expectedVal,
    });
  }

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Synthesize overall summary feedback
  let summaryTr = '';
  let summaryEn = '';

  if (percentage >= 90) {
    summaryTr = `Mükemmel çalışma! Belgeniz yönergede yer alan kriterlerin %${percentage}'ini eksiksiz olarak sağladı. Biçimlendirme ve yapısal standartlar profesyonelce uygulanmış.`;
    summaryEn = `Excellent work! Your document satisfied ${percentage}% of all criteria. Formatting and structure were professionally applied.`;
  } else if (percentage >= 70) {
    summaryTr = `Başarılı! Belgeniz %${percentage} başarı oranına ulaştı. Temel yapı doğru ancak rapordaki birkaç biçimlendirme eksiğini gidererek tam puana ulaşabilirsiniz.`;
    summaryEn = `Good job! Your document achieved a ${percentage}% score. The core structure is sound, but correcting the remaining items will yield full points.`;
  } else if (percentage >= 50) {
    summaryTr = `Geliştirilebilir çalışma. Belgeniz %${percentage} başarı oranında kaldı. Lütfen aşağıdaki iyileştirme adımlarını uygulayıp belgenizi yeniden yükleyin.`;
    summaryEn = `Needs improvement. Document achieved ${percentage}%. Please follow the suggestions below and re-submit your document.`;
  } else {
    summaryTr = `Belgede önemli biçimlendirme eksikleri tespit edildi (%${percentage}). İstenen yazı tipi, kenar boşlukları ve yapısal kuralları dikkatle uygulayarak tekrar deneyin.`;
    summaryEn = `Major formatting criteria are missing (${percentage}%). Carefully check font, margins, and structural rules and try again.`;
  }

  return {
    assignmentId: assignment.id,
    fileName,
    timestamp: new Date().toISOString(),
    totalScore,
    maxScore,
    percentage,
    criteriaResults,
    summaryFeedbackTr: summaryTr,
    summaryFeedbackEn: summaryEn,
    strengthsTr,
    strengthsEn,
    improvementsTr,
    improvementsEn,
    documentMetadata: {
      paragraphCount: doc.paragraphCount,
      wordCount: doc.wordCount,
      tableCount: doc.tables.length,
      hasStyles: doc.headings.length > 0,
      primaryFonts: doc.fontFamilies,
      marginsSummary: doc.marginsTwips
        ? `Üst: ${(doc.marginsTwips.top / 567).toFixed(1)}cm, Sol: ${(doc.marginsTwips.left / 567).toFixed(1)}cm`
        : 'Standart',
    },
  };
}
