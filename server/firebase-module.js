require("dotenv").config();
const { json } = require("express");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} = require("firebase/auth");

const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Xác thực tài khoản
const LoginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { state: true, result: userCredential.user };
  } catch (err) {
    if (err.code == "auth/wrong-password") {
      return { state: false, result: "Mật khẩu không đúng!" };
    } else if (err.code == "auth/user-not-found") {
      return { state: false, result: "Email chưa được đăng ký!" };
    } else if (err.code == "auth/invalid-credential") {
      return { state: false, result: "Email hoặc mật khẩu không chính xác!" };
    } else {
      return { state: false, result: err.message };
    }
  }
};

// Tạo tài khoản
const createNewUser = async (username, password, email) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);

    const docRef = await addDoc(collection(db, "user"), {
      uid: user.uid,
      username: username,
      password: password,
      email: email,
      state: 0,
    });
    return docRef;
  } catch (ex) {
    throw ex;
  }
};
// Lấy danh sách nhà phát triển
const getAllProjectMembers = async () => {
  try {
    const result = await getDocs(collection(db, "developmentGroup"));
    return result.docs
      .map((doc) => ({
        id: doc.data().id,
        hoTen: doc.data().hoTen,
        vaiTro: doc.data().vaiTro,
        lienHe: doc.data().lienHe,
        hinhAnh: doc.data().hinhAnh,
      }))
      .sort((a, b) => a.id - b.id);
  } catch (ex) {
    throw ex;
  }
};

module.exports = {
  firebaseConfig,
  createNewUser,
  getAllProjectMembers,
  LoginUser,
};
