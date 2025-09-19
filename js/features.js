import { db } from "../../Server/firebase_config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

export async function addSampleData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Nguyễn Văn A",
      email: "vana@example.com",
      createdAt: new Date(),
    });
    console.log("Thêm thành công, ID: ", docRef.id);
  } catch (e) {
    console.error("Lỗi khi thêm dữ liệu: ", e);
  }
}
window.addSampleData = addSampleData;
