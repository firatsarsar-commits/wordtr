import { parseDocxBuffer, evaluateDocumentRubric } from './analyzer';
import { createRealDocxBlob } from './generator';
import { curriculumData } from '../curriculum-data';

export interface TestRunReport {
  testName: string;
  passed: boolean;
  score: number;
  maxScore: number;
  message: string;
}

/**
 * Representative automated test suite verifying OOXML parsing and deterministic rubric evaluation
 */
export async function runDocxAssessmentTests(): Promise<TestRunReport[]> {
  const reports: TestRunReport[] = [];

  try {
    // TEST 1: Positive Test - Perfect Document satisfying all criteria of Assignment 7.1
    const testAssignment = curriculumData[6].assignments[0]; // Hafta 7 Odev 1

    const perfectDocBlob = await createRealDocxBlob({
      title: 'Bilişim Teknolojilerinin Eğitimde Kullanımı',
      paragraphs: [
        'Eğitimde bilişim teknolojileri, öğrenme süreçlerini zenginleştiren ve öğrenci merkezli pedagojik modelleri destekleyen en temel araçlar arasındadır. Öğretmen adaylarının bu teknolojileri etkili kullanması eğitim kalitesini artırır.',
        'Bu araştırma kapsamında kelime işlemcilerin kullanım alanları, biçimlendirme kuralları ve akademik rapor hazırlama standartları deneysel olarak incelenmiştir. Araştırma bulguları aşağıdaki tabloda sunulmuştur.',
      ],
      fontFamily: 'Times New Roman',
      fontSizePt: 12,
      alignment: 'both', // Justified
      lineSpacingTwips: 360, // 1.5 line spacing
      marginsTwips: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // Normal 2.5 cm
      tableData: {
        headers: ['Ölçüt', 'Ön Test', 'Son Test'],
        rows: [
          ['Tipografi', '65 Puan', '95 Puan'],
          ['Paragraf Düzeni', '70 Puan', '98 Puan'],
          ['Tablo Yapısı', '60 Puan', '90 Puan'],
        ],
      },
    });

    const perfectBuffer = await perfectDocBlob.arrayBuffer();
    const parsedPerfect = await parseDocxBuffer(perfectBuffer);
    const perfectEval = evaluateDocumentRubric(parsedPerfect, testAssignment, 'test_perfect.docx');

    reports.push({
      testName: 'Test 1: Tam Kriter Uyumlu Belge (100 Puan Bekleniyor)',
      passed: perfectEval.percentage === 100,
      score: perfectEval.totalScore,
      maxScore: perfectEval.maxScore,
      message: perfectEval.percentage === 100
        ? 'BAŞARILI: Belge tüm OOXML kriterlerini (TNR 12pt, iki yana yaslı, 1.5 aralık, 3x3 tablo, normal kenarlar) sağladı.'
        : `BAŞARISIZ: Beklenen 100, alınan ${perfectEval.percentage}.`,
    });

    // TEST 2: Negative Test - Document with wrong font and missing table
    const imperfectDocBlob = await createRealDocxBlob({
      title: 'Hatalı Belge Denemesi',
      paragraphs: [
        'Bu belgede yanlış yazı tipi ve eksik tablo bulunmaktadır.',
      ],
      fontFamily: 'Comic Sans MS', // Wrong font
      fontSizePt: 16, // Wrong size
      alignment: 'left', // Wrong alignment
      lineSpacingTwips: 240, // 1.0 spacing instead of 1.5
      // No table included
    });

    const imperfectBuffer = await imperfectDocBlob.arrayBuffer();
    const parsedImperfect = await parseDocxBuffer(imperfectBuffer);
    const imperfectEval = evaluateDocumentRubric(parsedImperfect, testAssignment, 'test_imperfect.docx');

    const correctlyDeducted = imperfectEval.percentage < 60 && imperfectEval.improvementsTr.length > 0;

    reports.push({
      testName: 'Test 2: Kriterleri Sağlamayan Belge (Puan Kırılması ve Öneri Bekleniyor)',
      passed: correctlyDeducted,
      score: imperfectEval.totalScore,
      maxScore: imperfectEval.maxScore,
      message: correctlyDeducted
        ? `BAŞARILI: Kural tabanlı motor hataları tespit etti ve puanı düşürdü (%${imperfectEval.percentage}). İyileştirme önerileri üretildi.`
        : 'BAŞARISIZ: Kural ihlalleri gerektiği gibi puanlanmadı.',
    });

  } catch (err: unknown) {
    const errorObj = err as Error;
    reports.push({
      testName: 'Test Sistemi Hatası',
      passed: false,
      score: 0,
      maxScore: 100,
      message: errorObj.message || 'Bilinmeyen test hatası',
    });
  }

  return reports;
}
