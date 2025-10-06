import {
  getInfoDeveloper,
  LoginAccount,
  CreateAccount,
} from "./Logic_Controller.js";

// Navigation
let menu_Item;
let btn_MobileMenu;
let navigation_Menu;
let btn_Logo;
let btn_Close_Login;
let btnAccount;

// Authentication Form
let frm_Auth;
let btn_OpenAuthForm;
let input_Password;
let btn_ShowPassword;
let btn_HidePassword;
let icon_Lock;
let icon_Unlock;
let textfield_Confirm;
let input_ConfirmPass;
let btn_ShowConfirmPass;
let btn_HideConfirmPass;
let textfield_Email;
let input_Email;
let btn_Submit;
let btn_CreateAccount;
let text_TitleAuthForm;

// Notification
let notification;
let title_notify;
let content_notify;
let icon_success;
let icon_error;
let process_notify;

// Tabs
let tabMauBtns;
let tabTkBtns;
let tabMau;
let tabTk;

// Footer
let btn_FooterLogin;
let btn_TrangChuReload;

let sidebar;
let toggleBtn;
let icon;
let templateDetail;

// User
let txtUserName,
  txtUserEmail,
  btnLogout,
  txtBillCount,
  txtProfileName,
  txtProfileEmail,
  txtProfileSex,
  txtProfileBirthDay,
  txtTimeChangePass;

let stateLogin = true;
let user = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo giá trị cho biến
  ValueInitalization();

  // Xử lý sự kiện trên thanh Navigation
  NavigationAction();

  // Xử lý sự kiện trên form xác thực
  AuthenticationFormAction();

  // Xử lý sự kiện ở footer
  FooterAction();

  // Xử lý sự kiện ở trang Manager
  ManagerAction();

  // Xóa các router thừa trên URL
  ClearURL();

  // Gọi API hiện thị thông tin nhà phát triển
  CallAPIGetInfoDeveloper();

  // Xử lý sự kiện trang templates
  TemplatesAction();

  // Xử lý sự kiện trang profile
  UserProfileAction();

  // Xử lý giao diện nếu người dùng đã đăng nhập khi truy cập
  ConfigLoginState();
});

const CallAPIGetInfoDeveloper = async () => {
  const developerDetail = document.getElementById("developer-detail");
  try {
    const res = await getInfoDeveloper();
    if (!res.state) {
      ShowNotification(res.state, res.result);
      return;
    }

    const imgDeveloperImage = document.querySelectorAll(".image-developer");
    const txtDeveloperName = document.querySelectorAll(".name-developer");
    const txtDeveloperRole = document.querySelectorAll(".role-developer");
    const txtDeveloperContact = document.querySelectorAll(".contact-developer");

    for (let index = 0; index < res.result.length; index++) {
      imgDeveloperImage[index].src = res.result[index].hinhAnh;
      txtDeveloperName[index].textContent = res.result[index].hoTen;
      txtDeveloperRole[index].textContent = res.result[index].vaiTro;
      txtDeveloperContact[index].textContent = res.result[index].lienHe;
    }
    developerDetail.classList.remove("hidden");
  } catch (e) {
    console.log(e.message);
  }
};

const ShowNotification = (state, content) => {
  notification.classList.toggle("bg-[#F3FDF5]", state);
  notification.classList.toggle("bg-[#FFF9F9]", !state);

  title_notify.classList.toggle("text-green-400", state);
  title_notify.classList.toggle("text-red-400", !state);

  icon_success.classList.toggle("hidden", !state);
  icon_error.classList.toggle("hidden", state);

  process_notify.classList.toggle("border-green-400", state);
  process_notify.classList.toggle("border-red-400", !state);
  content_notify.textContent = content;

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 5000);
};

function ClearURL() {
  const links = document.querySelectorAll(
    "#menu-items a, a[href='#trang-chu']"
  );

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, null, window.location.pathname);
        }
      }
    });
  });
}

function ManagerAction() {
  if (!tabMau || !tabTk || !tabMauBtns || !tabTkBtns) return;

  // Khi click "Mẫu"
  tabMauBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      tabMau.classList.remove("hidden");
      tabTk.classList.add("hidden");

      tabMauBtns.forEach((b) =>
        b.classList.add("text-sky-400", "underline", "underline-offset-4")
      );
      tabTkBtns.forEach((b) =>
        b.classList.remove("text-sky-400", "underline", "underline-offset-4")
      );
    });
  });

  // Khi click "Tài khoản"
  tabTkBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      tabTk.classList.remove("hidden");
      tabMau.classList.add("hidden");

      tabTkBtns.forEach((b) =>
        b.classList.add("text-sky-400", "underline", "underline-offset-4")
      );
      tabMauBtns.forEach((b) =>
        b.classList.remove("text-sky-400", "underline", "underline-offset-4")
      );
    });
  });
}

function TemplatesAction() {
  if (sidebar) {
    sidebar.style.transition = "transform 0.3s ease-in-out";
  }
  let isOpen = true;
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (isOpen) {
        // Ẩn sidebar
        sidebar.style.transform = "translateX(-100%)";
        templateDetail.style.gridTemplateColumns = "1fr"; // main full width
        icon.classList.replace("fa-chevron-left", "fa-chevron-right");
      } else {
        // Hiện sidebar
        sidebar.style.transform = "translateX(0)";
        templateDetail.style.gridTemplateColumns = "17rem 1fr"; // restore layout
        icon.classList.replace("fa-chevron-right", "fa-chevron-left");
      }
      isOpen = !isOpen;
    });
  }
}

function FooterAction() {
  //xử lý sự kiện tải lại trang ở footer
  if (btn_TrangChuReload) {
    btn_TrangChuReload.addEventListener("click", () => {
      location.reload();
    });
  }

  // Xử lý sự kiện người dung mở form đăng nhập ở Footer
  if (btn_FooterLogin) {
    btn_FooterLogin.addEventListener("click", () => {
      frm_Auth.classList.remove("hidden");
    });
  }
}

function NavigationAction() {
  // Xử lý sự kiện người dùng mở trang thông tin cá nhân
  if (btnAccount) {
    btnAccount.addEventListener("click", () => {
      window.location.href = "./user.html";
    });
  }

  // Xử lý sự kiện người dùng mở form đăng nhập
  if (btn_OpenAuthForm) {
    btn_OpenAuthForm.addEventListener("click", () => {
      // Nếu localStorage rỗng => Người dùng chưa đăng nhập
      if (!localStorage.getItem("user")) {
        frm_Auth.classList.remove("hidden");
      }
      // Nếu người dùng đăng nhập hiện các chức năng phù hợp
      else {
        menu_Item.forEach((items, index) => {
          if (index !== menu_Item.length - 1) {
            items.classList.toggle("hidden");
          }
        });
        // btn_OpenAuthForm.textContent == user.email ? "Quay lại" : user.email;
      }
    });
  }

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
  if (btn_Logo)
    btn_Logo.addEventListener("click", () => {
      menu_Item.forEach((item) => item.classList.remove("text-sky-400"));
      menu_Item[0].classList.add("text-sky-400");
    });

  // Xử lý sự kiện người mở navigation bar trên mobile
  if (btn_MobileMenu)
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
}
function AuthenticationFormAction() {
  // Xử lý sự kiện người dùng submit form
  if (btn_Submit) {
    btn_Submit.addEventListener("click", async (e) => {
      e.preventDefault();
      if (stateLogin) {
        // Người dùng nhấn đăng nhập
        const res = await LoginAccount(input_Email.value, input_Password.value);
        if (res.state) {
          frm_Auth.classList.add("hidden");
          input_Password.value = "";
          input_Email.value = "";
          btn_ShowPassword.classList.add("hidden");
          btn_HidePassword.classList.add("hidden");
          user = JSON.parse(localStorage.getItem("user"));
          btn_OpenAuthForm.textContent = SubText(user.data.HoTen);
        }
        ShowNotification(res.state, res.result);
      } else {
        // Người dùng nhấn đăng ký
        const res = await CreateAccount(
          input_Email.value,
          input_Password.value
        );
        ShowNotification(res.state, res.result);
        if (res.state) btn_CreateAccount.click();
      }
    });
  }

  // Xử lý sự kiện người dùng chuyển hướng đến tạo tài khoản
  if (btn_CreateAccount) {
    btn_CreateAccount.addEventListener("click", () => {
      input_ConfirmPass.value = "";
      input_Password.value = "";
      input_Email.value = "";
      btn_ShowPassword.classList.add("hidden");
      btn_HidePassword.classList.add("hidden");
      btn_ShowConfirmPass.classList.add("hidden");
      btn_HideConfirmPass.classList.add("hidden");
      stateLogin = !stateLogin;
      text_TitleAuthForm.textContent = stateLogin
        ? "Đăng nhập"
        : "Tạo tài khoản";
      btn_CreateAccount.textContent = stateLogin
        ? "Tạo tài khoản"
        : "Quay lại đăng nhập";
      btn_Submit.textContent = stateLogin ? "Đăng nhập" : "Tạo tài khoản";
      textfield_Confirm.classList.toggle("hidden");

      icon_Lock.style.display = stateLogin ? "block" : "none";
      icon_Unlock.style.display = stateLogin ? "none" : "block";
    });
  }

  // Xử lý sự kiện người dùng nhập xác nhận mật khẩu
  if (input_ConfirmPass) {
    input_ConfirmPass.addEventListener("input", () => {
      if (input_ConfirmPass.value == "") {
        btn_ShowConfirmPass.classList.add("hidden");
      } else {
        btn_ShowConfirmPass.classList.remove("hidden");
      }
      btn_HideConfirmPass.classList.add("hidden");
      input_ConfirmPass.type = "password";
    });
  }

  // Xử lý sự kiện người dùng hiện xác nhận mật khẩu
  if (btn_ShowConfirmPass) {
    btn_ShowConfirmPass.addEventListener("click", () => {
      btn_ShowConfirmPass.classList.add("hidden");
      btn_HideConfirmPass.classList.remove("hidden");
      input_ConfirmPass.type = "text";
    });
  }

  // Xử lý sự kiện người dùng ẩn xác nhận mật khẩu
  if (btn_HideConfirmPass) {
    btn_HideConfirmPass.addEventListener("click", () => {
      btn_ShowConfirmPass.classList.remove("hidden");
      btn_HideConfirmPass.classList.add("hidden");
      input_ConfirmPass.type = "password";
    });
  }

  // Xử lý sự kiện người dùng ẩn mật khẩu
  if (btn_HidePassword) {
    btn_HidePassword.addEventListener("click", () => {
      btn_ShowPassword.classList.remove("hidden");
      btn_HidePassword.classList.add("hidden");
      input_Password.type = "password";
    });
  }

  // Xử lý sự kiện người dùng hiện mật khẩu
  if (btn_ShowPassword) {
    btn_ShowPassword.addEventListener("click", () => {
      btn_ShowPassword.classList.add("hidden");
      btn_HidePassword.classList.remove("hidden");
      input_Password.type = "text";
    });
  }

  // Xử lý sự kiện người dùng nhập mật khẩu
  if (input_Password) {
    input_Password.addEventListener("input", () => {
      if (input_Password.value == "") {
        btn_ShowPassword.classList.add("hidden");
      } else {
        btn_ShowPassword.classList.remove("hidden");
      }
      btn_HidePassword.classList.add("hidden");
      input_Password.type = "password";
    });
  }

  // Xử lý sự kiện người dùng nhấn đóng form đăng nhập
  if (btn_Close_Login) {
    btn_Close_Login.addEventListener("click", () => {
      frm_Auth.classList.toggle("hidden");
    });
  }
}
const UserProfileAction = () => {
  // Hiển thị tên người dùng
  if (txtUserName) txtUserName.textContent = SubText(user.data.HoTen, 20);
  // Hiển thị email người dùng
  if (txtUserEmail) txtUserEmail.textContent = user.data.Email;
  // Đăng xuất
  if (btnLogout)
    btnLogout.addEventListener("click", () => {
      window.location.href = "./index.html";
      if (btn_OpenAuthForm) btn_OpenAuthForm.textContent = "Đăng nhập";
      localStorage.clear();
    });
  // Hiển thị hóa đơn đã thanh toán
  if (txtBillCount) txtBillCount.textContent = user.data.HoaDon.length;

  // Hiển thị tên
  if (txtProfileName) txtProfileName.textContent = NaNText(user.data.HoTen);

  // Hiển thị email
  if (txtProfileEmail) txtProfileEmail.textContent = NaNText(user.data.Email);

  // Hiển thị giới tính
  if (txtProfileSex) txtProfileSex.textContent = NaNText(user.data.GioiTinh);

  // Hiển thị ngày sinh
  if (txtProfileBirthDay)
    txtProfileBirthDay.textContent = NaNText(user.data.NgaySinh);

  // Hiển thị thời gian đổi mật khẩu cuối
  if (txtTimeChangePass)
    txtTimeChangePass.textContent = user.data.ThoiGianCapNhatMatKhau;
};
function ValueInitalization() {
  menu_Item = document.querySelectorAll("#menu-items li");
  btn_MobileMenu = document.getElementById("mobile-menu");
  navigation_Menu = document.getElementById("menu-items");

  btn_Logo = document.getElementById("logo");
  btn_Close_Login = document.getElementById("close_login_form");

  frm_Auth = document.getElementById("auth-form");
  btn_OpenAuthForm = document.getElementById("login-button");
  input_Password = document.getElementById("pass-input");
  btn_ShowPassword = document.getElementById("show-pass");
  btn_HidePassword = document.getElementById("hide-pass");
  icon_Lock = document.getElementById("lock-icon");
  icon_Unlock = document.getElementById("unlock-icon");

  textfield_Confirm = document.getElementById("confirm-textfield");
  input_ConfirmPass = document.getElementById("confirm-input");

  btn_ShowConfirmPass = document.getElementById("show-confirm-pass");
  btn_HideConfirmPass = document.getElementById("hide-confirm-pass");

  textfield_Email = document.getElementById("email-textfield");
  input_Email = document.getElementById("email-input");

  btn_Submit = document.getElementById("submit-button");

  btn_CreateAccount = document.getElementById("create-account");

  text_TitleAuthForm = document.getElementById("title-auth-form");

  notification = document.getElementById("notification");
  title_notify = document.getElementById("notify-title");
  content_notify = document.getElementById("notify-content");
  icon_success = document.getElementById("success-icon");
  icon_error = document.getElementById("error-icon");
  process_notify = document.getElementById("notify-line");

  tabMauBtns = document.querySelectorAll("#tab-mau-btn");
  tabTkBtns = document.querySelectorAll("#tab-tk-btn");

  tabMau = document.getElementById("tab-mau");
  tabTk = document.getElementById("tab-tk");

  btn_FooterLogin = document.getElementById("footer-dang-nhap");
  btn_TrangChuReload = document.getElementById("reload-trang-chu");

  sidebar = document.getElementById("sidebar");
  toggleBtn = document.getElementById("icon-sidebar");
  // icon = toggleBtn.querySelector("i");
  templateDetail = document.getElementById("main-content");

  btnAccount = document.getElementById("account-button");

  txtUserName = document.getElementById("user-name");
  txtUserEmail = document.getElementById("user-email");
  btnLogout = document.getElementById("logout-button");
  txtBillCount = document.getElementById("bill-count");
  txtProfileName = document.getElementById("profile-name");
  txtProfileEmail = document.getElementById("profile-email");
  txtProfileSex = document.getElementById("profile-sex");
  txtProfileBirthDay = document.getElementById("profile-birthday");
  txtTimeChangePass = document.getElementById("time-change-password");
}

// Xử lý giao diện nếu người dùng đã đăng nhập khi truy cập
const ConfigLoginState = () => {
  // Thiết lập mặc định nếu người dùng đã đăng nhập
  if (user) {
    if (btn_OpenAuthForm)
      btn_OpenAuthForm.textContent = SubText(user.data.HoTen);
  }
};
const SubText = (str, maxLength) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};
const NaNText = (str) => {
  return !str || str.trim() === "" ? "NaN" : str;
};
