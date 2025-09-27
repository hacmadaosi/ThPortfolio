import END_POINTS from "../api.endpoints.js";

// Gọi API kiểm tra đăng nhập

export const LoginUser = async (email, password) => {
  try {
    const res = await fetch("http://localhost:80/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.state) {
      localStorage.setItem("user", JSON.stringify(data.result));
    }
    return { state: data.state, result: data.result };
  } catch (err) {
    return { state: false, result: err.message };
  }
};

// Gọi API tạo tài khoản
export const CreateAccount = async (userName, password, email) => {
  if (!CheckEmail(email)) {
    return { state: false, result: "Vui lòng kiểm tra lại email" };
  }
  if (!CheckUserName(userName)) {
    return { state: false, result: "Vui lòng kiểm tra lại tên đăng nhập" };
  }
  if (!CheckPassword(password)) {
    return { state: false, result: "Vui lòng kiểm tra lại mật khẩu" };
  }
  try {
    const res = await fetch(base64ToString(END_POINTS.USER.CREATE_USER), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { state: false, result: data.error || "Lỗi server" };
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
