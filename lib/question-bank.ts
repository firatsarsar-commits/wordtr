import { ExamQuestion } from './types';

export const initialQuestionBank: ExamQuestion[] = [
  // 1-5: Hafta 1 (Giriş & Arayüz)
  {
    id: 'q-1',
    weekNumber: 1,
    topicTr: "Word Arayüzü ve Bileşenleri",
    topicEn: "Word Interface & Components",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Microsoft Word penceresinin üst kısmında yer alan ve sekmeler ile komut gruplarını barındıran ana menü çubuğuna ne ad verilir?",
    questionEn: "What is the primary interface element located at the top of Microsoft Word containing tabs and command groups called?",
    options: [
      { id: 'o1', textTr: "Durum Çubuğu (Status Bar)", textEn: "Status Bar" },
      { id: 'o2', textTr: "Şerit (Ribbon)", textEn: "The Ribbon" },
      { id: 'o3', textTr: "Gezinti Bölmesi (Navigation Pane)", textEn: "Navigation Pane" },
      { id: 'o4', textTr: "Cetvel (Ruler)", textEn: "Ruler" }
    ],
    correctOptionId: 'o2',
    explanationTr: "Şerit (Ribbon), Word'ün üst kısmında sekmeleri (Giriş, Ekle vb.) ve komut gruplarını toplayan ana denetim merkezidir.",
    explanationEn: "The Ribbon is the top-level command bar grouping tabs (Home, Insert, etc.) and tool groups."
  },
  {
    id: 'q-2',
    weekNumber: 1,
    topicTr: "Dosya Kaydetme Kısayolu",
    topicEn: "File Saving Shortcuts",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de üzerinde çalışılan bir belgeyi mevcut adıyla hızlıca kaydetmek için hangi kısayol tuşu kullanılır?",
    questionEn: "Which keyboard shortcut quickly saves the current document under its existing name?",
    options: [
      { id: 'o1', textTr: "Ctrl + S", textEn: "Ctrl + S" },
      { id: 'o2', textTr: "Ctrl + P", textEn: "Ctrl + P" },
      { id: 'o3', textTr: "Ctrl + O", textEn: "Ctrl + O" },
      { id: 'o4', textTr: "Ctrl + N", textEn: "Ctrl + N" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ctrl+S (Save) belgedeki en son değişiklikleri dosyaya kaydeder.",
    explanationEn: "Ctrl+S (Save) commits all recent edits to disk."
  },
  {
    id: 'q-3',
    weekNumber: 1,
    topicTr: "Geri Al / Yinele",
    topicEn: "Undo and Redo",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de son yapılan işlemi geri almak (Undo) ve geri alınan işlemi yinelemek (Redo) için sırasıyla hangi tuş kombinasyonları kullanılır?",
    questionEn: "Which keyboard combinations are used respectively to Undo the last action and Redo it?",
    options: [
      { id: 'o1', textTr: "Ctrl+Z ve Ctrl+Y", textEn: "Ctrl+Z and Ctrl+Y" },
      { id: 'o2', textTr: "Ctrl+C ve Ctrl+V", textEn: "Ctrl+C and Ctrl+V" },
      { id: 'o3', textTr: "Ctrl+X ve Ctrl+Z", textEn: "Ctrl+X and Ctrl+Z" },
      { id: 'o4', textTr: "Ctrl+A ve Ctrl+S", textEn: "Ctrl+A and Ctrl+S" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ctrl+Z son işlemi geri alır; Ctrl+Y ise geri alınan işlemi tekrar yürütür.",
    explanationEn: "Ctrl+Z undoes the last action, while Ctrl+Y redoes it."
  },
  {
    id: 'q-4',
    weekNumber: 1,
    topicTr: "Belge İstatistikleri",
    topicEn: "Document Statistics",
    difficulty: 'easy',
    cognitiveLevel: 'comprehension',
    questionTr: "Belgedeki toplam kelime sayısı, geçerli sayfa numarası ve yazım denetim durumu ekranın neresinde yer alır?",
    questionEn: "Where are total word count, current page, and proofing status displayed in the Word window?",
    options: [
      { id: 'o1', textTr: "Hızlı Erişim Araç Çubuğunda", textEn: "Quick Access Toolbar" },
      { id: 'o2', textTr: "Ekranın en altındaki Durum Çubuğunda (Status Bar)", textEn: "Status Bar at the very bottom" },
      { id: 'o3', textTr: "Görünüm sekmesinin içinde", textEn: "Inside the View tab" },
      { id: 'o4', textTr: "Başlık çubuğunun sağ köşesinde", textEn: "Right corner of Title Bar" }
    ],
    correctOptionId: 'o2',
    explanationTr: "Pencerenin en altında uzanan Durum Çubuğu, sayfa sayısı ve kelime sayısını sürekli güncel tutar.",
    explanationEn: "The Status Bar along the bottom continually monitors page count, words, and language."
  },
  {
    id: 'q-5',
    weekNumber: 1,
    topicTr: "Farklı Kaydet ve Biçimler",
    topicEn: "Save As and Formats",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Bir Word belgesini başka bir bilgisayarda açıldığında yazı tipi ve sayfa düzeni kaymalarını önlemek amacıyla hangi formatta dışa aktarmak en uygundur?",
    questionEn: "To prevent layout shifts and missing fonts when sending a paper to another computer, which format is ideal?",
    options: [
      { id: 'o1', textTr: "Salt Metin (.txt)", textEn: "Plain Text (.txt)" },
      { id: 'o2', textTr: "PDF (.pdf)", textEn: "PDF (.pdf)" },
      { id: 'o3', textTr: "Zengin Metin Biçimi (.rtf)", textEn: "Rich Text Format (.rtf)" },
      { id: 'o4', textTr: "Web Sayfası (.html)", textEn: "Web Page (.html)" }
    ],
    correctOptionId: 'o2',
    explanationTr: "PDF formatı, görsel düzeni ve yazı tiplerini dondurarak tüm aygıtlarda birebir aynı görünümü korur.",
    explanationEn: "PDF locks vector typography and geometric layouts so it renders consistently anywhere."
  },

  // 6-9: Hafta 2 (Metin & Karakter Biçimlendirme)
  {
    id: 'q-6',
    weekNumber: 2,
    topicTr: "Kalın Biçimlendirme Kısayolu",
    topicEn: "Bold Formatting Shortcut",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Türkçe Microsoft Word sürümünde seçili metni KALIN yapmak için hangi kısayol kullanılır?",
    questionEn: "Which shortcut toggles Bold styling in Turkish Microsoft Word?",
    options: [
      { id: 'o1', textTr: "Ctrl + K", textEn: "Ctrl + K" },
      { id: 'o2', textTr: "Ctrl + B", textEn: "Ctrl + B" },
      { id: 'o3', textTr: "Ctrl + T", textEn: "Ctrl + T" },
      { id: 'o4', textTr: "Ctrl + Shift + K", textEn: "Ctrl + Shift + K" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Türkçe Word sürümünde Kalın için Ctrl+K kullanılır (İngilizce sürümde Ctrl+B).",
    explanationEn: "Turkish Word maps Kalın (Bold) to Ctrl+K."
  },
  {
    id: 'q-7',
    weekNumber: 2,
    topicTr: "Büyük/Küçük Harf Dönüşümü",
    topicEn: "Change Case Toggle",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Yanlışlıkla Caps Lock açıkken yazılmış bir başlığı tümü büyük, tümü küçük veya ilk harfleri büyük hale getiren döngü kısayolu hangisidir?",
    questionEn: "Which shortcut cycles selected text through UPPERCASE, lowercase, and Title Case?",
    options: [
      { id: 'o1', textTr: "Shift + F3", textEn: "Shift + F3" },
      { id: 'o2', textTr: "Ctrl + F3", textEn: "Ctrl + F3" },
      { id: 'o3', textTr: "Alt + F3", textEn: "Alt + F3" },
      { id: 'o4', textTr: "Ctrl + Shift + A", textEn: "Ctrl + Shift + A" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Shift+F3, seçili metnin büyük/küçük harf durumlarını sırayla dönüştürür.",
    explanationEn: "Shift+F3 toggles capitalization states across selection."
  },
  {
    id: 'q-8',
    weekNumber: 2,
    topicTr: "Biçimlendirmeyi Temizle",
    topicEn: "Clear All Formatting",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "İnternetten veya başka bir kaynaktan kopyalanan metnin üzerindeki tüm yabancı yazı tiplerini ve renkleri kaldırıp varsayılan metne döndüren komut hangisidir?",
    questionEn: "Which command strips all external font sizes, colors, and styles from copied text returning it to Normal style?",
    options: [
      { id: 'o1', textTr: "Tüm Biçimlendirmeyi Temizle (Giriş > Yazı Tipi)", textEn: "Clear All Formatting (Home > Font)" },
      { id: 'o2', textTr: "Geri Al (Ctrl+Z)", textEn: "Undo (Ctrl+Z)" },
      { id: 'o3', textTr: "Biçim Boyacısı", textEn: "Format Painter" },
      { id: 'o4', textTr: "Metni Değiştir", textEn: "Replace Text" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Giriş sekmesindeki 'Tüm Biçimlendirmeyi Temizle' (pembe silgi simgesi) seçili metni yalın Normal stiline çeker.",
    explanationEn: "Clear All Formatting resets text formatting to default document Normal style."
  },
  {
    id: 'q-9',
    weekNumber: 2,
    topicTr: "Biçim Boyacısı",
    topicEn: "Format Painter",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Word'de bir metnin biçimini (yazı tipi, rengi, boyutu) kopyalayıp ardışık BİRDEN ÇOK farklı metne uygulamak için Biçim Boyacısı simgesine ne yapılmalıdır?",
    questionEn: "To apply copied formatting to multiple non-contiguous pieces of text, what should you do on the Format Painter icon?",
    options: [
      { id: 'o1', textTr: "Biçim Boyacısı simgesine çift tıklanmalıdır", textEn: "Double-click the Format Painter icon" },
      { id: 'o2', textTr: "Sağ tıklanıp kopyala denmelidir", textEn: "Right-click and copy" },
      { id: 'o3', textTr: "Shift tuşuna basılı tutulmalıdır", textEn: "Hold Shift key" },
      { id: 'o4', textTr: "Her metin için baştan tek tek tıklanmalıdır", textEn: "Single-click each time" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Biçim Boyacısı'na çift tıklandığında araç kilitlenir ve Esc tuşuna basılana kadar ardışık olarak uygulanabilir.",
    explanationEn: "Double-clicking Format Painter locks it active for repeated multi-target application until Esc is pressed."
  },

  // 10-14: Hafta 3 (Paragraf Biçimlendirme)
  {
    id: 'q-10',
    weekNumber: 3,
    topicTr: "İki Yana Yaslama (Justify)",
    topicEn: "Justified Alignment",
    difficulty: 'easy',
    cognitiveLevel: 'comprehension',
    questionTr: "Metin satırlarının hem sol hem de sağ kenar boşluklarına düzgün bir hat şeklinde hizalanmasını sağlayan hizalama seçeneği hangisidir?",
    questionEn: "Which alignment option aligns text evenly against both left and right margins?",
    options: [
      { id: 'o1', textTr: "Sola Hizala (Align Left)", textEn: "Align Left" },
      { id: 'o2', textTr: "İki Yana Yasla (Justify)", textEn: "Justify" },
      { id: 'o3', textTr: "Ortala (Center)", textEn: "Center" },
      { id: 'o4', textTr: "Sağa Hizala (Align Right)", textEn: "Align Right" }
    ],
    correctOptionId: 'o2',
    explanationTr: "İki Yana Yasla (Justify), kelime aralıklarını ayarlayarak her iki kenarda düzgün hizalama sağlar.",
    explanationEn: "Justify adjusts spacing between words so text aligns squarely with both margins."
  },
  {
    id: 'q-11',
    weekNumber: 3,
    topicTr: "Paragraf Boşlukları",
    topicEn: "Paragraph Spacing",
    difficulty: 'medium',
    cognitiveLevel: 'analysis',
    questionTr: "Paragraflar arasında dikey mesafe bırakmak için arka arkaya boş 'Enter' tuşuna basmak neden profesyonel bir hata olarak kabul edilir?",
    questionEn: "Why is pressing Enter repeatedly between paragraphs considered an amateur formatting error?",
    options: [
      { id: 'o1', textTr: "Yazı boyutu veya sayfa kenarları değiştiğinde sayfa sonlarında dengesiz kaymalara ve taşmalara yol açar", textEn: "It causes erratic pagination shifts when margins or fonts change" },
      { id: 'o2', textTr: "Belgenin renk kalitesini düşürür", textEn: "Degrades print color quality" },
      { id: 'o3', textTr: "Yazım denetimini tamamen durdurur", textEn: "Halts spell checker" },
      { id: 'o4', textTr: "Word belgesinin açılmasını engeller", textEn: "Corrupts file opening" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Boş satırlar sayfa yapısı değiştiğinde sayfanın en başına boş satır düşmesine yol açar; doğrusu 'Paragraf Sonrası Boşluk (nk)' kullanmaktır.",
    explanationEn: "Blank Enter lines reflow awkwardly onto the tops of subsequent pages; Paragraph After spacing should be used."
  },
  {
    id: 'q-12',
    weekNumber: 3,
    topicTr: "İlk Satır Girintisi",
    topicEn: "First Line Indent",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Akademik tezlerde paragrafların ilk satırının 1.25 cm içeriden başlaması için hangi ayar yapılmalıdır?",
    questionEn: "To indent the first line of every paragraph by 1.25 cm in a thesis, which setting is used?",
    options: [
      { id: 'o1', textTr: "Paragraf > Girinti > Özel: İlk Satır (1.25 cm)", textEn: "Paragraph > Indentation > Special: First Line (1.25 cm)" },
      { id: 'o2', textTr: "Klavyeden Space (boşluk) tuşuna 10 kez basılmalıdır", textEn: "Press Spacebar 10 times" },
      { id: 'o3', textTr: "Sayfa kenar boşluğu sağdan 1.25 cm artırılmalıdır", textEn: "Increase right margin by 1.25 cm" },
      { id: 'o4', textTr: "Asılı Girinti (Hanging Indent) seçilmelidir", textEn: "Choose Hanging Indent" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Paragraf iletişim kutusundaki 'Özel > İlk Satır' (First Line) seçeneği otomatik olarak sadece ilk satıra girinti uygular.",
    explanationEn: "Paragraph Dialog > Special: First Line automatically indents the opening line of each paragraph."
  },
  {
    id: 'q-13',
    weekNumber: 3,
    topicTr: "Satır Aralığı Standartları",
    topicEn: "Line Spacing Standards",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Türkiye'deki üniversitelerin tez yazım kılavuzlarında en sık zorunlu tutulan satır aralığı değeri hangisidir?",
    questionEn: "Which line spacing multiplier is most commonly mandated by Turkish university thesis guidelines?",
    options: [
      { id: 'o1', textTr: "1.0 (Tek)", textEn: "1.0 (Single)" },
      { id: 'o2', textTr: "1.5 Satır Aralığı", textEn: "1.5 Line Spacing" },
      { id: 'o3', textTr: "3.0 Satır Aralığı", textEn: "3.0 Line Spacing" },
      { id: 'o4', textTr: "0.5 Satır Aralığı", textEn: "0.5 Line Spacing" }
    ],
    correctOptionId: 'o2',
    explanationTr: "1.5 satır aralığı hem jüri okuması hem de akademik ergonomi açısından standarttır.",
    explanationEn: "1.5 line spacing is the traditional standard for academic review and readability."
  },
  {
    id: 'q-14',
    weekNumber: 3,
    topicTr: "Madde İşaretleri Hiyerarşisi",
    topicEn: "Bullet List Hierarchy",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Madde işaretli bir listede bir alt düzeye (alt maddeye) geçmek için klavyeden hangi tuşa basılır?",
    questionEn: "Which key demotes a list item to a nested sub-bullet level?",
    options: [
      { id: 'o1', textTr: "Tab", textEn: "Tab" },
      { id: 'o2', textTr: "Shift + Tab", textEn: "Shift + Tab" },
      { id: 'o3', textTr: "Ctrl + Tab", textEn: "Ctrl + Tab" },
      { id: 'o4', textTr: "Alt + Tab", textEn: "Alt + Tab" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Tab tuşu maddeyi bir düzey içeri (alt maddeye) kaydırır; Shift+Tab ise bir üst düzeye geri çeker.",
    explanationEn: "Tab indents to a lower hierarchy level; Shift+Tab outdents back to the parent level."
  },

  // 15-18: Hafta 4 (Sayfa Düzeni & Bölümler)
  {
    id: 'q-15',
    weekNumber: 4,
    topicTr: "Sayfa Sonu Kısayolu",
    topicEn: "Page Break Shortcut",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Mevcut sayfayı sonlandırıp bir sonraki sayfaya anında geçmek için hangi kısayol tuşuna basılır?",
    questionEn: "Which shortcut inserts an immediate Page Break terminating the current page?",
    options: [
      { id: 'o1', textTr: "Ctrl + Enter", textEn: "Ctrl + Enter" },
      { id: 'o2', textTr: "Shift + Enter", textEn: "Shift + Enter" },
      { id: 'o3', textTr: "Alt + Enter", textEn: "Alt + Enter" },
      { id: 'o4', textTr: "Ctrl + Shift + Enter", textEn: "Ctrl + Shift + Enter" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ctrl+Enter kısayolu belgeye Sayfa Sonu (Page Break) ekler.",
    explanationEn: "Ctrl+Enter creates an instant Page Break."
  },
  {
    id: 'q-16',
    weekNumber: 4,
    topicTr: "Bölüm Sonu İşlevi",
    topicEn: "Section Break Function",
    difficulty: 'hard',
    cognitiveLevel: 'analysis',
    questionTr: "Bir belgede önceki sayfalar Dikey yönlendirmedeyken, yalnızca geniş bir tablonun bulunduğu 4. sayfayı YATAY yapmak için ne eklenmelidir?",
    questionEn: "To make only page 4 Landscape while keeping surrounding pages Portrait, what must be inserted?",
    options: [
      { id: 'o1', textTr: "Basit Sayfa Sonu (Ctrl+Enter)", textEn: "Standard Page Break (Ctrl+Enter)" },
      { id: 'o2', textTr: "Bölüm Sonu: Sonraki Sayfa (Section Break: Next Page)", textEn: "Section Break: Next Page" },
      { id: 'o3', textTr: "Metin Kaydırma Sonu", textEn: "Text Wrapping Break" },
      { id: 'o4', textTr: "Sütun Sonu", textEn: "Column Break" }
    ],
    correctOptionId: 'o2',
    explanationTr: "Sayfa yönlendirmesi veya kenar boşlukları bölüm (section) bazlıdır. Farklı yönlendirme için Bölüm Sonu eklenmelidir.",
    explanationEn: "Orientation is a section-level property; changing it requires a Section Break (Next Page)."
  },
  {
    id: 'q-17',
    weekNumber: 4,
    topicTr: "Standart Kenar Boşlukları",
    topicEn: "Standard Page Margins",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de 'Normal' kenar boşluğu seçeneğinde her kenardan (Üst, Alt, Sol, Sağ) kaçar cm boşluk bırakılır?",
    questionEn: "In the 'Normal' margins preset, what distance is left on each margin in centimeters?",
    options: [
      { id: 'o1', textTr: "2.5 cm (yaklaşık 1 inç)", textEn: "2.5 cm (approx 1 inch)" },
      { id: 'o2', textTr: "1.0 cm", textEn: "1.0 cm" },
      { id: 'o3', textTr: "5.0 cm", textEn: "5.0 cm" },
      { id: 'o4', textTr: "3.5 cm", textEn: "3.5 cm" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Normal kenar boşluğu her yönden 2.54 cm (1 inç) boşluk tanımlar.",
    explanationEn: "Normal margins provide 2.54 cm (1 inch) on top, bottom, left, and right."
  },
  {
    id: 'q-18',
    weekNumber: 4,
    topicTr: "Çoklu Sütun Düzeni",
    topicEn: "Multi-Column Layout",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Akademik makale veya gazete formatında metni iki eşit sütuna bölmek için hangi sekme kullanılır?",
    questionEn: "Which tab is accessed to divide text into two equal newspaper-style columns?",
    options: [
      { id: 'o1', textTr: "Düzen (Layout) > Sütunlar", textEn: "Layout > Columns" },
      { id: 'o2', textTr: "Ekle > Tablo", textEn: "Insert > Table" },
      { id: 'o3', textTr: "Giriş > Paragraf", textEn: "Home > Paragraph" },
      { id: 'o4', textTr: "Tasarım > Sayfa Kenarlıkları", textEn: "Design > Page Borders" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Düzen sekmesindeki 'Sütunlar' (Columns) menüsünden metin 2 veya 3 sütuna ayrılabilir.",
    explanationEn: "Layout > Columns provides multi-column configurations."
  },

  // 19-22: Hafta 5 (Tablolar)
  {
    id: 'q-19',
    weekNumber: 5,
    topicTr: "Hücre Birleştirme",
    topicEn: "Cell Merging",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Bir tabloda yan yana seçilen iki veya daha fazla hücreyi tek bir geniş hücreye dönüştüren komut hangisidir?",
    questionEn: "Which command combines selected adjacent table cells into one continuous cell?",
    options: [
      { id: 'o1', textTr: "Hücreleri Birleştir (Merge Cells)", textEn: "Merge Cells" },
      { id: 'o2', textTr: "Hücreleri Böl (Split Cells)", textEn: "Split Cells" },
      { id: 'o3', textTr: "Tabloyu Böl (Split Table)", textEn: "Split Table" },
      { id: 'o4', textTr: "Metni Kaydır", textEn: "Wrap Text" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Hücreleri Birleştir (Merge Cells), seçili hücreleri tek çatı altında toplar.",
    explanationEn: "Merge Cells unifies selected cells into a single entity."
  },
  {
    id: 'q-20',
    weekNumber: 5,
    topicTr: "Tablo Bağlamsal Sekmeleri",
    topicEn: "Table Contextual Tabs",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Word'de bir tablo seçildiğinde Şerit menüde beliren iki özel bağlamsal sekme hangileridir?",
    questionEn: "Which two contextual tabs appear in the Ribbon whenever a table is selected in Word?",
    options: [
      { id: 'o1', textTr: "Tablo Tasarımı (Table Design) ve Düzen (Layout)", textEn: "Table Design and Layout" },
      { id: 'o2', textTr: "Grafik Biçimi ve Çizim", textEn: "Chart Format and Drawing" },
      { id: 'o3', textTr: "Başvurular ve Postalar", textEn: "References and Mailings" },
      { id: 'o4', textTr: "Gözden Geçir ve Görünüm", textEn: "Review and View" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Tablo seçildiğinde 'Tablo Tasarımı' (renk, kenarlık) ve 'Düzen' (satır/sütun, boyut, hizalama) sekmeleri görünür.",
    explanationEn: "Selecting a table summons Table Design (styles, borders) and Table Layout (geometry, alignment)."
  },
  {
    id: 'q-21',
    weekNumber: 5,
    topicTr: "Tablo Başlığını Yineleme",
    topicEn: "Repeat Header Rows",
    difficulty: 'hard',
    cognitiveLevel: 'application',
    questionTr: "Birden çok sayfaya taşan uzun bir tabloda, sütun başlıklarının her sayfanın başında otomatik olarak yinelenmesi için hangi komut kullanılır?",
    questionEn: "In a multi-page table, which feature repeats column headers automatically at the top of subsequent pages?",
    options: [
      { id: 'o1', textTr: "Üstbilgi Satırlarını Yinele (Repeat Header Rows)", textEn: "Repeat Header Rows" },
      { id: 'o2', textTr: "Başlıkları elle her sayfaya kopyalamak", textEn: "Manually copy headers onto each page" },
      { id: 'o3', textTr: "Tabloyu ikiye bölmek", textEn: "Split Table" },
      { id: 'o4', textTr: "Sayfa kenar boşluklarını sıfırlamak", textEn: "Set margins to zero" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Tablo Düzeni sekmesindeki 'Üstbilgi Satırlarını Yinele' komutu, başlık satırını her yeni sayfada otomatik tekrarlar.",
    explanationEn: "Repeat Header Rows under Table Layout propagates headers across page splits automatically."
  },
  {
    id: 'q-22',
    weekNumber: 5,
    topicTr: "Hücre Gölgelendirmesi (Shading)",
    topicEn: "Cell Shading",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Tablodaki hücrelerin arka plan rengini değiştirmek için hangi komut kullanılır?",
    questionEn: "Which command changes the background fill color of selected table cells?",
    options: [
      { id: 'o1', textTr: "Gölgelendirme (Shading)", textEn: "Shading" },
      { id: 'o2', textTr: "Yazı Tipi Rengi", textEn: "Font Color" },
      { id: 'o3', textTr: "Sayfa Rengi", textEn: "Page Color" },
      { id: 'o4', textTr: "Metin Efekti", textEn: "Text Effect" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Tablo Tasarımı > Gölgelendirme (Shading), hücrelerin iç dolgu rengini boyar.",
    explanationEn: "Table Design > Shading fills cell backgrounds."
  },

  // 23-26: Hafta 6 (Resimler & Görseller)
  {
    id: 'q-23',
    weekNumber: 6,
    topicTr: "Metin Kaydırma Modları",
    topicEn: "Text Wrapping Modes",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Belgeye eklenen bir resmin fare ile istenilen yere serbestçe taşınabilmesi ve metnin resmin çevresinden akması için hangi metin kaydırma seçilmelidir?",
    questionEn: "To allow an image to be freely repositioned while surrounding text wraps around it, which mode is selected?",
    options: [
      { id: 'o1', textTr: "Metinle Aynı Hizada (In Line with Text)", textEn: "In Line with Text" },
      { id: 'o2', textTr: "Kare (Square)", textEn: "Square" },
      { id: 'o3', textTr: "Metnin Arkasına (Behind Text)", textEn: "Behind Text" },
      { id: 'o4', textTr: "Metnin Önüne (In Front of Text)", textEn: "In Front of Text" }
    ],
    correctOptionId: 'o2',
    explanationTr: "Kare (Square) metin kaydırma, metnin görselin sınırlarından düzgünce akmasını ve görselin taşınabilmesini sağlar.",
    explanationEn: "Square wrapping flows text around the rectangular boundaries of the picture."
  },
  {
    id: 'q-24',
    weekNumber: 6,
    topicTr: "Resim Kırpma",
    topicEn: "Cropping Pictures",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Eklenen bir görselin istenmeyen dış kısımlarını kesip atmak için hangi komut kullanılır?",
    questionEn: "Which tool trims away unwanted outer portions of an image in Word?",
    options: [
      { id: 'o1', textTr: "Kırp (Crop)", textEn: "Crop" },
      { id: 'o2', textTr: "Sil (Delete)", textEn: "Delete" },
      { id: 'o3', textTr: "Sıkıştır (Compress)", textEn: "Compress" },
      { id: 'o4', textTr: "Döndür (Rotate)", textEn: "Rotate" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Resim Biçimi > Kırp (Crop) aracı görselin istenmeyen kısımlarını gizler/keser.",
    explanationEn: "Picture Format > Crop trims edges."
  },
  {
    id: 'q-25',
    weekNumber: 6,
    topicTr: "SmartArt Grafikleri",
    topicEn: "SmartArt Graphics",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Süreç şemaları, organizasyon hiyerarşileri ve döngüsel modeller oluşturmak için kullanılan görsel araç hangisidir?",
    questionEn: "Which built-in visual tool creates flowcharts, organizational hierarchies, and cyclical diagrams?",
    options: [
      { id: 'o1', textTr: "SmartArt", textEn: "SmartArt" },
      { id: 'o2', textTr: "WordArt", textEn: "WordArt" },
      { id: 'o3', textTr: "Ekran Görüntüsü", textEn: "Screenshot" },
      { id: 'o4', textTr: "Küçük Resim", textEn: "ClipArt" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ekle > SmartArt, hazır şablonlarla profesyonel kavram ve süreç diyagramları sunar.",
    explanationEn: "SmartArt delivers structured diagrams for hierarchies, cycles, and workflows."
  },
  {
    id: 'q-26',
    weekNumber: 6,
    topicTr: "En Boy Oranını Koruma",
    topicEn: "Lock Aspect Ratio",
    difficulty: 'easy',
    cognitiveLevel: 'application',
    questionTr: "Bir resmi boyutlandırırken resmin basıklaşmasını veya uzamasını (deforme olmasını) önlemek için nereden tutarak boyutlandırmak gerekir?",
    questionEn: "To resize a picture without distorting its aspect ratio, which handle should be dragged?",
    options: [
      { id: 'o1', textTr: "Köşe tutamaçlarından (Corner handles)", textEn: "Corner handles" },
      { id: 'o2', textTr: "Yalnızca üst kenar tutamacından", textEn: "Top edge handle only" },
      { id: 'o3', textTr: "Yalnızca sol kenar tutamacından", textEn: "Left edge handle only" },
      { id: 'o4', textTr: "Resmin tam ortasından", textEn: "Center of the image" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Köşe tutamaçlarından boyutlandırma en boy oranını eşit oranda korur.",
    explanationEn: "Dragging corner handles scales width and height proportionally."
  },

  // 27-28: Hafta 7 (Ara Değerlendirme & Bütünleşik)
  {
    id: 'q-27',
    weekNumber: 7,
    topicTr: "Bütünleşik Belge Hiyerarşisi",
    topicEn: "Integrated Document Hierarchy",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Akademik bir araştırma raporunda başlıklar, paragraflar ve tablolar arasındaki görsel tutarlılığı sağlayan en temel kural nedir?",
    questionEn: "What fundamental discipline ensures typographic harmony across headings, paragraphs, and tables?",
    options: [
      { id: 'o1', textTr: "Tüm belgede aynı temel yazı tipi ailesine (örn. Times New Roman) bağlı kalmak", textEn: "Adhering consistently to one primary font family (e.g. Times New Roman)" },
      { id: 'o2', textTr: "Her sayfada farklı bir yazı tipi kullanmak", textEn: "Using a different font on each page" },
      { id: 'o3', textTr: "Tüm metinleri kalın yazmak", textEn: "Making all text bold" },
      { id: 'o4', textTr: "Kenar boşluklarını her sayfada değiştirmek", textEn: "Varying margins on every page" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Yazı tipi ailesinde tutarlılık profesyonel tipografinin birinci kuralıdır.",
    explanationEn: "Typographic consistency anchors document clarity and readability."
  },
  {
    id: 'q-28',
    weekNumber: 7,
    topicTr: "Belge İnceleme / Boşluk Kontrolü",
    topicEn: "Proofing White Space",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Metin içindeki gereksiz çift boşlukları ve gizli biçimlendirme işaretlerini (Enter, boşluk vb.) ekranda görmek için hangi düğme açılır?",
    questionEn: "Which button toggles non-printing characters (Enter, spaces, tabs) to reveal formatting flaws?",
    options: [
      { id: 'o1', textTr: "Tümünü Göster (Ters P - ¶ simgesi)", textEn: "Show/Hide Formatting Marks (Pilcrow ¶)" },
      { id: 'o2', textTr: "Görünüm > Izgara Çizgileri", textEn: "View > Gridlines" },
      { id: 'o3', textTr: "Yazım Denetimi", textEn: "Spelling Check" },
      { id: 'o4', textTr: "Büyüteç", textEn: "Magnifier" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Giriş sekmesindeki ¶ (Tümünü Göster) düğmesi, görünmeyen boşluk ve paragraf işaretlerini görünür kılar.",
    explanationEn: "The pilcrow (¶) icon reveals hidden formatting marks like spaces and paragraph breaks."
  },

  // 29-32: Hafta 8 (Stiller)
  {
    id: 'q-29',
    weekNumber: 8,
    topicTr: "Başlık Stillerinin Önemi",
    topicEn: "Significance of Heading Styles",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Bir başlığı biçimlendirirken sadece yazı boyutunu büyütmek yerine 'Başlık 1' (Heading 1) stili kullanmanın en büyük faydası nedir?",
    questionEn: "What is the primary architectural benefit of applying 'Heading 1' instead of just enlarging font size?",
    options: [
      { id: 'o1', textTr: "Otomatik İçindekiler Tablosu ve Gezinti Bölmesini çalıştırır", textEn: "It unlocks automated Tables of Contents and the Navigation Pane" },
      { id: 'o2', textTr: "Dosya boyutunu küçültür", textEn: "Reduces file size" },
      { id: 'o3', textTr: "Belgeyi şifreler", textEn: "Encrypts the document" },
      { id: 'o4', textTr: "Yazım hatalarını otomatik düzeltir", textEn: "Auto-fixes grammar" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Başlık stilleri, Word'ün belge yapısını anlamasını sağlayarak otomatik içindekiler tablosu ve gezinmeyi mümkün kılar.",
    explanationEn: "Heading styles structure the document hierarchy, driving automated TOCs and Navigation."
  },
  {
    id: 'q-30',
    weekNumber: 8,
    topicTr: "Stil Değiştirme (Modify Style)",
    topicEn: "Modifying Style Definitions",
    difficulty: 'hard',
    cognitiveLevel: 'application',
    questionTr: "Belgedeki tüm Başlık 1'lerin rengini ve yazı tipini aynı anda tek hamlede değiştirmek için ne yapılmalıdır?",
    questionEn: "To restyle every Heading 1 across a 100-page paper simultaneously in one action, what is done?",
    options: [
      { id: 'o1', textTr: "Stil Galerisinde Başlık 1 kutusuna sağ tıklayıp 'Değiştir' (Modify) seçilmelidir", textEn: "Right-click Heading 1 in the Styles gallery and select 'Modify'" },
      { id: 'o2', textTr: "Tüm sayfalar tek tek taranıp manuel değiştirilmelidir", textEn: "Find each heading manually" },
      { id: 'o3', textTr: "Word'ün dili değiştirilmelidir", textEn: "Change Word interface language" },
      { id: 'o4', textTr: "Sayfa kenar boşlukları daraltılmalıdır", textEn: "Narrow margins" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Stil Galerisinden stili 'Değiştir' (Modify) dediğinizde, o stile bağlı tüm başlıklar anında güncellenir.",
    explanationEn: "Modifying the style definition propagates changes instantly to all instances across the document."
  },
  {
    id: 'q-31',
    weekNumber: 8,
    topicTr: "Gezinti Bölmesi Kısayolu",
    topicEn: "Navigation Pane Shortcut",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de sol panelde Gezinti Bölmesini açarak başlıklar arasında arama ve gezinme yapmak için hangi kısayol kullanılır?",
    questionEn: "Which shortcut opens the Navigation Pane for searching and browsing heading hierarchy?",
    options: [
      { id: 'o1', textTr: "Ctrl + F", textEn: "Ctrl + F" },
      { id: 'o2', textTr: "Ctrl + G", textEn: "Ctrl + G" },
      { id: 'o3', textTr: "Ctrl + H", textEn: "Ctrl + H" },
      { id: 'o4', textTr: "Ctrl + K", textEn: "Ctrl + K" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ctrl+F hem bulma hem de Gezinti Bölmesini açarak başlıklar arasında tıklamayla geçiş sağlar.",
    explanationEn: "Ctrl+F invokes Find and opens the Navigation Pane."
  },
  {
    id: 'q-32',
    weekNumber: 8,
    topicTr: "Başlık Düzeyleri Hiyerarşisi",
    topicEn: "Heading Levels Hierarchy",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Bir makalede '2. Bulgular' ana başlığı Başlık 1 olarak tanımlanmışsa, altındaki '2.1. Nitel Bulgular' başlığı hangi stille tanımlanmalıdır?",
    questionEn: "If '2. Findings' is styled as Heading 1, which style should '2.1. Qualitative Findings' receive?",
    options: [
      { id: 'o1', textTr: "Başlık 2 (Heading 2)", textEn: "Heading 2" },
      { id: 'o2', textTr: "Başlık 1 (Heading 1)", textEn: "Heading 1" },
      { id: 'o3', textTr: "Normal", textEn: "Normal" },
      { id: 'o4', textTr: "Vurgu (Emphasis)", textEn: "Emphasis" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ana başlığın alt dalları 'Başlık 2' (Heading 2), onun da altındakiler 'Başlık 3' olarak hiyerarşik yapılandırılır.",
    explanationEn: "Sub-headings descend hierarchically to Heading 2, Heading 3, and so on."
  },

  // 33-36: Hafta 9 (Üstbilgi & Sayfa Numaralandırma)
  {
    id: 'q-33',
    weekNumber: 9,
    topicTr: "İlk Sayfada Farklı",
    topicEn: "Different First Page",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Bir tezin kapak sayfasında sayfa numarası ve üstbilginin görünmesini engellemek için hangi ayar açılmalıdır?",
    questionEn: "To suppress headers and page numbers specifically on the title/cover page, which setting is activated?",
    options: [
      { id: 'o1', textTr: "İlk Sayfada Farklı (Different First Page)", textEn: "Different First Page" },
      { id: 'o2', textTr: "Tek ve Çift Sayfalarda Farklı", textEn: "Different Odd & Even Pages" },
      { id: 'o3', textTr: "Üstbilgiyi Sil", textEn: "Delete Header" },
      { id: 'o4', textTr: "Kapak Sayfasını Kaldır", textEn: "Remove Cover Page" }
    ],
    correctOptionId: 'o1',
    explanationTr: "'İlk Sayfada Farklı' onay kutusu ilk sayfanın üstbilgi ve altbilgisini bağımsız kılar.",
    explanationEn: "'Different First Page' isolates page 1 headers and footers from the rest of the document."
  },
  {
    id: 'q-34',
    weekNumber: 9,
    topicTr: "Dinamik Sayfa Numarası Alanı",
    topicEn: "Dynamic Page Field",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de sayfa numarası eklerken altbilgiye doğrudan '1' yazıldığında neden tüm sayfalarda '1' rakamı görünür?",
    questionEn: "Why does typing '1' manually into a footer cause '1' to show up on every page?",
    options: [
      { id: 'o1', textTr: "Dinamik { PAGE } alan kodu yerine statik metin yazıldığı için", textEn: "Because static text was entered instead of the dynamic { PAGE } field" },
      { id: 'o2', textTr: "Word sürümü eski olduğu için", textEn: "Word version is outdated" },
      { id: 'o3', textTr: "Yazı boyutu yanlış olduğu için", textEn: "Font size is wrong" },
      { id: 'o4', textTr: "Tablo olmadığı için", textEn: "No table exists" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Sayfa numarasının otomatik artması için 'Ekle > Sayfa Numarası' ile dinamik PAGE alanı eklenmelidir.",
    explanationEn: "Dynamic page numbers require the { PAGE } field inserted via Insert > Page Number."
  },
  {
    id: 'q-35',
    weekNumber: 9,
    topicTr: "Öncekine Bağla (Link to Previous)",
    topicEn: "Link to Previous",
    difficulty: 'hard',
    cognitiveLevel: 'analysis',
    questionTr: "Yeni bir bölüme başlandığında bu bölümün üstbilgisinin önceki bölümden bağımsız olması için hangi düğmenin kapatılması gerekir?",
    questionEn: "When creating a new section, which button must be toggled off to decouple headers from prior sections?",
    options: [
      { id: 'o1', textTr: "Öncekine Bağla (Link to Previous)", textEn: "Link to Previous" },
      { id: 'o2', textTr: "Sonrakine Bağla", textEn: "Link to Next" },
      { id: 'o3', textTr: "Farklı İlk Sayfa", textEn: "Different First Page" },
      { id: 'o4', textTr: "Üstbilgiyi Kapat", textEn: "Close Header" }
    ],
    correctOptionId: 'o1',
    explanationTr: "'Öncekine Bağla' (Link to Previous) sarı vurgusu kaldırıldığında bölümün üst/alt bilgisi bağımsızlaşır.",
    explanationEn: "Disabling 'Link to Previous' severs header inheritance from previous sections."
  },
  {
    id: 'q-36',
    weekNumber: 9,
    topicTr: "Sayfa Numarası Biçimlendirme",
    topicEn: "Format Page Numbers",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Tezin giriş kısmında sayfa numaralarını Roma rakamı (i, ii, iii), gövde bölümünde ise 1'den başlatmak için hangi komut kullanılır?",
    questionEn: "To number introductory front matter with Roman numerals (i, ii) and restart body pages at 1, which dialog is used?",
    options: [
      { id: 'o1', textTr: "Sayfa Numaralarını Biçimlendir (Format Page Numbers)", textEn: "Format Page Numbers dialog" },
      { id: 'o2', textTr: "Yazı Tipi Değiştir", textEn: "Change Font" },
      { id: 'o3', textTr: "Paragraf Ayarları", textEn: "Paragraph Settings" },
      { id: 'o4', textTr: "Stil Galerisi", textEn: "Style Gallery" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Sayfa Numaralarını Biçimlendir menüsünden sayı formatı (i, ii, iii) ve 'Başlangıç: 1' değeri tanımlanır.",
    explanationEn: "Format Page Numbers controls numbering schemes (Roman vs Arabic) and start values."
  },

  // 37-40: Hafta 10 (Başvurular & İçindekiler)
  {
    id: 'q-37',
    weekNumber: 10,
    topicTr: "Otomatik İçindekiler Tablosu",
    topicEn: "Automated Table of Contents",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de otomatik İçindekiler Tablosu eklemek için hangi ana sekme kullanılır?",
    questionEn: "Which main tab contains the Automated Table of Contents command in Word?",
    options: [
      { id: 'o1', textTr: "Başvurular (References)", textEn: "References" },
      { id: 'o2', textTr: "Ekle (Insert)", textEn: "Insert" },
      { id: 'o3', textTr: "Düzen (Layout)", textEn: "Layout" },
      { id: 'o4', textTr: "Görünüm (View)", textEn: "View" }
    ],
    correctOptionId: 'o1',
    explanationTr: "İçindekiler tablosu, dipnotlar ve kaynakça araçları 'Başvurular' (References) sekmesindedir.",
    explanationEn: "Table of Contents, footnotes, and bibliographies reside on the References tab."
  },
  {
    id: 'q-38',
    weekNumber: 10,
    topicTr: "Dipnot Ekleme Kısayolu",
    topicEn: "Insert Footnote Shortcut",
    difficulty: 'medium',
    cognitiveLevel: 'knowledge',
    questionTr: "Word'de imlecin bulunduğu konuma anında sayfa altı dipnotu eklemenin klavye kısayolu nedir?",
    questionEn: "What is the shortcut to insert a footnote at the current cursor position in Word?",
    options: [
      { id: 'o1', textTr: "Ctrl + Alt + F", textEn: "Ctrl + Alt + F" },
      { id: 'o2', textTr: "Ctrl + Shift + F", textEn: "Ctrl + Shift + F" },
      { id: 'o3', textTr: "Alt + Shift + F", textEn: "Alt + Shift + F" },
      { id: 'o4', textTr: "Ctrl + D", textEn: "Ctrl + D" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Ctrl+Alt+F (Footnote) kısayolu sayfa altına dipnot ekler.",
    explanationEn: "Ctrl+Alt+F is the shortcut for inserting footnotes."
  },
  {
    id: 'q-39',
    weekNumber: 10,
    topicTr: "İçindekiler Tablosunu Güncelleştirme",
    topicEn: "Updating Table of Contents",
    difficulty: 'medium',
    cognitiveLevel: 'application',
    questionTr: "Belgede yeni başlıklar eklendikten sonra İçindekiler Tablosunu güncel sayfa numaralarıyla senkronize etmek için ne yapılmalıdır?",
    questionEn: "After adding new headings, how do you sync the Table of Contents with new page numbers?",
    options: [
      { id: 'o1', textTr: "İçindekiler tablosuna tıklayıp 'Tabloyu Güncelleştir' seçilmeli", textEn: "Click the TOC and select 'Update Table'" },
      { id: 'o2', textTr: "İçindekiler tablosu silinip baştan elle yazılmalı", textEn: "Delete and retype by hand" },
      { id: 'o3', textTr: "Belge kapatılıp açılmalı", textEn: "Close and restart Word" },
      { id: 'o4', textTr: "Yazı boyutu küçültülmeli", textEn: "Decrease font size" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Tabloyu Güncelleştir (Update Table) komutu başlıkları ve sayfa numaralarını anında baştan tarar.",
    explanationEn: "Update Table re-scans heading styles and page indices instantly."
  },
  {
    id: 'q-40',
    weekNumber: 10,
    topicTr: "Resim Yazısı (Caption)",
    topicEn: "Figure and Table Captions",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Belgedeki şekil ve tablolara 'Şekil 1: ...', 'Tablo 1: ...' şeklinde otomatik artan numaralı etiketler eklemek için hangi araç kullanılır?",
    questionEn: "Which tool inserts automatically sequenced captions like 'Figure 1: ...' or 'Table 1: ...'?",
    options: [
      { id: 'o1', textTr: "Başvurular > Resim Yazısı Ekle (Insert Caption)", textEn: "References > Insert Caption" },
      { id: 'o2', textTr: "Giriş > Madde İşaretleri", textEn: "Home > Bullets" },
      { id: 'o3', textTr: "Ekle > Metin Kutusu", textEn: "Insert > Text Box" },
      { id: 'o4', textTr: "Gözden Geçir > Yorum", textEn: "Review > Comment" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Resim Yazısı Ekle (Insert Caption), şekil ve tabloları numaralandırır ve daha sonra 'Şekiller Tablosu' üretilmesini sağlar.",
    explanationEn: "Insert Caption attaches sequenced numbering to figures and tables, facilitating Tables of Figures."
  },

  // 41-43: Hafta 11 (Gözden Geçirme)
  {
    id: 'q-41',
    weekNumber: 11,
    topicTr: "Değişiklikleri Takip Et",
    topicEn: "Track Changes Mode",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Bir belgede ortak yazarların yaptığı tüm silme ve eklemeleri renkli çizgilerle izlemeye alan özellik hangisidir?",
    questionEn: "Which feature records all deletions and additions by reviewers with colored markup?",
    options: [
      { id: 'o1', textTr: "Değişiklikleri Takip Et (Track Changes)", textEn: "Track Changes" },
      { id: 'o2', textTr: "Otomatik Düzelt", textEn: "AutoCorrect" },
      { id: 'o3', textTr: "Yazım Denetimi", textEn: "Proofing" },
      { id: 'o4', textTr: "Belgeyi Koru", textEn: "Protect Document" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Gözden Geçir sekmesindeki Değişiklikleri Takip Et (Track Changes) yapılan tüm editoryal revizyonları kaydeder.",
    explanationEn: "Track Changes logs insertions, deletions, and formatting revisions."
  },
  {
    id: 'q-42',
    weekNumber: 11,
    topicTr: "Yazım Denetimi Kısayolu",
    topicEn: "Proofing Shortcut",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Tüm belgede yazım ve dilbilgisi denetimini başlatan klavye tuşu hangisidir?",
    questionEn: "Which function key launches the Spelling and Grammar check across the document?",
    options: [
      { id: 'o1', textTr: "F7", textEn: "F7" },
      { id: 'o2', textTr: "F1", textEn: "F1" },
      { id: 'o3', textTr: "F5", textEn: "F5" },
      { id: 'o4', textTr: "F12", textEn: "F12" }
    ],
    correctOptionId: 'o1',
    explanationTr: "F7 tuşu yazım ve dilbilgisi denetleyicisini açar.",
    explanationEn: "F7 opens the Spelling & Grammar checker."
  },
  {
    id: 'q-43',
    weekNumber: 11,
    topicTr: "Açıklama (Yorum) Ekleme",
    topicEn: "Adding Comments",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Bir paragrafın yanına metni değiştirmeden not veya dönüt bırakmak için hangi araç kullanılır?",
    questionEn: "Which tool places a feedback note or comment balloon alongside text without altering the text itself?",
    options: [
      { id: 'o1', textTr: "Yeni Açıklama (New Comment)", textEn: "New Comment" },
      { id: 'o2', textTr: "Dipnot Ekle", textEn: "Insert Footnote" },
      { id: 'o3', textTr: "Üstbilgi Ekle", textEn: "Insert Header" },
      { id: 'o4', textTr: "Metin Kutusu Ekle", textEn: "Insert Text Box" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Gözden Geçir > Yeni Açıklama (Comment), metne dokunmadan kenar boşluğunda yorum baloncuğu açar.",
    explanationEn: "New Comment creates a marginal review note without modifying body text."
  },

  // 44-46: Hafta 12 (İleri Düzey & Postalar)
  {
    id: 'q-44',
    weekNumber: 12,
    topicTr: "Adres Mektup Birleştirme",
    topicEn: "Mail Merge Purpose",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Excel'de 200 kişilik bir öğrenci listesi varken her öğrenciye özel katılımcı sertifikası üretmek için hangi Word özelliği kullanılır?",
    questionEn: "Given a 200-student Excel roster, which Word tool generates personalized certificates for all of them in bulk?",
    options: [
      { id: 'o1', textTr: "Adres Mektup Birleştirme (Mail Merge)", textEn: "Mail Merge" },
      { id: 'o2', textTr: "Kopyala-Yapıştır", textEn: "Copy and Paste" },
      { id: 'o3', textTr: "İçindekiler Tablosu", textEn: "Table of Contents" },
      { id: 'o4', textTr: "Makro Kaydet", textEn: "Record Macro" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Postalar > Adres Mektup Birleştirme (Mail Merge), veri tabanından tek hamlede yüzlerce kişiselleştirilmiş çıktı üretir.",
    explanationEn: "Mail Merge links a structured data source (e.g. Excel) with a template for bulk document authoring."
  },
  {
    id: 'q-45',
    weekNumber: 12,
    topicTr: "Şablon Dosya Uzantısı",
    topicEn: "Template Extension",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Microsoft Word şablon dosyalarının standart dosya uzantısı hangisidir?",
    questionEn: "What is the standard file extension for Microsoft Word templates?",
    options: [
      { id: 'o1', textTr: ".dotx", textEn: ".dotx" },
      { id: 'o2', textTr: ".docx", textEn: ".docx" },
      { id: 'o3', textTr: ".xlsx", textEn: ".xlsx" },
      { id: 'o4', textTr: ".pptx", textEn: ".pptx" }
    ],
    correctOptionId: 'o1',
    explanationTr: ".dotx, Word Document Template (Şablon) uzantısıdır.",
    explanationEn: ".dotx is the OpenXML Document Template extension."
  },
  {
    id: 'q-46',
    weekNumber: 12,
    topicTr: "Geliştirici Sekmesi",
    topicEn: "Developer Tab",
    difficulty: 'medium',
    cognitiveLevel: 'knowledge',
    questionTr: "Açılır liste kutusu, tarih seçici veya onay kutusu gibi etkileşimli form alanları eklemek için hangi sekme kullanılır?",
    questionEn: "Which tab is used to add form controls like drop-down pickers, date selectors, and checkboxes?",
    options: [
      { id: 'o1', textTr: "Geliştirici (Developer)", textEn: "Developer" },
      { id: 'o2', textTr: "Giriş (Home)", textEn: "Home" },
      { id: 'o3', textTr: "Sayfa Düzeni (Layout)", textEn: "Layout" },
      { id: 'o4', textTr: "Görünüm (View)", textEn: "View" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Geliştirici (Developer) sekmesi form içerik denetimleri ve makroları barındırır.",
    explanationEn: "The Developer tab contains form content controls and automation tools."
  },

  // 47-48: Hafta 13 (Profesyonel Belge & Erişilebilirlik)
  {
    id: 'q-47',
    weekNumber: 13,
    topicTr: "Erişilebilirlik ve Alt Metin",
    topicEn: "Accessibility and Alt Text",
    difficulty: 'medium',
    cognitiveLevel: 'comprehension',
    questionTr: "Belgelerin görme engelli bireyler tarafından ekran okuyucularla tam olarak anlaşılabilmesi için resimlere ne eklenmelidir?",
    questionEn: "To make a document fully accessible to visually impaired screen-reader users, what must accompany images?",
    options: [
      { id: 'o1', textTr: "Alternatif Metin (Alt Text)", textEn: "Alternative Text (Alt Text)" },
      { id: 'o2', textTr: "Renkli çerçeve", textEn: "Colored border" },
      { id: 'o3', textTr: "Yüksek parlaklık", textEn: "High brightness" },
      { id: 'o4', textTr: "Sayfa filigranı", textEn: "Watermark" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Alternatif Metin (Alt Text), görseli göremeyenler için ekran okuyucunun seslendireceği metinsel açıklamadır.",
    explanationEn: "Alt Text provides a descriptive auditory translation of images for screen-reading accessibility software."
  },
  {
    id: 'q-48',
    weekNumber: 13,
    topicTr: "Erişilebilirliği Denetle",
    topicEn: "Check Accessibility Tool",
    difficulty: 'easy',
    cognitiveLevel: 'knowledge',
    questionTr: "Belgedeki kontrast yetersizliklerini ve eksik alt metinleri tarayan 'Erişilebilirliği Denetle' komutu hangi sekmede bulunur?",
    questionEn: "Which tab houses the 'Check Accessibility' tool that audits contrast and missing alt text?",
    options: [
      { id: 'o1', textTr: "Gözden Geçir (Review)", textEn: "Review" },
      { id: 'o2', textTr: "Ekle (Insert)", textEn: "Insert" },
      { id: 'o3', textTr: "Tasarım (Design)", textEn: "Design" },
      { id: 'o4', textTr: "Görünüm (View)", textEn: "View" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Gözden Geçir > Erişilebilirliği Denetle, belgeyi WCAG standartlarına göre analiz eder.",
    explanationEn: "Review > Check Accessibility runs a compliance audit against WCAG accessibility standards."
  },

  // 49-50: Hafta 14 (Final Bütünleşik & Ustalık)
  {
    id: 'q-49',
    weekNumber: 14,
    topicTr: "Akademik Belge Bütünlüğü",
    topicEn: "Academic Document Synthesis",
    difficulty: 'hard',
    cognitiveLevel: 'analysis',
    questionTr: "Bir tez belgesinde: 1) Normal kenar boşlukları, 2) Times New Roman 12 pt, 3) İki yana yaslama, 4) 1.5 satır aralığı, 5) Başlık stilleri bir arada uygulandığında elde edilen temel kazanım nedir?",
    questionEn: "What is the primary academic outcome when normal margins, TNR 12 pt, justified text, 1.5 spacing, and heading styles are combined?",
    options: [
      { id: 'o1', textTr: "Belge evrensel tipografik standartlara, tez kılavuzlarına ve okunabilirlik ilkelerine tam uyumlu hale gelir", textEn: "The paper achieves universal typographic rigor, thesis guideline compliance, and maximum readability" },
      { id: 'o2', textTr: "Belgenin boyutu 1 kilobayta düşer", textEn: "File shrinks to 1 KB" },
      { id: 'o3', textTr: "Belge internete otomatik yüklenir", textEn: "Document auto-publishes online" },
      { id: 'o4', textTr: "Word'ün tüm düğmeleri kilitlenir", textEn: "Word locks all buttons" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Bu kurallar silsilesi, akademik ve kurumsal dünyada kabul gören ergonomik doküman kalitesinin omurgasını oluşturur.",
    explanationEn: "This combination forms the bedrock of professional scholarship and institutional publishing."
  },
  {
    id: 'q-50',
    weekNumber: 14,
    topicTr: "WordLab TR Final Değerlendirmesi",
    topicEn: "WordLab TR Capstone Competency",
    difficulty: 'hard',
    cognitiveLevel: 'analysis',
    questionTr: "WordLab TR otomatik OOXML değerlendirme motorunda bir belgenin biçimlendirmesi incelenirken en belirleyici ve güvenilir değerlendirme yöntemi hangisidir?",
    questionEn: "When evaluating document formatting in WordLab TR's OOXML engine, which methodology is most accurate?",
    options: [
      { id: 'o1', textTr: "Belgenin OpenXML ağacındaki gerçek etiketleri (w:sz, w:jc, w:pStyle, w:pgMar) kural tabanlı incelemek", textEn: "Deterministic rule-based inspection of OpenXML tags (w:sz, w:jc, w:pStyle, w:pgMar)" },
      { id: 'o2', textTr: "Yalnızca rastgele tahminler üretmek", textEn: "Fabricating arbitrary scores" },
      { id: 'o3', textTr: "Sadece dosyanın boyutuna (KB) bakmak", textEn: "Judging by file size in KB alone" },
      { id: 'o4', textTr: "Sadece metnin kelime sayısını saymak", textEn: "Counting word volume only" }
    ],
    correctOptionId: 'o1',
    explanationTr: "Gerçek ve bilimsel değerlendirme; OOXML içindeki ölçülebilir parametrelerin (twip, half-point, stil adı) kural tabanlı deterministik kontrolüdür.",
    explanationEn: "Authentic document assessment requires deterministic inspection of underlying OpenXML geometry and style elements."
  }
];
