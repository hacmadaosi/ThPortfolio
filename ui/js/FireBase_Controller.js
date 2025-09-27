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
