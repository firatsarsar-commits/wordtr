import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'WordLab TR | Etkileşimli Word Öğrenme Platformu',
  description: 'WordLab TR: Etkileşimli Word Öğrenme Platformu - Üniversite öğrencileri için 14 haftalık müfredat, OOXML belge analizi, 50 soruluk deneme sınavı ve yapay zeka destekli eğitim asistanı.',
  openGraph: {
    title: 'WordLab TR | Etkileşimli Word Öğrenme Platformu',
    description: 'WordLab TR: Üniversite öğrencileri için kapsamlı Microsoft Word öğrenme ve otomatik DOCX değerlendirme platformu.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordLab TR | Etkileşimli Word Öğrenme Platformu',
    description: 'WordLab TR: Üniversite öğrencileri için kapsamlı Microsoft Word öğrenme ve otomatik DOCX değerlendirme platformu.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
