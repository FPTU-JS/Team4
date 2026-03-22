import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider
} from "firebase/auth";

// Cấu hình kết nối Firebase của Anh (Your Firebase Configuration)
const firebaseConfig = {
  apiKey: "AIzaSyC5mqx0tUP4KUtC9ST1MVf-S1KH0L5vb1M",
  authDomain: "fpt-frontend-auth.firebaseapp.com",
  projectId: "fpt-frontend-auth",
  storageBucket: "fpt-frontend-auth.firebasestorage.app",
  messagingSenderId: "126794314021",
  appId: "1:126794314021:web:e8c6559167562f1e4e2acc"
};

// Khởi tạo Firebase (Initialize Firebase)
const app = initializeApp(firebaseConfig);

// Khởi tạo dịch vụ Xác thực (Initialize Authentication)
export const auth = getAuth(app);

// Thiết lập các nhà cung cấp đăng nhập (Setup Providers)
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');