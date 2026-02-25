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
🔄 Çalıştırmak İçin (Uyguladığım Adımlar)
Terminal üzerinden takip ettiğim profesyonel iş akışı:
Dizine Giriş: cd todo-app
Projeyi Derleme: npm run build
Canlıya Alma: netlify deploy --prod
👨‍💻 Proje Künyesi & Hakkında
Geliştirici: Sude Şentürk
Proje Durumu: Tamamlandı / Canlıda
Hakkında:
Bu proje, modern web geliştirme standartlarını öğrenmek amacıyla geliştirilmiştir. Başlangıç aşamasında eğitim materyallerinden faydalanılmış olsa da; projenin deployment süreçleri, terminal üzerinden Netlify CLI yönetimi ve klasör yapısı optimizasyonları tamamen şahsım tarafından yürütülmüştür.
