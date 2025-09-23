document.addEventListener("DOMContentLoaded", () => {
  let stateLogin = true;
  let stateMobile = window.innerWidth < 1000;
  const btn_Login = document.getElementById("login-button");
  const btn_Close_Login = document.getElementById("close_login_form");
  const frm_Login = document.getElementById("auth-form");

  const btn_ClearInput = document.getElementById("clear-user-input");
  const input_User = document.getElementById("user-input");

  const btn_ShowPass = document.getElementById("show-pass");
  const btn_HidePass = document.getElementById("hide-pass");
  const input_Pass = document.getElementById("pass-input");
  const btn_ShowConfirmPass = document.getElementById("show-confirm-pass");
  const btn_HideConfirmPass = document.getElementById("hide-confirm-pass");
  const input_ConfirmPass = document.getElementById("pass-confirm-input");
  const input_Email = document.getElementById("email-textfield");

  const icon_Lock = document.getElementById("lock-icon");
  const icon_Unlock = document.getElementById("unlock-icon");

  const btn_CreateAccount = document.getElementById("create-account");
  const text_TitleAuthForm = document.getElementById("title-auth-form");
  const input_Confirm = document.getElementById("confirm-pass-textfield");
  const btn_Submit = document.getElementById("submit-button");

  const btn_MobileMenu = document.getElementById("mobile-menu");
  const menu = document.getElementById("menu-item");
  const menu_Item = document.querySelectorAll("#menu li a");
  // Xử lý sự kiện người dùng nhấn chọn
  menu_Item.forEach((item) => {
    item.addEventListener("click", () => {
      menu_Item.forEach((x) => (x.style.color = "black"));
      item.style.color = "deepskyblue";
    });
  });
  // Xử lý sự kiện người mở navigation bar trên mobile
  btn_MobileMenu.addEventListener("click", () => {
    menu.style.display = menu.style.display == "none" ? "flex" : "none";
  });
  // Xử lý sự kiện người dùng nhấn nút đăng nhập
  btn_Login.addEventListener("click", () => {
    if (stateMobile) {
      menu.style.display = "none";
    }
    frm_Login.style.display = "flex";
    frm_Login.style.transition = "opacity 0.2s ease";
  });

  // Xử lý sự kiện người dùng nhấn đóng form đăng nhập
  btn_Close_Login.addEventListener("click", () => {
    frm_Login.style.display = "none";
  });

  // Xử lý sự kiện người dùng nhấn xóa dữ liệu ô nhập tên tài khoản
  btn_ClearInput.addEventListener("click", () => {
    input_User.value = "";
    btn_ClearInput.style.display = "none";
  });

  // Xử lý sự kiện người dùng nhập tên tài khoản
  input_User.addEventListener("input", (event) => {
    btn_ClearInput.style.display =
      event.target.value.length > 0 ? "block" : "none";
  });

  // Xử lý sự kiện người dùng nhập mật khẩu
  input_Pass.addEventListener("input", (event) => {
    btn_ShowPass.style.display =
      event.target.value.length > 0 ? "block" : "none";
  });

  // Xử lý sự kiện người dùng hiện mật khẩu
  btn_ShowPass.addEventListener("click", () => {
    btn_ShowPass.style.display = "none";
    btn_HidePass.style.display = "block";
    input_Pass.type = "text";
  });
  // Xử lý sự kiện người dùng ẩn mật khẩu
  btn_HidePass.addEventListener("click", () => {
    btn_ShowPass.style.display = "block";
    btn_HidePass.style.display = "none";
    input_Pass.type = "password";
  });

  // Xử lý sự kiện người dùng nhập xác nhận mật khẩu
  input_ConfirmPass.addEventListener("input", (event) => {
    btn_ShowConfirmPass.style.display =
      event.target.value.length > 0 ? "block" : "none";
  });

  // Xử lý sự kiện người dùng hiện xác nhận mật khẩu
  btn_ShowConfirmPass.addEventListener("click", () => {
    btn_ShowConfirmPass.style.display = "none";
    btn_HideConfirmPass.style.display = "block";
    input_ConfirmPass.type = "text";
  });

  // Xử lý sự kiện người dùng ẩn xác nhận mật khẩu
  btn_HideConfirmPass.addEventListener("click", () => {
    btn_ShowConfirmPass.style.display = "block";
    btn_HideConfirmPass.style.display = "none";
    input_ConfirmPass.type = "password";
  });

  // Xử lý sự kiện người dùng tạo tài khoản
  btn_CreateAccount.addEventListener("click", () => {
    input_User.value = "";
    input_ConfirmPass.value = "";
    input_Pass.value = "";
    input_Email.value = "";
    stateLogin = !stateLogin;
    text_TitleAuthForm.textContent = stateLogin ? "Đăng nhập" : "Tạo tài khoản";
    btn_CreateAccount.textContent = stateLogin
      ? "Tạo tài khoản"
      : "Quay lại đăng nhập";
    btn_Submit.textContent = stateLogin ? "Đăng nhập" : "Tạo tài khoản";
    input_Confirm.style.display = stateLogin ? "none" : "flex";
    input_Email.style.display = stateLogin ? "none" : "flex";
    icon_Lock.style.display = stateLogin ? "block" : "none";
    icon_Unlock.style.display = stateLogin ? "none" : "block";
  });

  btn_Submit.addEventListener("click", async () => {
    if (stateLogin) {
      // Xử lý sự kiện người dùng nhấn đăng nhập
    } else {
      // Xử lý sự kiện người dùng nhấn đăng ký
      if (checkInput()) {
        const email = input_Email.value;
        const userName = input_User.value;
        const password = input_Pass.value;
        try {
          data = { userName, password };
          const res = await fetch("https://thportfolio.onrender.com/user/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          btn_CreateAccount.click();
        } catch (err) {
          console.log(err);
          alert(err);
        }
      }
    }
  });

  const checkInput = () => {
    if (input_Pass.value == "") {
      console.log("Mật khẩu rỗng");
      return false;
    } else if (input_Pass.value != input_ConfirmPass.value) {
      console.log("Mật khẩu không trùng nhau");
      return false;
    }
    return true;
  };

  window.addEventListener("resize", () => {
    stateMobile = window.innerWidth < 1000;
    menu.style.display = stateMobile ? "none" : "flex";
  });

  document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault(); // Ngăn hash nhảy lên URL

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });

          // Xóa hash trong URL (chỉ giữ domain hoặc path gốc)
          window.history.replaceState(null, null, window.location.pathname);
        }
      }
    });
  });
});
