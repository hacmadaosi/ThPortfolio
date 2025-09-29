import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

let app;
let auth;

// Hàm khởi tạo firebase
const FirebaseConfig = async () => {
  if (app && auth) return { app, auth };
  try {
    const res = await fetch("https://thportfolio.onrender.com/firebase-api");
    const config = await res.json();
    app = initializeApp(config);
    auth = getAuth(app);
    return { app, auth };
  } catch (err) {
    return null;
  }
};

// Hàm kiểm xác thực email, mật khẩu sau đó trả về token
export const AuthenticationAccount = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    return { state: true, result: token };
  } catch (ex) {
    return { state: false, result: "Email hoặc mật khẩu không chính xác" };
  }
};

document.addEventListener("DOMContentLoaded", () => {
  FirebaseConfig();
});
