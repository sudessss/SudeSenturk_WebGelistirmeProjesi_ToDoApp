# 🚀 SudeSenturk_WebGelistirmeProjesi_ToDoApp

### 📋 To-Do App Staj Projesi Hakkında
Bu uygulama, kullanıcıların günlük görevlerini **CRUD** (Create, Read, Update, Delete) prensiplerine uygun olarak yönetebilmesini sağlayan dinamik bir görev yönetim platformudur.

---

### 🖥️ Geliştirme Süreci

* **Yerel Geliştirme:** Kod yazımı, hata ayıklama ve arayüz tasarımı aşamalarını kendi yerel ortamımda yürüttüm.
* **Test ve Kalite:** Uygulamanın farklı senaryolarda (görev ekleme, tamamlama, silme) doğru çalışıp çalışmadığını manuel test süreçleriyle deneyimledim.
* **Modern Araçlar:** Vite ve React gibi modern geliştirme araçlarını kullanarak, gerçek dünya projelerinde kullanılan iş akışlarını (workflow) bizzat uygulama ve pekiştirme fırsatı buldum.

---

### 🛠️ Kullanılan Teknolojiler & Özellikler

* **Frontend:** React + Tailwind CSS
* **Versiyon Kontrol:** Git & GitHub
* **Veri Saklama:** LocalStorage ile veri persist etme (sayfa yenilense bile görevler kaybolmuyor)
* **JavaScript Desteği:** ReactJS ve Vite kullanılarak optimize edilmiştir.

---

### ⚙️ Uygulama Özellikleri

* ✅ **Yeni Görev Ekleme:** Form üzerinden dinamik görev girişi.
* ✅ **Görev Silme:** İstenmeyen görevleri listeden kaldırma.
* ✅ **Güncelleme:** Mevcut görevlerin içeriğini değiştirme.
* ✅ **İlerleme Takibi:** Görevlerin ilerlemesini görselleştiren **Progress Circle**.
* ✅ **Responsive Tasarım:** Mobil ve masaüstü cihazlarla tam uyum.

---

### 📁 Proje Klasör Yapısı (Folder Structure)

Uygulama, sürdürülebilirlik amacıyla modüler bir mimari ile inşa edilmiştir:

```text
todo-app/
├── src/
│   ├── components/       # ProgressCircle.jsx, TaskCard.jsx, EditModal.jsx
│   ├── pages/            # Dashboard.jsx (Ana Yönetim Ekranı)
│   ├── hooks/            # useLocalStorage.js (Veri Yönetimi)
│   ├── interfaces/       # Task.js (Veri Modeli)
│   ├── styles/           # global.css & index.css
│   ├── utils/            # api.ts & storage.ts
│   ├── App.jsx           # Ana Bileşen
│   └── main.jsx          # Giriş Noktası
├── vite.config.js        # Build Ayarları
├── netlify.toml          # Deployment Konfigürasyonu
└── package.json          # Bağımlılıklar
# SudeSenturk_WebGelistirmeProjesi_ToDoApp

 🚀 To-Do App Staj Projesi Hakkında
 Bu uygulama, kullanıcıların günlük görevlerini CRUD (Create, Read, Update, Delete) prensiplerine uygun olarak yönetebilmesini sağlayan    dinamik bir görev yönetim platformudur.


🖥 Geliştirme Süreci
 . Yerel Geliştirme
 Kod yazımı, hata ayıklama ve arayüz tasarımı aşamalarını kendi yerel ortamımda yürüttüm.
 . Test ve Kalite
 Uygulamanın farklı senaryolarda (görev ekleme, tamamlama, silme) doğru çalışıp çalışmadığını manuel test süreçleriyle deneyimledim.
 . Modern Araçlar
 Vite ve React gibi modern geliştirme araçlarını kullanarak, gerçek dünya projelerinde kullanılan iş akışlarını (workflow) bizzat uygulama   ve pekiştirme fırsatı buldum.
 

🛠 Kullanılan Teknolojiler & Özellikler
. Frontend: React + Tailwind CSS (veya plain JS, HTML, CSS)
. Versiyon Kontrol: Git & GitHub
. Veri Saklama: LocalStorage ile veri persist etme (sayfa yenilense bile görevler kaybolmuyor)
. Yeni Kullanıcı Ekleme: Form üzerinden kullanıcı/görev ekleme ✅
. Kullanıcı Silme: İstenmeyen görevleri kaldırma ✅
. JavaScript Desteği: ReactJS ve Vite kullanılarak geliştirilmiş bir To-Do List uygulamasıdır.


⚙️ Uygulama Özellikleri
✅ Yeni kullanıcı/görev ekleme (Form)
✅ Kullanıcı/görev silme
✅ Mevcut görevleri güncelleme
✅ Görevlerin ilerlemesini görselleştirme (Progress Circle)
✅ Mobil ve masaüstü cihazlara uyumlu responsive tasarım


📁 Proje Klasör Yapısı (Folder Structure)
Uygulama, sürdürülebilirlik ve kodun okunabilirliğini artırmak amacıyla modüler bir mimari ile inşa edilmiştir:

todo-app/
├── src/
│   ├── components/       # Tekrar kullanılabilir arayüz bileşenleri (UI Components)
│   │   ├── ProgressCircle.jsx # Görev tamamlanma oranını gösteren grafik
│   │   ├── TaskCard.jsx       # Her bir görevin görsel kart yapısı
│   │   └── EditModal.jsx      # Görev düzenleme için açılır pencere
│   ├── pages/            # Sayfa bazlı ana bileşenler
│   │   └── Dashboard.jsx      # Uygulamanın ana yönetim ekranı
│   ├── hooks/            # Özel React Hook'ları (Custom Hooks)
│   │   └── useLocalStorage.js # Verilerin tarayıcıda saklanmasını sağlayan mantık
│   ├── interfaces/       # Veri tipleri ve modellemeler
│   │   └── Task.js            # Görev (Task) objesinin veri yapısı
│   ├── styles/           # Tasarım ve stil dosyaları
│   │   ├── global.css         # Genel uygulama stilleri
│   │   └── index.css          # Tailwind veya standart CSS tanımları
│   ├── utils/            # Yardımcı fonksiyonlar (Helpers)
│   │   ├── api.ts             # API entegrasyonu (Fetch/Axios)
│   │   └── storage.ts         # LocalStorage yönetim yardımcıları
│   ├── App.jsx           # Ana uygulama bileşeni ve yönlendirme
│   └── main.jsx           # React giriş noktası (Entry Point)
├── public/               # Statik varlıklar (Favicon, resimler vb.)
├── vite.config.js        # Vite konfigürasyonu ve Build ayarları
├── netlify.toml          # Netlify otomatik dağıtım (Deployment) ayarları
└── package.json          # Proje bağımlılıkları ve scriptleri

### 🔄 Çalıştırmak İçin (Benim Uyguladığım Adımlar)
Projeyi geliştirirken ve yayına alırken terminalde şu pratik iş akışını takip ettim:

1. Proje Dizinine Giriş
Terminal üzerinden projenin bulunduğu ana klasöre geçiş yaptım:

cd todo-app

2. Projeyi Derleme (Build)
Vite aracını kullanarak projeyi yayına hazır hale getirdim ve dist klasörünü oluşturdum:

npm run build

3. Netlify CLI ile Canlıya Alma (Production Deploy)
Herhangi bir manuel dosya yüklemesiyle uğraşmadan, terminalden doğrudan şu komutu kullanarak uygulamayı dünya genelinde erişime açtım:

netlify deploy --prod

### 👨‍💻 Proje Künyesi
Geliştirici: Sude Şentürk
Proje Adı: SudeSenturk_WebGelistirmeProjesi_ToDoApp

### ℹ️ Hakkında (About)
Bu proje, modern web geliştirme standartlarını öğrenmek amacıyla geliştirilmiş, React ve Vite ekosistemine dayalı bir görev yönetim uygulamasıdır. Başlangıç aşamasında eğitim materyallerinden faydalanılmış olsa da, projenin deployment (yayına alma) süreçleri, terminal üzerinden Netlify CLI yönetimi ve klasör yapısı optimizasyonları tamamen şahsım tarafından yürütülmüştür.
