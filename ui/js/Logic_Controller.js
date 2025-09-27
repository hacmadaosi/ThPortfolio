import END_POINTS from "../api.endpoints.js";
// Gọi API tạo tài khoản
export const CreateAccount = async (userName, password, email) => {
  if (!CheckEmail(email)) {
    return { state: false, result: "Vui lòng kiểm tra lại email" };
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

function base64ToString(base64) {
  return decodeURIComponent(escape(atob(base64)));
}
