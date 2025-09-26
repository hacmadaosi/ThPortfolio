require("dotenv").config();
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
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

module.exports = { firebaseConfig, createNewUser, getAllProjectMembers };
