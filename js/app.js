// import { db } from "../../Server/firebase_config.js";
// import {
//   collection,
//   addDoc,
// } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// export async function addSampleData() {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       name: "Nguyễn Văn A",
//       email: "vana@example.com",
//       createdAt: new Date(),
//     });
//     console.log("Thêm thành công, ID: ", docRef.id);
//   } catch (e) {
//     console.error("Lỗi khi thêm dữ liệu: ", e);
//   }
// }
// window.addSampleData = addSampleData;

// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
// import {
//   getAuth,
//   GoogleAuthProvider,
// } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

async function loadConfig() {
  try {
    const res = await fetch("https://thportfolio.onrender.com/firebase-api");
    return await res.json();
  } catch (err) {
    console.error("Lỗi gọi API:", err);
    return null;
  }
}

const initFirebase = async () => {
  const config = await loadConfig();

  if (!config) {
    alert("Không lấy được Firebase config");
    return;
  }
  firebase.initializeApp(config);
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
  });
};
document.addEventListener("DOMContentLoaded", initFirebase);
