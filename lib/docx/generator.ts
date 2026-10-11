import JSZip from 'jszip';

export interface DocxGenerateOptions {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  fontFamily?: string;
  fontSizePt?: number;
  lineSpacingTwips?: number;
  alignment?: 'left' | 'center' | 'right' | 'both';
  marginsTwips?: { top: number; right: number; bottom: number; left: number };
  orientation?: 'portrait' | 'landscape';
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  hasHeader?: boolean;
  headerText?: string;
  hasFooter?: boolean;
  footerText?: string;
  includePageNumber?: boolean;
  heading1Text?: string;
}

/**
 * Creates a valid real OOXML .docx binary Blob using JSZip
 */
export async function createRealDocxBlob(options: DocxGenerateOptions): Promise<Blob> {
  const zip = new JSZip();

  const font = options.fontFamily || 'Times New Roman';
  const sizeHalfPt = (options.fontSizePt || 12) * 2;
  const lineSpacing = options.lineSpacingTwips || 360; // 1.5 line spacing
  const alignment = options.alignment || 'both';
  const margins = options.marginsTwips || { top: 1440, right: 1440, bottom: 1440, left: 1440 }; // 1 inch = 2.54cm
  const isLandscape = options.orientation === 'landscape';

  // [Content_Types].xml
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  ${options.hasHeader ? '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' : ''}
  ${options.hasFooter || options.includePageNumber ? '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' : ''}
</Types>`;
  zip.file('[Content_Types].xml', contentTypes);

  // _rels/.rels
  const packageRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
  zip.file('_rels/.rels', packageRels);

  // word/_rels/document.xml.rels
  let relsCount = 1;
  let headerRelId = '';
  let footerRelId = '';
  let relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>`;

  if (options.hasHeader) {
    relsCount++;
    headerRelId = `rId${relsCount}`;
    relsXml += `\n  <Relationship Id="${headerRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>`;
  }
  if (options.hasFooter || options.includePageNumber) {
    relsCount++;
    footerRelId = `rId${relsCount}`;
    relsXml += `\n  <Relationship Id="${footerRelId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>`;
  }
  relsXml += `\n</Relationships>`;
  zip.file('word/_rels/document.xml.rels', relsXml);

  // word/styles.xml
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="${font}" w:hAnsi="${font}" w:cs="${font}"/>
        <w:sz w:val="${sizeHalfPt}"/>
        <w:szCs w:val="${sizeHalfPt}"/>
        <w:lang w:val="tr-TR"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:pPr>
      <w:spacing w:before="240" w:after="120"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:color w:val="185ABD"/>
      <w:sz w:val="${sizeHalfPt + 8}"/>
      <w:szCs w:val="${sizeHalfPt + 8}"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:pPr>
      <w:spacing w:before="180" w:after="80"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:color w:val="2B579A"/>
      <w:sz w:val="${sizeHalfPt + 4}"/>
      <w:szCs w:val="${sizeHalfPt + 4}"/>
    </w:rPr>
  </w:style>
</w:styles>`;
  zip.file('word/styles.xml', stylesXml);

  // Header file if requested
  if (options.hasHeader) {
    const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p>
    <w:pPr>
      <w:jc w:val="right"/>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
        <w:sz w:val="18"/>
        <w:color w:val="666666"/>
      </w:rPr>
      <w:t>${escapeXml(options.headerText || 'WordLab TR - Eğitimde Bilişim Teknolojileri')}</w:t>
    </w:r>
  </w:p>
</w:hdr>`;
    zip.file('word/header1.xml', headerXml);
  }

  // Footer file if requested
  if (options.hasFooter || options.includePageNumber) {
    const footerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p>
    <w:pPr>
      <w:jc w:val="center"/>
    </w:pPr>
    ${
      options.footerText
        ? `<w:r>
      <w:rPr>
        <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
        <w:sz w:val="18"/>
        <w:color w:val="666666"/>
      </w:rPr>
      <w:t>${escapeXml(options.footerText)} - </w:t>
    </w:r>`
        : ''
    }
    ${
      options.includePageNumber
        ? `<w:r>
      <w:rPr>
        <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
        <w:sz w:val="18"/>
      </w:rPr>
      <w:fldSimple w:instr="PAGE"/>
    </w:r>`
        : ''
    }
  </w:p>
</w:ftr>`;
    zip.file('word/footer1.xml', footerXml);
  }

  // Build Document Body
  let bodyXml = '';

  // Title Paragraph
  bodyXml += `<w:p>
    <w:pPr>
      <w:jc w:val="center"/>
      <w:spacing w:before="120" w:after="240"/>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
        <w:b/>
        <w:sz w:val="${sizeHalfPt + 10}"/>
        <w:color w:val="103F91"/>
      </w:rPr>
      <w:t>${escapeXml(options.title)}</w:t>
    </w:r>
  </w:p>`;

  // Subtitle Paragraph
  if (options.subtitle) {
    bodyXml += `<w:p>
      <w:pPr>
        <w:jc w:val="center"/>
        <w:spacing w:after="240"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
          <w:i/>
          <w:sz w:val="${sizeHalfPt}"/>
          <w:color w:val="555555"/>
        </w:rPr>
        <w:t>${escapeXml(options.subtitle)}</w:t>
      </w:r>
    </w:p>`;
  }

  // Heading 1 if provided
  if (options.heading1Text) {
    bodyXml += `<w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
          <w:b/>
          <w:sz w:val="${sizeHalfPt + 6}"/>
        </w:rPr>
        <w:t>${escapeXml(options.heading1Text)}</w:t>
      </w:r>
    </w:p>`;
  }

  // Regular Paragraphs
  for (const para of options.paragraphs) {
    bodyXml += `<w:p>
      <w:pPr>
        <w:jc w:val="${alignment}"/>
        <w:spacing w:line="${lineSpacing}" w:lineRule="auto" w:after="120"/>
        <w:ind w:firstLine="720"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="${font}" w:hAnsi="${font}"/>
          <w:sz w:val="${sizeHalfPt}"/>
        </w:rPr>
        <w:t xml:space="preserve">${escapeXml(para)}</w:t>
      </w:r>
    </w:p>`;
  }

  // Table if provided
  if (options.tableData && options.tableData.headers.length > 0) {
    bodyXml += `<w:tbl>
      <w:tblPr>
        <w:tblW w:w="5000" w:type="pct"/>
        <w:jc w:val="center"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="185ABD"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="185ABD"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="185ABD"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="185ABD"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
        </w:tblBorders>
      </w:tblPr>`;

    // Table Header Row
    bodyXml += `<w:tr>
      <w:trPr><w:tblHeader/></w:trPr>`;
    for (const header of options.tableData.headers) {
      bodyXml += `<w:tc>
        <w:tcPr>
          <w:shd w:val="clear" w:color="auto" w:fill="EBF3FB"/>
        </w:tcPr>
        <w:p>
          <w:pPr><w:jc w:val="center"/></w:pPr>
          <w:r>
            <w:rPr><w:b/><w:sz w:val="${sizeHalfPt}"/><w:color w:val="103F91"/></w:rPr>
            <w:t>${escapeXml(header)}</w:t>
          </w:r>
        </w:p>
      </w:tc>`;
    }
    bodyXml += `</w:tr>`;

    // Table Data Rows
    for (const row of options.tableData.rows) {
      bodyXml += `<w:tr>`;
      for (const cell of row) {
        bodyXml += `<w:tc>
          <w:p>
            <w:pPr><w:jc w:val="left"/></w:pPr>
            <w:r>
              <w:rPr><w:sz w:val="${sizeHalfPt}"/></w:rPr>
              <w:t>${escapeXml(cell)}</w:t>
            </w:r>
          </w:p>
        </w:tc>`;
      }
      bodyXml += `</w:tr>`;
    }

    bodyXml += `</w:tbl>`;
  }

  // Section Properties (Margins, Page size, Orientation, Header/Footer references)
  const pageSizeXml = isLandscape
    ? `<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/>`
    : `<w:pgSz w:w="11906" w:h="16838"/>`;

  const sectPrXml = `<w:sectPr>
    ${headerRelId ? `<w:headerReference w:type="default" r:id="${headerRelId}"/>` : ''}
    ${footerRelId ? `<w:footerReference w:type="default" r:id="${footerRelId}"/>` : ''}
    ${pageSizeXml}
    <w:pgMar w:top="${margins.top}" w:right="${margins.right}" w:bottom="${margins.bottom}" w:left="${margins.left}" w:header="720" w:footer="720" w:gutter="0"/>
  </w:sectPr>`;

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${bodyXml}
    ${sectPrXml}
  </w:body>
</w:document>`;

  zip.file('word/document.xml', documentXml);

  return await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE',
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Triggers client-side browser download for generated Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
