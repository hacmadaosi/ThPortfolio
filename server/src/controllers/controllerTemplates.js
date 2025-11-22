import { db } from "../configs/firebase.js";

export const GetAllTemplates = async (req, res) => {
  try {
    const snapshot = await db.collection("SanPham").get();
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Lỗi khi gọi GetAllTemplates - ${error.message}` });
  }
};
