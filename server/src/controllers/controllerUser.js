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

export const getAllTemplates = async () => {
  const res = await fetch("http://localhost:80/api/templates");
  const data = await res.json();
  if (!res.ok) {
    return {
      state: false,
      result: data.message || "Lỗi khi gọi getAllTemplates",
    };
  }

  localStorage.setItem("templates", JSON.stringify(data.result));
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
      .collection("NguoiDung")
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
    await db.collection("NguoiDung").doc().set(newUser);
    res
      .status(201)
      .json({ message: "Tạo tài khoản thành công", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Lỗi khi gọi hàm CreateAccount - ${error.message}` });
  }
};

// Lấy danh sách tất cả người dùng
export const GetAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("NguoiDung").get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const formattedData = data.map((user) => ({
      id: user.id,
      Email: user.Email,
      TenDangNhap: user.TenDangNhap,
      QuanLy: user.QuanLy,
    }));
    res.json(formattedData);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Lỗi khi gọi hàm GetAllUsers - ${error.message}` });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { _id, MatKhau, ...safeUser } = req.body;
    if (!_id) {
      return res.status(400).json({
        state: false,
        result: "Thiếu _id, không thể cập nhật!",
      });
    }
    if (MatKhau) {
      const salt = await bcrypt.genSalt(10);
      safeUser.MatKhau = await bcrypt.hash(MatKhau, salt);
    }
    await db.collection("NguoiDung").doc(_id).update(safeUser);
    res.status(200).json({ state: true, result: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({
      state: false,
      result: `Lỗi UpdateUser: ${error.message}`,
    });
  }
};
// Xóa user
export const DeleteUser = async (req, res) => {
  try {
    await db.collection("NguoiDung").doc(req.params.id).delete();
    res.json({ state: true, result: "Xóa thành công!" });
  } catch (error) {
    res.status(500).json({
      state: false,
      result: `Lỗi DeleteUser: ${error.message}`,
    });
  }
};

export const upLoadAvatar = async (file, UserID) => {
  const ref = storage.ref().child(`avatars/${UserID}.jpg`);
  await ref.put(file);
  return await ref.getDownloadURL();
};
