import { WeekCurriculum } from './types';

export const curriculumData: WeekCurriculum[] = [
  // ==========================================
  // HAFTA 1
  // ==========================================
  {
    weekNumber: 1,
    titleTr: "Microsoft Word'e Giriş ve Temel Arayüz",
    titleEn: "Introduction to Microsoft Word and Interface",
    taglineTr: "Şerit menü, sekmeler, belge oluşturma ve dosya yönetimi",
    taglineEn: "Ribbon interface, tabs, document creation and file management",
    introductionTr: "Microsoft Word, kelime işlem programları arasında dünyada en yaygın kullanılan yazılımdır. Bu haftada Word arayüzünün bileşenlerini (Hızlı Erişim Araç Çubuğu, Şerit Menü, Durum Çubuğu, Cetvel) öğrenecek, yeni belge oluşturma, kaydetme (.docx ve .pdf formatları) ve temel dosya işlemlerini kavrayacaksınız.",
    introductionEn: "Microsoft Word is the most widely utilized word processor worldwide. This week you will explore the interface components (Quick Access Toolbar, Ribbon, Status Bar, Ruler), learn to create new documents, save in various formats (.docx and .pdf), and manage document files.",
    prerequisitesTr: [
      "Temel bilgisayar ve işletim sistemi kullanımı (klavye, fare, klasör yapısı)",
      "Dosya ve klasör kaydetme mantığı"
    ],
    prerequisitesEn: [
      "Basic computer and OS operations (keyboard, mouse, folder navigation)",
      "File saving and storage concepts"
    ],
    objectives: [
      { id: "w1-obj1", textTr: "Word kullanıcı arayüzü bileşenlerini (Şerit, Sekmeler, Gruplar, Durum Çubuğu) doğru tanımlayabilme", textEn: "Identify Word UI components (Ribbon, Tabs, Command Groups, Status Bar)" },
      { id: "w1-obj2", textTr: "Farklı şablonları kullanarak yeni bir Word belgesi başlatabilme", textEn: "Create new Word documents using templates and blank formats" },
      { id: "w1-obj3", textTr: "Belgeleri .docx ve .pdf biçimlerinde doğru dizine kaydedebilme ve otomatik kaydetmeyi yönetebilme", textEn: "Save documents as .docx and .pdf and manage auto-save settings" },
      { id: "w1-obj4", textTr: "Görünüm seçeneklerini (Sayfa Düzeni, Web Düzeni, Odak Modu, Yakınlaştırma) amaca uygun ayarlayabilme", textEn: "Adjust view modes (Print Layout, Web Layout, Focus Mode, Zoom levels)" }
    ],
    videos: [
      {
        id: "w1-v1",
        titleTr: "Microsoft Word Temel Arayüzü ve Şerit Yapısı",
        titleEn: "Microsoft Word Basic Interface & Ribbon Structure",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "S-nHYzK-BVg", // Verified Microsoft Word overview tutorial ID
        isVerified: true,
        duration: "12:45",
        notesTr: "Şerit sekmeleri (Giriş, Ekle, Düzen vb.) ve Hızlı Erişim Araç Çubuğu tanıtımı.",
        notesEn: "Walkthrough of Ribbon tabs and Quick Access Toolbar customization."
      },
      {
        id: "w1-v2",
        titleTr: "Dosya Kaydetme, Farklı Kaydet ve PDF Dışa Aktarma",
        titleEn: "Saving Documents and PDF Export",
        channel: "WordLab Video Serisi",
        isVerified: false,
        notesTr: "Bu konu için özel Türkçe video eklenecektir.",
        notesEn: "A dedicated video will be added for this topic."
      }
    ],
    writtenGuides: [
      {
        id: "w1-g1",
        headingTr: "Word Arayüzünün Anatomisi",
        headingEn: "Anatomy of the Word Interface",
        sections: [
          {
            subheadingTr: "1. Şerit (Ribbon) ve Sekmeler",
            subheadingEn: "1. The Ribbon and Tabs",
            contentTr: "Şerit, Word penceresinin üst kısmında yer alan ve tüm komutları mantıksal sekmeler (Giriş, Ekle, Tasarım, Düzen, Başvurular, Postalar, Gözden Geçir, Görünüm) altında toplayan ana denetim merkezidir. Her sekme, birbiriyle ilişkili komutları içeren 'Gruplara' (örn. Giriş sekmesinde Pano, Yazı Tipi, Paragraf, Stiller) ayrılmıştır.",
            contentEn: "The Ribbon sits at the top of the window, grouping commands under logical tabs (Home, Insert, Design, Layout, References, Mailings, Review, View). Each tab contains specialized Command Groups.",
            ribbonPathTr: "Giriş / Ekle / Düzen sekmeleri",
            ribbonPathEn: "Home / Insert / Layout tabs",
            calloutTipTr: "Şeriti küçültmek veya genişletmek için Ctrl+F1 tuş kombinasyonunu kullanabilirsiniz.",
            calloutTipEn: "Press Ctrl+F1 to collapse or expand the Ribbon."
          },
          {
            subheadingTr: "2. Hızlı Erişim Araç Çubuğu (Quick Access Toolbar)",
            subheadingEn: "2. Quick Access Toolbar",
            contentTr: "Pencerenin en üst sol köşesinde yer alan bu çubuk, en sık kullandığınız komutları (Kaydet, Geri Al, Yinele) hangi sekmede olursanız olun tek tıkla çalıştırmanızı sağlar. Sağ tarafındaki küçük oka tıklayarak 'Yazdır', 'E-posta' gibi yeni düğmeler ekleyebilirsiniz.",
            contentEn: "Located in the top-left corner, it provides instant 1-click access to common actions like Save, Undo, and Redo regardless of which tab is active.",
            keyboardShortcut: "Geri Al: Ctrl+Z | Yinele: Ctrl+Y | Kaydet: Ctrl+S"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w1-act1",
        type: "identify_command",
        titleTr: "Arayüz Bileşenini Tanıma",
        titleEn: "Identify Interface Component",
        descriptionTr: "Kelime sayısı, sayfa numarası ve yazım denetimi durumu ekranın hangi bölümünde yer alır?",
        descriptionEn: "Where are word count, page count, and proofing status displayed?",
        hintTr: "Ekranın en altındaki gri çubuğu düşünün.",
        hintEn: "Consider the bar running along the very bottom of the screen.",
        explanationTr: "Durum Çubuğu (Status Bar), Word penceresinin en altında bulunur; toplam sayfa sayısını, etkin sayfayı, kelime sayısını ve yakınlaştırma kaydırıcısını barındırır.",
        explanationEn: "The Status Bar is located at the bottom of the Word window, showing total pages, current page, word count, and the zoom slider.",
        options: [
          { id: "opt-1", textTr: "Şerit Menü (Ribbon)", textEn: "Ribbon Menu", isCorrect: false },
          { id: "opt-2", textTr: "Durum Çubuğu (Status Bar)", textEn: "Status Bar", isCorrect: true, feedbackTr: "Tebrikler! Durum çubuğu belge istatistiklerini anlık gösterir." },
          { id: "opt-3", textTr: "Hızlı Erişim Araç Çubuğu", textEn: "Quick Access Toolbar", isCorrect: false },
          { id: "opt-4", textTr: "Gezinti Bölmesi (Navigation Pane)", textEn: "Navigation Pane", isCorrect: false }
        ]
      },
      {
        id: "w1-act2",
        type: "match_commands",
        titleTr: "Klavye Kısayollarını Eşleştirme",
        titleEn: "Match Keyboard Shortcuts",
        descriptionTr: "Sık kullanılan temel dosya kısayollarını işlevleriyle eşleştirin.",
        descriptionEn: "Match common file shortcuts with their corresponding functions.",
        hintTr: "S = Save (Kaydet), Z = Geri al, N = New (Yeni).",
        hintEn: "S = Save, Z = Undo, N = New.",
        explanationTr: "Ctrl+S belgeyi kaydeder, Ctrl+N yeni boş belge açar, Ctrl+O var olan belgeyi açar, Ctrl+Z son işlemi geri alır.",
        explanationEn: "Ctrl+S saves, Ctrl+N opens a new blank document, Ctrl+O opens existing, Ctrl+Z undoes the last action.",
        pairs: [
          { id: "p1", leftTr: "Ctrl + S", leftEn: "Ctrl + S", rightTr: "Belgeyi Kaydet", rightEn: "Save Document" },
          { id: "p2", leftTr: "Ctrl + N", leftEn: "Ctrl + N", rightTr: "Yeni Boş Belge Oluştur", rightEn: "Create New Blank Document" },
          { id: "p3", leftTr: "Ctrl + Z", leftEn: "Ctrl + Z", rightTr: "Son İşlemi Geri Al", rightEn: "Undo Last Action" },
          { id: "p4", leftTr: "Ctrl + P", leftEn: "Ctrl + P", rightTr: "Belgeyi Yazdır", rightEn: "Print Document" }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Bir Word belgesini .docx yerine .pdf olarak kaydetmenin akademik paylaşım açısından sağladığı avantajlar nelerdir?",
      "Şerit menüde kaybolan bir komutu bulmak için Word'ün 'Bana Ne Yapmak İstediğinizi Söyleyin (Arama)' kutusu nasıl kullanılır?"
    ],
    preparationQuestionsEn: [
      "What are the pedagogical and formatting advantages of exporting as .pdf rather than .docx when submitting papers?",
      "How does the 'Tell Me / Search' bar assist in locating buried ribbon commands?"
    ],
    assignments: [
      {
        id: "w1-a1",
        weekNumber: 1,
        assignmentNumber: 1,
        titleTr: "Ödev 1.1: Tanışma Belgesi ve Temel Kaydetme",
        titleEn: "Assignment 1.1: Personal Bio and Basic Document Setup",
        difficulty: "beginner",
        estimatedMinutes: 20,
        objectivesTr: ["Yeni Word belgesi oluşturma", "En az 2 paragraf metin yazma", "Times New Roman yazı tipi ve 12 pt boyut uygulama"],
        objectivesEn: ["Create new Word document", "Write at least 2 paragraphs", "Apply Times New Roman 12 pt font"],
        instructionsTr: [
          "1. Yeni boş bir Word belgesi açın.",
          "2. İlk paragrafa 'Eğitimde Bilişim Teknolojileri - Hafta 1 Tanışma Belgesi' başlığını yazın.",
          "3. İkinci paragrafa kendinizi, bölümünüzü ve bu dersten beklentilerinizi anlatan en az 50 kelimelik bir metin yazın.",
          "4. Metnin yazı tipini 'Times New Roman' ve boyutunu 12 pt yapın.",
          "5. Belgeyi 'Hafta1_Odev1.docx' olarak kaydedin ve sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Create a blank Word document.",
          "2. Add the title 'Information Technologies in Education - Week 1 Bio'.",
          "3. Write a body paragraph introducing yourself (at least 50 words).",
          "4. Set font to Times New Roman, 12 pt.",
          "5. Save as Hafta1_Odev1.docx and upload."
        ],
        rubric: [
          {
            id: "w1a1-r1",
            category: "font",
            titleTr: "Yazı Tipi (Font Family)",
            titleEn: "Font Family",
            points: 30,
            expectedDescriptionTr: "Belge yazı tipi Times New Roman olmalıdır.",
            expectedDescriptionEn: "Document font must be Times New Roman.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          },
          {
            id: "w1a1-r2",
            category: "font",
            titleTr: "Yazı Boyutu (Font Size)",
            titleEn: "Font Size",
            points: 30,
            expectedDescriptionTr: "Gövde metni 12 pt boyutunda olmalıdır.",
            expectedDescriptionEn: "Body text must be 12 pt.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w1a1-r3",
            category: "elements",
            titleTr: "Minimum Kelime Sayısı",
            titleEn: "Minimum Word Count",
            points: 40,
            expectedDescriptionTr: "Belge en az 40 kelime içermelidir.",
            expectedDescriptionEn: "Document must contain at least 40 words.",
            checkFn: "check_minimum_words",
            params: { minWords: 40 }
          }
        ],
        referenceDocName: "Hafta1_Odev1_Ornek.docx",
        starterDocName: "Hafta1_Odev1_Baslangic.docx",
        starterContentGenerator: {
          title: "Eğitimde Bilişim Teknolojileri - Hafta 1 Tanışma Belgesi",
          paragraphs: [
            "Bu belge, Microsoft Word arayüzü ve temel dosya işlemlerini pekiştirmek amacıyla hazırlanmıştır. Üniversite eğitiminde bilimsel araştırmalar ve ödevler hazırlarken kelime işlemcileri etkin kullanmak büyük bir akademik avantaj sağlar.",
            "Ben Eğitim Fakültesi öğrencisiyim. Bu dönem boyunca WordLab TR platformu üzerinden Word'ün tüm teknik ve akademik biçimlendirme yeteneklerini uygulamalı olarak öğreneceğim."
          ]
        }
      },
      {
        id: "w1-a2",
        weekNumber: 1,
        assignmentNumber: 2,
        titleTr: "Ödev 1.2: Calibri 11 pt Standart Belge Formatı",
        titleEn: "Assignment 1.2: Calibri 11 pt Standard Document Format",
        difficulty: "beginner",
        estimatedMinutes: 20,
        objectivesTr: ["Calibri yazı tipini uygulama", "11 pt standart metin boyutu", "En az 60 kelime içerik"],
        objectivesEn: ["Apply Calibri font", "11 pt standard size", "At least 60 words"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. Teknolojinin eğitimdeki önemini açıklayan en az iki paragraf yazın.",
          "3. Yazı tipini Calibri, boyutunu 11 pt olarak ayarlayın.",
          "4. Dosyayı kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Open a new document.",
          "2. Write two paragraphs on educational technology.",
          "3. Set font to Calibri, 11 pt.",
          "4. Save and upload."
        ],
        rubric: [
          {
            id: "w1a2-r1",
            category: "font",
            titleTr: "Yazı Tipi (Calibri)",
            titleEn: "Font Family (Calibri)",
            points: 50,
            expectedDescriptionTr: "Belge yazı tipi Calibri olmalıdır.",
            expectedDescriptionEn: "Font must be Calibri.",
            checkFn: "check_font_family",
            params: { fontName: "Calibri" }
          },
          {
            id: "w1a2-r2",
            category: "elements",
            titleTr: "Kelime Hacmi",
            titleEn: "Word Volume",
            points: 50,
            expectedDescriptionTr: "Belge en az 50 kelime içermelidir.",
            expectedDescriptionEn: "Document must contain at least 50 words.",
            checkFn: "check_minimum_words",
            params: { minWords: 50 }
          }
        ],
        referenceDocName: "Hafta1_Odev2_Ornek.docx"
      },
      {
        id: "w1-a3",
        weekNumber: 1,
        assignmentNumber: 3,
        titleTr: "Ödev 1.3: Arial Yazı Tipi ve Belge Yapısı",
        titleEn: "Assignment 1.3: Arial Font & Document Structure",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Arial yazı tipi kullanımı", "12 pt gövde metni", "Çok paragraflı yapı"],
        objectivesEn: ["Arial font usage", "12 pt body text", "Multi-paragraph layout"],
        instructionsTr: [
          "1. Arial yazı tipinde 3 paragraftan oluşan bir tanıtım metni hazırlayın.",
          "2. Gövde boyutunu 12 pt olarak seçin.",
          "3. Belgenizi DOCX olarak kaydedip değerlendirmeye gönderin."
        ],
        instructionsEn: [
          "1. Create a 3-paragraph text with Arial font.",
          "2. Set body text to 12 pt.",
          "3. Save as DOCX and submit for evaluation."
        ],
        rubric: [
          {
            id: "w1a3-r1",
            category: "font",
            titleTr: "Arial Yazı Tipi",
            titleEn: "Arial Font",
            points: 50,
            expectedDescriptionTr: "Yazı tipi Arial olmalıdır.",
            expectedDescriptionEn: "Font must be Arial.",
            checkFn: "check_font_family",
            params: { fontName: "Arial" }
          },
          {
            id: "w1a3-r2",
            category: "font",
            titleTr: "12 pt Boyut",
            titleEn: "12 pt Size",
            points: 50,
            expectedDescriptionTr: "Metin boyutu 12 pt olmalıdır.",
            expectedDescriptionEn: "Text size must be 12 pt.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          }
        ],
        referenceDocName: "Hafta1_Odev3_Ornek.docx"
      },
      {
        id: "w1-a4",
        weekNumber: 1,
        assignmentNumber: 4,
        titleTr: "Ödev 1.4: Word Dosya Yönetimi ve Bütünleşik Kontrol",
        titleEn: "Assignment 1.4: Document Management & File Verification",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Times New Roman font", "12 pt metin boyutu", "En az 80 kelimelik akademik metin"],
        objectivesEn: ["Times New Roman font", "12 pt body size", "At least 80 words academic text"],
        instructionsTr: [
          "1. 'Bilişim Çağında Öğretmen Yeterlikleri' konulu bir metin hazırlayın.",
          "2. Times New Roman yazı tipi ve 12 pt boyut uygulayın.",
          "3. En az 80 kelime içeren kapsamlı iki paragraf oluşturun.",
          "4. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Prepare an essay on Teacher Competencies in the Information Age.",
          "2. Apply Times New Roman font and 12 pt size.",
          "3. Write at least 80 words across 2 paragraphs.",
          "4. Save and submit."
        ],
        rubric: [
          {
            id: "w1a4-r1",
            category: "font",
            titleTr: "Times New Roman",
            titleEn: "Times New Roman Font",
            points: 40,
            expectedDescriptionTr: "Yazı tipi Times New Roman olmalıdır.",
            expectedDescriptionEn: "Font must be Times New Roman.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          },
          {
            id: "w1a4-r2",
            category: "font",
            titleTr: "12 pt Boyut",
            titleEn: "12 pt Size",
            points: 30,
            expectedDescriptionTr: "Metin boyutu 12 pt olmalıdır.",
            expectedDescriptionEn: "Text size must be 12 pt.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w1a4-r3",
            category: "elements",
            titleTr: "80 Kelime Hacmi",
            titleEn: "80 Words Volume",
            points: 30,
            expectedDescriptionTr: "Belge en az 80 kelime içermelidir.",
            expectedDescriptionEn: "Document must contain at least 80 words.",
            checkFn: "check_minimum_words",
            params: { minWords: 80 }
          }
        ],
        referenceDocName: "Hafta1_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w1-q1",
        questionTr: "Bir belgede yapılan son işlemi geri almak için kullanılan evrensel klavye kısayolu hangisidir?",
        questionEn: "Which universal keyboard shortcut is used to undo the last action in a document?",
        options: [
          { id: "o1", textTr: "Ctrl + Y", textEn: "Ctrl + Y" },
          { id: "o2", textTr: "Ctrl + Z", textEn: "Ctrl + Z" },
          { id: "o3", textTr: "Ctrl + X", textEn: "Ctrl + X" },
          { id: "o4", textTr: "Ctrl + S", textEn: "Ctrl + S" }
        ],
        correctOptionId: "o2",
        explanationTr: "Ctrl+Z işlemi geri alır (Undo). Ctrl+Y ise geri alınan işlemi yineler (Redo).",
        explanationEn: "Ctrl+Z undoes the last action, while Ctrl+Y redoes it."
      },
      {
        id: "w1-q2",
        questionTr: "Word'de açık olan bir belgenin adını veya kayıt konumunu değiştirmek için hangi komut kullanılır?",
        questionEn: "Which command is used in Word to change the name or save location of an open document?",
        options: [
          { id: "o1", textTr: "Dosya > Kaydet (Ctrl+S)", textEn: "File > Save (Ctrl+S)" },
          { id: "o2", textTr: "Dosya > Farklı Kaydet (F12)", textEn: "File > Save As (F12)" },
          { id: "o3", textTr: "Giriş > Değiştir", textEn: "Home > Replace" },
          { id: "o4", textTr: "Dosya > Kapat", textEn: "File > Close" }
        ],
        correctOptionId: "o2",
        explanationTr: "Farklı Kaydet (Save As - F12), belgenin yeni bir adla veya yeni bir klasöre farklı biçimde kaydedilmesini sağlar.",
        explanationEn: "Save As (F12) creates a new copy of the file under a new name or in a new folder."
      }
    ],
    summaryTr: "1. Haftayı tamamladınız! Word arayüzünü, Şerit yapısını, Hızlı Erişim Araç Çubuğunu, durum çubuğunu ve güvenli dosya kaydetme süreçlerini öğrendiniz. Bir sonraki haftada metin biçimlendirme ve tipografi kurallarını inceleyeceğiz.",
    summaryEn: "You completed Week 1! You learned the Word interface, Ribbon hierarchy, Quick Access toolbar, and file management principles. Next week we will explore character formatting and typography."
  },

  // ==========================================
  // HAFTA 2
  // ==========================================
  {
    weekNumber: 2,
    titleTr: "Metin Düzenleme ve Karakter Biçimlendirme",
    titleEn: "Text Editing and Character Formatting",
    taglineTr: "Yazı tipleri, boyutlar, renkler, kalın, italik, altı çizili ve metin efektleri",
    taglineEn: "Fonts, sizes, colors, bold, italic, underline and text effects",
    introductionTr: "Etkili bir belge hazırlamanın ilk kuralı, okunabilirliği yüksek ve hiyerarşik olarak düzenlenmiş tipografik yapılardır. Bu haftada Giriş sekmesindeki Yazı Tipi grubunu, yazı tipi ailesi seçimini, boyutlandırmayı, vurguları ve tüm biçimlendirmeyi temizleme komutunu öğreneceksiniz.",
    introductionEn: "The foundation of any great document is legible typography and structured hierarchy. This week covers the Home tab's Font group, font family pairing, sizing, bold/italic/underline emphasis, and the Clear All Formatting command.",
    prerequisitesTr: ["Word arayüzü ve Şerit menüyü tanıma", "Fare veya klavye ile metin seçme teknikleri"],
    prerequisitesEn: ["Familiarity with Word ribbon", "Text selection methods using mouse or keyboard"],
    objectives: [
      { id: "w2-obj1", textTr: "Akademik ve profesyonel belgelere uygun yazı tipi (Times New Roman, Arial, Calibri) seçebilme", textEn: "Choose suitable fonts for academic documents (Times New Roman, Arial, Calibri)" },
      { id: "w2-obj2", textTr: "Kalın (Ctrl+K / Ctrl+B), İtalik (Ctrl+T / Ctrl+I) ve Altı Çizili vurgularını doğru yerlerde kullanabilme", textEn: "Apply Bold, Italic, and Underline formatting purposefully" },
      { id: "w2-obj3", textTr: "Yazı tipi boyutunu (pt) ve büyük/küçük harf dönüştürme (Shift+F3) seçeneklerini yönetebilme", textEn: "Manage font size and toggle case conversions using Shift+F3" },
      { id: "w2-obj4", textTr: "'Tüm Biçimlendirmeyi Temizle' komutu ile hatalı internet kopyalamalarını arındırabilme", textEn: "Use Clear All Formatting to sanitize copied external text" }
    ],
    videos: [
      {
        id: "w2-v1",
        titleTr: "Word'de Metin ve Yazı Tipi Biçimlendirme Rehberi",
        titleEn: "Word Font Formatting and Typography Guide",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "5bL6Y_w7Gss",
        isVerified: true,
        duration: "14:10",
        notesTr: "Giriş sekmesi > Yazı Tipi grubu komutlarının uygulamalı gösterimi.",
        notesEn: "Hands-on demonstration of Font group features on the Home tab."
      }
    ],
    writtenGuides: [
      {
        id: "w2-g1",
        headingTr: "Karakter Biçimlendirme Standartları",
        headingEn: "Character Formatting Standards",
        sections: [
          {
            subheadingTr: "1. Yazı Tipi ve Boyut Seçimi",
            subheadingEn: "1. Font and Size Selection",
            contentTr: "Akademik çalışmalarda (APA 7 gibi standartlarda) genellikle Times New Roman (12 pt), Arial (11 pt) veya Calibri (11 pt) tercih edilir. Metnin tamamında tutarlı olmak esastır.",
            contentEn: "Academic style guides (such as APA 7) recommend Times New Roman 12 pt, Arial 11 pt, or Calibri 11 pt. Consistency throughout the document is key.",
            ribbonPathTr: "Giriş > Yazı Tipi > Yazı Tipi Seçici & Boyut Kutusu",
            ribbonPathEn: "Home > Font > Font Box & Size Picker",
            keyboardShortcut: "Boyut büyüt/küçült: Ctrl+Shift+> / Ctrl+Shift+<"
          },
          {
            subheadingTr: "2. Büyük/Küçük Harf Değiştirme (Change Case)",
            subheadingEn: "2. Change Case Options",
            contentTr: "Yanlışlıkla büyük harfle yazılmış bir başlığı yeniden yazmanıza gerek yoktur. Metni seçip Giriş > Yazı Tipi > 'Büyük/Küçük Harf Değiştir' düğmesine tıklayabilir ya da klavyeden Shift+F3 tuşuna basabilirsiniz.",
            contentEn: "Never retype text typed with Caps Lock on. Select text and press Shift+F3 to cycle through Sentence case, lowercase, and UPPERCASE.",
            keyboardShortcut: "Harf Durumu Döngüsü: Shift+F3"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w2-act1",
        type: "formatting_choice",
        titleTr: "Doğru Vurgu Biçimini Seçme",
        titleEn: "Choose Correct Emphasis Style",
        descriptionTr: "Akademik bir metinde yabancı dildeki bir kavramı veya kitap adını belirtirken hangi biçimlendirme tercih edilmelidir?",
        descriptionEn: "Which formatting is standard for foreign terms or book titles in academic text?",
        hintTr: "Altı çizili mi yoksa eğik (italik) mi tercih edilir?",
        hintEn: "Consider italics versus underlines.",
        explanationTr: "Akademik standartlarda (APA, MLA) kitap adları ve yabancı kavramlar İtalik (İtalik / Italic) yazılarak vurgulanır.",
        explanationEn: "In academic styles such as APA and MLA, book titles and foreign expressions are formatted in Italics.",
        options: [
          { id: "o1", textTr: "Altı Çizili ve Kalın", textEn: "Underlined & Bold", isCorrect: false },
          { id: "o2", textTr: "İtalik (Eğik)", textEn: "Italics", isCorrect: true, feedbackTr: "Doğru! Kitap ve dergi isimleri ile yabancı terimler italik yazılır." },
          { id: "o3", textTr: "Yalnızca Metin Vurgu Rengi (Sarı)", textEn: "Text Highlight Color (Yellow)", isCorrect: false },
          { id: "o4", textTr: "Tamamı Büyük Harf", textEn: "ALL CAPS", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Metin Vurgu Rengi (Text Highlight) ile Yazı Tipi Rengi (Font Color) arasındaki fark nedir?",
      "Bir belgede çok fazla farklı yazı tipi kullanmanın görsel hiyerarşi üzerindeki olumsuz etkisi nedir?"
    ],
    preparationQuestionsEn: [
      "What is the difference between Text Highlight Color and Font Color?",
      "Why does mixing too many distinct font families harm visual hierarchy?"
    ],
    assignments: [
      {
        id: "w2-a1",
        weekNumber: 2,
        assignmentNumber: 1,
        titleTr: "Ödev 2.1: Tipografik Vurgular ve Biçimlendirme",
        titleEn: "Assignment 2.1: Typographic Emphasis and Styling",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Times New Roman 12 pt uygulama", "Kalın, İtalik ve Altı Çizili metin vurguları ekleme", "En az 60 kelime"],
        objectivesEn: ["Apply Times New Roman 12 pt", "Add Bold, Italic, and Underlined text", "At least 60 words"],
        instructionsTr: [
          "1. Yeni bir Word belgesi oluşturun.",
          "2. Yazı tipini Times New Roman, boyutunu 12 pt yapın.",
          "3. Metin içinde en az bir kelimeyi KALIN, bir ifadeyi İTALİK, bir terimi ALTI ÇİZİLİ yapın.",
          "4. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Create a Word document.",
          "2. Set font to Times New Roman 12 pt.",
          "3. Include at least one BOLD word, one ITALIC phrase, and one UNDERLINED term.",
          "4. Save and submit."
        ],
        rubric: [
          {
            id: "w2a1-r1",
            category: "font",
            titleTr: "Times New Roman Yazı Tipi",
            titleEn: "Times New Roman Font",
            points: 30,
            expectedDescriptionTr: "Yazı tipi Times New Roman olmalıdır.",
            expectedDescriptionEn: "Font must be Times New Roman.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          },
          {
            id: "w2a1-r2",
            category: "font",
            titleTr: "12 pt Yazı Boyutu",
            titleEn: "12 pt Font Size",
            points: 30,
            expectedDescriptionTr: "Metin boyutu 12 pt olmalıdır.",
            expectedDescriptionEn: "Text size must be 12 pt.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w2a1-r3",
            category: "font",
            titleTr: "Kalın, İtalik, Altı Çizili Vurguları",
            titleEn: "Bold, Italic, Underline Emphasis",
            points: 40,
            expectedDescriptionTr: "Belgede kalın, italik ve altı çizili metinler yer almalıdır.",
            expectedDescriptionEn: "Document must contain bold, italic, and underline styling.",
            checkFn: "check_text_formatting",
            params: { bold: true, italic: true, underline: true }
          }
        ],
        referenceDocName: "Hafta2_Odev1_Ornek.docx"
      },
      {
        id: "w2-a2",
        weekNumber: 2,
        assignmentNumber: 2,
        titleTr: "Ödev 2.2: Metin Vurgu Rengi ve Renk Hiyerarşisi",
        titleEn: "Assignment 2.2: Highlight & Color Hierarchy",
        difficulty: "beginner",
        estimatedMinutes: 20,
        objectivesTr: ["Metin vurgu rengi uygulama", "Kalın başlık oluşturma", "Times New Roman 12 pt"],
        objectivesEn: ["Apply text highlighting", "Create bold header", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Times New Roman 12 pt ile bir özet metni hazırlayın.",
          "2. Önemli bir anahtar cümleyi metin vurgu rengi ile vurgulayın.",
          "3. Başlığı kalın yapın.",
          "4. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a summary text in Times New Roman 12 pt.",
          "2. Highlight a key sentence with text highlight color.",
          "3. Make the title bold.",
          "4. Upload the document."
        ],
        rubric: [
          {
            id: "w2a2-r1",
            category: "font",
            titleTr: "Yazı Tipi ve Boyut",
            titleEn: "Font Family & Size",
            points: 50,
            expectedDescriptionTr: "Times New Roman 12 pt uygulanmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          },
          {
            id: "w2a2-r2",
            category: "font",
            titleTr: "Kalın ve Vurgu Rengi",
            titleEn: "Bold & Highlight Formatting",
            points: 50,
            expectedDescriptionTr: "Kalın ve vurgu rengi biçimlendirmesi bulunmalıdır.",
            expectedDescriptionEn: "Bold and highlight formatting must be present.",
            checkFn: "check_text_formatting",
            params: { bold: true, highlight: true }
          }
        ],
        referenceDocName: "Hafta2_Odev2_Ornek.docx"
      },
      {
        id: "w2-a3",
        weekNumber: 2,
        assignmentNumber: 3,
        titleTr: "Ödev 2.3: Arial 12 pt İle Terimler Sözlüğü",
        titleEn: "Assignment 2.3: Terms Glossary with Arial 12 pt",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Arial 12 pt metin", "Kalın terimler ve italik tanımlar", "En az 70 kelime"],
        objectivesEn: ["Arial 12 pt text", "Bold terms with italic definitions", "At least 70 words"],
        instructionsTr: [
          "1. 3 bilişim terimini açıklayan bir sözlük sayfası oluşturun.",
          "2. Arial 12 pt kullanın.",
          "3. Terim adlarını kalın, yabancı karşılıklarını italik yapın.",
          "4. Kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Create a glossary page defining 3 IT terms.",
          "2. Use Arial 12 pt.",
          "3. Bold term titles and italicize foreign equivalents.",
          "4. Save and submit."
        ],
        rubric: [
          {
            id: "w2a3-r1",
            category: "font",
            titleTr: "Arial Yazı Tipi",
            titleEn: "Arial Font",
            points: 40,
            expectedDescriptionTr: "Yazı tipi Arial olmalıdır.",
            expectedDescriptionEn: "Font must be Arial.",
            checkFn: "check_font_family",
            params: { fontName: "Arial" }
          },
          {
            id: "w2a3-r2",
            category: "font",
            titleTr: "Kalın ve İtalik Vurgular",
            titleEn: "Bold & Italic Emphases",
            points: 60,
            expectedDescriptionTr: "Kalın ve italik stiller uygulanmalıdır.",
            expectedDescriptionEn: "Bold and italic styles must be present.",
            checkFn: "check_text_formatting",
            params: { bold: true, italic: true }
          }
        ],
        referenceDocName: "Hafta2_Odev3_Ornek.docx"
      },
      {
        id: "w2-a4",
        weekNumber: 2,
        assignmentNumber: 4,
        titleTr: "Ödev 2.4: Bütünleşik Tipografi Değerlendirmesi",
        titleEn: "Assignment 2.4: Integrated Typography Assessment",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Times New Roman 12 pt", "Tüm karakter vurguları (kalın, italik, altı çizili)", "En az 90 kelime"],
        objectivesEn: ["Times New Roman 12 pt", "All character emphasis styles", "At least 90 words"],
        instructionsTr: [
          "1. Bilişim teknolojilerinin tarihçesi hakkında 90 kelimelik bir metin hazırlayın.",
          "2. Times New Roman 12 pt kullanın.",
          "3. Kalın, italik ve altı çizili biçimleri yerinde kullanın.",
          "4. Yükleyip otomatik değerlendirme alın."
        ],
        instructionsEn: [
          "1. Write a 90-word text on IT history.",
          "2. Use Times New Roman 12 pt.",
          "3. Purposefully apply bold, italic, and underline.",
          "4. Upload and receive automated assessment."
        ],
        rubric: [
          {
            id: "w2a4-r1",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 40,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w2a4-r2",
            category: "font",
            titleTr: "Karakter Biçimlendirmeleri",
            titleEn: "Character Formatting",
            points: 30,
            expectedDescriptionTr: "Kalın, italik ve altı çizili stiller bulunmalıdır.",
            expectedDescriptionEn: "Bold, italic, and underline styles required.",
            checkFn: "check_text_formatting",
            params: { bold: true, italic: true, underline: true }
          },
          {
            id: "w2a4-r3",
            category: "elements",
            titleTr: "Metin Uzunluğu (90 Kelime)",
            titleEn: "Length (90 Words)",
            points: 30,
            expectedDescriptionTr: "En az 90 kelime içermelidir.",
            expectedDescriptionEn: "Must contain at least 90 words.",
            checkFn: "check_minimum_words",
            params: { minWords: 90 }
          }
        ],
        referenceDocName: "Hafta2_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w2-q1",
        questionTr: "Word'de seçili metni KALIN (Bold) yapmak için hangi Türkçe ve İngilizce kısayol tuşları kullanılır?",
        questionEn: "Which shortcuts toggle Bold formatting in Turkish and English Word versions?",
        options: [
          { id: "o1", textTr: "Ctrl+K (TR) / Ctrl+B (EN)", textEn: "Ctrl+K (TR) / Ctrl+B (EN)" },
          { id: "o2", textTr: "Ctrl+T (TR) / Ctrl+I (EN)", textEn: "Ctrl+T (TR) / Ctrl+I (EN)" },
          { id: "o3", textTr: "Ctrl+A (TR) / Ctrl+U (EN)", textEn: "Ctrl+A (TR) / Ctrl+U (EN)" },
          { id: "o4", textTr: "Ctrl+Shift+B", textEn: "Ctrl+Shift+B" }
        ],
        correctOptionId: "o1",
        explanationTr: "Türkçe Word sürümünde Kalın için Ctrl+K, İngilizce sürümünde Ctrl+B kullanılır.",
        explanationEn: "In Turkish Word Ctrl+K is Bold; in English Word Ctrl+B is used."
      }
    ],
    summaryTr: "2. Haftayı tamamladınız! Karakter biçimlendirme, yazı tipi hiyerarşisi ve vurgu araçlarını öğrendiniz. 3. Haftada paragrafları hizalama, satır ve paragraf aralıklarını yapılandıracağız.",
    summaryEn: "Week 2 complete! You mastered character styling and typography. In Week 3, we move to paragraph formatting, spacing, and indents."
  },

  // ==========================================
  // HAFTA 3
  // ==========================================
  {
    weekNumber: 3,
    titleTr: "Paragraf Biçimlendirme ve Hizalama",
    titleEn: "Paragraph Formatting and Alignment",
    taglineTr: "Hizalama, girintiler, paragraf ve satır aralıkları, madde işaretleri",
    taglineEn: "Alignment, indents, paragraph and line spacing, bullet lists",
    introductionTr: "Paragraf biçimlendirme, belgenin blok yapısını ve akışını belirler. İki yana yaslama (Justify), 1.5 satır aralığı, ilk satır girintisi (1.25 cm) ve madde işaretleri üniversite raporlarında en sık aranan biçimsel şartlardır.",
    introductionEn: "Paragraph formatting governs the structural rhythm and layout of your text blocks. Justified alignment, 1.5 line spacing, 1.25 cm first-line indentation, and bullets are core requirements in academic writing.",
    prerequisitesTr: ["Karakter biçimlendirme ve metin seçme yöntemleri"],
    prerequisitesEn: ["Character formatting and selection skills"],
    objectives: [
      { id: "w3-obj1", textTr: "Paragraf hizalama türlerini (Sola, Ortala, Sağa, İki Yana Yasla) amacına uygun uygulayabilme", textEn: "Apply paragraph alignments (Left, Center, Right, Justify) appropriately" },
      { id: "w3-obj2", textTr: "Satır aralığını (1.0, 1.15, 1.5, 2.0) ve paragraf öncesi/sonrası boşlukları ayarlayabilme", textEn: "Configure line spacing (1.0, 1.15, 1.5, 2.0) and paragraph before/after spacing" },
      { id: "w3-obj3", textTr: "İlk satır girintisini (First line indent - 1.25 cm) Cetvel veya Paragraf İletişim Kutusu ile verebilme", textEn: "Apply first-line indent (1.25 cm) using Ruler or Paragraph Dialog" },
      { id: "w3-obj4", textTr: "Madde işaretleri ve çok düzeyli numaralandırma listeleri oluşturabilme", textEn: "Create bulleted and multi-level numbered lists" }
    ],
    videos: [
      {
        id: "w3-v1",
        titleTr: "Paragraf Ayarları, Satır Aralığı ve Girintiler",
        titleEn: "Paragraph Settings, Line Spacing and Indents",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "V_B2fS8F0uU",
        isVerified: true,
        duration: "13:25",
        notesTr: "İki yana yaslama, 1.5 satır aralığı ve ilk satır girintisi detayları.",
        notesEn: "Covers justify alignment, 1.5 spacing, and first-line indentation."
      }
    ],
    writtenGuides: [
      {
        id: "w3-g1",
        headingTr: "Akademik Paragraf Standartları",
        headingEn: "Academic Paragraph Standards",
        sections: [
          {
            subheadingTr: "1. İki Yana Yaslama (Justify)",
            subheadingEn: "1. Justified Alignment",
            contentTr: "Resmi ve akademik raporlarda gövde metinleri her iki kenardan düzgün bir hizaya sahip olmalıdır. Bunun için Giriş > Paragraf > İki Yana Yasla düğmesine tıklanır (Klavye kısayolu: TR sürümde Ctrl+D, EN sürümde Ctrl+J).",
            contentEn: "Academic reports require clean margins on both sides. Click Justify in Home > Paragraph (Shortcut: Ctrl+D in TR, Ctrl+J in EN).",
            keyboardShortcut: "İki Yana Yasla: Ctrl+D (TR) / Ctrl+J (EN)"
          },
          {
            subheadingTr: "2. Satır Aralığı ve Paragraf Boşlukları",
            subheadingEn: "2. Line Spacing and Paragraph Spacing",
            contentTr: "Paragraflar arasında fazladan boş Enter tuşuna basmak biçimlendirme hatasıdır! Bunun yerine Paragraf İletişim Kutusundan 'Sonra: 6 nk veya 8 nk' boşluk tanımlanmalı ve Satır Aralığı '1.5 Satır' seçilmelidir.",
            contentEn: "Never press Enter twice to create paragraph spacing! Instead, configure 'Spacing After: 6 pt / 8 pt' in the Paragraph dialog and choose 1.5 Line Spacing.",
            ribbonPathTr: "Giriş > Paragraf > Satır ve Paragraf Aralığı",
            ribbonPathEn: "Home > Paragraph > Line and Paragraph Spacing"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w3-act1",
        type: "find_mistake",
        titleTr: "Biçimlendirme Hatasını Bulma",
        titleEn: "Identify Formatting Mistake",
        descriptionTr: "Bir öğrenci paragraflar arasında boşluk bırakmak için her paragraf bitiminde iki kez Enter tuşuna basmıştır. Bu durum neden yanlıştır?",
        descriptionEn: "A student hits Enter twice after each paragraph for spacing. Why is this bad practice?",
        hintTr: "Yazı boyutu veya sayfa düzeni değiştiğinde ne olacağını düşünün.",
        hintEn: "Consider what happens if font size or margins change later.",
        explanationTr: "Boş Enter basmak sayfa düzenini bozar. Standart yöntem 'Paragraf Sonrası Boşluk (Spacing After)' ayarı yapmaktır.",
        explanationEn: "Blank Enter lines cause erratic page breaks. Paragraph After Spacing should always be used instead.",
        options: [
          { id: "o1", textTr: "Word belgesinin dosya boyutunu megabaytlarca artırır.", textEn: "Increases file size excessively.", isCorrect: false },
          { id: "o2", textTr: "Sayfa sonlarında ve yazı tipi değiştiğinde sayfa düzeninde istenmeyen kaymalara yol açar.", textEn: "Causes unintended page reflows when font or layout changes.", isCorrect: true, feedbackTr: "Kesinlikle doğru! Profesyonel belgelerde daima Paragraf Sonrası Boşluk (nk) kullanılır." },
          { id: "o3", textTr: "Word'ün çökmesine neden olur.", textEn: "Crashes Microsoft Word.", isCorrect: false },
          { id: "o4", textTr: "Yazım denetimini tamamen devre dışı bırakır.", textEn: "Disables spell checker.", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "İlk Satır Girintisi ile Sol Girinti arasındaki fark nedir?",
      "Neden akademik tezlerde satır aralığı genellikle 1.5 veya 2.0 (Çift) olarak istenir?"
    ],
    preparationQuestionsEn: [
      "What is the difference between First Line Indent and Left Indent?",
      "Why do thesis guidelines prescribe 1.5 or double line spacing?"
    ],
    assignments: [
      {
        id: "w3-a1",
        weekNumber: 3,
        assignmentNumber: 1,
        titleTr: "Ödev 3.1: İki Yana Yaslı ve 1.5 Satır Aralıklı Metin",
        titleEn: "Assignment 3.1: Justified Alignment & 1.5 Line Spacing",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama (Justify)", "1.5 satır aralığı uygulama"],
        objectivesEn: ["Times New Roman 12 pt", "Justify alignment", "1.5 line spacing"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. İki paragraftan oluşan bir metin yazın (Times New Roman, 12 pt).",
          "3. Paragrafları 'İki Yana Yasla' (Justify) olarak ayarlayın.",
          "4. Satır aralığını '1.5 Satır' olarak belirleyin.",
          "5. Kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Create a Word document.",
          "2. Write two paragraphs in Times New Roman 12 pt.",
          "3. Set alignment to Justify.",
          "4. Apply 1.5 line spacing.",
          "5. Save and submit."
        ],
        rubric: [
          {
            id: "w3a1-r1",
            category: "font",
            titleTr: "Yazı Tipi & Boyut (TNR 12 pt)",
            titleEn: "Font & Size (TNR 12 pt)",
            points: 30,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          },
          {
            id: "w3a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama (Justify)",
            titleEn: "Justify Alignment",
            points: 35,
            expectedDescriptionTr: "Paragraflar iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Paragraphs must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w3a1-r3",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 35,
            expectedDescriptionTr: "Satır aralığı 1.5 olmalıdır.",
            expectedDescriptionEn: "Line spacing must be 1.5.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340, targetDesc: "1.5 Satır Aralığı" }
          }
        ],
        referenceDocName: "Hafta3_Odev1_Ornek.docx"
      },
      {
        id: "w3-a2",
        weekNumber: 3,
        assignmentNumber: 2,
        titleTr: "Ödev 3.2: İlk Satır Girintili Akademik Paragraf",
        titleEn: "Assignment 3.2: First-Line Indented Academic Paragraph",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["İlk satır girintisi (1.25 cm)", "İki yana yaslama", "Times New Roman 12 pt"],
        objectivesEn: ["First-line indent (1.25 cm)", "Justified text", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. 2 paragraflık bir akademik metin hazırlayın.",
          "2. Paragrafların ilk satırına 1.25 cm girinti verin.",
          "3. Paragrafları iki yana yaslayın.",
          "4. Kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a 2-paragraph academic text.",
          "2. Apply a 1.25 cm first-line indent.",
          "3. Justify paragraphs.",
          "4. Save and submit."
        ],
        rubric: [
          {
            id: "w3a2-r1",
            category: "paragraph",
            titleTr: "İlk Satır Girintisi",
            titleEn: "First Line Indent",
            points: 50,
            expectedDescriptionTr: "İlk satır girintisi uygulanmalıdır.",
            expectedDescriptionEn: "First-line indent must be applied.",
            checkFn: "check_first_line_indent"
          },
          {
            id: "w3a2-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta3_Odev2_Ornek.docx"
      },
      {
        id: "w3-a3",
        weekNumber: 3,
        assignmentNumber: 3,
        titleTr: "Ödev 3.3: Ortalı Başlık ve İki Yana Yaslı Gövde",
        titleEn: "Assignment 3.3: Centered Header & Justified Body",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Ortalanmış başlık", "İki yana yaslı gövde", "1.5 satır aralığı"],
        objectivesEn: ["Centered title", "Justified body", "1.5 line spacing"],
        instructionsTr: [
          "1. Başlığı ortalayın.",
          "2. Gövde paragraflarını iki yana yaslayıp 1.5 satır aralığı uygulayın.",
          "3. Belgenizi DOCX olarak kaydedip gönderin."
        ],
        instructionsEn: [
          "1. Center the title.",
          "2. Justify body paragraphs with 1.5 line spacing.",
          "3. Save and upload as DOCX."
        ],
        rubric: [
          {
            id: "w3a3-r1",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justified Text",
            points: 50,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w3a3-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "Satır aralığı 1.5 olmalıdır.",
            expectedDescriptionEn: "Line spacing must be 1.5.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta3_Odev3_Ornek.docx"
      },
      {
        id: "w3-a4",
        weekNumber: 3,
        assignmentNumber: 4,
        titleTr: "Ödev 3.4: Eksiksiz Paragraf Düzeni Uygulaması",
        titleEn: "Assignment 3.4: Complete Paragraph Layout Practice",
        difficulty: "advanced",
        estimatedMinutes: 30,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı", "İlk satır girintisi"],
        objectivesEn: ["Times New Roman 12 pt", "Justified text", "1.5 line spacing", "First-line indent"],
        instructionsTr: [
          "1. 100 kelimelik bir deneme yazısı oluşturun.",
          "2. Times New Roman 12 pt seçin.",
          "3. Paragrafları iki yana yaslayın, 1.5 satır aralığı verin ve ilk satır girintisi ekleyin.",
          "4. Belgenizi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Write a 100-word essay.",
          "2. Set Times New Roman 12 pt.",
          "3. Justify paragraphs, apply 1.5 spacing, and add first-line indent.",
          "4. Save and upload."
        ],
        rubric: [
          {
            id: "w3a4-r1",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 25,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          },
          {
            id: "w3a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 25,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w3a4-r3",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 25,
            expectedDescriptionTr: "Satır aralığı 1.5 olmalıdır.",
            expectedDescriptionEn: "Line spacing must be 1.5.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          },
          {
            id: "w3a4-r4",
            category: "paragraph",
            titleTr: "İlk Satır Girintisi",
            titleEn: "First Line Indent",
            points: 25,
            expectedDescriptionTr: "İlk satır girintisi uygulanmalıdır.",
            expectedDescriptionEn: "First-line indent must be applied.",
            checkFn: "check_first_line_indent"
          }
        ],
        referenceDocName: "Hafta3_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w3-q1",
        questionTr: "Paragrafların hem sağ hem de sol kenar boşluklarına eşit şekilde hizalanmasını sağlayan komut hangisidir?",
        questionEn: "Which command aligns paragraphs evenly along both left and right margins?",
        options: [
          { id: "o1", textTr: "Ortala (Center)", textEn: "Center" },
          { id: "o2", textTr: "İki Yana Yasla (Justify)", textEn: "Justify" },
          { id: "o3", textTr: "Sola Hizala (Left)", textEn: "Left Align" },
          { id: "o4", textTr: "Girintiyi Artır", textEn: "Increase Indent" }
        ],
        correctOptionId: "o2",
        explanationTr: "İki Yana Yasla (Justify), satırlar arasındaki boşlukları mikro düzeyde ayarlayarak sağ ve sol kenarları hizalar.",
        explanationEn: "Justify adjusts spacing between words to create straight edges on both margins."
      }
    ],
    summaryTr: "3. Hafta tamamlandı! Paragraf hizalama kurallarını, satır aralıklarını ve girinti mekanizmalarını öğrendiniz. 4. Haftada sayfa kenar boşlukları, yönlendirme ve sayfa sonlarını işleyeceğiz.",
    summaryEn: "Week 3 complete! You learned paragraph alignment, line spacing, and indents. In Week 4, we examine page margins, orientation, and breaks."
  },

  // ==========================================
  // HAFTA 4
  // ==========================================
  {
    weekNumber: 4,
    titleTr: "Sayfa Düzeni ve Bölüm Yapısı",
    titleEn: "Page Layout and Section Structure",
    taglineTr: "Kenar boşlukları, yönlendirme, kağıt boyutu, sayfa sonları, sütunlar",
    taglineEn: "Margins, orientation, paper size, page breaks, columns",
    introductionTr: "Bir belgenin fiziki veya dijital sunumunda sayfa kenar boşlukları (Standart 2.5 cm / Normal), sayfa yönlendirmesi (Dikey / Yatay), A4 kağıt boyutu seçimi ve metinleri çoklu sütunlara (gazete/makale formatı) bölme becerisi hayati önem taşır.",
    introductionEn: "Page setup dictates the physical and digital canvas of your document. Standard 2.5 cm margins, orientation (Portrait/Landscape), A4 paper size, and multi-column formatting are essential design capabilities.",
    prerequisitesTr: ["Giriş ve Paragraf biçimlendirme araçları"],
    prerequisitesEn: ["Familiarity with character and paragraph formatting"],
    objectives: [
      { id: "w4-obj1", textTr: "Sayfa kenar boşluklarını (Normal, Dar, Özel) standartlara göre yapılandırabilme", textEn: "Configure page margins (Normal, Narrow, Custom)" },
      { id: "w4-obj2", textTr: "Sayfa yönlendirmesini (Dikey ve Yatay) değiştirebilme", textEn: "Switch page orientation between Portrait and Landscape" },
      { id: "w4-obj3", textTr: "Sayfa sonu (Ctrl+Enter) ve Bölüm Sonu (Section Break) farkını kavrayabilme", textEn: "Understand difference between Page Break (Ctrl+Enter) and Section Breaks" },
      { id: "w4-obj4", textTr: "Metni 2 veya 3 sütuna bölebilme ve sütun sonu ekleyebilme", textEn: "Format text into 2 or 3 columns with column breaks" }
    ],
    videos: [
      {
        id: "w4-v1",
        titleTr: "Sayfa Düzeni, Kenar Boşlukları ve Sütunlar",
        titleEn: "Page Layout, Margins and Columns",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "rV3q5L8V6iQ",
        isVerified: true,
        duration: "11:50",
        notesTr: "Düzen sekmesindeki Kenar Boşlukları, Yönlendirme ve Sütunlar menüleri.",
        notesEn: "Walkthrough of Layout tab margin, orientation, and column tools."
      }
    ],
    writtenGuides: [
      {
        id: "w4-g1",
        headingTr: "Sayfa Yapılandırması",
        headingEn: "Page Setup Guidelines",
        sections: [
          {
            subheadingTr: "1. Kenar Boşlukları ve Yönlendirme",
            subheadingEn: "1. Margins and Orientation",
            contentTr: "Türkiye'deki üniversitelerde ve resmi yazışmalarda standart kenar boşluğu her yönden 2.5 cm (veya Üst/Alt: 2.5 cm, Sol: 3 cm, Sağ: 2 cm) olarak belirlenir. Düzen sekmesinden 'Kenar Boşlukları > Normal' seçilerek kolayca uygulanabilir.",
            contentEn: "Standard academic margins require 2.5 cm on all sides. Select Layout > Margins > Normal to apply.",
            ribbonPathTr: "Düzen > Sayfa Yapısı > Kenar Boşlukları / Yönlendirme",
            ribbonPathEn: "Layout > Page Setup > Margins / Orientation"
          },
          {
            subheadingTr: "2. Sayfa Sonu (Ctrl+Enter)",
            subheadingEn: "2. Page Break (Ctrl+Enter)",
            contentTr: "Yeni bir sayfaya geçmek için arka arkaya boş Enter basmak büyük bir hatadır! Yeni bir bölüme başlamak istediğinizde klavyeden Ctrl+Enter tuşuna basarak anında temiz bir sayfa sonu eklemelisiniz.",
            contentEn: "Never press Enter repeatedly to force a new page. Use Ctrl+Enter to insert an instant, clean Page Break.",
            keyboardShortcut: "Sayfa Sonu Ekle: Ctrl+Enter"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w4-act1",
        type: "identify_command",
        titleTr: "Yatay Sayfa Ekleme Yöntemi",
        titleEn: "Inserting a Landscape Page",
        descriptionTr: "Dikey sayfalarla başlayan bir belgede yalnızca bir tablonun bulunduğu 5. sayfayı YATAY yapmak için hangi işlem yapılmalıdır?",
        descriptionEn: "To make only page 5 Landscape in a portrait document, what must you insert?",
        hintTr: "Sayfa sonu yeterli midir, yoksa farklı bölüm mü gerekir?",
        hintEn: "Is a simple page break sufficient, or is a section break required?",
        explanationTr: "Farklı sayfa yönlendirmesi veya farklı kenar boşluğu uygulamak için 'Bölüm Sonu (Sonraki Sayfa)' eklenmelidir.",
        explanationEn: "To change orientation for a single page, you must insert a Section Break (Next Page).",
        options: [
          { id: "o1", textTr: "Sayfa Sonu (Ctrl+Enter)", textEn: "Page Break (Ctrl+Enter)", isCorrect: false },
          { id: "o2", textTr: "Bölüm Sonu: Sonraki Sayfa (Section Break: Next Page)", textEn: "Section Break: Next Page", isCorrect: true, feedbackTr: "Harika! Bölüm sonları sayfa yönünü bağımsız değiştirmeyi sağlar." },
          { id: "o3", textTr: "Metin Kaydırma Sonu", textEn: "Text Wrapping Break", isCorrect: false },
          { id: "o4", textTr: "Tabloyu 90 derece döndürmek", textEn: "Rotate table 90 degrees", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Sayfa Sonu ile Bölüm Sonu arasındaki teknik fark nedir?",
      "Geniş tabloları belgelerde sunarken yatay sayfa düzeni neden tercih edilir?"
    ],
    preparationQuestionsEn: [
      "What is the technical difference between a Page Break and a Section Break?",
      "Why is landscape orientation preferred for wide multi-column tables?"
    ],
    assignments: [
      {
        id: "w4-a1",
        weekNumber: 4,
        assignmentNumber: 1,
        titleTr: "Ödev 4.1: Standart Kenar Boşlukları ve İki Yana Yaslama",
        titleEn: "Assignment 4.1: Standard Margins & Justified Body",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Standart kenar boşlukları (2.5 cm)", "İki yana yaslama", "Times New Roman 12 pt"],
        objectivesEn: ["Standard 2.5 cm margins", "Justified text", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. Düzen sekmesinden Kenar Boşluklarını 'Normal' (2.5 cm) olarak ayarlayın.",
          "3. 2 paragraf metin yazıp iki yana yaslayın.",
          "4. Dosyayı sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Create a Word document.",
          "2. Set Margins to Normal (2.5 cm).",
          "3. Write 2 paragraphs and justify them.",
          "4. Upload the document."
        ],
        rubric: [
          {
            id: "w4a1-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları (Normal 2.5 cm)",
            titleEn: "Margins (Normal 2.5 cm)",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal (2.5 cm) olmalıdır.",
            expectedDescriptionEn: "Margins must be Normal (2.5 cm).",
            checkFn: "check_page_margins"
          },
          {
            id: "w4a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Paragraflar iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Paragraphs must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta4_Odev1_Ornek.docx"
      },
      {
        id: "w4-a2",
        weekNumber: 4,
        assignmentNumber: 2,
        titleTr: "Ödev 4.2: Yatay (Landscape) Sayfa Yönlendirmesi",
        titleEn: "Assignment 4.2: Landscape Page Orientation",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        objectivesTr: ["Yatay sayfa yönlendirmesi", "Times New Roman 12 pt", "İki yana yaslama"],
        objectivesEn: ["Landscape page orientation", "Times New Roman 12 pt", "Justified text"],
        instructionsTr: [
          "1. Sayfa yönlendirmesini 'Yatay' (Landscape) yapın.",
          "2. Yatay sayfaya uygun geniş bir paragraf yazın.",
          "3. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Change orientation to Landscape.",
          "2. Write a broad paragraph suitable for landscape width.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w4a2-r1",
            category: "layout",
            titleTr: "Yatay Yönlendirme (Landscape)",
            titleEn: "Landscape Orientation",
            points: 60,
            expectedDescriptionTr: "Sayfa yönlendirmesi Yatay olmalıdır.",
            expectedDescriptionEn: "Orientation must be Landscape.",
            checkFn: "check_orientation",
            params: { orientation: "landscape" }
          },
          {
            id: "w4a2-r2",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 40,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          }
        ],
        referenceDocName: "Hafta4_Odev2_Ornek.docx"
      },
      {
        id: "w4-a3",
        weekNumber: 4,
        assignmentNumber: 3,
        titleTr: "Ödev 4.3: Kenar Boşlukları ve 1.5 Satır Aralığı",
        titleEn: "Assignment 4.3: Margins & 1.5 Line Spacing",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Normal kenar boşlukları", "1.5 satır aralığı", "İki yana yaslama"],
        objectivesEn: ["Normal margins", "1.5 line spacing", "Justified alignment"],
        instructionsTr: [
          "1. Sayfa kenar boşluklarını Normal yapın.",
          "2. Metne 1.5 satır aralığı verin ve iki yana yaslayın.",
          "3. Belgenizi DOCX olarak gönderin."
        ],
        instructionsEn: [
          "1. Set margins to Normal.",
          "2. Apply 1.5 line spacing and justify text.",
          "3. Submit as DOCX."
        ],
        rubric: [
          {
            id: "w4a3-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Margins must be normal.",
            checkFn: "check_page_margins"
          },
          {
            id: "w4a3-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "1.5 satır aralığı uygulanmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta4_Odev3_Ornek.docx"
      },
      {
        id: "w4-a4",
        weekNumber: 4,
        assignmentNumber: 4,
        titleTr: "Ödev 4.4: Bütünleşik Sayfa Düzeni ve Biçimlendirme",
        titleEn: "Assignment 4.4: Integrated Page Layout Practice",
        difficulty: "advanced",
        estimatedMinutes: 30,
        objectivesTr: ["Normal kenar boşlukları", "Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı"],
        objectivesEn: ["Normal margins", "Times New Roman 12 pt", "Justified text", "1.5 line spacing"],
        instructionsTr: [
          "1. 80 kelimelik bir akademik özet metni hazırlayın.",
          "2. Kenar boşlukları Normal, yazı tipi Times New Roman 12 pt, hizalama İki Yana Yasla ve satır aralığı 1.5 olsun.",
          "3. Belgenizi yükleyip tam değerlendirme raporunu inceleyin."
        ],
        instructionsEn: [
          "1. Write an 80-word academic abstract.",
          "2. Normal margins, Times New Roman 12 pt, Justified, 1.5 line spacing.",
          "3. Upload and inspect the assessment report."
        ],
        rubric: [
          {
            id: "w4a4-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 30,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Margins must be normal.",
            checkFn: "check_page_margins"
          },
          {
            id: "w4a4-r2",
            category: "font",
            titleTr: "Times New Roman 12 pt",
            titleEn: "Times New Roman 12 pt",
            points: 30,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w4a4-r3",
            category: "paragraph",
            titleTr: "İki Yana Yaslama & 1.5 Aralık",
            titleEn: "Justify & 1.5 Spacing",
            points: 40,
            expectedDescriptionTr: "İki yana yaslama ve 1.5 satır aralığı uygulanmalıdır.",
            expectedDescriptionEn: "Justify and 1.5 line spacing required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta4_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w4-q1",
        questionTr: "Klavyeden Ctrl + Enter tuşlarına basıldığında Word belgesine ne eklenir?",
        questionEn: "What is inserted into a Word document when pressing Ctrl + Enter?",
        options: [
          { id: "o1", textTr: "Sayfa Sonu (Page Break)", textEn: "Page Break" },
          { id: "o2", textTr: "Sütun Sonu (Column Break)", textEn: "Column Break" },
          { id: "o3", textTr: "Paragraf Girintisi", textEn: "Paragraph Indent" },
          { id: "o4", textTr: "Tablo Satırı", textEn: "Table Row" }
        ],
        correctOptionId: "o1",
        explanationTr: "Ctrl + Enter kısayolu anında yeni bir sayfaya geçilmesini sağlayan Sayfa Sonu ekler.",
        explanationEn: "Ctrl + Enter instantly inserts a Page Break."
      }
    ],
    summaryTr: "4. Haftayı tamamladınız! Kenar boşlukları, yönlendirme ve sayfa sonlarını başarıyla kavradınız. 5. Haftada tablolar oluşturacak, kenarlıkları ve hücre gölgelendirmelerini biçimlendireceğiz.",
    summaryEn: "Week 4 complete! You mastered margins, orientation, and breaks. In Week 5, we tackle table creation, borders, and shading."
  },

  // ==========================================
  // HAFTA 5
  // ==========================================
  {
    weekNumber: 5,
    titleTr: "Tablolar ve Veri Organizasyonu",
    titleEn: "Tables and Data Organization",
    taglineTr: "Tablo oluşturma, hücre birleştirme, kenarlıklar, gölgelendirme, hizalama",
    taglineEn: "Table creation, cell merging, borders, shading, table alignment",
    introductionTr: "Bilimsel verileri, karşılaştırmaları ve araştırma bulgularını yapılandırılmış şekilde sunmanın en etkili yolu tablolardır. Bu haftada tablo ekleme, satır/sütun ekleme/silme, hücre birleştirme (Merge Cells), kenarlık stilleri ve başlık satırı gölgelendirmesi konularını inceleyeceğiz.",
    introductionEn: "Tables are the primary vehicle for presenting research findings, structured data, and comparisons. This week covers table creation, row/column operations, merging cells, border customization, and header shading.",
    prerequisitesTr: ["Temel metin ve paragraf biçimlendirme becerileri"],
    prerequisitesEn: ["Basic text and paragraph formatting skills"],
    objectives: [
      { id: "w5-obj1", textTr: "İstenen satır ve sütun sayısına sahip tablolar oluşturabilme", textEn: "Create tables with specified row and column counts" },
      { id: "w5-obj2", textTr: "Hücreleri birleştirme (Merge Cells) ve bölme (Split Cells) işlemlerini yapabilme", textEn: "Merge and split table cells" },
      { id: "w5-obj3", textTr: "Tablo Tasarımı sekmesinden kenarlıkları (Borders) ve gölgelendirmeyi (Shading) özelleştirebilme", textEn: "Customize table borders and cell shading via Table Design tab" },
      { id: "w5-obj4", textTr: "Hücre içi metin hizalamasını (Dikey ve Yatay ortalama) düzenleyebilme", textEn: "Configure cell text alignment vertically and horizontally" }
    ],
    videos: [
      {
        id: "w5-v1",
        titleTr: "Word'de Tablo Oluşturma ve Profesyonel Biçimlendirme",
        titleEn: "Word Table Creation and Professional Styling",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "vB6q7N_mY8c",
        isVerified: true,
        duration: "15:30",
        notesTr: "Tablo Tasarımı ve Tablo Düzeni bağlamsal sekmelerinin kullanımı.",
        notesEn: "Using Table Design and Table Layout contextual tabs."
      }
    ],
    writtenGuides: [
      {
        id: "w5-g1",
        headingTr: "Tablo Standartları ve APA Formatı",
        headingEn: "Table Standards and APA Format",
        sections: [
          {
            subheadingTr: "1. Tablo Oluşturma ve Bağlamsal Sekmeler",
            subheadingEn: "1. Table Creation & Contextual Tabs",
            contentTr: "Tablo eklendiğinde Şerit menüde iki yeni bağlamsal sekme belirir: 'Tablo Tasarımı' (renkler, kenarlıklar, gölgelendirme) ve 'Düzen' (satır/sütun ekleme, silme, hücre birleştirme, hücre boyutları).",
            contentEn: "Inserting a table reveals two contextual tabs: Table Design (borders, shading, styles) and Layout (rows, columns, merge, dimensions).",
            ribbonPathTr: "Ekle > Tablo > Tablo Ekle...",
            ribbonPathEn: "Insert > Table > Insert Table..."
          },
          {
            subheadingTr: "2. Akademik Tablo Kenarlıkları",
            subheadingEn: "2. Academic Table Borders",
            contentTr: "Akademik yayınlarda (APA stili) genellikle dikey kenarlıklar kullanılmaz; yalnızca tablonun üstünde, başlık satırının altında ve tablonun en altında yatay kenarlıklar bulunur.",
            contentEn: "Academic tables (APA style) avoid vertical borders, relying on horizontal lines at the top, below header, and at the bottom.",
            ribbonPathTr: "Tablo Tasarımı > Kenarlıklar",
            ribbonPathEn: "Table Design > Borders"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w5-act1",
        type: "identify_command",
        titleTr: "Hücre Birleştirme Komutu",
        titleEn: "Cell Merge Command",
        descriptionTr: "Tabloda seçilen birden fazla hücreyi tek bir geniş hücreye dönüştürmek için hangi komut kullanılır?",
        descriptionEn: "Which command combines multiple selected cells into a single larger cell?",
        hintTr: "Tablo Düzeni sekmesindeki Birleştir grubuna bakın.",
        hintEn: "Look under the Merge group on the Table Layout tab.",
        explanationTr: "Hücreleri Birleştir (Merge Cells), seçili hücreleri tek bir hücre haline getirir.",
        explanationEn: "Merge Cells combines selected adjacent cells into one.",
        options: [
          { id: "o1", textTr: "Hücreleri Böl (Split Cells)", textEn: "Split Cells", isCorrect: false },
          { id: "o2", textTr: "Hücreleri Birleştir (Merge Cells)", textEn: "Merge Cells", isCorrect: true, feedbackTr: "Doğru! Başlık satırlarında sıklıkla hücre birleştirme yapılır." },
          { id: "o3", textTr: "Tabloyu Böl (Split Table)", textEn: "Split Table", isCorrect: false },
          { id: "o4", textTr: "Otomatik Sığdır", textEn: "AutoFit", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Neden akademik tezlerde karmaşık renkli ızgaralar yerine sade kenarlıklı tablolar tercih edilir?",
      "Tablo başlık satırının sonraki sayfalarda otomatik yinelenmesi nasıl sağlanır?"
    ],
    preparationQuestionsEn: [
      "Why do academic style guides favor minimal borders over heavy colored grids?",
      "How do you configure table header rows to repeat across page breaks?"
    ],
    assignments: [
      {
        id: "w5-a1",
        weekNumber: 5,
        assignmentNumber: 1,
        titleTr: "Ödev 5.1: Veri Tablosu Oluşturma ve Kenarlıklar",
        titleEn: "Assignment 5.1: Data Table Creation & Borders",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["En az 3 satır x 3 sütun tablo oluşturma", "Kenarlıklar ve gölgelendirme uygulama", "Tablo başlığı ekleme"],
        objectivesEn: ["Create 3x3 table", "Apply borders and shading", "Add table title"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. 3 satır ve 3 sütundan oluşan bir tablo ekleyin.",
          "3. Tablonun ilk satırına (başlık satırı) arka plan gölgelendirmesi (shading) verin.",
          "4. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Open a new document.",
          "2. Insert a 3-row by 3-column table.",
          "3. Apply background shading to the header row.",
          "4. Upload the file."
        ],
        rubric: [
          {
            id: "w5a1-r1",
            category: "table",
            titleTr: "Tablo Yapısı (3x3)",
            titleEn: "Table Structure (3x3)",
            points: 50,
            expectedDescriptionTr: "En az 3 satır ve 3 sütunlu tablo bulunmalıdır.",
            expectedDescriptionEn: "Must contain at least a 3x3 table.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          },
          {
            id: "w5a1-r2",
            category: "table",
            titleTr: "Tablo Biçimlendirmesi (Gölgelendirme/Kenarlık)",
            titleEn: "Table Styling (Shading/Borders)",
            points: 50,
            expectedDescriptionTr: "Tabloda kenarlık ve gölgelendirme bulunmalıdır.",
            expectedDescriptionEn: "Table must have borders and shading.",
            checkFn: "check_table_formatting"
          }
        ],
        referenceDocName: "Hafta5_Odev1_Ornek.docx"
      },
      {
        id: "w5-a2",
        weekNumber: 5,
        assignmentNumber: 2,
        titleTr: "Ödev 5.2: 4x4 Haftalık Ders Programı Tablosu",
        titleEn: "Assignment 5.2: 4x4 Weekly Schedule Table",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["4x4 tablo oluşturma", "Başlık gölgelendirmesi", "Times New Roman 12 pt"],
        objectivesEn: ["4x4 table creation", "Header shading", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. 4 satır ve 4 sütunlu bir ders programı tablosu oluşturun.",
          "2. Tablo başlık satırını gölgelendirin.",
          "3. Metinleri Times New Roman 12 pt yapın.",
          "4. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Build a 4x4 schedule table.",
          "2. Add shading to header row.",
          "3. Format text as Times New Roman 12 pt.",
          "4. Save and submit."
        ],
        rubric: [
          {
            id: "w5a2-r1",
            category: "table",
            titleTr: "Tablo Yapısı (4x4)",
            titleEn: "Table Structure (4x4)",
            points: 50,
            expectedDescriptionTr: "En az 4 satır ve 4 sütun olmalıdır.",
            expectedDescriptionEn: "Must have at least 4 rows and 4 columns.",
            checkFn: "check_table_structure",
            params: { minRows: 4, minCols: 4 }
          },
          {
            id: "w5a2-r2",
            category: "table",
            titleTr: "Tablo Biçimlendirmesi",
            titleEn: "Table Styling",
            points: 50,
            expectedDescriptionTr: "Tablo kenarlıkları ve gölgelendirmesi olmalıdır.",
            expectedDescriptionEn: "Borders and shading required.",
            checkFn: "check_table_formatting"
          }
        ],
        referenceDocName: "Hafta5_Odev2_Ornek.docx"
      },
      {
        id: "w5-a3",
        weekNumber: 5,
        assignmentNumber: 3,
        titleTr: "Ödev 5.3: Tablo ve İki Yana Yaslı Açıklama Metni",
        titleEn: "Assignment 5.3: Table with Justified Explanatory Text",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Tablo ekleme", "Tablo öncesi iki yana yaslı açıklama", "1.5 satır aralığı"],
        objectivesEn: ["Insert table", "Justified introductory text", "1.5 line spacing"],
        instructionsTr: [
          "1. Tablodan önce iki yana yaslı 1.5 satır aralıklı bir açıklama paragrafı yazın.",
          "2. Altına 3 satır x 3 sütun biçimlendirilmiş bir veri tablosu ekleyin.",
          "3. Kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Write a justified 1.5 spaced intro paragraph.",
          "2. Insert a 3x3 styled data table below it.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w5a3-r1",
            category: "table",
            titleTr: "Tablo Yapısı",
            titleEn: "Table Structure",
            points: 50,
            expectedDescriptionTr: "En az 3x3 tablo bulunmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          },
          {
            id: "w5a3-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Açıklama metni iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Explanation text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta5_Odev3_Ornek.docx"
      },
      {
        id: "w5-a4",
        weekNumber: 5,
        assignmentNumber: 4,
        titleTr: "Ödev 5.4: Bütünleşik Akademik Rapor ve Veri Tablosu",
        titleEn: "Assignment 5.4: Integrated Report & Data Table",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "3x3 tablo", "Tablo biçimlendirmesi"],
        objectivesEn: ["Times New Roman 12 pt", "Justified body", "3x3 table", "Table styling"],
        instructionsTr: [
          "1. 'Okullarda Teknoloji Kullanım İstatistikleri' başlıklı bir mini rapor yazın.",
          "2. Metni Times New Roman 12 pt ve iki yana yaslı yapın.",
          "3. Raporun içine biçimlendirilmiş 3x3 bir tablo yerleştirin.",
          "4. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Write a mini report on technology usage statistics.",
          "2. Apply Times New Roman 12 pt, justified.",
          "3. Embed a styled 3x3 table.",
          "4. Save and upload."
        ],
        rubric: [
          {
            id: "w5a4-r1",
            category: "table",
            titleTr: "Tablo Yapısı",
            titleEn: "Table Structure",
            points: 40,
            expectedDescriptionTr: "En az 3x3 tablo bulunmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          },
          {
            id: "w5a4-r2",
            category: "table",
            titleTr: "Tablo Gölgelendirmesi",
            titleEn: "Table Shading",
            points: 30,
            expectedDescriptionTr: "Tabloda gölgelendirme/kenarlık olmalıdır.",
            expectedDescriptionEn: "Table must have shading/borders.",
            checkFn: "check_table_formatting"
          },
          {
            id: "w5a4-r3",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 30,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta5_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w5-q1",
        questionTr: "Bir tabloda hücre içindeki metni hem dikey hem de yatay olarak tam ortaya hizalamak için hangi sekme kullanılır?",
        questionEn: "Which tab is used to align text both vertically and horizontally in the center of a table cell?",
        options: [
          { id: "o1", textTr: "Tablo Düzeni (Table Layout) > Hizalama", textEn: "Table Layout > Alignment" },
          { id: "o2", textTr: "Ekle > Şekiller", textEn: "Insert > Shapes" },
          { id: "o3", textTr: "Tasarım > Sayfa Rengi", textEn: "Design > Page Color" },
          { id: "o4", textTr: "Başvurular > Resim Yazısı", textEn: "References > Caption" }
        ],
        correctOptionId: "o1",
        explanationTr: "Tablo seçildiğinde açılan Tablo Düzeni (Layout) sekmesindeki 9'lu Hizalama matrisi, dikey ve yatay hizalamayı sağlar.",
        explanationEn: "The 9-position alignment grid under Table Layout handles both vertical and horizontal cell centering."
      }
    ],
    summaryTr: "5. Haftayı tamamladınız! Tablo oluşturma, hücre manipülasyonu ve kenarlık yönetimini kavradınız. 6. Haftada görseller, metin kaydırma ve çizim araçlarını ele alacağız.",
    summaryEn: "Week 5 complete! You mastered table design and data layout. In Week 6, we explore images, text wrapping, and shapes."
  },

  // ==========================================
  // HAFTA 6
  // ==========================================
  {
    weekNumber: 6,
    titleTr: "Resimler ve Görsel Öğeler",
    titleEn: "Images and Visual Elements",
    taglineTr: "Resim ekleme, metin kaydırma (Wrap Text), şekiller, simgeler, konumlandırma",
    taglineEn: "Pictures, text wrapping, shapes, icons, visual alignment",
    introductionTr: "Görsel materyaller, belgelerin anlaşılırlığını ve estetik etkisini katlar. Ancak Word'de resimlerle çalışırken en çok zorlanılan konu 'Metin Kaydırma' (Wrap Text) modlarıdır (Metinle Aynı Hizada, Kare, Sıkı, Metnin Önüne/Arkasına). Bu hafta resim konumlandırma ve şekilleri öğreneceksiniz.",
    introductionEn: "Visuals enhance comprehension and aesthetics. A critical skill in Word is mastering Text Wrapping options (In Line with Text, Square, Tight, In Front/Behind Text). This week covers image management, shapes, and alignment.",
    prerequisitesTr: ["Temel sayfa düzeni ve paragraf hizalama"],
    prerequisitesEn: ["Basic page layout and paragraph alignment"],
    objectives: [
      { id: "w6-obj1", textTr: "Belgeye yerel diskten veya çevrimiçi kaynaktan resim ekleyebilme", textEn: "Insert pictures from local drive or online sources" },
      { id: "w6-obj2", textTr: "Metin Kaydırma (Wrap Text) seçeneklerini (Kare, Sıkı vb.) amaca uygun ayarlayabilme", textEn: "Configure Text Wrapping options (Square, Tight, etc.) appropriately" },
      { id: "w6-obj3", textTr: "Resimleri kırpma, boyutlandırma ve resim stilleri uygulayabilme", textEn: "Crop, resize, and apply picture styles" },
      { id: "w6-obj4", textTr: "Şekiller ve SmartArt grafikleri ile kavramsal şemalar çizebilme", textEn: "Create diagrams using Shapes and SmartArt graphics" }
    ],
    videos: [
      {
        id: "w6-v1",
        titleTr: "Word'de Resim Ekleme ve Metin Kaydırma (Wrap Text)",
        titleEn: "Inserting Images and Text Wrapping in Word",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "vB6q7N_mY8c",
        isVerified: false,
        notesTr: "Bu konu için özel video içeriği hazırlanmaktadır.",
        notesEn: "Dedicated video is in preparation."
      }
    ],
    writtenGuides: [
      {
        id: "w6-g1",
        headingTr: "Görsel Öğeleri Yönetme",
        headingEn: "Managing Visual Elements",
        sections: [
          {
            subheadingTr: "1. Metin Kaydırma (Wrap Text) Modları",
            subheadingEn: "1. Text Wrapping Modes",
            contentTr: "Eklenen bir resim varsayılan olarak 'Metinle Aynı Hizada' gelir ve bir harf gibi davranır. Resmi serbestçe hareket ettirmek veya metnin resmi çevrelemesini sağlamak için Resim Biçimi > 'Metni Kaydır > Kare' (Square) seçilmelidir.",
            contentEn: "Images default to 'In Line with Text'. To move them freely or allow text to wrap around them, choose Picture Format > Wrap Text > Square.",
            ribbonPathTr: "Resim Biçimi > Yerleştir > Metni Kaydır",
            ribbonPathEn: "Picture Format > Arrange > Wrap Text"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w6-act1",
        type: "identify_command",
        titleTr: "Metin Kaydırma Modu Seçimi",
        titleEn: "Select Text Wrapping Mode",
        descriptionTr: "Bir resmin metin paragrafının ortasında yer alıp metnin resmin çevresinden düzgün bir dikdörtgen şeklinde akması için hangi mod seçilmelidir?",
        descriptionEn: "To have text wrap around an image in a neat rectangular boundary, which mode is used?",
        hintTr: "Dört kenarlı geometrik şeklin adını düşünün.",
        hintEn: "Think of the four-sided shape.",
        explanationTr: "Kare (Square) modu metnin resmin etrafından temiz bir şekilde akmasını sağlar.",
        explanationEn: "Square wrapping causes text to wrap cleanly around all sides of the bounding box.",
        options: [
          { id: "o1", textTr: "Metinle Aynı Hizada (In Line with Text)", textEn: "In Line with Text", isCorrect: false },
          { id: "o2", textTr: "Kare (Square)", textEn: "Square", isCorrect: true, feedbackTr: "Doğru! Kare seçeneği metin ve görsel dengesi için en yaygın moddur." },
          { id: "o3", textTr: "Metnin Arkasına (Behind Text)", textEn: "Behind Text", isCorrect: false },
          { id: "o4", textTr: "Üst ve Alt (Top and Bottom)", textEn: "Top and Bottom", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Metnin arkasına (Behind Text) yerleştirilen bir resmi daha sonra fareyle seçmek zorlaştığında Gezinti veya Seçim Bölmesi nasıl yardımcı olur?",
      "Görsellerin çözünürlüğü ve dosya boyutunun belgenin genel performansına etkisi nedir?"
    ],
    preparationQuestionsEn: [
      "How does the Selection Pane help when selecting an image placed behind text?",
      "How do high-resolution images impact Word document performance?"
    ],
    assignments: [
      {
        id: "w6-a1",
        weekNumber: 6,
        assignmentNumber: 1,
        titleTr: "Ödev 6.1: Görsel Öğe ve İki Yana Yaslı Metin",
        titleEn: "Assignment 6.1: Visual Element & Justified Text",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Belgeye resim veya şekil ekleme", "İki yana yaslama", "Times New Roman 12 pt"],
        objectivesEn: ["Insert picture or shape", "Justified text", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. Ekle > Şekiller veya Ekle > Resim menüsünden belgenize bir görsel ekleyin.",
          "3. Yanına iki yana yaslı bir açıklama metni yazın.",
          "4. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Open a document.",
          "2. Insert a shape or picture from the Insert menu.",
          "3. Write a justified explanatory text next to it.",
          "4. Upload the document."
        ],
        rubric: [
          {
            id: "w6a1-r1",
            category: "elements",
            titleTr: "Görsel/Şekil Varlığı",
            titleEn: "Visual/Shape Presence",
            points: 50,
            expectedDescriptionTr: "Belgede en az 1 görsel/şekil çizimi olmalıdır.",
            expectedDescriptionEn: "Must contain at least 1 image or shape.",
            checkFn: "check_visual_elements"
          },
          {
            id: "w6a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Açıklama metni iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta6_Odev1_Ornek.docx"
      },
      {
        id: "w6-a2",
        weekNumber: 6,
        assignmentNumber: 2,
        titleTr: "Ödev 6.2: Görsel İçeren 1.5 Satır Aralıklı Rapor",
        titleEn: "Assignment 6.2: Report with Visual & 1.5 Spacing",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Görsel ekleme", "1.5 satır aralığı", "Times New Roman 12 pt"],
        objectivesEn: ["Insert visual", "1.5 line spacing", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Görsel bir materyal içeren 2 paragraflık rapor hazırlayın.",
          "2. 1.5 satır aralığı uygulayın.",
          "3. Kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a 2-paragraph report containing a visual.",
          "2. Apply 1.5 line spacing.",
          "3. Save and submit."
        ],
        rubric: [
          {
            id: "w6a2-r1",
            category: "elements",
            titleTr: "Görsel Öğe",
            titleEn: "Visual Element",
            points: 50,
            expectedDescriptionTr: "Belgede en az 1 görsel öğe olmalıdır.",
            expectedDescriptionEn: "At least 1 visual required.",
            checkFn: "check_visual_elements"
          },
          {
            id: "w6a2-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "Satır aralığı 1.5 olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta6_Odev2_Ornek.docx"
      },
      {
        id: "w6-a3",
        weekNumber: 6,
        assignmentNumber: 3,
        titleTr: "Ödev 6.3: Şekiller ve Başlık Hiyerarşisi",
        titleEn: "Assignment 6.3: Shapes & Heading Hierarchy",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Görsel/şekil ekleme", "Kalın başlık", "Normal kenar boşlukları"],
        objectivesEn: ["Insert shape/visual", "Bold header", "Normal margins"],
        instructionsTr: [
          "1. Başlığı kalın yapın.",
          "2. Belgeye bir akış şeması veya şekil ekleyin.",
          "3. Belgenizi DOCX olarak yükleyin."
        ],
        instructionsEn: [
          "1. Make header bold.",
          "2. Insert a flowchart shape or diagram.",
          "3. Upload as DOCX."
        ],
        rubric: [
          {
            id: "w6a3-r1",
            category: "elements",
            titleTr: "Görsel Varlığı",
            titleEn: "Visual Presence",
            points: 50,
            expectedDescriptionTr: "Görsel öğe bulunmalıdır.",
            expectedDescriptionEn: "Visual element required.",
            checkFn: "check_visual_elements"
          },
          {
            id: "w6a3-r2",
            category: "font",
            titleTr: "Kalın Başlık",
            titleEn: "Bold Header",
            points: 50,
            expectedDescriptionTr: "Kalın başlık bulunmalıdır.",
            expectedDescriptionEn: "Bold header required.",
            checkFn: "check_text_formatting",
            params: { bold: true }
          }
        ],
        referenceDocName: "Hafta6_Odev3_Ornek.docx"
      },
      {
        id: "w6-a4",
        weekNumber: 6,
        assignmentNumber: 4,
        titleTr: "Ödev 6.4: Bütünleşik Görsel ve Paragraf Tasarımı",
        titleEn: "Assignment 6.4: Integrated Visual & Paragraph Design",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Görsel öğe", "Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı"],
        objectivesEn: ["Visual element", "Times New Roman 12 pt", "Justified text", "1.5 spacing"],
        instructionsTr: [
          "1. 90 kelimelik resimli bir bülten sayfası oluşturun.",
          "2. Times New Roman 12 pt, iki yana yaslı ve 1.5 satır aralıklı yapın.",
          "3. Görsel öğe ekleyip belgeyi yükleyin."
        ],
        instructionsEn: [
          "1. Build a 90-word newsletter with an image.",
          "2. Times New Roman 12 pt, justified, 1.5 spacing.",
          "3. Insert visual and upload."
        ],
        rubric: [
          {
            id: "w6a4-r1",
            category: "elements",
            titleTr: "Görsel Öğe",
            titleEn: "Visual Element",
            points: 35,
            expectedDescriptionTr: "Görsel bulunmalıdır.",
            expectedDescriptionEn: "Visual required.",
            checkFn: "check_visual_elements"
          },
          {
            id: "w6a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 35,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w6a4-r3",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 30,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_family",
            params: { fontName: "Times New Roman" }
          }
        ],
        referenceDocName: "Hafta6_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w6-q1",
        questionTr: "Bir resmin belge içinde fare ile serbestçe taşınabilmesi için metin kaydırma biçimi hangisi OLMAMALIDIR?",
        questionEn: "Which text wrapping option prevents an image from being freely dragged around like a floating object?",
        options: [
          { id: "o1", textTr: "Metinle Aynı Hizada (In Line with Text)", textEn: "In Line with Text" },
          { id: "o2", textTr: "Kare (Square)", textEn: "Square" },
          { id: "o3", textTr: "Sıkı (Tight)", textEn: "Tight" },
          { id: "o4", textTr: "Metnin Önüne (In Front of Text)", textEn: "In Front of Text" }
        ],
        correctOptionId: "o1",
        explanationTr: "Metinle Aynı Hizada (In Line with Text) olan resimler metnin bir harfi gibi davranır ve serbestçe sürüklenemez.",
        explanationEn: "In Line with Text anchors the image directly within the text stream like a giant character."
      }
    ],
    summaryTr: "6. Hafta tamamlandı! Görselleri, şekilleri ve metin kaydırmayı başarıyla uyguladınız. 7. Haftada ilk 6 haftanın bütünleşik vize tekrarını ve entegre doküman üretimini gerçekleştireceğiz.",
    summaryEn: "Week 6 complete! In Week 7, we will synthesize all learning so far in an integrated midterm review project."
  },

  // ==========================================
  // HAFTA 7
  // ==========================================
  {
    weekNumber: 7,
    titleTr: "Belge İnceleme ve Bütünleşik Uygulama (Ara Değerlendirme)",
    titleEn: "Document Review and Integrated Midterm Practice",
    taglineTr: "İlk 6 haftanın sentezi: Bütünleşik doküman üretimi, vize hazırlığı",
    taglineEn: "Synthesis of Weeks 1-6: Integrated document authoring, midterm preparation",
    introductionTr: "Dönemin ilk yarısını geride bıraktık! Bu haftada metin biçimlendirme, paragraflar, kenar boşlukları, tablolar ve görselleri tek bir akademik makale taslağında bir araya getirecek; vize sınavı standartlarına uygun kapsamlı bir doküman üreteceksiniz.",
    introductionEn: "The midterm milestone! This week synthesizes character formatting, paragraph architecture, page setup, tables, and visual elements into a unified academic document complying with rigorous submission rubrics.",
    prerequisitesTr: ["Hafta 1-6 arası tüm temel Word becerileri"],
    prerequisitesEn: ["All core Word skills from Weeks 1 through 6"],
    objectives: [
      { id: "w7-obj1", textTr: "Tipografi, paragraf, sayfa düzeni ve tablo kurallarını tek bir belgede eksiksiz birleştirebilme", textEn: "Combine typography, paragraphs, page layout, and tables in one document" },
      { id: "w7-obj2", textTr: "Biçimsel tutarsızlıkları ve hatalı boşlukları tespit edip düzeltebilme", textEn: "Identify and resolve formatting inconsistencies" },
      { id: "w7-obj3", textTr: "Otomatik DOCX değerlendirme motorundan tam puan (100) alacak kalitede doküman üretebilme", textEn: "Author a document achieving full 100 points on the OOXML assessment engine" }
    ],
    videos: [
      {
        id: "w7-v1",
        titleTr: "Bütünleşik Belge Hazırlama ve Vize Tekrarı",
        titleEn: "Integrated Document Authoring & Midterm Review",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "S-nHYzK-BVg",
        isVerified: true,
        duration: "18:40",
        notesTr: "İlk 6 haftanın temel kurallarının vize odaklı özeti.",
        notesEn: "Midterm-oriented summary of core rules from weeks 1-6."
      }
    ],
    writtenGuides: [
      {
        id: "w7-g1",
        headingTr: "Vize Projesi Standartlar Listesi",
        headingEn: "Midterm Project Standards Checklist",
        sections: [
          {
            subheadingTr: "1. Kontrol Listesi (Checklist)",
            subheadingEn: "1. Standards Checklist",
            contentTr: "1) Yazı tipi: Times New Roman 12 pt. 2) Paragraflar: İki yana yaslı, 1.5 satır aralığı. 3) Kenar boşlukları: Normal (2.5 cm). 4) Tablo: En az 3x3 ve başlık gölgelendirmeli.",
            contentEn: "1) Font: Times New Roman 12 pt. 2) Paragraphs: Justified, 1.5 line spacing. 3) Margins: Normal (2.5 cm). 4) Table: At least 3x3 with shaded header row."
          }
        ]
      }
    ],
    activities: [
      {
        id: "w7-act1",
        type: "reorder_steps",
        titleTr: "Belge Hazırlama İş Akışını Sıralama",
        titleEn: "Order Document Production Workflow",
        descriptionTr: "Sıfırdan profesyonel bir belge üretirken izlenmesi gereken doğru adımları sıralayın.",
        descriptionEn: "Order the proper steps when authoring a professional Word document.",
        hintTr: "Önce sayfa düzeni ve kenar boşlukları ayarlanmalıdır.",
        hintEn: "Set page margins and orientation first before content formatting.",
        explanationTr: "Profesyonel iş akışı: 1) Sayfa Düzeni (Kenar boşlukları), 2) Metin girişi ve Stiller, 3) Paragraf ve tablo biçimlendirme, 4) Son gözden geçirme ve PDF çıktısı.",
        explanationEn: "Workflow: 1) Page Layout & Margins, 2) Text entry & Styles, 3) Paragraph & Table styling, 4) Final review & Export.",
        steps: [
          { id: "s1", textTr: "Sayfa kenar boşluklarını ve yönlendirmesini ayarlayın", textEn: "Configure page margins and orientation", correctOrder: 1 },
          { id: "s2", textTr: "Metin içeriğini yazın ve başlık stillerini belirleyin", textEn: "Write content and apply heading styles", correctOrder: 2 },
          { id: "s3", textTr: "Gerekli tabloları ve görselleri ekleyip biçimlendirin", textEn: "Insert and style required tables and visuals", correctOrder: 3 },
          { id: "s4", textTr: "Yazım denetimi yapıp belgeyi .docx ve .pdf olarak kaydedin", textEn: "Run proofing and save as .docx and .pdf", correctOrder: 4 }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Bir belgenin biçimlendirmesini sonradan tek tek düzeltmek yerine stiller kullanmak neden zamandan tasarruf sağlar?",
      "Vize sınavında dikkat edilmesi gereken en kritik 3 biçimlendirme kuralı nelerdir?"
    ],
    preparationQuestionsEn: [
      "Why does using styles save massive time compared to direct manual formatting?",
      "What are the top 3 formatting rules in academic document grading?"
    ],
    assignments: [
      {
        id: "w7-a1",
        weekNumber: 7,
        assignmentNumber: 1,
        titleTr: "Ödev 7.1: Vize Düzeyinde Bütünleşik Doküman Projesi",
        titleEn: "Assignment 7.1: Midterm Integrated Document Project",
        difficulty: "advanced",
        estimatedMinutes: 45,
        objectivesTr: [
          "Times New Roman 12 pt",
          "İki yana yaslama",
          "1.5 satır aralığı",
          "Normal kenar boşlukları (2.5 cm)",
          "En az 3x3 biçimlendirilmiş veri tablosu",
          "En az 80 kelime metin"
        ],
        objectivesEn: [
          "Times New Roman 12 pt",
          "Justified text",
          "1.5 line spacing",
          "Normal margins (2.5 cm)",
          "At least 3x3 styled data table",
          "At least 80 words text"
        ],
        instructionsTr: [
          "1. 'Bilişim Teknolojilerinin Eğitimde Kullanımı' başlıklı kapsamlı bir rapor hazırlayın.",
          "2. Sayfa kenar boşluklarını Normal (2.5 cm) yapın.",
          "3. Yazı tipini Times New Roman 12 pt, paragrafları iki yana yaslı ve 1.5 satır aralıklı ayarlayın.",
          "4. Belgenin içine 3x3 boyutunda başlığı gölgelendirilmiş bir tablo ekleyin.",
          "5. Belgenizi kaydedip yükleyerek 100 tam puan almayı hedefleyin."
        ],
        instructionsEn: [
          "1. Author an integrated report on IT in Education.",
          "2. Margins: Normal (2.5 cm).",
          "3. Font: Times New Roman 12 pt, Justified, 1.5 line spacing.",
          "4. Include a 3x3 table with shaded header row.",
          "5. Submit for evaluation aiming for 100 points."
        ],
        rubric: [
          {
            id: "w7a1-r1",
            category: "layout",
            titleTr: "Sayfa Kenar Boşlukları (2.5 cm)",
            titleEn: "Page Margins (2.5 cm)",
            points: 20,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Margins must be normal.",
            checkFn: "check_page_margins"
          },
          {
            id: "w7a1-r2",
            category: "font",
            titleTr: "Times New Roman 12 pt",
            titleEn: "Times New Roman 12 pt",
            points: 20,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w7a1-r3",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 20,
            expectedDescriptionTr: "Paragraflar iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Paragraphs must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w7a1-r4",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 20,
            expectedDescriptionTr: "Satır aralığı 1.5 olmalıdır.",
            expectedDescriptionEn: "Line spacing must be 1.5.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          },
          {
            id: "w7a1-r5",
            category: "table",
            titleTr: "Biçimlendirilmiş Tablo",
            titleEn: "Styled Table",
            points: 20,
            expectedDescriptionTr: "En az 3x3 tablo bulunmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          }
        ],
        referenceDocName: "Hafta7_Odev1_Ornek.docx"
      },
      {
        id: "w7-a2",
        weekNumber: 7,
        assignmentNumber: 2,
        titleTr: "Ödev 7.2: Tablolu Araştırma Özeti",
        titleEn: "Assignment 7.2: Research Summary with Table",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "3x3 tablo"],
        objectivesEn: ["Times New Roman 12 pt", "Justified text", "3x3 table"],
        instructionsTr: [
          "1. 3x3 tablo içeren araştırma özeti hazırlayın.",
          "2. İki yana yaslama ve Times New Roman 12 pt kullanın.",
          "3. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare research summary with 3x3 table.",
          "2. Apply justify and Times New Roman 12 pt.",
          "3. Upload the file."
        ],
        rubric: [
          {
            id: "w7a2-r1",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 50,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w7a2-r2",
            category: "table",
            titleTr: "Tablo Yapısı",
            titleEn: "Table Structure",
            points: 50,
            expectedDescriptionTr: "En az 3x3 tablo olmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          }
        ],
        referenceDocName: "Hafta7_Odev2_Ornek.docx"
      },
      {
        id: "w7-a3",
        weekNumber: 7,
        assignmentNumber: 3,
        titleTr: "Ödev 7.3: Sayfa Düzeni ve Tablo Entegrasyonu",
        titleEn: "Assignment 7.3: Page Setup & Table Integration",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Normal kenar boşlukları", "1.5 satır aralığı", "Tablo ekleme"],
        objectivesEn: ["Normal margins", "1.5 line spacing", "Table insertion"],
        instructionsTr: [
          "1. Sayfa kenar boşluklarını Normal yapın.",
          "2. 1.5 satır aralıklı metin ve 3x3 tablo ekleyin.",
          "3. Yükleyip değerlendirin."
        ],
        instructionsEn: [
          "1. Set Normal margins.",
          "2. Add 1.5 spaced text and 3x3 table.",
          "3. Upload and assess."
        ],
        rubric: [
          {
            id: "w7a3-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          },
          {
            id: "w7a3-r2",
            category: "table",
            titleTr: "Tablo Varlığı",
            titleEn: "Table Presence",
            points: 50,
            expectedDescriptionTr: "Tablo bulunmalıdır.",
            expectedDescriptionEn: "Table required.",
            checkFn: "check_table_structure",
            params: { minRows: 2, minCols: 2 }
          }
        ],
        referenceDocName: "Hafta7_Odev3_Ornek.docx"
      },
      {
        id: "w7-a4",
        weekNumber: 7,
        assignmentNumber: 4,
        titleTr: "Ödev 7.4: Vize Hazırlık Pratik Sınavı",
        titleEn: "Assignment 7.4: Midterm Practical Exam",
        difficulty: "advanced",
        estimatedMinutes: 40,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı", "Normal kenar boşluğu", "En az 80 kelime"],
        objectivesEn: ["Times New Roman 12 pt", "Justified text", "1.5 line spacing", "Normal margins", "At least 80 words"],
        instructionsTr: [
          "1. 80 kelimelik eksiksiz bir vize raporu oluşturun.",
          "2. Tüm temel standartları uygulayın.",
          "3. Belgenizi gönderin."
        ],
        instructionsEn: [
          "1. Build an 80-word complete midterm report.",
          "2. Follow all standard criteria.",
          "3. Submit your document."
        ],
        rubric: [
          {
            id: "w7a4-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 30,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          },
          {
            id: "w7a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama & 1.5 Aralık",
            titleEn: "Justify & 1.5 Spacing",
            points: 40,
            expectedDescriptionTr: "İki yana yaslama ve 1.5 aralık uygulanmalıdır.",
            expectedDescriptionEn: "Justify & 1.5 spacing required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w7a4-r3",
            category: "elements",
            titleTr: "80 Kelime",
            titleEn: "80 Words",
            points: 30,
            expectedDescriptionTr: "En az 80 kelime olmalıdır.",
            expectedDescriptionEn: "At least 80 words required.",
            checkFn: "check_minimum_words",
            params: { minWords: 80 }
          }
        ],
        referenceDocName: "Hafta7_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w7-q1",
        questionTr: "Akademik bir belgede yazı tipi, iki yana yaslama, 1.5 satır aralığı ve standart kenar boşluklarının bir arada kullanılması hangi temel faydayı sağlar?",
        questionEn: "What primary benefit results from pairing standard fonts, justified alignment, 1.5 line spacing, and standard margins?",
        options: [
          { id: "o1", textTr: "Belgenin dosya boyutunu sıfıra indirir.", textEn: "Reduces file size to zero.", isCorrect: false },
          { id: "o2", textTr: "Okunabilirliği, görsel hiyerarşiyi ve akademik standartlara tam uyumu sağlar.", textEn: "Ensures legibility, visual hierarchy, and full academic compliance.", isCorrect: true, feedbackTr: "Kesinlikle! Bu dörtlü akademik yazımın temel taşıdır." },
          { id: "o3", textTr: "Word'ün çevrimdışı çalışmasını engeller.", textEn: "Prevents offline Word usage.", isCorrect: false },
          { id: "o4", textTr: "Yazım denetimini hızlandırır.", textEn: "Speeds up spell check.", isCorrect: false }
        ],
        correctOptionId: "o2",
        explanationTr: "Tüm bu standartlar okuyucunun metne odaklanmasını sağlayan evrensel tipografik ergonomi kurallarıdır.",
        explanationEn: "These standards are universal principles of typographic ergonomics ensuring effortless reading."
      }
    ],
    summaryTr: "7. Haftayı tamamladınız! İlk yarıyılın tüm konularını başarıyla sentezlediniz. 8. Haftada Word'ün en güçlü özelliklerinden olan Stiller (Styles) ve Başlık Hiyerarşisine geçiyoruz.",
    summaryEn: "Week 7 complete! You synthesized all first-half concepts. In Week 8, we dive into Styles and Document Architecture."
  },

  // ==========================================
  // HAFTA 8
  // ==========================================
  {
    weekNumber: 8,
    titleTr: "Stiller ve Belge Yapısı (Styles)",
    titleEn: "Styles and Document Architecture",
    taglineTr: "Başlık stilleri, stil yönetimi, Gezinti Bölmesi, hiyerarşik yapı",
    taglineEn: "Heading styles, style gallery, navigation pane, structured documents",
    introductionTr: "Word'ü profesyonel kullananlar ile acemiler arasındaki en büyük fark 'Stiller' (Styles) kullanımıdır. Başlıkları yalnızca yazı boyutunu büyüterek yapmak yerine 'Başlık 1', 'Başlık 2' stilleri atamak; Gezinti Bölmesini, otomatik içindekiler tablosunu ve tek tıkla tüm belgenin tasarımını değiştirmeyi mümkün kılar.",
    introductionEn: "The hallmark of advanced Word proficiency is mastering Styles. Applying 'Heading 1' and 'Heading 2' instead of manual font sizing unlocks the Navigation Pane, automated Tables of Contents, and unified document-wide restyling.",
    prerequisitesTr: ["Karakter ve paragraf biçimlendirme temelleri"],
    prerequisitesEn: ["Character and paragraph formatting fundamentals"],
    objectives: [
      { id: "w8-obj1", textTr: "Başlık 1 (Heading 1) ve Başlık 2 (Heading 2) stillerini hiyerarşik olarak uygulayabilme", textEn: "Apply Heading 1 and Heading 2 styles hierarchically" },
      { id: "w8-obj2", textTr: "Stil Galerisinden stilleri sağ tıklayarak 'Değiştir' (Modify) ile özelleştirebilme", textEn: "Modify styles directly from the Style Gallery" },
      { id: "w8-obj3", textTr: "Görünüm > Gezinti Bölmesi (Ctrl+F) ile belge başlıkları arasında anında gezinebilme", textEn: "Navigate headings seamlessly using the Navigation Pane (Ctrl+F)" },
      { id: "w8-obj4", textTr: "Başlık stillerine bağlı olarak otomatik İçindekiler Tablosu oluşturabilme temellerini anlama", textEn: "Understand how heading styles power automated Tables of Contents" }
    ],
    videos: [
      {
        id: "w8-v1",
        titleTr: "Word'de Stiller (Heading 1, 2, 3) ve Gezinti Bölmesi",
        titleEn: "Word Styles (Heading 1, 2, 3) & Navigation Pane",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "5bL6Y_w7Gss",
        isVerified: true,
        duration: "16:15",
        notesTr: "Başlık stillerinin kullanımı ve stilleri değiştirme adımları.",
        notesEn: "Applying heading styles and modifying style definitions."
      }
    ],
    writtenGuides: [
      {
        id: "w8-g1",
        headingTr: "Stillerin Gücü",
        headingEn: "The Power of Styles",
        sections: [
          {
            subheadingTr: "1. Neden Stil Kullanmalıyız?",
            subheadingEn: "1. Why Use Styles?",
            contentTr: "100 sayfalık bir tezde tüm ana başlıkların rengini değiştirmek istediğinizde, manuel yaptıysanız 100 yeri tek tek gezmeniz gerekir. Ancak 'Başlık 1' stilini değiştirdiğinizde tüm belgedeki başlıklar anında 1 saniyede güncellenir!",
            contentEn: "In a 100-page thesis, changing heading colors manually requires finding every heading. With Heading 1 style, modifying the style updates all headings instantaneously across the entire document.",
            ribbonPathTr: "Giriş > Stiller > Başlık 1 / Başlık 2",
            ribbonPathEn: "Home > Styles > Heading 1 / Heading 2"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w8-act1",
        type: "identify_command",
        titleTr: "Stili Güncelleme Kısayolu",
        titleEn: "Update Style from Selection",
        descriptionTr: "Belgede biçimlendirdiğiniz bir başlığın özelliklerini mevcut 'Başlık 1' stiline uygulamak için en pratik yöntem hangisidir?",
        descriptionEn: "To apply selected heading styling to the Heading 1 style definition, what is the best shortcut?",
        hintTr: "Stil Galerisinde Başlık 1 kutusuna sağ tıklamayı düşünün.",
        hintEn: "Consider right-clicking the Heading 1 box in the Styles gallery.",
        explanationTr: "Stil Galerisinde Başlık 1'e sağ tıklayıp 'Seçime Uyması İçin Başlık 1 Stilini Güncelleştir' seçildiğinde stil belgedeki seçime göre anında güncellenir.",
        explanationEn: "Right-clicking Heading 1 in the gallery and choosing 'Update Heading 1 to Match Selection' updates the style definition immediately.",
        options: [
          { id: "o1", textTr: "Stil Galerisinde sağ tık > 'Seçime Uyması İçin Başlık 1 Stilini Güncelleştir'", textEn: "Right click in gallery > 'Update Heading 1 to Match Selection'", isCorrect: true, feedbackTr: "Harika! Bu özellik stilleri 1 tıkla özelleştirmenin en hızlı yoludur." },
          { id: "o2", textTr: "Word'ü kapatıp yeniden açmak", textEn: "Restart Word", isCorrect: false },
          { id: "o3", textTr: "Tüm metni silip baştan yazmak", textEn: "Delete text and retype", isCorrect: false },
          { id: "o4", textTr: "Sayfa kenar boşluklarını değiştirmek", textEn: "Change margins", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Gezinti Bölmesinde (Navigation Pane) bir başlığın görünmemesinin temel sebebi nedir?",
      "Normal stili ile Başlık stili arasındaki devralma (Style inheritance) ilişkisi nasıl çalışır?"
    ],
    preparationQuestionsEn: [
      "Why would a typed heading fail to appear in the Navigation Pane?",
      "How does style inheritance work between Normal and Heading styles?"
    ],
    assignments: [
      {
        id: "w8-a1",
        weekNumber: 8,
        assignmentNumber: 1,
        titleTr: "Ödev 8.1: Başlık 1 Stilleri ile Yapılandırılmış Belge",
        titleEn: "Assignment 8.1: Structured Document with Heading 1",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["En az 2 adet 'Başlık 1' stili uygulama", "İki yana yaslama", "Times New Roman 12 pt"],
        objectivesEn: ["Apply at least 2 'Heading 1' styles", "Justified body text", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. İki ana bölüm başlığı yazın ve Giriş sekmesindeki Stiller galerisinden her ikisine de 'Başlık 1' (Heading 1) stili atayın.",
          "3. Başlıkların altına iki yana yaslı paragraflar ekleyin.",
          "4. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Create a Word document.",
          "2. Write two section headings and apply 'Heading 1' style from Home > Styles gallery.",
          "3. Add justified body paragraphs below them.",
          "4. Submit the document."
        ],
        rubric: [
          {
            id: "w8a1-r1",
            category: "styles",
            titleTr: "Başlık 1 Stili Varlığı",
            titleEn: "Heading 1 Style Presence",
            points: 50,
            expectedDescriptionTr: "Belgede en az 1 adet Başlık 1 stili bulunmalıdır.",
            expectedDescriptionEn: "Must contain at least 1 Heading 1 style.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w8a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Gövde paragrafları iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Paragraphs must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta8_Odev1_Ornek.docx"
      },
      {
        id: "w8-a2",
        weekNumber: 8,
        assignmentNumber: 2,
        titleTr: "Ödev 8.2: Başlık Stilleri ve 1.5 Satır Aralığı",
        titleEn: "Assignment 8.2: Heading Styles & 1.5 Spacing",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Başlık 1 stili", "1.5 satır aralığı", "Times New Roman 12 pt"],
        objectivesEn: ["Heading 1 style", "1.5 line spacing", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Başlık 1 stili uygulayın.",
          "2. Gövde metnine 1.5 satır aralığı verin.",
          "3. Kaydedip sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Apply Heading 1 style.",
          "2. Set body to 1.5 line spacing.",
          "3. Save and submit."
        ],
        rubric: [
          {
            id: "w8a2-r1",
            category: "styles",
            titleTr: "Başlık 1 Stili",
            titleEn: "Heading 1 Style",
            points: 50,
            expectedDescriptionTr: "Başlık 1 stili olmalıdır.",
            expectedDescriptionEn: "Heading 1 style required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w8a2-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta8_Odev2_Ornek.docx"
      },
      {
        id: "w8-a3",
        weekNumber: 8,
        assignmentNumber: 3,
        titleTr: "Ödev 8.3: Başlık Stilleri ve Kenar Boşlukları",
        titleEn: "Assignment 8.3: Heading Styles & Margins",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Başlık 1 stili", "Normal kenar boşlukları", "İki yana yaslama"],
        objectivesEn: ["Heading 1 style", "Normal margins", "Justified body"],
        instructionsTr: [
          "1. Kenar boşluklarını Normal yapın.",
          "2. Başlık 1 stili ve iki yana yaslı metin ekleyin.",
          "3. Belgenizi yükleyin."
        ],
        instructionsEn: [
          "1. Set Normal margins.",
          "2. Add Heading 1 style and justified body.",
          "3. Upload your document."
        ],
        rubric: [
          {
            id: "w8a3-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 stili bulunmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w8a3-r2",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          }
        ],
        referenceDocName: "Hafta8_Odev3_Ornek.docx"
      },
      {
        id: "w8-a4",
        weekNumber: 8,
        assignmentNumber: 4,
        titleTr: "Ödev 8.4: Kapsamlı Hiyerarşik Makale Düzeni",
        titleEn: "Assignment 8.4: Comprehensive Structured Paper Layout",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Başlık 1 stili", "Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı"],
        objectivesEn: ["Heading 1 style", "Times New Roman 12 pt", "Justified body", "1.5 line spacing"],
        instructionsTr: [
          "1. 2 ana bölümlü bir makale hazırlayın.",
          "2. Ana bölümlere Başlık 1 stili uygulayın.",
          "3. Gövde paragraflarını Times New Roman 12 pt, iki yana yaslı ve 1.5 satır aralıklı yapın.",
          "4. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Write a 2-section paper.",
          "2. Apply Heading 1 style to main sections.",
          "3. Body text: Times New Roman 12 pt, justified, 1.5 line spacing.",
          "4. Submit the file."
        ],
        rubric: [
          {
            id: "w8a4-r1",
            category: "styles",
            titleTr: "Başlık 1 Stili",
            titleEn: "Heading 1 Style",
            points: 35,
            expectedDescriptionTr: "Başlık 1 stili olmalıdır.",
            expectedDescriptionEn: "Heading 1 style required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w8a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 35,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w8a4-r3",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 30,
            expectedDescriptionTr: "1.5 satır aralığı uygulanmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta8_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w8-q1",
        questionTr: "Bir Word belgesinde sol tarafta belgenin tüm başlıklarını bir harita gibi gösteren ve tıklayarak o başlığa atlamayı sağlayan panel hangisidir?",
        questionEn: "Which pane displays all headings like a roadmap on the left side and allows instant jumping when clicked?",
        options: [
          { id: "o1", textTr: "Gezinti Bölmesi (Navigation Pane - Ctrl+F)", textEn: "Navigation Pane (Ctrl+F)" },
          { id: "o2", textTr: "Pano (Clipboard)", textEn: "Clipboard" },
          { id: "o3", textTr: "Yazım Denetimi Paneli", textEn: "Editor Pane" },
          { id: "o4", textTr: "Cetvel Bölmesi", textEn: "Ruler Pane" }
        ],
        correctOptionId: "o1",
        explanationTr: "Gezinti Bölmesi (Görünüm > Gezinti Bölmesi veya Ctrl+F), yalnızca Başlık stilleri atanmış metinleri listeleyerek hızlı gezinme sağlar.",
        explanationEn: "The Navigation Pane (View > Navigation Pane or Ctrl+F) lists structured headings for quick navigation."
      }
    ],
    summaryTr: "8. Hafta tamamlandı! Başlık stillerini ve belge hiyerarşisini başarıyla kavradınız. 9. Haftada Üstbilgi, Altbilgi ve Sayfa Numaralandırmasını ele alacağız.",
    summaryEn: "Week 8 complete! You mastered heading styles and document architecture. In Week 9, we explore Headers, Footers, and Page Numbering."
  },

  // ==========================================
  // HAFTA 9
  // ==========================================
  {
    weekNumber: 9,
    titleTr: "Üstbilgi, Altbilgi ve Sayfa Numaralandırma",
    titleEn: "Headers, Footers and Page Numbering",
    taglineTr: "Üstbilgi, altbilgi, otomatik sayfa numaraları, ilk sayfada farklı, bölümler",
    taglineEn: "Headers, footers, automatic page numbers, different first page, sections",
    introductionTr: "Resmi belgelerin, tezlerin ve kurumsal raporların vazgeçilmez öğesi üstbilgi ve altbilgilerdir. Sayfa numarasını kapağa basmamak ('İlk Sayfada Farklı'), içindekiler kısmını Roma rakamıyla (i, ii), gövdeyi ise 1'den başlatmak için gereken teknikleri bu hafta öğreneceksiniz.",
    introductionEn: "Headers and footers establish institutional branding and navigation. This week covers inserting dynamic PAGE numbers, omitting page numbers on cover pages ('Different First Page'), and numbering formats.",
    prerequisitesTr: ["Bölüm sonları ve temel sayfa düzeni"],
    prerequisitesEn: ["Section breaks and basic page setup"],
    objectives: [
      { id: "w9-obj1", textTr: "Belgeye üstbilgi ve altbilgi alanları ekleyip düzenleyebilme", textEn: "Insert and customize headers and footers" },
      { id: "w9-obj2", textTr: "Dinamik sayfa numaralandırma (PAGE alanı) ekleyebilme", textEn: "Insert dynamic page numbers (PAGE field)" },
      { id: "w9-obj3", textTr: "'İlk Sayfada Farklı' (Different First Page) seçeneğini uygulayabilme", textEn: "Configure 'Different First Page' to suppress cover page headers" },
      { id: "w9-obj4", textTr: "Sayfa numarası biçimini (1, 2, 3 veya i, ii, iii) ve başlangıç numarasını ayarlayabilme", textEn: "Format page numbers (Arabic vs Roman numerals) and starting page" }
    ],
    videos: [
      {
        id: "w9-v1",
        titleTr: "Word'de Sayfa Numarası Ekleme ve Farklı İlk Sayfa",
        titleEn: "Page Numbering & Different First Page in Word",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "vB6q7N_mY8c",
        isVerified: false,
        notesTr: "Bu konu için video içeriği hazırlanmaktadır.",
        notesEn: "Dedicated video is in preparation."
      }
    ],
    writtenGuides: [
      {
        id: "w9-g1",
        headingTr: "Sayfa Numaralandırma Kuralları",
        headingEn: "Page Numbering Standards",
        sections: [
          {
            subheadingTr: "1. Otomatik Sayfa Numarası Eklemek",
            subheadingEn: "1. Inserting Automatic Page Numbers",
            contentTr: "Altbilgiye elle '1', '2' yazarsanız her sayfada aynı rakam görünür! Sayfa numarasının artması için Ekle > Sayfa Numarası > 'Sayfanın Sonu' yolundan dinamik PAGE alanı eklenmelidir.",
            contentEn: "Never manually type '1' in the footer, or every page will display '1'. Use Insert > Page Number > Bottom of Page to insert a dynamic PAGE field.",
            ribbonPathTr: "Ekle > Üstbilgi ve Altbilgi > Sayfa Numarası",
            ribbonPathEn: "Insert > Header & Footer > Page Number"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w9-act1",
        type: "identify_command",
        titleTr: "Kapak Sayfasında Numarayı Gizleme",
        titleEn: "Hide Number on Cover Page",
        descriptionTr: "Belgenin kapak sayfasında üstbilgi ve sayfa numarasının görünmesini engellemek için hangi seçenek işaretlenmelidir?",
        descriptionEn: "Which checkbox suppresses headers and page numbers on the title/cover page?",
        hintTr: "Üstbilgi ve Altbilgi sekmesindeki Seçenekler grubuna bakın.",
        hintEn: "Look under the Options group on the Header & Footer tab.",
        explanationTr: "'İlk Sayfada Farklı' (Different First Page) kutusu işaretlendiğinde ilk sayfanın üst ve altbilgisi bağımsız hale gelir.",
        explanationEn: "Selecting 'Different First Page' decouples the title page header and footer from subsequent pages.",
        options: [
          { id: "o1", textTr: "İlk Sayfada Farklı (Different First Page)", textEn: "Different First Page", isCorrect: true, feedbackTr: "Doğru! Kapak sayfaları için en pratik yöntem budur." },
          { id: "o2", textTr: "Tek ve Çift Sayfalarda Farklı", textEn: "Different Odd & Even Pages", isCorrect: false },
          { id: "o3", textTr: "Belge Metnini Göster", textEn: "Show Document Text", isCorrect: false },
          { id: "o4", textTr: "Üstbilgiyi Kaldır", textEn: "Remove Header", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Ön bölümlerde (Giriş, Özet) Roma rakamı, gövdede normal rakam kullanmak için kaç adet bölüm sonu gerekir?",
      "Öncekine Bağla (Link to Previous) düğmesinin işlevi nedir?"
    ],
    preparationQuestionsEn: [
      "How many section breaks are required to switch from Roman numerals to Arabic numerals?",
      "What is the function of the 'Link to Previous' button in headers?"
    ],
    assignments: [
      {
        id: "w9-a1",
        weekNumber: 9,
        assignmentNumber: 1,
        titleTr: "Ödev 9.1: Altbilgi ve Sayfa Numaralandırması",
        titleEn: "Assignment 9.1: Footer and Page Numbering",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Otomatik sayfa numarası ekleme", "Times New Roman 12 pt", "İki yana yaslama"],
        objectivesEn: ["Insert automatic page numbers", "Times New Roman 12 pt", "Justified body"],
        instructionsTr: [
          "1. Yeni bir Word belgesi açın.",
          "2. Ekle > Sayfa Numarası menüsünden sayfanın altına otomatik sayfa numarası ekleyin.",
          "3. Gövde metnini Times New Roman 12 pt ve iki yana yaslı yapın.",
          "4. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Open a new document.",
          "2. Add automatic page numbers at page bottom from Insert > Page Number.",
          "3. Set body text to Times New Roman 12 pt, justified.",
          "4. Save and submit."
        ],
        rubric: [
          {
            id: "w9a1-r1",
            category: "header_footer",
            titleTr: "Otomatik Sayfa Numarası (PAGE)",
            titleEn: "Automatic Page Number (PAGE)",
            points: 50,
            expectedDescriptionTr: "Belgede dinamik sayfa numarası bulunmalıdır.",
            expectedDescriptionEn: "Document must contain dynamic page numbering.",
            checkFn: "check_page_numbers"
          },
          {
            id: "w9a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta9_Odev1_Ornek.docx"
      },
      {
        id: "w9-a2",
        weekNumber: 9,
        assignmentNumber: 2,
        titleTr: "Ödev 9.2: Üstbilgi Metni ve Sayfa Numarası",
        titleEn: "Assignment 9.2: Header Text & Page Numbering",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Üstbilgi ekleme", "Sayfa numarası ekleme", "1.5 satır aralığı"],
        objectivesEn: ["Insert header", "Insert page number", "1.5 line spacing"],
        instructionsTr: [
          "1. Üstbilgiye belgenin adını yazın.",
          "2. Altbilgiye otomatik sayfa numarası ekleyin.",
          "3. Gövdeye 1.5 satır aralığı uygulayın.",
          "4. Belgenizi yükleyin."
        ],
        instructionsEn: [
          "1. Add document title in the header.",
          "2. Add automatic page numbers in the footer.",
          "3. Apply 1.5 line spacing to body text.",
          "4. Upload your document."
        ],
        rubric: [
          {
            id: "w9a2-r1",
            category: "header_footer",
            titleTr: "Üstbilgi / Altbilgi Varlığı",
            titleEn: "Header / Footer Presence",
            points: 50,
            expectedDescriptionTr: "Üstbilgi veya altbilgi bulunmalıdır.",
            expectedDescriptionEn: "Header or footer required.",
            checkFn: "check_header_footer",
            params: { header: true, footer: true }
          },
          {
            id: "w9a2-r2",
            category: "header_footer",
            titleTr: "Sayfa Numarası",
            titleEn: "Page Number",
            points: 50,
            expectedDescriptionTr: "Sayfa numarası bulunmalıdır.",
            expectedDescriptionEn: "Page number required.",
            checkFn: "check_page_numbers"
          }
        ],
        referenceDocName: "Hafta9_Odev2_Ornek.docx"
      },
      {
        id: "w9-a3",
        weekNumber: 9,
        assignmentNumber: 3,
        titleTr: "Ödev 9.3: Sayfa Numarası ve Normal Kenar Boşlukları",
        titleEn: "Assignment 9.3: Page Number & Normal Margins",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Sayfa numarası", "Normal kenar boşlukları", "Times New Roman 12 pt"],
        objectivesEn: ["Page number", "Normal margins", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Kenar boşluklarını Normal (2.5 cm) yapın.",
          "2. Sayfa numarası ekleyin.",
          "3. Belgenizi DOCX olarak gönderin."
        ],
        instructionsEn: [
          "1. Set Normal margins (2.5 cm).",
          "2. Add page number.",
          "3. Submit as DOCX."
        ],
        rubric: [
          {
            id: "w9a3-r1",
            category: "header_footer",
            titleTr: "Sayfa Numarası",
            titleEn: "Page Number",
            points: 50,
            expectedDescriptionTr: "Sayfa numarası bulunmalıdır.",
            expectedDescriptionEn: "Page number required.",
            checkFn: "check_page_numbers"
          },
          {
            id: "w9a3-r2",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          }
        ],
        referenceDocName: "Hafta9_Odev3_Ornek.docx"
      },
      {
        id: "w9-a4",
        weekNumber: 9,
        assignmentNumber: 4,
        titleTr: "Ödev 9.4: Eksiksiz Başlık ve Numaralandırma Raporu",
        titleEn: "Assignment 9.4: Complete Header & Numbering Report",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Sayfa numarası", "Üstbilgi", "İki yana yaslama", "1.5 satır aralığı"],
        objectivesEn: ["Page number", "Header", "Justified text", "1.5 spacing"],
        instructionsTr: [
          "1. Üstbilgi ve otomatik sayfa numarası ekleyin.",
          "2. İki yana yaslı ve 1.5 satır aralıklı metin oluşturun.",
          "3. Belgenizi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Add header and page numbers.",
          "2. Format text as justified with 1.5 line spacing.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w9a4-r1",
            category: "header_footer",
            titleTr: "Sayfa Numarası",
            titleEn: "Page Number",
            points: 40,
            expectedDescriptionTr: "Sayfa numarası olmalıdır.",
            expectedDescriptionEn: "Page number required.",
            checkFn: "check_page_numbers"
          },
          {
            id: "w9a4-r2",
            category: "header_footer",
            titleTr: "Üstbilgi Varlığı",
            titleEn: "Header Presence",
            points: 30,
            expectedDescriptionTr: "Üstbilgi bulunmalıdır.",
            expectedDescriptionEn: "Header required.",
            checkFn: "check_header_footer",
            params: { header: true }
          },
          {
            id: "w9a4-r3",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 30,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta9_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w9-q1",
        questionTr: "Word'de dinamik sayfa numaralandırması sağlayan alan kodunun adı nedir?",
        questionEn: "What is the name of the dynamic field code that powers automatic page numbering in Word?",
        options: [
          { id: "o1", textTr: "PAGE", textEn: "PAGE" },
          { id: "o2", textTr: "NUMBER", textEn: "NUMBER" },
          { id: "o3", textTr: "COUNT", textEn: "COUNT" },
          { id: "o4", textTr: "DATE", textEn: "DATE" }
        ],
        correctOptionId: "o1",
        explanationTr: "Word'de geçerli sayfa numarası { PAGE } alan kodu ile dinamik olarak oluşturulur.",
        explanationEn: "In Word, current page numbers are dynamically evaluated using the { PAGE } field code."
      }
    ],
    summaryTr: "9. Hafta tamamlandı! Üstbilgi, altbilgi ve sayfa numaralandırma sistemini öğrendiniz. 10. Haftada otomatik içindekiler tablosu, dipnotlar ve akademik başvuruları inceleyeceğiz.",
    summaryEn: "Week 9 complete! You mastered headers, footers, and page numbering. In Week 10, we advance to Tables of Contents, footnotes, and citations."
  },

  // ==========================================
  // HAFTA 10
  // ==========================================
  {
    weekNumber: 10,
    titleTr: "Başvurular ve Akademik Belgeler",
    titleEn: "References and Academic Documents",
    taglineTr: "Otomatik içindekiler tablosu, dipnotlar, kaynakça, resim yazıları",
    taglineEn: "Table of contents, footnotes, citations, bibliography, captions",
    introductionTr: "Bilimsel araştırmalarda, dönem ödevlerinde ve tezlerde en kritik aşama kaynak gösterme ve belge gezintisidir. Başvurular sekmesini kullanarak tek tıkla otomatik İçindekiler Tablosu oluşturmayı, dipnot eklemeyi (Ctrl+Alt+F) ve resim/tablo yazısı (Caption) vermeyi bu hafta öğreneceksiniz.",
    introductionEn: "The crowning achievement in scholarly documents is robust referencing. This week covers generating automated Tables of Contents from heading styles, inserting footnotes (Ctrl+Alt+F), citing sources, and numbering captions.",
    prerequisitesTr: ["Hafta 8: Başlık stilleri (Heading 1, Heading 2)"],
    prerequisitesEn: ["Week 8: Heading styles (Heading 1, Heading 2)"],
    objectives: [
      { id: "w10-obj1", textTr: "Başlık stillerinden beslenen otomatik İçindekiler Tablosu (Table of Contents) ekleyebilme", textEn: "Insert automated Tables of Contents driven by heading styles" },
      { id: "w10-obj2", textTr: "Sayfa altına dipnot (Ctrl+Alt+F) ekleyip akademik referans yazabilme", textEn: "Insert footnotes (Ctrl+Alt+F) with scholarly citation notes" },
      { id: "w10-obj3", textTr: "Tablo ve şekillere otomatik Resim Yazısı (Insert Caption) ekleyebilme", textEn: "Add numbered Captions to figures and tables" },
      { id: "w10-obj4", textTr: "İçindekiler tablosunu 'Tabloyu Güncelleştir' ile tek tıkla yenileyebilme", textEn: "Update Tables of Contents via 'Update Table' command" }
    ],
    videos: [
      {
        id: "w10-v1",
        titleTr: "Word'de Otomatik İçindekiler Tablosu ve Dipnot Ekleme",
        titleEn: "Automated Table of Contents & Footnotes in Word",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "5bL6Y_w7Gss",
        isVerified: true,
        duration: "14:50",
        notesTr: "Başvurular sekmesi > İçindekiler Tablosu ve Dipnotlar rehberi.",
        notesEn: "Guide to References tab Table of Contents and Footnote tools."
      }
    ],
    writtenGuides: [
      {
        id: "w10-g1",
        headingTr: "Akademik Başvurular",
        headingEn: "Academic References",
        sections: [
          {
            subheadingTr: "1. Otomatik İçindekiler Tablosu Nasıl Çalışır?",
            subheadingEn: "1. How Table of Contents Works",
            contentTr: "İçindekiler tablosunu elle nokta koyarak yazmak kesinlikle yanlıştır! Belgenizde Başlık 1, Başlık 2 stillerini kullandıktan sonra 'Başvurular > İçindekiler Tablosu > Otomatik Tablo 1' seçildiğinde tüm başlıklar ve sayfa numaraları otomatik dizilir.",
            contentEn: "Never manually type dot leaders and page numbers! Once Heading styles are applied, choose References > Table of Contents > Automatic Table to generate it instantly.",
            ribbonPathTr: "Başvurular > İçindekiler Tablosu",
            ribbonPathEn: "References > Table of Contents"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w10-act1",
        type: "identify_command",
        titleTr: "Dipnot Ekleme Kısayolu",
        titleEn: "Insert Footnote Shortcut",
        descriptionTr: "Word'de imlecin bulunduğu yere sayfa altı dipnotu eklemenin klavye kısayolu nedir?",
        descriptionEn: "What is the keyboard shortcut to insert a footnote at the cursor position?",
        hintTr: "Ctrl + Alt ve Footnote'un F harfi.",
        hintEn: "Ctrl + Alt and F for Footnote.",
        explanationTr: "Ctrl+Alt+F kısayolu sayfa altına anında küçük numaralı bir dipnot ekler.",
        explanationEn: "Ctrl+Alt+F instantly inserts a numbered footnote at page bottom.",
        options: [
          { id: "o1", textTr: "Ctrl + Alt + F", textEn: "Ctrl + Alt + F", isCorrect: true, feedbackTr: "Tebrikler! Ctrl+Alt+F en sık kullanılan akademik kısayollardandır." },
          { id: "o2", textTr: "Ctrl + Shift + D", textEn: "Ctrl + Shift + D", isCorrect: false },
          { id: "o3", textTr: "Alt + Shift + F", textEn: "Alt + Shift + F", isCorrect: false },
          { id: "o4", textTr: "Ctrl + F12", textEn: "Ctrl + F12", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Dipnot (Footnote) ile Sonnot (Endnote) arasındaki fark nedir?",
      "Belgeye yeni başlıklar eklendiğinde İçindekiler Tablosu neden otomatik güncellenmez ve 'Tabloyu Güncelleştir' demek gerekir?"
    ],
    preparationQuestionsEn: [
      "What is the difference between a Footnote and an Endnote?",
      "Why must you click 'Update Table' after editing headings in a document?"
    ],
    assignments: [
      {
        id: "w10-a1",
        weekNumber: 10,
        assignmentNumber: 1,
        titleTr: "Ödev 10.1: Başlık Stilleri ve Akademik Düzen",
        titleEn: "Assignment 10.1: Heading Styles & Academic Layout",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Başlık 1 stili uygulama", "İki yana yaslama", "Times New Roman 12 pt"],
        objectivesEn: ["Heading 1 style", "Justified body", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. 2 ana başlık ve gövde metni oluşturun.",
          "2. Başlıklara Başlık 1 stili verin.",
          "3. Gövdeyi Times New Roman 12 pt ve iki yana yaslı yapın.",
          "4. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Create 2 main headings with body text.",
          "2. Apply Heading 1 style to headings.",
          "3. Set body to Times New Roman 12 pt, justified.",
          "4. Submit the file."
        ],
        rubric: [
          {
            id: "w10a1-r1",
            category: "styles",
            titleTr: "Başlık 1 Stili",
            titleEn: "Heading 1 Style",
            points: 50,
            expectedDescriptionTr: "Başlık 1 stili olmalıdır.",
            expectedDescriptionEn: "Heading 1 style required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w10a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Paragraflar iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Paragraphs must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta10_Odev1_Ornek.docx"
      },
      {
        id: "w10-a2",
        weekNumber: 10,
        assignmentNumber: 2,
        titleTr: "Ödev 10.2: Başlık Stilleri ve 1.5 Satır Aralığı",
        titleEn: "Assignment 10.2: Heading Styles & 1.5 Spacing",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["Başlık 1", "1.5 satır aralığı", "Normal kenar boşlukları"],
        objectivesEn: ["Heading 1", "1.5 spacing", "Normal margins"],
        instructionsTr: [
          "1. Başlık 1 stili kullanın.",
          "2. Metne 1.5 satır aralığı verin.",
          "3. Belgenizi yükleyin."
        ],
        instructionsEn: [
          "1. Use Heading 1 style.",
          "2. Apply 1.5 line spacing.",
          "3. Upload your document."
        ],
        rubric: [
          {
            id: "w10a2-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 stili olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w10a2-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Spacing",
            points: 50,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta10_Odev2_Ornek.docx"
      },
      {
        id: "w10-a3",
        weekNumber: 10,
        assignmentNumber: 3,
        titleTr: "Ödev 10.3: Akademik Referans Sayfası Düzeni",
        titleEn: "Assignment 10.3: Academic Reference Page Layout",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Başlık 1", "Times New Roman 12 pt", "Normal kenar boşlukları"],
        objectivesEn: ["Heading 1", "Times New Roman 12 pt", "Normal margins"],
        instructionsTr: [
          "1. 'Kaynakça' başlıklı Başlık 1 stili içeren bir referans listesi hazırlayın.",
          "2. Kenar boşluklarını Normal yapın.",
          "3. Belgenizi yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a references list with Heading 1 style.",
          "2. Set Normal margins.",
          "3. Submit your file."
        ],
        rubric: [
          {
            id: "w10a3-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 bulunmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w10a3-r2",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          }
        ],
        referenceDocName: "Hafta10_Odev3_Ornek.docx"
      },
      {
        id: "w10-a4",
        weekNumber: 10,
        assignmentNumber: 4,
        titleTr: "Ödev 10.4: Tam Yapılandırılmış Akademik Doküman",
        titleEn: "Assignment 10.4: Full Academic Structured Paper",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Başlık 1", "Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı"],
        objectivesEn: ["Heading 1", "Times New Roman 12 pt", "Justified body", "1.5 line spacing"],
        instructionsTr: [
          "1. 2 ana başlıktan oluşan bir araştırma taslağı yazın.",
          "2. Başlık 1, Times New Roman 12 pt, iki yana yaslı ve 1.5 aralıklı yapın.",
          "3. Belgeyi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Write a 2-heading research outline.",
          "2. Apply Heading 1, Times New Roman 12 pt, justified, 1.5 line spacing.",
          "3. Upload the document."
        ],
        rubric: [
          {
            id: "w10a4-r1",
            category: "styles",
            titleTr: "Başlık 1 Stili",
            titleEn: "Heading 1 Style",
            points: 35,
            expectedDescriptionTr: "Başlık 1 olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w10a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 35,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w10a4-r3",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 30,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta10_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w10-q1",
        questionTr: "Otomatik İçindekiler Tablosu oluşturabilmek için belgedeki konu başlıklarına hangi biçimlendirme uygulanmış olmalıdır?",
        questionEn: "What formatting must be applied to topic headings to generate an automated Table of Contents?",
        options: [
          { id: "o1", textTr: "Başlık Stilleri (Heading 1, Heading 2 vb.)", textEn: "Heading Styles (Heading 1, Heading 2, etc.)" },
          { id: "o2", textTr: "Yalnızca Metin Rengi Sarı yapılmalıdır", textEn: "Only Yellow Highlight" },
          { id: "o3", textTr: "Yalnızca Altı Çizili yapılmalıdır", textEn: "Only Underlined" },
          { id: "o4", textTr: "Yazı boyutu 24 pt yapılmalıdır", textEn: "Font size 24 pt only" }
        ],
        correctOptionId: "o1",
        explanationTr: "İçindekiler tablosu motoru, belgedeki Heading stillerini tarayarak başlıkları ve bulundukları sayfa numaralarını otomatik indeksler.",
        explanationEn: "The Table of Contents engine crawls heading styles to index topics and page numbers."
      }
    ],
    summaryTr: "10. Hafta tamamlandı! Otomatik içindekiler tablosu, dipnotlar ve kaynak yönetimini öğrendiniz. 11. Haftada Değişiklikleri Takip Etme, Açıklamalar ve Gözden Geçirme araçlarına geçiyoruz.",
    summaryEn: "Week 10 complete! You learned automated Tables of Contents and citations. In Week 11, we cover Track Changes, Comments, and Reviewing tools."
  },

  // ==========================================
  // HAFTA 11
  // ==========================================
  {
    weekNumber: 11,
    titleTr: "Gözden Geçirme ve Ortak Çalışma",
    titleEn: "Review and Collaboration",
    taglineTr: "Açıklamalar (Comments), Değişiklikleri Takip Et (Track Changes), yazım denetimi",
    taglineEn: "Comments, Track Changes, proofing and spelling, document comparison",
    introductionTr: "Akademik makalelerde tez danışmanları veya ortak yazarlarla çalışırken en çok kullanılan özellikler 'Değişiklikleri Takip Et' (Track Changes) ve 'Açıklamalar'dır (Comments). Bu hafta metne yorum eklemeyi, düzeltmeleri kabul etme/reddetme süreçlerini ve yazım denetimini (F7) öğreneceksiniz.",
    introductionEn: "Collaborative research hinges on peer review tools: Track Changes and Comments. This week explores inserting reviewer notes, accepting/rejecting editorial revisions, and automated grammar and spell checking (F7).",
    prerequisitesTr: ["Belge düzenleme ve temel metin biçimlendirme"],
    prerequisitesEn: ["Document editing and formatting basics"],
    objectives: [
      { id: "w11-obj1", textTr: "Değişiklikleri Takip Et (Track Changes) özelliğini açıp kapatabilme", textEn: "Toggle Track Changes on and off" },
      { id: "w11-obj2", textTr: "Metne Açıklama (Comment) ekleyip yanıtlama ve çözümleyebilme", textEn: "Insert, reply to, and resolve Comments" },
      { id: "w11-obj3", textTr: "Yapılan önerilen değişiklikleri Kabul Et (Accept) veya Reddet (Reject) edebilme", textEn: "Accept or Reject tracked editorial changes" },
      { id: "w11-obj4", textTr: "Yazım ve Dilbilgisi Denetimini (F7) çalıştırabilme", textEn: "Run Spelling and Grammar proofing (F7)" }
    ],
    videos: [
      {
        id: "w11-v1",
        titleTr: "Word'de Değişiklikleri Takip Et ve Açıklamalar",
        titleEn: "Track Changes and Comments in Microsoft Word",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "rV3q5L8V6iQ",
        isVerified: false,
        notesTr: "Bu konu için video içeriği hazırlanmaktadır.",
        notesEn: "Dedicated video in preparation."
      }
    ],
    writtenGuides: [
      {
        id: "w11-g1",
        headingTr: "Ortak Çalışma Araçları",
        headingEn: "Collaboration Tools",
        sections: [
          {
            subheadingTr: "1. Değişiklikleri Takip Et (Ctrl+Shift+E)",
            subheadingEn: "1. Track Changes (Ctrl+Shift+E)",
            contentTr: "Bu özellik açıkken silinen sözcüklerin üstü çizilir, eklenen sözcükler altı çizili ve renkli görünür. Doküman sahibi 'Kabul Et' düğmesine bastığında değişiklik kalıcı hale gelir.",
            contentEn: "When enabled, deletions appear struck-through and additions appear underlined in color. The author can Accept or Reject each change.",
            ribbonPathTr: "Gözden Geçir > İzleme > Değişiklikleri Takip Et",
            ribbonPathEn: "Review > Tracking > Track Changes"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w11-act1",
        type: "identify_command",
        titleTr: "Yazım Denetimi Kısayolu",
        titleEn: "Spelling Check Shortcut",
        descriptionTr: "Tüm belgede yazım ve dilbilgisi denetimini başlatan klavye işlev tuşu hangisidir?",
        descriptionEn: "Which function key starts the Spelling & Grammar checker in Word?",
        hintTr: "F klavye tuşlarından 7 numaralı olanı düşünün.",
        hintEn: "Consider function key number 7.",
        explanationTr: "F7 tuşu Word'ün Yazım ve Dilbilgisi (Spelling & Grammar) denetim penceresini açar.",
        explanationEn: "F7 triggers the Spelling & Grammar proofing pane.",
        options: [
          { id: "o1", textTr: "F7", textEn: "F7", isCorrect: true, feedbackTr: "Doğru! F7 yazım denetimini anında başlatır." },
          { id: "o2", textTr: "F1", textEn: "F1", isCorrect: false },
          { id: "o3", textTr: "F5", textEn: "F5", isCorrect: false },
          { id: "o4", textTr: "F12", textEn: "F12", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Bir makaleyi dergiye gönderirken 'Değişiklikleri Takip Et' açık bırakılırsa ne gibi gizlilik/inceleme sorunları yaşanabilir?",
      "Yorumlar (Comments) silinmeden PDF'e aktarılırsa belgede görünür mü?"
    ],
    preparationQuestionsEn: [
      "What privacy issues arise if tracked changes are left active when submitting a paper?",
      "Do comments show up in exported PDFs if not resolved?"
    ],
    assignments: [
      {
        id: "w11-a1",
        weekNumber: 11,
        assignmentNumber: 1,
        titleTr: "Ödev 11.1: Gözden Geçirilmiş Metin ve İki Yana Yaslama",
        titleEn: "Assignment 11.1: Reviewed Text & Justified Body",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["İki yana yaslama", "Times New Roman 12 pt", "En az 60 kelime"],
        objectivesEn: ["Justified alignment", "Times New Roman 12 pt", "At least 60 words"],
        instructionsTr: [
          "1. 60 kelimelik bir metin hazırlayın.",
          "2. İki yana yaslayın ve Times New Roman 12 pt yapın.",
          "3. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a 60-word text.",
          "2. Justify and set Times New Roman 12 pt.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w11a1-r1",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w11a1-r2",
            category: "font",
            titleTr: "Times New Roman 12 pt",
            titleEn: "Times New Roman 12 pt",
            points: 50,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          }
        ],
        referenceDocName: "Hafta11_Odev1_Ornek.docx"
      },
      {
        id: "w11-a2",
        weekNumber: 11,
        assignmentNumber: 2,
        titleTr: "Ödev 11.2: 1.5 Satır Aralıklı Düzeltme Taslağı",
        titleEn: "Assignment 11.2: Revision Draft with 1.5 Spacing",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["1.5 satır aralığı", "İki yana yaslama", "Normal kenar boşlukları"],
        objectivesEn: ["1.5 line spacing", "Justified body", "Normal margins"],
        instructionsTr: [
          "1. 1.5 satır aralığı uygulayın.",
          "2. İki yana yaslayın.",
          "3. Belgenizi gönderin."
        ],
        instructionsEn: [
          "1. Apply 1.5 line spacing.",
          "2. Justify text.",
          "3. Submit your file."
        ],
        rubric: [
          {
            id: "w11a2-r1",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          },
          {
            id: "w11a2-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "İki yana yaslama olmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta11_Odev2_Ornek.docx"
      },
      {
        id: "w11-a3",
        weekNumber: 11,
        assignmentNumber: 3,
        titleTr: "Ödev 11.3: Başlık Stili ve Normal Kenar Boşlukları",
        titleEn: "Assignment 11.3: Heading Style & Normal Margins",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Başlık 1 stili", "Normal kenar boşluğu", "İki yana yaslama"],
        objectivesEn: ["Heading 1 style", "Normal margins", "Justified text"],
        instructionsTr: [
          "1. Başlık 1 stili ekleyin.",
          "2. Kenar boşluklarını Normal yapın.",
          "3. Belgenizi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Add Heading 1 style.",
          "2. Set margins to Normal.",
          "3. Upload the document."
        ],
        rubric: [
          {
            id: "w11a3-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w11a3-r2",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          }
        ],
        referenceDocName: "Hafta11_Odev3_Ornek.docx"
      },
      {
        id: "w11-a4",
        weekNumber: 11,
        assignmentNumber: 4,
        titleTr: "Ödev 11.4: Bütünleşik Akademik İnceleme Belgesi",
        titleEn: "Assignment 11.4: Integrated Academic Review Paper",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı", "Normal kenar boşlukları"],
        objectivesEn: ["Times New Roman 12 pt", "Justified body", "1.5 spacing", "Normal margins"],
        instructionsTr: [
          "1. 80 kelimelik bir akademik inceleme metni hazırlayın.",
          "2. Times New Roman 12 pt, iki yana yaslı, 1.5 aralıklı ve normal kenar boşluklu yapın.",
          "3. Belgeyi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Write an 80-word academic review text.",
          "2. Times New Roman 12 pt, justified, 1.5 spacing, normal margins.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w11a4-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 30,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          },
          {
            id: "w11a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 40,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w11a4-r3",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 30,
            expectedDescriptionTr: "1.5 satır aralığı uygulanmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta11_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w11-q1",
        questionTr: "Bir belgede 'Değişiklikleri Takip Et' açıkken yapılan bir silme veya eklemeyi kalıcı metin haline getirmek için ne yapılmalıdır?",
        questionEn: "To make an edit permanent when Track Changes is active, what action must the author take?",
        options: [
          { id: "o1", textTr: "Değişikliği Kabul Et (Accept Change)", textEn: "Accept Change" },
          { id: "o2", textTr: "Word'ü kaydetmeden kapatmak", textEn: "Close Word without saving" },
          { id: "o3", textTr: "Sayfa boyutunu A3 yapmak", textEn: "Switch to A3 paper" },
          { id: "o4", textTr: "Metni kopyalamak", textEn: "Copy text" }
        ],
        correctOptionId: "o1",
        explanationTr: "Gözden Geçir sekmesindeki 'Kabul Et' (Accept) düğmesine tıklandığında önerilen değişiklik belgenin kalıcı parçası olur.",
        explanationEn: "Clicking 'Accept Change' under the Review tab adopts the suggested edit permanently."
      }
    ],
    summaryTr: "11. Hafta tamamlandı! Ortak çalışma, izleme ve yazım denetimini öğrendiniz. 12. Haftada Şablonlar, Alan Kodları ve Adres Mektup Birleştirmeyi inceleyeceğiz.",
    summaryEn: "Week 11 complete! You mastered Track Changes and collaborative editing. In Week 12, we explore Templates, Field Codes, and Mail Merge."
  },

  // ==========================================
  // HAFTA 12
  // ==========================================
  {
    weekNumber: 12,
    titleTr: "İleri Düzey Word Özellikleri",
    titleEn: "Advanced Word Features",
    taglineTr: "Şablonlar (.dotx), alan kodları, formlar, içerik denetimleri, adres mektup birleştirme",
    taglineEn: "Templates (.dotx), field codes, forms, content controls, mail merge",
    introductionTr: "Rutin işleri otomatikleştirmek, yüzlerce kişiye kişiselleştirilmiş sertifika veya mektup üretmek Word'ün profesyonel gücüdür. Bu haftada Şablonlar (.dotx), dinamik alan kodları (Tarih, Sayfa sayısı, Dosya yolu) ve Adres Mektup Birleştirme (Mail Merge) süreçlerini kavrayacaksınız.",
    introductionEn: "Automating routine paperwork and producing hundreds of personalized letters or certificates demonstrates advanced power. This week covers Word Templates (.dotx), dynamic field codes (Date, Page counts, File paths), and Mail Merge workflows.",
    prerequisitesTr: ["Tablolar, sayfa yapısı ve metin biçimlendirme"],
    prerequisitesEn: ["Tables, page setup, and text formatting"],
    objectives: [
      { id: "w12-obj1", textTr: "Word şablonu (.dotx) oluşturup tekrar kullanılabilir belge modelleri tasarlayabilme", textEn: "Create reusable Word templates (.dotx)" },
      { id: "w12-obj2", textTr: "Dinamik alan kodları (Tarih, Saat, Sayfa Sayısı) ekleyebilme", textEn: "Insert dynamic field codes (Date, Time, NumPages)" },
      { id: "w12-obj3", textTr: "Adres Mektup Birleştirme (Mail Merge) ile Excel listesinden toplu mektup/sertifika üretebilme", textEn: "Execute Mail Merge from Excel recipient lists" },
      { id: "w12-obj4", textTr: "Geliştirici sekmesinden İçerik Denetimleri (Form alanları) ekleyebilme", textEn: "Add Content Controls (form fields) via the Developer tab" }
    ],
    videos: [
      {
        id: "w12-v1",
        titleTr: "Word'de Adres Mektup Birleştirme ve Şablonlar",
        titleEn: "Mail Merge and Document Templates in Word",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "vB6q7N_mY8c",
        isVerified: false,
        notesTr: "Bu konu için video içeriği hazırlanmaktadır.",
        notesEn: "Dedicated video in preparation."
      }
    ],
    writtenGuides: [
      {
        id: "w12-g1",
        headingTr: "Otomasyon ve Şablonlar",
        headingEn: "Automation and Templates",
        sections: [
          {
            subheadingTr: "1. Adres Mektup Birleştirme (Mail Merge)",
            subheadingEn: "1. Mail Merge Workflow",
            contentTr: "Postalar sekmesi > Adres Mektup Birleştirmeyi Başlat menüsünden mektup, e-posta veya etiket seçilir. Excel tablosundaki sütunlar (Ad, Soyad, Not) 'Birleştirme Alanı Ekle' ile şablona yerleştirilir ve tek tıkla yüzlerce kişiye özel belge üretilir.",
            contentEn: "Under Mailings > Start Mail Merge, link an Excel list. Insert Merge Fields (Name, Grade) and finish to create customized documents for every recipient.",
            ribbonPathTr: "Postalar > Adres Mektup Birleştirmeyi Başlat",
            ribbonPathEn: "Mailings > Start Mail Merge"
          }
        ]
      }
    ],
    activities: [
      {
        id: "w12-act1",
        type: "identify_command",
        titleTr: "Şablon Dosya Uzantısı",
        titleEn: "Template File Extension",
        descriptionTr: "Microsoft Word'de bir belgenin yeniden kullanılabilir bir 'Şablon' olarak kaydedilmesi için hangi dosya uzantısı seçilmelidir?",
        descriptionEn: "Which file extension denotes a Microsoft Word Template?",
        hintTr: "docx değil, 't' harfi template anlamına gelir.",
        hintEn: "'t' stands for template.",
        explanationTr: ".dotx uzantısı Word Şablonu (Document Template) formatıdır.",
        explanationEn: ".dotx designates a Microsoft Word Template file.",
        options: [
          { id: "o1", textTr: ".dotx", textEn: ".dotx", isCorrect: true, feedbackTr: "Doğru! .dotx şablon dosyasıdır ve açıldığında kopyasını üretir." },
          { id: "o2", textTr: ".docx", textEn: ".docx", isCorrect: false },
          { id: "o3", textTr: ".pdf", textEn: ".pdf", isCorrect: false },
          { id: "o4", textTr: ".txt", textEn: ".txt", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Adres Mektup Birleştirmede veri kaynağı olarak Excel kullanılırken sütun başlıklarının önemi nedir?",
      "Geliştirici (Developer) sekmesi Word şeridinde varsayılan olarak neden gizlidir ve nasıl açılır?"
    ],
    preparationQuestionsEn: [
      "Why are clear column headers essential in Excel lists used for Mail Merge?",
      "Why is the Developer tab hidden by default on the Ribbon and how is it enabled?"
    ],
    assignments: [
      {
        id: "w12-a1",
        weekNumber: 12,
        assignmentNumber: 1,
        titleTr: "Ödev 12.1: Şablon Biçimli Standart Belge",
        titleEn: "Assignment 12.1: Template Styled Standard Document",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "Normal kenar boşlukları"],
        objectivesEn: ["Times New Roman 12 pt", "Justified body", "Normal margins"],
        instructionsTr: [
          "1. Kurumsal bir şablon metni hazırlayın.",
          "2. Times New Roman 12 pt, iki yana yaslı ve normal kenar boşluklu yapın.",
          "3. Belgenizi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare an institutional template draft.",
          "2. Set Times New Roman 12 pt, justified, normal margins.",
          "3. Upload your document."
        ],
        rubric: [
          {
            id: "w12a1-r1",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 50,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w12a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta12_Odev1_Ornek.docx"
      },
      {
        id: "w12-a2",
        weekNumber: 12,
        assignmentNumber: 2,
        titleTr: "Ödev 12.2: Tablolu Şablon Taslağı",
        titleEn: "Assignment 12.2: Template Outline with Table",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        objectivesTr: ["3x3 tablo", "Times New Roman 12 pt", "İki yana yaslama"],
        objectivesEn: ["3x3 table", "Times New Roman 12 pt", "Justified text"],
        instructionsTr: [
          "1. 3x3 tablo içeren bir form taslağı oluşturun.",
          "2. Times New Roman 12 pt kullanın.",
          "3. Belgenizi yükleyin."
        ],
        instructionsEn: [
          "1. Build a form draft containing a 3x3 table.",
          "2. Use Times New Roman 12 pt.",
          "3. Submit the file."
        ],
        rubric: [
          {
            id: "w12a2-r1",
            category: "table",
            titleTr: "Tablo Yapısı",
            titleEn: "Table Structure",
            points: 50,
            expectedDescriptionTr: "En az 3x3 tablo olmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          },
          {
            id: "w12a2-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Text must be justified.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta12_Odev2_Ornek.docx"
      },
      {
        id: "w12-a3",
        weekNumber: 12,
        assignmentNumber: 3,
        titleTr: "Ödev 12.3: Başlık Stilli Form Şablonu",
        titleEn: "Assignment 12.3: Form Template with Heading Style",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Başlık 1 stili", "1.5 satır aralığı", "Normal kenar boşluğu"],
        objectivesEn: ["Heading 1 style", "1.5 line spacing", "Normal margins"],
        instructionsTr: [
          "1. Başlık 1 stili uygulayın.",
          "2. 1.5 satır aralığı verin.",
          "3. Belgenizi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Apply Heading 1 style.",
          "2. Set 1.5 line spacing.",
          "3. Upload the document."
        ],
        rubric: [
          {
            id: "w12a3-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w12a3-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta12_Odev3_Ornek.docx"
      },
      {
        id: "w12-a4",
        weekNumber: 12,
        assignmentNumber: 4,
        titleTr: "Ödev 12.4: Bütünleşik İleri Düzey Şablon Belgesi",
        titleEn: "Assignment 12.4: Integrated Advanced Template Paper",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı", "Normal kenar boşlukları"],
        objectivesEn: ["Times New Roman 12 pt", "Justified body", "1.5 spacing", "Normal margins"],
        instructionsTr: [
          "1. 80 kelimelik bir resmi form taslağı hazırlayın.",
          "2. Tüm biçimlendirme kurallarını uygulayın.",
          "3. Belgenizi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Build an 80-word official form draft.",
          "2. Apply all formatting criteria.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w12a4-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 30,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          },
          {
            id: "w12a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 40,
            expectedDescriptionTr: "İki yana yaslama uygulanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w12a4-r3",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 30,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          }
        ],
        referenceDocName: "Hafta12_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w12-q1",
        questionTr: "Bir Excel tablosundaki kişi listesini Word belgesindeki bir davet mektubu şablonuyla birleştirmek için hangi sekme kullanılır?",
        questionEn: "Which tab is used to merge an Excel recipient list into an invitation letter template in Word?",
        options: [
          { id: "o1", textTr: "Postalar (Mailings)", textEn: "Mailings" },
          { id: "o2", textTr: "Ekle (Insert)", textEn: "Insert" },
          { id: "o3", textTr: "Tasarım (Design)", textEn: "Design" },
          { id: "o4", textTr: "Görünüm (View)", textEn: "View" }
        ],
        correctOptionId: "o1",
        explanationTr: "Postalar (Mailings) sekmesi Adres Mektup Birleştirme ve etiket basımı için özel araçları barındırır.",
        explanationEn: "The Mailings tab is dedicated to Mail Merge, recipient list selection, and field insertion."
      }
    ],
    summaryTr: "12. Hafta tamamlandı! Şablonlar, otomasyon ve mektup birleştirmeyi kavradınız. 13. Haftada Profesyonel Belge Tasarımı, erişilebilirlik ve PDF dışa aktarma standartlarını işleyeceğiz.",
    summaryEn: "Week 12 complete! You mastered templates and mail merge automation. In Week 13, we explore Professional Document Design, accessibility, and PDF export standards."
  },

  // ==========================================
  // HAFTA 13
  // ==========================================
  {
    weekNumber: 13,
    titleTr: "Profesyonel Belge Tasarımı ve Erişilebilirlik",
    titleEn: "Professional Document Design and Accessibility",
    taglineTr: "Raporlar, erişilebilir belgeler, alternatif metin (Alt text), PDF dışa aktarma",
    taglineEn: "Reports, accessible documents, Alt text, PDF export standards",
    introductionTr: "Üniversite ve iş hayatında belgeler yalnızca güzel görünmekle kalmamalı; görme engelli bireylerin ekran okuyucularıyla okunabilir (Erişilebilirlik - Accessibility) ve her cihazda bozulmadan açılabilir (Standart PDF/A) olmalıdır. Bu hafta görsel alt metinleri, erişilebilirlik denetleyicisini ve profesyonel PDF dışa aktarmayı öğreneceksiniz.",
    introductionEn: "Professional documents must be universally accessible (WCAG compliant) and render flawlessly across all platforms (PDF/A standards). This week covers image Alt text, the Accessibility Checker, high-contrast typography, and PDF export.",
    prerequisitesTr: ["Stiller, görseller ve sayfa düzeni"],
    prerequisitesEn: ["Styles, visuals, and page setup"],
    objectives: [
      { id: "w13-obj1", textTr: "Erişilebilirlik Denetleyicisini (Check Accessibility) çalıştırıp sorunları çözebilme", textEn: "Run Accessibility Checker and resolve flagged issues" },
      { id: "w13-obj2", textTr: "Belgedeki resim ve şekillere açıklayıcı Alternatif Metin (Alt Text) ekleyebilme", textEn: "Add descriptive Alt Text to figures and shapes" },
      { id: "w13-obj3", textTr: "Gözden Geçir sekmesinden belgeyi parola ile koruma altına alabilme", textEn: "Protect documents with editing restrictions or passwords" },
      { id: "w13-obj4", textTr: "Belgeyi erişilebilir ve fontları gömülü PDF formatında dışa aktarabilme", textEn: "Export accessible PDF documents with embedded fonts" }
    ],
    videos: [
      {
        id: "w13-v1",
        titleTr: "Word'de Erişilebilirlik ve Profesyonel PDF Dışa Aktarma",
        titleEn: "Accessibility & Professional PDF Export in Word",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "S-nHYzK-BVg",
        isVerified: true,
        duration: "13:40",
        notesTr: "Gözden Geçir > Erişilebilirliği Denetle ve PDF ayarları.",
        notesEn: "Review > Check Accessibility and PDF preservation options."
      }
    ],
    writtenGuides: [
      {
        id: "w13-g1",
        headingTr: "Erişilebilirlik İlkeleri",
        headingEn: "Accessibility Principles",
        sections: [
          {
            subheadingTr: "1. Alternatif Metin (Alt Text) Neden Zorunludur?",
            subheadingEn: "1. Why Alt Text is Required",
            contentTr: "Ekran okuyucu kullanan görme engelli bir öğrenci, resmin içeriğini yalnızca sizin girdiğiniz 'Alternatif Metin' sayesinde işitebilir. Resme sağ tıklayıp 'Alternatif Metni Düzenle' seçilerek görselin anlamı 1-2 cümleyle yazılmalıdır.",
            contentEn: "Screen readers rely on Alt Text to describe images to visually impaired users. Right-click any image and choose 'Edit Alt Text' to provide a concise description.",
            ribbonPathTr: "Resme sağ tık > Alternatif Metni Düzenle...",
            ribbonPathEn: "Right click picture > Edit Alt Text..."
          }
        ]
      }
    ],
    activities: [
      {
        id: "w13-act1",
        type: "identify_command",
        titleTr: "Erişilebilirlik Aracı Yeri",
        titleEn: "Accessibility Checker Location",
        descriptionTr: "Word belgesindeki kontrast hatalarını ve eksik alt metinleri denetleyen araç hangi sekmede yer alır?",
        descriptionEn: "Which tab houses the tool that checks contrast and missing alt text in Word?",
        hintTr: "Yazım denetimi ve ortak çalışma araçlarının bulunduğu sekmeyi düşünün.",
        hintEn: "Consider the tab that hosts spell checking and reviewing.",
        explanationTr: "Gözden Geçir (Review) sekmesinde 'Erişilebilirliği Denetle' komutu bulunur.",
        explanationEn: "Under the Review tab, click 'Check Accessibility' to audit your document.",
        options: [
          { id: "o1", textTr: "Gözden Geçir (Review)", textEn: "Review", isCorrect: true, feedbackTr: "Doğru! Gözden Geçir sekmesinden erişilebilirlik raporu alınır." },
          { id: "o2", textTr: "Ekle (Insert)", textEn: "Insert", isCorrect: false },
          { id: "o3", textTr: "Tasarım (Design)", textEn: "Design", isCorrect: false },
          { id: "o4", textTr: "Postalar (Mailings)", textEn: "Mailings", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "Metin rengi ile arka plan rengi arasındaki kontrast oranının zayıf olması erişilebilirlik açısından neye yol açar?",
      "Tablolarda 'Üstbilgi Satırını Yinele' seçeneği ekran okuyucular için neden önemlidir?"
    ],
    preparationQuestionsEn: [
      "What accessibility issue stems from poor text-to-background color contrast?",
      "Why is 'Repeat Header Rows' essential for screen reader users navigating multi-page tables?"
    ],
    assignments: [
      {
        id: "w13-a1",
        weekNumber: 13,
        assignmentNumber: 1,
        titleTr: "Ödev 13.1: Erişilebilir Tipografi ve Düzen",
        titleEn: "Assignment 13.1: Accessible Typography & Layout",
        difficulty: "beginner",
        estimatedMinutes: 25,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "Normal kenar boşlukları"],
        objectivesEn: ["Times New Roman 12 pt", "Justified body", "Normal margins"],
        instructionsTr: [
          "1. Erişilebilirlik standartlarına uygun 70 kelimelik bir metin hazırlayın.",
          "2. Times New Roman 12 pt, iki yana yaslı ve normal kenar boşluklu yapın.",
          "3. Belgenizi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a 70-word accessible text.",
          "2. Set Times New Roman 12 pt, justified, normal margins.",
          "3. Submit the file."
        ],
        rubric: [
          {
            id: "w13a1-r1",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 50,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w13a1-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "İki yana yaslama olmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta13_Odev1_Ornek.docx"
      },
      {
        id: "w13-a2",
        weekNumber: 13,
        assignmentNumber: 2,
        titleTr: "Ödev 13.2: Erişilebilir Tablo ve Başlık Stilleri",
        titleEn: "Assignment 13.2: Accessible Table & Heading Styles",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["Başlık 1 stili", "3x3 tablo", "İki yana yaslama"],
        objectivesEn: ["Heading 1 style", "3x3 table", "Justified body"],
        instructionsTr: [
          "1. Başlık 1 stili ekleyin.",
          "2. 3x3 tablo oluşturun.",
          "3. Metni iki yana yaslayın ve yükleyin."
        ],
        instructionsEn: [
          "1. Add Heading 1 style.",
          "2. Create a 3x3 table.",
          "3. Justify text and upload."
        ],
        rubric: [
          {
            id: "w13a2-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w13a2-r2",
            category: "table",
            titleTr: "Tablo Yapısı",
            titleEn: "Table Structure",
            points: 50,
            expectedDescriptionTr: "En az 3x3 tablo olmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          }
        ],
        referenceDocName: "Hafta13_Odev2_Ornek.docx"
      },
      {
        id: "w13-a3",
        weekNumber: 13,
        assignmentNumber: 3,
        titleTr: "Ödev 13.3: 1.5 Satır Aralıklı Profesyonel Rapor",
        titleEn: "Assignment 13.3: Professional Report with 1.5 Spacing",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        objectivesTr: ["1.5 satır aralığı", "Normal kenar boşlukları", "Times New Roman 12 pt"],
        objectivesEn: ["1.5 line spacing", "Normal margins", "Times New Roman 12 pt"],
        instructionsTr: [
          "1. Kenar boşluklarını Normal yapın.",
          "2. 1.5 satır aralığı verin ve iki yana yaslayın.",
          "3. Belgenizi DOCX olarak gönderin."
        ],
        instructionsEn: [
          "1. Set Normal margins.",
          "2. Apply 1.5 line spacing and justify text.",
          "3. Submit as DOCX."
        ],
        rubric: [
          {
            id: "w13a3-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          },
          {
            id: "w13a3-r2",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 50,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta13_Odev3_Ornek.docx"
      },
      {
        id: "w13-a4",
        weekNumber: 13,
        assignmentNumber: 4,
        titleTr: "Ödev 13.4: Bütünleşik Erişilebilir Doküman Projesi",
        titleEn: "Assignment 13.4: Integrated Accessible Document Project",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Başlık 1", "Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı"],
        objectivesEn: ["Heading 1", "Times New Roman 12 pt", "Justified body", "1.5 line spacing"],
        instructionsTr: [
          "1. 80 kelimelik erişilebilir bir doküman oluşturun.",
          "2. Başlık 1, TNR 12 pt, iki yana yaslı ve 1.5 aralıklı yapın.",
          "3. Belgenizi kaydedip yükleyin."
        ],
        instructionsEn: [
          "1. Build an 80-word accessible document.",
          "2. Heading 1, TNR 12 pt, justified, 1.5 spacing.",
          "3. Save and upload."
        ],
        rubric: [
          {
            id: "w13a4-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 35,
            expectedDescriptionTr: "Başlık 1 olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w13a4-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 35,
            expectedDescriptionTr: "İki yana yaslama olmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w13a4-r3",
            category: "paragraph",
            titleTr: "1.5 Satır Aralığı",
            titleEn: "1.5 Line Spacing",
            points: 30,
            expectedDescriptionTr: "1.5 satır aralığı olmalıdır.",
            expectedDescriptionEn: "1.5 line spacing required.",
            checkFn: "check_line_spacing",
            params: { minSpacingTwips: 340 }
          }
        ],
        referenceDocName: "Hafta13_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w13-q1",
        questionTr: "Ekran okuyucu yazılımların görme engelli kullanıcılara resimlerin içeriğini aktarabilmesi için resimlere hangi bilginin girilmesi zorunludur?",
        questionEn: "What metadata must be provided on images for screen readers to convey visual meaning to visually impaired users?",
        options: [
          { id: "o1", textTr: "Alternatif Metin (Alt Text)", textEn: "Alt Text" },
          { id: "o2", textTr: "Resim Çerçevesi Rengi", textEn: "Picture Border Color" },
          { id: "o3", textTr: "Dosya Boyutu (MB)", textEn: "File Size (MB)" },
          { id: "o4", textTr: "Resmin Parlaklık Değeri", textEn: "Brightness Value" }
        ],
        correctOptionId: "o1",
        explanationTr: "Alternatif Metin (Alt Text), görseli göremeyen bireyler için görselin içeriğini metin olarak betimleyen zorunlu erişilebilirlik standardıdır.",
        explanationEn: "Alt Text is the universal accessibility standard describing visual content textually for non-sighted users."
      }
    ],
    summaryTr: "13. Hafta tamamlandı! Erişilebilirlik, alternatif metinler ve profesyonel yayıncılık standartlarını kavradınız. 14. ve son haftada kapsamlı Final Bütünleşik Word Projesini gerçekleştireceğiz!",
    summaryEn: "Week 13 complete! You mastered accessibility and professional publishing standards. In Week 14, we conclude with the Final Integrated Capstone Project!"
  },

  // ==========================================
  // HAFTA 14
  // ==========================================
  {
    weekNumber: 14,
    titleTr: "Final Bütünleşik Word Projesi",
    titleEn: "Final Integrated Word Capstone Project",
    taglineTr: "Kapsamlı akademik tez/rapor hazırlama, bütünleşik değerlendirme, ustalık",
    taglineEn: "Comprehensive thesis/report production, end-to-end evaluation, mastery",
    introductionTr: "Tebrikler, 14 haftalık WordLab TR yolculuğunun zirvesine ulaştınız! Bu final haftasında dönem boyunca öğrendiğiniz tüm becerileri (Tipografi, Paragraflar, Kenar Boşlukları, Tablolar, Başlık Stilleri, Sayfa Numaralandırması, Görseller) tek bir akademik araştırma raporunda kusursuz şekilde bir araya getireceksiniz.",
    introductionEn: "Congratulations, you reached the summit of WordLab TR! In this final week, you synthesize all 14 weeks of expertise (Typography, Paragraphs, Margins, Tables, Styles, Page Numbers, Visuals) into an authentic capstone document.",
    prerequisitesTr: ["Hafta 1-13 arasındaki tüm Word modülleri"],
    prerequisitesEn: ["All Word modules from Weeks 1 through 13"],
    objectives: [
      { id: "w14-obj1", textTr: "Tüm akademik biçimlendirme standartlarını tek bir bitirme dokümanında eksiksiz uygulayabilme", textEn: "Execute all academic styling standards within a single capstone paper" },
      { id: "w14-obj2", textTr: "Otomatik DOCX değerlendirme motorunda tüm kriterleri sağlayarak 100 tam puan alabilme", textEn: "Satisfy all rubric criteria on the automated OOXML assessment engine for 100 points" },
      { id: "w14-obj3", textTr: "Eğitimde Bilişim Teknolojileri dersinin Word kazanımlarını tam yeterlilikle tamamlayabilme", textEn: "Demonstrate complete course learning outcome mastery" }
    ],
    videos: [
      {
        id: "w14-v1",
        titleTr: "Final Projesi: Tez ve Rapor Formatlama Ustalık Rehberi",
        titleEn: "Capstone Project: Masterclass in Thesis & Report Formatting",
        channel: "Eğitimde Bilişim Teknolojileri",
        youtubeId: "S-nHYzK-BVg",
        isVerified: true,
        duration: "21:10",
        notesTr: "Tüm dönemin final değerlendirme standartları ve profesyonel ipuçları.",
        notesEn: "End-of-term assessment standards and pro tips for document perfection."
      }
    ],
    writtenGuides: [
      {
        id: "w14-g1",
        headingTr: "Final Projesi Mükemmellik Kriterleri",
        headingEn: "Capstone Perfection Criteria",
        sections: [
          {
            subheadingTr: "1. 100 Puanlık Altın Standart",
            subheadingEn: "1. The 100-Point Gold Standard",
            contentTr: "Belgeniz: 1) Normal (2.5 cm) kenar boşluklarına sahip olmalı, 2) Times New Roman 12 pt yazı tipi ve boyutu içermeli, 3) Gövde metinleri iki yana yaslı ve 1.5 satır aralıklı olmalı, 4) Başlık 1 stili hiyerarşik uygulanmalı, 5) En az 3x3 biçimlendirilmiş bir veri tablosu barındırmalıdır.",
            contentEn: "Your paper must have: 1) Normal 2.5 cm margins, 2) Times New Roman 12 pt, 3) Justified 1.5 line spaced paragraphs, 4) Heading 1 styles, 5) At least a 3x3 formatted data table."
          }
        ]
      }
    ],
    activities: [
      {
        id: "w14-act1",
        type: "formatting_choice",
        titleTr: "Final Belge Teslim Formatı",
        titleEn: "Final Document Submission Format",
        descriptionTr: "Akademik bir tez veya proje tamamlandığında dijital arşivleme ve biçim bozulmasını önlemek için hangi formatta dışa aktarılmalıdır?",
        descriptionEn: "To preserve formatting across devices when archiving a thesis, which format should be exported?",
        hintTr: "Taşınabilir Belge Formatı (Portable Document Format).",
        hintEn: "Portable Document Format.",
        explanationTr: "PDF formatı, yazı tiplerini ve sayfa düzenini dondurarak her cihazda ve işletim sisteminde aynı görünmesini garanti eder.",
        explanationEn: "PDF preserves exact fonts, geometry, and layout across any device or operating system.",
        options: [
          { id: "o1", textTr: "PDF / PDF/A", textEn: "PDF / PDF/A", isCorrect: true, feedbackTr: "Tebrikler! PDF akademik paylaşım ve arşivlemenin altın standardıdır." },
          { id: "o2", textTr: "TXT (Düz Metin)", textEn: "TXT (Plain Text)", isCorrect: false },
          { id: "o3", textTr: "RTF", textEn: "RTF", isCorrect: false },
          { id: "o4", textTr: "HTML", textEn: "HTML", isCorrect: false }
        ]
      }
    ],
    preparationQuestionsTr: [
      "WordLab TR platformunda öğrendiğiniz hangi Word özelliği gelecekteki akademik hayatınızda size en çok zaman kazandıracak?",
      "Bir Word belgesini bitirmeden önce yapılması gereken son üç kalite kontrol adımı nedir?"
    ],
    preparationQuestionsEn: [
      "Which Word capability mastered in WordLab TR will save you the most time in your future academic career?",
      "What are the final three quality assurance steps before submitting any document?"
    ],
    assignments: [
      {
        id: "w14-a1",
        weekNumber: 14,
        assignmentNumber: 1,
        titleTr: "Ödev 14.1: Final Bütünleşik Bitirme Tezi Taslağı",
        titleEn: "Assignment 14.1: Final Integrated Capstone Thesis Draft",
        difficulty: "advanced",
        estimatedMinutes: 60,
        objectivesTr: [
          "Times New Roman 12 pt yazı tipi",
          "İki yana yaslama (Justify)",
          "1.5 satır aralığı",
          "Normal kenar boşlukları (2.5 cm)",
          "Başlık 1 (Heading 1) stili",
          "En az 3x3 biçimlendirilmiş veri tablosu",
          "En az 100 kelime akademik metin"
        ],
        objectivesEn: [
          "Times New Roman 12 pt",
          "Justified text",
          "1.5 line spacing",
          "Normal margins (2.5 cm)",
          "Heading 1 style",
          "At least 3x3 formatted data table",
          "At least 100 words academic content"
        ],
        instructionsTr: [
          "1. '21. Yüzyılda Eğitim Teknolojileri ve Geleceğin Öğrenme Ortamları' başlıklı kapsamlı bir bitirme tezi taslağı hazırlayın.",
          "2. Sayfa kenar boşluklarını Normal (2.5 cm) yapın.",
          "3. Yazı tipini Times New Roman 12 pt seçin.",
          "4. Bölüm başlığına Stiller galerisinden 'Başlık 1' stili atayın.",
          "5. Gövde paragraflarını iki yana yaslayın ve 1.5 satır aralığı verin.",
          "6. Belgeye başlık satırı gölgelendirilmiş en az 3 satır x 3 sütun bir veri tablosu ekleyin.",
          "7. Belgenizi .docx formatında kaydedin ve sisteme yükleyerek 100 tam puanla mezun olun!"
        ],
        instructionsEn: [
          "1. Author a capstone paper on 21st Century Educational Technologies.",
          "2. Set Margins to Normal (2.5 cm).",
          "3. Choose Times New Roman 12 pt.",
          "4. Apply Heading 1 style to section headers.",
          "5. Justify body paragraphs with 1.5 line spacing.",
          "6. Embed a 3x3 styled data table with shaded header.",
          "7. Upload and achieve a perfect 100 score!"
        ],
        rubric: [
          {
            id: "w14a1-r1",
            category: "styles",
            titleTr: "Başlık 1 Stili",
            titleEn: "Heading 1 Style",
            points: 20,
            expectedDescriptionTr: "Belgede en az 1 adet Başlık 1 stili bulunmalıdır.",
            expectedDescriptionEn: "Must contain at least 1 Heading 1 style.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w14a1-r2",
            category: "font",
            titleTr: "Times New Roman 12 pt",
            titleEn: "Times New Roman 12 pt",
            points: 20,
            expectedDescriptionTr: "Metin Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Text must be Times New Roman 12 pt.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w14a1-r3",
            category: "paragraph",
            titleTr: "İki Yana Yaslama & 1.5 Satır Aralığı",
            titleEn: "Justify & 1.5 Line Spacing",
            points: 20,
            expectedDescriptionTr: "Paragraflar iki yana yaslı ve 1.5 aralıklı olmalıdır.",
            expectedDescriptionEn: "Justified with 1.5 line spacing required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w14a1-r4",
            category: "layout",
            titleTr: "Sayfa Kenar Boşlukları (2.5 cm)",
            titleEn: "Page Margins (2.5 cm)",
            points: 20,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Margins must be normal.",
            checkFn: "check_page_margins"
          },
          {
            id: "w14a1-r5",
            category: "table",
            titleTr: "Biçimlendirilmiş Tablo (3x3)",
            titleEn: "Formatted Table (3x3)",
            points: 20,
            expectedDescriptionTr: "En az 3x3 biçimlendirilmiş veri tablosu olmalıdır.",
            expectedDescriptionEn: "At least 3x3 formatted table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          }
        ],
        referenceDocName: "Hafta14_Odev1_Ornek.docx"
      },
      {
        id: "w14-a2",
        weekNumber: 14,
        assignmentNumber: 2,
        titleTr: "Ödev 14.2: Tablolu Final Raporu",
        titleEn: "Assignment 14.2: Capstone Table Report",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["3x3 tablo", "Times New Roman 12 pt", "İki yana yaslama"],
        objectivesEn: ["3x3 table", "Times New Roman 12 pt", "Justified body"],
        instructionsTr: [
          "1. 3x3 tablo ve iki yana yaslı metin içeren bir final raporu hazırlayın.",
          "2. Times New Roman 12 pt kullanın.",
          "3. Belgenizi yükleyin."
        ],
        instructionsEn: [
          "1. Build a final report with 3x3 table and justified text.",
          "2. Use Times New Roman 12 pt.",
          "3. Upload the document."
        ],
        rubric: [
          {
            id: "w14a2-r1",
            category: "table",
            titleTr: "Tablo Yapısı",
            titleEn: "Table Structure",
            points: 50,
            expectedDescriptionTr: "En az 3x3 tablo olmalıdır.",
            expectedDescriptionEn: "At least 3x3 table required.",
            checkFn: "check_table_structure",
            params: { minRows: 3, minCols: 3 }
          },
          {
            id: "w14a2-r2",
            category: "paragraph",
            titleTr: "İki Yana Yaslama",
            titleEn: "Justify Alignment",
            points: 50,
            expectedDescriptionTr: "Metin iki yana yaslanmalıdır.",
            expectedDescriptionEn: "Justify required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          }
        ],
        referenceDocName: "Hafta14_Odev2_Ornek.docx"
      },
      {
        id: "w14-a3",
        weekNumber: 14,
        assignmentNumber: 3,
        titleTr: "Ödev 14.3: Başlık Stilli ve Kenar Boşluklu Final Belgesi",
        titleEn: "Assignment 14.3: Heading & Margin Capstone Paper",
        difficulty: "advanced",
        estimatedMinutes: 35,
        objectivesTr: ["Başlık 1 stili", "Normal kenar boşluğu", "1.5 satır aralığı"],
        objectivesEn: ["Heading 1 style", "Normal margins", "1.5 line spacing"],
        instructionsTr: [
          "1. Başlık 1 stili uygulayın.",
          "2. Kenar boşluklarını Normal yapın ve 1.5 aralık verin.",
          "3. Belgenizi DOCX olarak gönderin."
        ],
        instructionsEn: [
          "1. Apply Heading 1 style.",
          "2. Set Normal margins and 1.5 line spacing.",
          "3. Submit as DOCX."
        ],
        rubric: [
          {
            id: "w14a3-r1",
            category: "styles",
            titleTr: "Başlık 1",
            titleEn: "Heading 1",
            points: 50,
            expectedDescriptionTr: "Başlık 1 olmalıdır.",
            expectedDescriptionEn: "Heading 1 required.",
            checkFn: "check_headings",
            params: { minLevel1: 1 }
          },
          {
            id: "w14a3-r2",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 50,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          }
        ],
        referenceDocName: "Hafta14_Odev3_Ornek.docx"
      },
      {
        id: "w14-a4",
        weekNumber: 14,
        assignmentNumber: 4,
        titleTr: "Ödev 14.4: 100 Kelimelik Kapsamlı Bitirme Projesi",
        titleEn: "Assignment 14.4: 100-Word Comprehensive Capstone Project",
        difficulty: "advanced",
        estimatedMinutes: 45,
        objectivesTr: ["Times New Roman 12 pt", "İki yana yaslama", "1.5 satır aralığı", "Normal kenar boşlukları", "En az 100 kelime"],
        objectivesEn: ["Times New Roman 12 pt", "Justified body", "1.5 spacing", "Normal margins", "At least 100 words"],
        instructionsTr: [
          "1. 100 kelimelik eksiksiz bir bitirme projesi metni hazırlayın.",
          "2. Tüm biçimlendirme kurallarını uygulayın.",
          "3. Belgenizi sisteme yükleyin."
        ],
        instructionsEn: [
          "1. Prepare a complete 100-word capstone project paper.",
          "2. Follow all formatting specifications.",
          "3. Upload the document."
        ],
        rubric: [
          {
            id: "w14a4-r1",
            category: "layout",
            titleTr: "Kenar Boşlukları",
            titleEn: "Margins",
            points: 25,
            expectedDescriptionTr: "Kenar boşlukları normal olmalıdır.",
            expectedDescriptionEn: "Normal margins required.",
            checkFn: "check_page_margins"
          },
          {
            id: "w14a4-r2",
            category: "font",
            titleTr: "Yazı Tipi & Boyut",
            titleEn: "Font & Size",
            points: 25,
            expectedDescriptionTr: "Times New Roman 12 pt olmalıdır.",
            expectedDescriptionEn: "Times New Roman 12 pt required.",
            checkFn: "check_font_size",
            params: { fontSizePt: 12 }
          },
          {
            id: "w14a4-r3",
            category: "paragraph",
            titleTr: "İki Yana Yaslama & 1.5 Aralık",
            titleEn: "Justify & 1.5 Spacing",
            points: 25,
            expectedDescriptionTr: "İki yana yaslama ve 1.5 satır aralığı uygulanmalıdır.",
            expectedDescriptionEn: "Justify & 1.5 spacing required.",
            checkFn: "check_paragraph_alignment",
            params: { alignment: "both" }
          },
          {
            id: "w14a4-r4",
            category: "elements",
            titleTr: "100 Kelime Hacmi",
            titleEn: "100 Words Volume",
            points: 25,
            expectedDescriptionTr: "En az 100 kelime içermelidir.",
            expectedDescriptionEn: "At least 100 words required.",
            checkFn: "check_minimum_words",
            params: { minWords: 100 }
          }
        ],
        referenceDocName: "Hafta14_Odev4_Ornek.docx"
      }
    ],
    formativeQuiz: [
      {
        id: "w14-q1",
        questionTr: "Tebrikler! 14 haftalık program boyunca Word'ün arayüzünden tipografiye, tablolardan stillere ve akademik başvurulara kadar tüm alanları öğrendiniz. Akademik bir belgenin nihai kalitesini belirleyen en önemli faktör nedir?",
        questionEn: "What is the single most critical factor determining the ultimate quality of an academic paper?",
        options: [
          { id: "o1", textTr: "Biçimlendirme kurallarına tutarlılıkla uymak ve okuyucuya saygılı, temiz bir hiyerarşi kurmak", textEn: "Strict formatting consistency and an accessible, respectful visual hierarchy" },
          { id: "o2", textTr: "Belgede mümkün olduğunca çok renkli yazı tipi kullanmak", textEn: "Using as many bright font colors as possible" },
          { id: "o3", textTr: "Sayfa kenar boşluklarını sıfırlamak", textEn: "Zeroing out margins" },
          { id: "o4", textTr: "Tüm paragrafları sağa hizalamak", textEn: "Right aligning all text" }
        ],
        correctOptionId: "o1",
        explanationTr: "Bilişim ve kelime işlem becerilerinin özü; estetik, okunabilir, erişilebilir ve standartlara saygılı dokümanlar üretebilmektir.",
        explanationEn: "The essence of word processing mastery is producing aesthetic, legible, accessible, and standard-compliant scholarship."
      }
    ],
    summaryTr: "TEBRİKLER! WordLab TR 14 haftalık Microsoft Word müfredatını başarıyla tamamladınız. Artık akademik tezlerden kurumsal raporlara kadar her türlü belgeyi profesyonelce tasarlayabilir, deneme sınavı merkezinde bilgilerinizi sınayabilirsiniz!",
    summaryEn: "CONGRATULATIONS! You completed the entire 14-week WordLab TR curriculum. You are now equipped to author professional academic theses, research papers, and institutional documents with confidence!"
  }
];
