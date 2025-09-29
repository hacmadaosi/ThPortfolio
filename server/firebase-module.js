require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
const { json } = require("express");

// Lấy chỗi firebase config
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const createNewUser = async (email, password) => {
  try {
    const userCredential = await admin.auth().createUser({
      email: email,
      password: password,
    });
    await db
      .collection("NguoiDung")
      .doc(userCredential.uid)
      .set({
        Email: email,
        HoTen: "user-" + userCredential.uid,
        NgaySinh: "",
        GioiTinh: "",
        PhanLoai: "user",
        HinhAnh: "",
        HoaDon: [],
        ThoiGianCapNhatMatKhau: getFormattedDateTime(),
      });
    return { state: true, result: userCredential.uid };
  } catch (ex) {
    throw ex;
  }
};

// // Xác thực tài khoản
const LoginAccount = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userDoc = await admin
      .firestore()
      .collection("NguoiDung")
      .doc(decodedToken.uid)
      .get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    return {
      state: true,
      result: { uid: decodedToken.uid, data: userDoc.data() },
    };
  } catch (err) {
    res.status(400).json({ message: err.message });
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
  LoginAccount,
};
// Lấy thời gian hiện tại
function getFormattedDateTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}
