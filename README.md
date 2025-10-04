# ArunaQuest

ArunaQuest adalah platform simulasi karier interaktif yang dirancang untuk membantu pengguna menjelajahi berbagai profesi melalui *quest* yang realistis dan berbasis cerita. Dibangun dengan Next.js dan terintegrasi dengan Firebase untuk autentikasi serta Gemini API untuk umpan balik yang dipersonalisasi, ArunaQuest menawarkan cara yang menarik untuk menemukan jalur karier yang sempurna.

### 🔗 Live Preview: [https://aruna-quest.vercel.app/](https://aruna-quest.vercel.app/)

---

## ✨ Fitur

-   **Simulasi Karier Interaktif:** Quest "A Day in the Life" untuk berbagai peran seperti Back-End Engineer, UI/UX Designer, dan Product Manager.
-   **Umpan Balik Berbasis AI:** Analisis karier dan rekomendasi yang dipersonalisasi oleh Gemini API setelah menyelesaikan setiap quest.
-   **Pengalaman Gamifikasi:** Dapatkan poin keahlian dalam statistik `Teknis`, `Sosial`, dan `Inisiatif` berdasarkan pilihan Anda.
-   **Autentikasi Aman:** Login yang mudah dan aman dengan Google, didukung oleh Firebase Authentication.
-   **Mini-Game Dinamis:** Terlibat dalam berbagai mini-game seperti menemukan *error* pada kode, prioritas tugas, dan kategorisasi konten.
-   **UI Modern & Animasi:** Antarmuka bergaya *glassmorphism* dengan transisi halaman dan animasi yang mulus dari Framer Motion.
-   **Dashboard Quest:** Pusat untuk melihat dan memilih quest karier yang tersedia.

---

## 📸 Tampilan Proyek

### **Landing Page**
![Aruna Quest Landing Page](./assets/Aruna%20Quest%20LP.png)

### **Halaman Login**
![ArunaQuest Login Page](./assets/ArunaQuest%20Login.png)

### **Dashboard Quest**
![ArunaQuest Dashboard](./assets/ArunaQuest%20Dashboard.png)

### **Laporan Analisis AI**
![ArunaQuest Analysis Report](./assets/arunaQuest%20analisi.jpg)

---

## 🛠️ Teknologi yang Digunakan

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Autentikasi:** [Firebase Authentication](https://firebase.google.com/docs/auth)
-   **Animasi:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Generative AI:** [Google Gemini API](https://ai.google.dev/)
-   **Mock API:** [MockAPI](https://68dd8567d7b591b4b78cb159.mockapi.io/api/v1/quests/)

---

## 📂 Struktur Proyek

Berikut adalah struktur direktori utama dari proyek ArunaQuest:
```
/
├── public/               # Aset statis seperti gambar dan font
├── screenshots/          # Screenshot aplikasi untuk README
├── src/
│   ├── app/
│   │   ├── api/          # API Routes (fetch-quests, analyze-quest)
│   │   ├── components/   # Komponen UI React yang dapat digunakan kembali
│   │   │   ├── animations/
│   │   │   ├── auth/
│   │   │   ├── layout/
│   │   │   ├── quest/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── context/      # React Context (AuthContext)
│   │   ├── lib/          # Konfigurasi & helper (Firebase, session)
│   │   ├── store/        # State management (Zustand store)
│   │   ├── (pages)/      # Direktori halaman utama (login, quest, dll.)
│   │   ├── layout.js     # Layout utama aplikasi
│   │   └── page.js       # Halaman utama (landing page)
│   ├── globals.css       # File CSS global
├── .env.local            # File environment variables
├── next.config.mjs       # Konfigurasi Next.js
└── package.json          # Dependensi dan skrip proyek
```
---

## 🚀 Memulai Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah sederhana berikut.

### **Prasyarat**

-   Node.js (v18 atau lebih baru)
-   npm, yarn, atau pnpm

### **Instalasi**

1.  *Clone* repositori
    ```sh
    git clone [https://github.com/your-username/ArunaQuest.git](https://github.com/your-username/ArunaQuest.git)
    ```
2.  Masuk ke direktori proyek
    ```sh
    cd ArunaQuest
    ```
3.  Instal dependensi
    ```sh
    npm install
    ```
4.  Siapkan *environment variables* Anda dengan membuat file `.env.local` di direktori *root* dan tambahkan yang berikut:
    ```env
    # Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

    # Gemini API
    GEMINI_API_KEY=your_gemini_api_key
    ```
5.  **Penting**: Proyek ini menggunakan Mock API untuk data *quest*. Endpoint yang digunakan di-*hardcode* dalam file `src/app/api/fetch-quests/route.js` dan menunjuk ke:
    ```
    [https://68dd8567d7b591b4b78cb159.mockapi.io/api/v1/quests](https://68dd8567d7b591b4b78cb159.mockapi.io/api/v1/quests)
    ```
    Pastikan endpoint ini aktif atau ganti dengan endpoint Anda jika perlu.

6.  Jalankan *development server*
    ```bash
    npm run dev
    ```
7.  Buka browser Anda dan kunjungi `http://localhost:3000`.
