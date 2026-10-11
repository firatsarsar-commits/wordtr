import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, currentWeek, currentTopic, language = 'tr' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Geçerli bir soru veya mesaj belirtilmedi.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'CONFIG_MISSING',
          message:
            language === 'en'
              ? 'Google Gemini API key is not configured on the server. Please check environment secrets.'
              : 'Google Gemini API anahtarı sunucuda yapılandırılmamış. Lütfen ortam değişkenlerini kontrol edin.',
        },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const isTr = language === 'tr';

    const systemInstruction = `Sen "WordLab TR" platformunun yapay zekâ destekli Microsoft Word Öğrenme Asistanısın (WordLab AI Asistan).
Hedef kitlen: Üniversite düzeyinde "Eğitimde Bilişim Teknolojileri" dersi alan öğrencilerdir.

GÖREVLERİN VE PEDAGOJİK İLKELERİN:
1. Yalnızca Microsoft Word yazılımı, tipografi, belge düzeni, akademik rapor hazırlama, tez kuralları ve kelime işlem konularında eğitim ve rehberlik verirsin.
2. Adım adım, net, anlaşılır ve yapıcı yönergeler sağla. Komutların Şerit (Ribbon) sekmelerindeki tam konumunu belirt (Örn: Giriş > Paragraf > İki Yana Yasla veya Düzen > Kenar Boşlukları).
3. Klavye kısayollarını (Ctrl+S, Ctrl+Z, Ctrl+Enter, Ctrl+D vb.) hem Türkçe hem İngilizce Word sürümleri için belirt.
4. Bir öğrenci doğrudan ödev cevabını istediğinde, cevabı doğrudan vermek yerine öğrenmeyi teşvik eden adım adım ipuçları ve yönlendirmeler ver (Scaffolding).
5. Asla var olmayan veya uydurma Word menüleri/komutları icat etme.
6. Yanıtını kullanıcının tercih ettiği dilde (${isTr ? 'Türkçe' : 'İngilizce'}) ver.
7. Eğer kullanıcı şu an bir ders konusunu inceliyorsa (Hafta ${currentWeek || 'Genel'} - ${currentTopic || 'Microsoft Word'}), yanıtında bu bağlamı göz önünde bulundur.
8. Profesyonel, samimi, cesaretlendirici ve akademik bir üslup kullan.`;

    const fullUserPrompt = `[Ders Bağlamı: Hafta ${currentWeek || 'Genel'} - ${currentTopic || 'Word Genel'}]
[Öğrenci Sorusu]: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullUserPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || (isTr ? 'Bir yanıt üretilemedi.' : 'No response generated.');

    return NextResponse.json({
      text,
      week: currentWeek,
      topic: currentTopic,
    });
  } catch (error: unknown) {
    console.error('WordLab AI Assistant Error:', error);
    const err = error as Error;
    return NextResponse.json(
      {
        error: 'API_ERROR',
        message: err.message || 'Yapay zeka asistanı şu anda yanıt veremiyor. Lütfen daha sonra tekrar deneyin.',
      },
      { status: 500 }
    );
  }
}
