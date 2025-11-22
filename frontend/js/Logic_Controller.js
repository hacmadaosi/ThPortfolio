import END_POINTS from "../api.endpoints.js";

// Hàm xử lý đăng nhập
export const LoginAccount = async (userName, password) => {
  try {
    const res = await fetch("http://localhost:80/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        state: false,
        result: data.message || "Lỗi khi gọi LoginAccount",
      };
    }
    // Lưu thông tin từ server sau khi người dùng đăng nhập thành công
    localStorage.setItem("user", JSON.stringify(data));
    window.location.reload();
    return { state: true, result: "Đã đăng nhập thành công" };
  } catch (ex) {
    return { state: false, result: ex.message };
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

// Gọi API tạo tài khoản
export const CreateAccount = async (userName, password) => {
  try {
    // const res = await fetch(base64ToString(END_POINTS.USER.CREATE_USER), {
    const res = await fetch("http://localhost:80/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { state: false, result: data.result || "Lỗi server" };
    }
    return { state: true, result: data.message };
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

const testHaha = () => {
  alert("hahahah");
};
window.testHaha = testHaha;

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
