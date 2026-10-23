# 🐾 Pati Bahçesi — Sevimli Evcil Hayvan Dünyası (Cozy Pet Sanctuary)

Modern, minimalist ve bağımsız ilerleme mekaniğine sahip, 2D sevimli evcil hayvan bakım ve sanal barınak simülasyonu.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

---

## ✨ Öne Çıkan Özellikler

- **🐾 8 Farklı Evcil Hayvan Türü:**
  - 🐱 Tekir Kedi
  - 🐶 Shiba Inu
  - 🐰 Lop Tavşan
  - 🦊 Akıllı Tilki
  - 🐼 Kızıl Panda
  - 🐉 Büyülü Ejderha
  - 🦜 Renkli Papağan
  - 🐹 Pofuduk Hamster

- **🌙 Bağımsız Uyku ve İlerleme Sistemi:**
  - Bir hayvanı uyuttuğunuzda diğer hayvanlar etkilenmez, uyanık kalır.
  - Her hayvanın **Tokluk, Mutluluk, Enerji, Temizlik, Seviye (Lv.) ve XP** değerleri tamamen bağımsızdır.
  - Alt barınak kartlarında uyuyan hayvanlar canlı `💤` rozeti ile anında ayırt edilir.

- **➕ Kendi Hayvanını Tasarla ve Ekle (+ Yeni Hayvan Ekle):**
  - Canlı SVG önizleme motoru.
  - Özel kürk ve kulak renk paletleri (veya renk seçici).
  - Kişilik seçimi (Enerjik, Uykucu, Meraklı, Gurme).
  - Türkçe sevimli isim üretici ve popüler isim önerileri.

- **✏️ İsim Değiştirme (Kalıcı İsimlendirme):**
  - Hayvanların isimlerini istediğiniz an tek tıkla değiştirebilirsiniz.

- **🎮 "Lezzet Yağmuru" Mini Oyunu:**
  - Canvas 60FPS dinamik atari oyunu.
  - Düşen lezzetleri sepetle yakalama, engellerden kaçma, altın, sevgi ve XP kazanma.

- **📜 Görev ve Kilit Açma Motoru (Quests Engine):**
  - Bakım yaptıkça tamamlanan dinamik görevler.
  - Görevleri tamamlayarak yeni hayvanların kilidini açma.

- **🎵 Web Audio API Prosedürel Sesler:**
  - Harici ses dosyası indirmeden sıfır gecikmeli, saf kod ile sentezlenen sevimli ses efektleri (mırıldanma, pop, su köpüğü, kutlama).

- **🎨 4 Farklı Ortam Teması & Aksesuar Dükkanı:**
  - Bahçe, Oda, Gece Yıldızları, Orman temaları.
  - Taç, fiyonk, çiçek ve parti şapkası gibi şık aksesuarlar.

---

## 🚀 Kurulum ve Çalıştırma

Projeyi çalıştırmak için herhangi bir paket yöneticisine veya derleme (build) aracına gerek yoktur. Saf (vanilla) web teknolojileriyle geliştirilmiştir.

1. Depoyu klonlayın veya zip olarak indirin:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
   ```
2. Proje dizinine gidin ve `index.html` dosyasını favori tarayıcınızda çift tıklayarak açın.

---

## 📂 Proje Mimarisi

```text
YAPAYZEKA/
│
├── index.html         # Ana uygulama yapısı ve modallar
├── style.css          # Tema değişkenleri, glassmorphism, responsive tasarım
├── netlify.toml       # Netlify yayın yapılandırması
├── README.md          # Proje dokümantasyonu
│
└── js/
    ├── audio.js       # Web Audio API ile prosedürel ses sentezleyici
    ├── pets.js        # Vektör SVG render motoru & hayvan veri tabanı
    ├── quests.js      # Görev sistemi & kilit açma mantığı
    ├── minigame.js    # 60FPS Canvas mini arcade oyunu
    └── app.js         # Ana uygulama durumu, bağımsız hayvan profilleri & etkileşimler
```

---

## 📄 Lisans
Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır. Dilediğiniz gibi geliştirebilir ve özelleştirebilirsiniz.
