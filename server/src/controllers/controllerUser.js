import { db } from "../configs/firebase.js";
import bcrypt from "bcrypt";

export const UserLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: `Vui lòng nhập TenDangNhap và password` });
    }
    const snapshotUser = await db
      .collection("NguoiDung")
      .where("TenDangNhap", "==", userName)
      .limit(1)
      .get();
    if (snapshotUser.empty) {
      return res
        .status(404)
        .json({ message: "Thông tin đăng nhập không chính xác." });
    }
    const userDoc = snapshotUser.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(password, userData.MatKhau);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không chính xác." });
    }
    const { TenDangNhap, MatKhau, HoaDon, ...safeUser } = userData;

    const snapshotInvoice = await db
      .collection("HoaDon")
      .where("UserId", "==", userDoc.id)
      .get();
    const { UserId, ...safeInvoice } = snapshotInvoice.docs[0].data();
    const formattedHoaDon = (HoaDon || []).map((invoiceId) => ({
      id: invoiceId,
      ...safeInvoice,
    }));

    return res.status(200).json({
      id: userDoc.id,
      ...safeUser,
      HoaDon: formattedHoaDon,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Lỗi khi gọi hàm UserLogin - ${error.message}` });
  }
};
export const CreateAccount = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      res
        .status(400)
        .json({ message: `Vui lòng nhập TenDangNhap và password` });
    }
    // Kiểm tra userName đã tồn tại chưa
    const snapshot = await db
      .collection("users")
      .where("TenDangNhap", "==", userName)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return res.status(409).json({ message: "Tên đăng nhập đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      TenDangNhap: userName,
      MatKhau: hashedPassword,
      Email: "",
      HoTen: "",
      GioiTinh: "",
      NgaySinh: "",
      HinhAnh: "",
      ThoiGianCapNhatMatKhau: new Date().toLocaleString("vi-VN"),
      HoaDon: [],
      QuanLy: false,
    };
    await db.collection("users").doc().set(newUser);
    res.status(201).json({ message: "Tạo tài khoản thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Lỗi khi gọi hàm CreateAccount - ${error.message}` });
  }
};
