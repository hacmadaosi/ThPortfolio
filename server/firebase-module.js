require("dotenv").config();
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} = require("firebase/auth");

const { getFirestore, collection, addDoc } = require("firebase/firestore");

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

const add_User = async (username, password, email) => {
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

module.exports = { firebaseConfig, add_User };
