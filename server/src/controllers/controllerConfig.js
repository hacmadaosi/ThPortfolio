import { db } from "../configs/firebase.js";

// Lấy danh sách nhà phát triển
export const getAllProjectMembers = async (req, res) => {
  try {
    const snapshot = await db.collection("developmentGroup").get();
    const result = snapshot.docs
      .map((doc) => ({
        id: doc.data().id,
        hoTen: doc.data().hoTen,
        vaiTro: doc.data().vaiTro,
        lienHe: doc.data().lienHe,
        hinhAnh: doc.data().hinhAnh,
      }))
      .sort((a, b) => a.id - b.id);
    res.status(200).json(result);
  } catch (ex) {
    throw ex;
  }
};

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
