import { NextRequest, NextResponse } from 'next/server';
import { parseDocxBuffer, evaluateDocumentRubric } from '@/lib/docx/analyzer';
import { curriculumData } from '@/lib/curriculum-data';

export const maxDuration = 30; // 30 seconds max duration

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const assignmentId = formData.get('assignmentId') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Lütfen değerlendirilecek bir Word (.docx) dosyası seçin.' },
        { status: 400 }
      );
    }

    // Security Check 1: File size limit (15 MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Dosya boyutu çok büyük. Maksimum dosya boyutu 15 MB olmalıdır.' },
        { status: 400 }
      );
    }

    // Security Check 2: Filename & Extension
    const fileName = file.name || 'belge.docx';
    if (!fileName.toLowerCase().endsWith('.docx')) {
      return NextResponse.json(
        { error: 'Geçersiz dosya uzantısı. Yalnızca Microsoft Word (.docx) belgeleri kabul edilir.' },
        { status: 400 }
      );
    }

    // Security Check 3: Check for macro-enabled document types
    if (fileName.toLowerCase().endsWith('.docm')) {
      return NextResponse.json(
        { error: 'Güvenlik nedeniyle makro içeren (.docm) dosyalar kabul edilmemektedir.' },
        { status: 400 }
      );
    }

    // Find requested assignment
    let targetAssignment = null;
    if (assignmentId) {
      for (const week of curriculumData) {
        const found = week.assignments.find((a) => a.id === assignmentId);
        if (found) {
          targetAssignment = found;
          break;
        }
      }
    }

    if (!targetAssignment) {
      // Default fallback to Week 1 Assignment 1
      targetAssignment = curriculumData[0].assignments[0];
    }

    // Read ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Security Check 4: Check ZIP Magic Bytes (PK\x03\x04 or 0x50 0x4B 0x03 0x04)
    const uint8 = new Uint8Array(arrayBuffer);
    if (uint8.length < 4 || uint8[0] !== 0x50 || uint8[1] !== 0x4b) {
      return NextResponse.json(
        { error: 'Yüklenen dosya geçerli bir ZIP/OOXML arşivi imzası taşımıyor.' },
        { status: 400 }
      );
    }

    // Parse and evaluate OOXML
    const parsedDoc = await parseDocxBuffer(arrayBuffer);
    const assessmentResult = evaluateDocumentRubric(parsedDoc, targetAssignment, fileName);

    return NextResponse.json(assessmentResult);
  } catch (error: unknown) {
    console.error('DOCX assessment error:', error);
    const err = error as Error;
    return NextResponse.json(
      {
        error: err.message || 'Belge incelenirken beklenmeyen bir hata oluştu. Lütfen dosyanızı kontrol edip tekrar deneyin.',
      },
      { status: 500 }
    );
  }
}
