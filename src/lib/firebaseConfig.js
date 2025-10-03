import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Fungsi inisialisasi yang lebih aman
function getFirebaseApp() {
  // Cek apakah semua nilai konfigurasi ada
  const configValues = Object.values(firebaseConfig);
  if (configValues.some(value => value === undefined)) {
    console.error("!!! KESALAHAN FATAL: Satu atau lebih environment variable Firebase tidak ditemukan. Periksa file .env.local Anda!");
    return null; // Hentikan inisialisasi jika ada variabel yang kosong
  }

  if (getApps().length > 0) {
    return getApp();
  }
  
  try {
    console.log("Mencoba inisialisasi Firebase...");
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error("!!! GAGAL INISIALISASI FIREBASE !!!", error);
    return null;
  }
}

const firebaseApp = getFirebaseApp();

// Hanya panggil getAuth jika aplikasi berhasil diinisialisasi
export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export default firebaseApp;