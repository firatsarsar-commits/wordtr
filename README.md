# WordLab TR - Etkileşimli Word Öğrenme Platformu
### Interactive Microsoft Word Learning Platform

WordLab TR, üniversite düzeyinde **"Eğitimde Bilişim Teknolojileri"** dersi alan öğrenciler için geliştirilmiş iki dilli (Türkçe & İngilizce), etkileşimli, yapay zekâ destekli bir Microsoft Word eğitim ve otomatik belge değerlendirme platformudur.

---

## 🌟 Temel Özellikler

1. **14 Haftalık Eksiksiz Müfredat:**
   - 1. haftadan 14. haftaya kadar tüm modüller kilit olmadan doğrudan erişilebilirdir.
   - Her hafta için: Giriş, Öğrenme Hedefleri, Ön Koşullar, Doğrulanmış Eğitim Videoları, Şerit Yolu Açıklamaları, Etkileşimli Alıştırmalar, 4-5 Pratik DOCX Ödevi, Biçimlendirici Quiz ve Haftalık Özet.

2. **Otomatik ve Deterministik DOCX Belge Analizi:**
   - Öğrencilerin yüklediği `.docx` dosyaları doğrudan OOXML/ZIP seviyesinde taranır (`word/document.xml`, `styles.xml`, `header/footer.xml`).
   - Yazı tipi ailesi, yazı boyutu (half-point), hizalama (`w:jc`), satır aralığı (`w:spacing`), ilk satır girintisi (`w:ind`), sayfa kenar boşlukları (`w:pgMar`), sayfa yönlendirmesi (`w:pgSz`), tablolar ve başlık stilleri nesnel bir rubrik üzerinden 100 puan üzerinden değerlendirilir.
   - Yapay/uydurma tahminler üretilmez; ölçülebilir etiketler doğrulanır.
   - Detaylı güçlü yönler ve düzeltici adım önerileri sunulur.

3. **Gerçek İndirilebilir DOCX Referans Belgeleri:**
   - Uygulama Laboratuvarında öğrenciler her bir ödev için geçerli ve gerçek bir referans Word belgesini tek tıkla indirip inceleyebilir.

4. **50 Soruluk Deneme Sınavı Merkezi:**
   - 14 haftayı kapsayan, bilişsel düzeylere göre sınıflandırılmış 50 özgün soru.
   - İsteğe bağlı 60 dakikalık geri sayım sayacı, soru haritası, soru işaretleme, anlık puanlama, konu bazlı başarı analizi ve soru açıklamaları.

5. **Soru Bankası Düzenleme Arayüzü:**
   - Öğretim elemanları ve öğrenciler için yerel depolama destekli soru arama, ekleme, düzenleme ve silme.

6. **WordLab AI Asistanı:**
   - Google Gemini 3.8 Flash modeliyle çalışan, Microsoft Word eğitimine özel koç.
   - Sunucu tarafında (`/api/assistant`) güvenli API çağrıları; gizli anahtarlar asla istemciye sızmaz.
   - Öğrencilere doğrudan ödev cevabı vermek yerine adım adım ipuçları sunar (Pedagogical Scaffolding).

7. **İki Dilli Destek (Bilingual TR & EN):**
   - Varsayılan dil Türkçe olup tek tıkla İngilizceye geçiş yapılabilir.

8. **Google Antigravity Hazırlığı:**
   - Öğrenci Paneli ve Yönetim Paneli butonları kural gereği görsel yer tutucu (placeholder) olarak konumlandırılmıştır; çok kullanıcılı veritabanı entegrasyonu Antigravity aşamasında geliştirilecektir.

---

## 🛠️ Teknoloji Yığını

- **Frontend:** Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Motion.
- **OOXML & ZIP İşleme:** JSZip (İstemci ve sunucu uyumlu OOXML ayrıştırma ve dinamik .docx oluşturma).
- **Yapay Zeka:** `@google/genai` SDK (`gemini-3.8-flash` modeli ile sunucu tarafı API rotası).
- **Yerel Kalıcılık:** Tarayıcı `localStorage` (kullanıcı ilerlemesi, ödev skorları ve soru bankası).

---

## 🚀 Kurulum ve Yerel Çalıştırma

### Gereksinimler
- Node.js 18+ veya Node.js 20+
- npm veya yarn

### Adımlar

1. Depoyu klonlayın:
   \`\`\`bash
   git clone https://github.com/kullanici/wordlab-tr.git
   cd wordlab-tr
   \`\`\`

2. Bağımlılıkları yükleyin:
   \`\`\`bash
   npm install
   \`\`\`

3. Ortam değişkenlerini ayarlayın:
   `.env.example` dosyasını `.env.local` olarak kopyalayın:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   `.env.local` dosyasına Gemini API anahtarınızı ekleyin:
   \`\`\`env
   GEMINI_API_KEY="AIzaSy..."
   \`\`\`

4. Geliştirme sunucusunu başlatın:
   \`\`\`bash
   npm run dev
   \`\`\`
   Tarayıcınızda `http://localhost:3000` adresini açın.

---

## 📦 Derleme ve Vercel Dağıtımı

Projeyi üretim için derlemek:
\`\`\`bash
npm run build
npm start
\`\`\`

### Vercel Dağıtım Talimatları
1. Projeyi GitHub reponuza gönderin.
2. [Vercel Dashboard](https://vercel.com) üzerinden "Add New Project" seçeneğine tıklayın ve deponuzu bağlayın.
3. Framework Preset olarak **Next.js** seçilecektir.
4. "Environment Variables" sekmesinde `GEMINI_API_KEY` anahtarınızı tanımlayın.
5. "Deploy" butonuna basın.

---

## 🔒 Güvenlik ve Gizlilik
- Yüklenen Word belgeleri yalnızca biçimlendirme analizi amacıyla okunur.
- Makro içeren `.docm` dosyaları güvenlik sebebiyle engellenir.
- 15 MB dosya boyutu sınırı uygulanır.
- Gemini API anahtarı sunucu tarafında tutulur ve asla istemci kodunda açığa çıkmaz.
- KVKK ve gizlilik ilkeleri uyarınca gereksiz kişisel veri toplanmaz.
