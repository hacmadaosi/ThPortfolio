import END_POINTS from "../api.endpoints.js";
import { AuthenticationAccount } from "./FireBase_Controller.js";

// Hàm xử lý đăng nhập
export const LoginAccount = async (email, password) => {
  try {
    const checkEmail = await AuthenticationAccount(email, password);
    const token = checkEmail.result;
    const res = await fetch("https://thportfolio.onrender.com/login", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      return { state: false, result: data.result || "Lỗi server" };
    }

    // Lưu thông tin từ server sau khi người dùng đăng nhập thành công
    localStorage.setItem("user", JSON.stringify(data.result));
    return { state: true, result: "Đã đăng nhập thành công" };
  } catch (ex) {
    return { state: false, result: ex.message };
  }
};

// Gọi API tạo tài khoản
export const CreateAccount = async (email, password) => {
  if (!CheckEmail(email)) {
    return { state: false, result: "Email không hợp lệ!" };
  }
  if (!CheckPassword(password)) {
    return { state: false, result: "Mật khẩu không hợp lệ" };
  }
  try {
    // const res = await fetch(base64ToString(END_POINTS.USER.CREATE_USER), {
    const res = await fetch("https://thportfolio.onrender.com/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { state: false, result: data.result || "Lỗi server" };
    }
    return { state: true, result: data.result };
  } catch (err) {
    return { state: false, result: err.message };
  }
};

// Gọi API lấy danh sách nhà phát triển
export const getInfoDeveloper = async () => {
  try {
    const res = await fetch(
      base64ToString(END_POINTS.PROJECT.GET_INFO_DEVELOPER)
    );
    const data = await res.json();
    if (!res.ok) {
      return { state: false, result: data.error || "Lỗi server" };
    }
    return { state: true, result: data };
  } catch (err) {
    return { state: false, result: err.message };
  }
};

const CheckEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && emailRegex.test(email);
};
const CheckUserName = (userName) => {
  const userNameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return !!(userName && userNameRegex.test(userName));
};
const CheckPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !!(password && passwordRegex.test(password));
};

function base64ToString(base64) {
  return atob(base64);
}
