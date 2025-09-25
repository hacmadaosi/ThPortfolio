// document.addEventListener("DOMContentLoaded", () => {
//   let stateLogin = true;

//   // const textfield_Email = document.getElementById("email-textfield");

//   // const text_TitleAuthForm = document.getElementById("title-auth-form");
//   // const textfield_Confirm = document.getElementById("confirm-pass-textfield");
//   // const btn_Submit = document.getElementById("submit-button");

//   // const menu = document.getElementById("menu-item");
//   // const footer_Login = document.getElementById("footer-login-link");

//   // Sự kiện ấn đăng nhập ở footer
//   // footer_Login.addEventListener("click", (e) => {
//   //   e.preventDefault();
//   //   if (stateMobile) {
//   //     menu.style.display = "none";
//   //   }
//   //   frm_Login.style.display = "flex";
//   //   frm_Login.style.transition = "opacity 0.2s ease";
//   // });

//   // btn_Submit.addEventListener("click", async () => {
//   //   if (stateLogin) {
//   //     // Xử lý sự kiện người dùng nhấn đăng nhập
//   //   } else {
//   //     // Xử lý sự kiện người dùng nhấn đăng ký
//   //     if (CheckInput()) {
//   //       const email = input_Email.value;
//   //       const userName = input_User.value;
//   //       const password = input_Pass.value;
//   //       try {
//   //         data = { userName, password, email };
//   //         const res = await fetch("https://thportfolio.onrender.com/user/add", {
//   //           method: "POST",
//   //           headers: { "Content-Type": "application/json" },
//   //           body: JSON.stringify(data),
//   //         });
//   //         btn_CreateAccount.click();
//   //       } catch (err) {
//   //         console.log(err);
//   //         alert(err);
//   //       }
//   //     }
//   //   }
//   // });

//   document.querySelectorAll("#menu a").forEach((link) => {
//     link.addEventListener("click", function (e) {
//       const targetId = this.getAttribute("href");

//       if (targetId.startsWith("#")) {
//         e.preventDefault(); // Ngăn hash nhảy lên URL

//         const targetEl = document.querySelector(targetId);
//         if (targetEl) {
//           targetEl.scrollIntoView({ behavior: "smooth" });
//           // Xóa hash trong URL (chỉ giữ domain hoặc path gốc)
//           window.history.replaceState(null, null, window.location.pathname);
//         }
//       }
//     });
//   });

//   window.addEventListener("resize", () => {
//     if (window.innerWidth >= 1024) {
//     }
//   });
// });

export const CreateAccount = async (userName, password, email) => {
  if (!CheckEmail(email)) {
    return { state: false, result: "Vui lòng kiểm tra lại email" };
  }
  try {
    const res = await fetch("https://thportfolio.onrender.com/user/add", {
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

const CheckEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && emailRegex.test(email);
};
