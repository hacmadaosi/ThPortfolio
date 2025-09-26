import { CreateAccount } from "./Logic_Controller.js";

document.addEventListener("DOMContentLoaded", () => {
  let stateLogin = true;

  const menu_Item = document.querySelectorAll("#menu-items li");
  const btn_MobileMenu = document.getElementById("mobile-menu");
  const navigation_Menu = document.getElementById("menu-items");

  const btn_Logo = document.getElementById("logo");
  const btn_Close_Login = document.getElementById("close_login_form");

  const frm_Auth = document.getElementById("auth-form");
  const btn_OpenAuthForm = document.getElementById("login-button");
  const input_UserName = document.getElementById("user-input");
  const btn_ClearInputUserName = document.getElementById("clear-user-input");

  const input_Password = document.getElementById("pass-input");
  const btn_ShowPassword = document.getElementById("show-pass");
  const btn_HidePassword = document.getElementById("hide-pass");
  const icon_Lock = document.getElementById("lock-icon");
  const icon_Unlock = document.getElementById("unlock-icon");

  const textfield_Confirm = document.getElementById("confirm-textfield");
  const input_ConfirmPass = document.getElementById("confirm-input");

  const btn_ShowConfirmPass = document.getElementById("show-confirm-pass");
  const btn_HideConfirmPass = document.getElementById("hide-confirm-pass");

  const textfield_Email = document.getElementById("email-textfield");
  const input_Email = document.getElementById("email-input");

  const btn_Submit = document.getElementById("submit-button");

  const btn_CreateAccount = document.getElementById("create-account");

  const text_TitleAuthForm = document.getElementById("title-auth-form");

  const notification = document.getElementById("notification");
  const title_notify = document.getElementById("notify-title");
  const content_notify = document.getElementById("notify-content");
  const icon_success = document.getElementById("success-icon");
  const icon_error = document.getElementById("error-icon");
  const process_notify = document.getElementById("notify-line");
  const btn_FooterLogin = document.getElementById("footer-dang-nhap");
  const btn_TrangChuReload = document.getElementById("reload-trang-chu");

  const tabMauBtn = document.getElementById("tab-mau-btn");
  const tabTkBtn = document.getElementById("tab-tk-btn");

  const tabMau = document.getElementById("tab-mau");
  const tabTk = document.getElementById("tab-tk");

  // Khi click Mẫu
  tabMauBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tabMau.classList.remove("hidden");
    tabTk.classList.add("hidden");

    tabMauBtn.classList.add("text-sky-400");
    tabTkBtn.classList.remove("text-sky-400");
  });
  // Khi click Tài Khoản
  tabTkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tabTk.classList.remove("hidden");
    tabMau.classList.add("hidden");

    tabTkBtn.classList.add("text-sky-400");
    tabMauBtn.classList.remove("text-sky-400");
  });

  //xử lý sự kiện tải lại trang ở footer
  btn_TrangChuReload.addEventListener("click", () => {
    location.reload();
  });
  // Xử lý sự kiện người dung mở form đăng nhập ở Footer
  btn_FooterLogin.addEventListener("click", () => {
    frm_Auth.classList.remove("hidden");
  });

  // Xử lý sự kiện người dùng submit form
  btn_Submit.addEventListener("click", async (e) => {
    e.preventDefault();
    if (stateLogin) {
      // Người dùng nhấn đăng nhập
    } else {
      // Người dùng nhấn đăng ký
      const result = await CreateAccount(
        input_UserName.value,
        input_Password.value,
        input_Email.value
      );

      const success = result.state;

      notification.classList.toggle("bg-[#F3FDF5]", success);
      notification.classList.toggle("bg-[#FFF9F9]", !success);

      title_notify.classList.toggle("text-green-400", success);
      title_notify.classList.toggle("text-red-400", !success);

      icon_success.classList.toggle("hidden", !success);
      icon_error.classList.toggle("hidden", success);

      process_notify.classList.toggle("border-green-400", success);
      process_notify.classList.toggle("border-red-400", !success);
      content_notify.textContent = result.result;

      notification.classList.remove("hidden");
      if (success) btn_CreateAccount.click();
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 5000);
    }
  });

  // Xử lý sự kiện người dùng chuyển hướng đến tạo tài khoản
  btn_CreateAccount.addEventListener("click", () => {
    input_UserName.value = "";
    input_ConfirmPass.value = "";
    input_Password.value = "";
    input_Email.value = "";
    btn_ShowPassword.classList.add("hidden");
    btn_HidePassword.classList.add("hidden");
    btn_ClearInputUserName.classList.add("hidden");
    btn_ShowConfirmPass.classList.add("hidden");
    btn_HideConfirmPass.classList.add("hidden");
    stateLogin = !stateLogin;
    text_TitleAuthForm.textContent = stateLogin ? "Đăng nhập" : "Tạo tài khoản";
    btn_CreateAccount.textContent = stateLogin
      ? "Tạo tài khoản"
      : "Quay lại đăng nhập";
    btn_Submit.textContent = stateLogin ? "Đăng nhập" : "Tạo tài khoản";
    textfield_Email.classList.toggle("hidden");
    textfield_Confirm.classList.toggle("hidden");

    icon_Lock.style.display = stateLogin ? "block" : "none";
    icon_Unlock.style.display = stateLogin ? "none" : "block";
  });

  // Xử lý sự kiện người dùng nhập xác nhận mật khẩu
  input_ConfirmPass.addEventListener("input", () => {
    if (input_ConfirmPass.value == "") {
      btn_ShowConfirmPass.classList.add("hidden");
    } else {
      btn_ShowConfirmPass.classList.remove("hidden");
    }
    btn_HideConfirmPass.classList.add("hidden");
    input_ConfirmPass.type = "password";
  });

  // Xử lý sự kiện người dùng hiện xác nhận mật khẩu
  btn_ShowConfirmPass.addEventListener("click", () => {
    btn_ShowConfirmPass.classList.add("hidden");
    btn_HideConfirmPass.classList.remove("hidden");
    input_ConfirmPass.type = "text";
  });

  // Xử lý sự kiện người dùng ẩn xác nhận mật khẩu
  btn_HideConfirmPass.addEventListener("click", () => {
    btn_ShowConfirmPass.classList.remove("hidden");
    btn_HideConfirmPass.classList.add("hidden");
    input_ConfirmPass.type = "password";
  });

  // Xử lý sự kiện người dùng ẩn mật khẩu
  btn_HidePassword.addEventListener("click", () => {
    btn_ShowPassword.classList.remove("hidden");
    btn_HidePassword.classList.add("hidden");
    input_Password.type = "password";
  });

  // Xử lý sự kiện người dùng hiện mật khẩu
  btn_ShowPassword.addEventListener("click", () => {
    btn_ShowPassword.classList.add("hidden");
    btn_HidePassword.classList.remove("hidden");
    input_Password.type = "text";
  });

  // Xử lý sự kiện người dùng nhập mật khẩu
  input_Password.addEventListener("input", () => {
    if (input_Password.value == "") {
      btn_ShowPassword.classList.add("hidden");
    } else {
      btn_ShowPassword.classList.remove("hidden");
    }
    btn_HidePassword.classList.add("hidden");
    input_Password.type = "password";
  });

  // Xử lý sự kiện người dùng nhấn xóa dữ liệu ô nhập tên tài khoản
  btn_ClearInputUserName.addEventListener("click", () => {
    input_UserName.value = "";
    btn_ClearInputUserName.classList.add("hidden");
  });

  // Xử lý sự kiện người dùng nhập tên tài khoản
  input_UserName.addEventListener("input", (event) => {
    if (input_UserName.value == "") {
      btn_ClearInputUserName.classList.add("hidden");
    } else {
      btn_ClearInputUserName.classList.remove("hidden");
    }
  });

  // Xử lý sự kiện người dùng nhấn đóng form đăng nhập
  btn_Close_Login.addEventListener("click", () => {
    frm_Auth.classList.toggle("hidden");
  });
  // Xử lý sự kiện người dùng mở form đăng nhập
  btn_OpenAuthForm.addEventListener("click", () => {
    frm_Auth.classList.toggle("hidden");
  });

  // Xử lý sự kiện người dùng nhấn chọn
  menu_Item.forEach((item, index) => {
    if (index < 5)
      item.addEventListener("click", () => {
        menu_Item.forEach((x) => x.classList.remove("text-sky-400"));
        item.classList.remove("text-black");
        item.classList.add("text-sky-400");
      });
  });
  // Xử lý sự kiện người dùng nhấn vào logo
  btn_Logo.addEventListener("click", () => {
    menu_Item.forEach((item) => item.classList.remove("text-sky-400"));
    menu_Item[0].classList.add("text-sky-400");
  });

  // Xử lý sự kiện người mở navigation bar trên mobile
  btn_MobileMenu.addEventListener("click", () => {
    navigation_Menu.classList.toggle("hidden");
    navigation_Menu.classList.toggle("fixed");
    navigation_Menu.classList.toggle("flex-col");
    navigation_Menu.classList.toggle("top-16");
    navigation_Menu.classList.toggle("left-0");
    navigation_Menu.classList.toggle("bg-white");
    navigation_Menu.classList.toggle("pl-8");
    navigation_Menu.classList.toggle("gap-6");
    navigation_Menu.classList.toggle("gap-4");
    navigation_Menu.classList.toggle("pb-4");
  });
  // Làm sạch đường dẫn URL
  const links = document.querySelectorAll(
    "#menu-items a, a[href='#trang-chu']"
  ); // logo href="#trang-chu"

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault(); // ngăn hành vi mặc định

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          // Xóa hash khỏi URL
          window.history.replaceState(null, null, window.location.pathname);
        }
      }
    });
  });
});
