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

export const getAllUsers = async () => {
  try {
    const res = await fetch("http://localhost:80/api/users");
    const data = await res.json();

    if (!res.ok) {
      return { state: false, result: "Lỗi khi tải danh sách người dùng" };
    }

    return {
      state: true,
      result: data,
    };
  } catch (err) {
    return { state: false, result: err.message };
  }
};

export const updateUser = async (id, body) => {
  try {
    const res = await fetch(`${"http://localhost:80/api/users"}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return {
      state: res.ok,
      result: data.message || "Cập nhật thành công",
    };
  } catch (err) {
    return { state: false, result: err.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${"http://localhost:80/api/users"}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    return {
      state: res.ok,
      result: data.message || "Xóa thành công",
    };
  } catch (err) {
    return { state: false, result: err.message };
  }
};

// Upload avatar lên server và trả về URL trên Firebase
// export const uploadAvatar = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch(`http://localhost:80/api/upload-avatar/${id}`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return { state: false, result: data.message || "Upload thất bại" };
//     }

//     // Trả về URL đầy đủ để lưu vào HinhAnh
//     const fileName = file.name;
//     const url = `https://firebasestorage.googleapis.com/v0/b/thportfolio-9ae4b.firebasestorage.app/o/${fileName}?alt=media`;

//     return { state: true, result: url };
//   } catch (err) {
//     return { state: false, result: err.message };
//   }
// };

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
