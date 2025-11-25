import {
  getInfoDeveloper,
  LoginAccount,
  CreateAccount,
  getAllTemplates,
  getAllUsers,
  updateUser,
  deleteUser,
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
let input_User;
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
let tabMauBtn;
let tabTkBtn;
let tabMau;
let tabTk;

// Footer
let btn_FooterLogin;
let btn_TrangChuReload;

let sidebar;
let toggleBtn;
let icon;
let templateDetail;

// Payment
let text_totalPrice;
let text_PaymentPrice;
let text_Discount;

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

let frm_User;

let desktopList;
let mobileList;
let previewImg;
let fileUpload;
let btnSave;
let btnCancel;
let stateLogin = true;
let user = JSON.parse(localStorage.getItem("user"));
let templates = JSON.parse(localStorage.getItem("templates"));
// Cart
let btn_Payment;

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

  //CallAPIGetAllTemplate();

  // Xử lý sự kiện trang templates
  TemplatesAction();

  // Xử lý sự kiện trang profile
  UserProfileAction();

  // Xử lý giao diện nếu người dùng đã đăng nhập khi truy cập
  ConfigLoginState();

  // trang giỏ hàng
  CartAction();

  // trang thanh toán
  PaymentAction();

  /// Hiển thị danh sách người dùng
  CallApiGetAllUser();
  handleDele_Upload();
});
window.currentUserId = null;
window.fillForm = (user) => {
  document.getElementById("email").value = user.Email || "";
  document.getElementById("name").value = user.Hoten || "";
  document.getElementById("sex").value = user.GioiTinh || "";
  document.getElementById("birthday").value = user.NgaySinh || "";
  document.getElementById("role").value = user.QuanLy
    ? "Quản lý"
    : "Người dùng";

  window.currentUserId = user.id;

  if (user.HinhAnh) {
    document.getElementById("previewAvatar").src = user.HinhAnh;
  } else {
    document.getElementById("previewAvatar").src = "";
  }
};

const CallApiGetAllUser = async () => {
  if (tabTk) {
    const res = await getAllUsers();
    if (!res.state) {
      console.error("Lỗi load users:", res.result);
      return;
    }
    const users = res.result;

    desktopList.innerHTML = "";
    mobileList.innerHTML = "";

    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.className = "border-b cursor-pointer hover:bg-gray-100";

      row.innerHTML = `
            <td class="py-2 px-4 border-b">${index + 1}</td>
            <td class="py-2 px-4 border-b">${user.Email || ""}</td>
            <td class="py-2 px-4 border-b">${user.Hoten || ""}</td>
            <td class="py-2 px-4 border-b">${user.GioiTinh || ""}</td>
            <td class="py-2 px-4 border-b">${user.NgaySinh || ""}</td>
            <td class="py-2 px-4 border-b">${
              user.QuanLy ? "Quản lý" : "Người dùng"
            }</td>
            <td class="py-2 px-4 border-b">
              <button class="btnEdit text-blue-500 underline mr-2" data-id="${
                user.id
              }">
                Sửa
              </button>

              <button class="btnDelete text-red-600 underline" data-id="${
                user.id
              }">
                Xóa
              </button>
            </td>`;

      row
        .querySelector(".btnEdit")
        .addEventListener("click", () => fillForm(user));

      row.querySelector(".btnDelete").addEventListener("click", async () => {
        if (!confirm("Bạn có chắc muốn xóa tài khoản này?")) return;

        const result = await deleteUser(user.id);
        alert(result.result);

        if (result.state) CallApiGetAllUser();
      });

      desktopList.appendChild(row);

      // Mobile layout
      const mobileItem = `
            <div class="border p-4 rounded cursor-pointer bg-white"
                onclick='fillForm(${JSON.stringify(user)})'>
                <p><strong>Email:</strong> ${user.Email}</p>
                <p><strong>Họ và tên:</strong> ${user.Hoten}</p>
                <p><strong>Giới tính:</strong> ${user.GioiTinh}</p>
                <p><strong>Ngày sinh:</strong> ${user.NgaySinh}</p>
                <p><strong>Loại tài khoản:</strong> ${
                  user.QuanLy ? "Quản lý" : "Người dùng"
                }</p>
            </div>
        `;
      mobileList.innerHTML += mobileItem;
    });
  }
};
//
const handleDele_Upload = async () => {
  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      window.currentUserId = null;
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
      document.getElementById("sex").value = "";
      document.getElementById("birthday").value = "";
      document.getElementById("role").value = "";
      //document.getElementById("previewAvatar").src = "";
    });
  }
  if (btnSave) {
    btnSave.addEventListener("click", async () => {
      const id = window.currentUserId;
      if (!id) return alert("Bạn chưa chọn người dùng để sửa!");

      const body = {
        Email: document.getElementById("email").value,
        Hoten: document.getElementById("name").value,
        GioiTinh: document.getElementById("sex").value,
        NgaySinh: document.getElementById("birthday").value,
        QuanLy: document.getElementById("role").value === "Quản lý",
      };

      const result = await updateUser(id, body);
      alert(result.result);

      if (result.state) {
        CallApiGetAllUser();
        btnCancel.click();
      }
    });
  }
};

// export const CallApiGetAllUser = async () => {
//   const { state, result } = await getAllUsers();
//   if (!state) return alert(result);

//   desktopList.innerHTML = "";
//   mobileList.innerHTML = "";

//   result.forEach((u, i) => {
//     renderDesktopRow(u, i);
//     renderMobileRow(u, i);
//   });
// };

// function renderDesktopRow(u, i) {
//   const tr = document.createElement("tr");
//   tr.className = "border-2 border-black cursor-pointer";

//   tr.innerHTML = `
//     <td class="py-2 px-4">${i}</td>
//     <td class="py-2 px-4">${u.Email}</td>
//     <td class="py-2 px-4">${u.UserName}</td>
//     <td class="py-2 px-4">${u.Password}</td>
//     <td class="py-2 px-4">
//       <a class="hover:underline text-blue-600">Thay đổi</a>
//       <a class="text-red-600 hover:underline ml-2">Xóa</a>
//     </td>`;

//   // Event click lên row để binding
//   tr.addEventListener("click", () => bindUserToForm(u));

//   // Event cho XÓA (ngăn click row)
//   tr.children[4].children[1].addEventListener("click", (e) => {
//     e.stopPropagation();
//     deleteUserHandler(u.id);
//   });

//   desktopList.appendChild(tr);
// }

// function renderMobileRow(u, i) {
//   const div = document.createElement("div");
//   div.className = "border-2 border-black p-4 rounded-lg cursor-pointer";

//   div.innerHTML = `
//       <p class="font-semibold">STT: ${i}</p>
//       <p>Email: ${u.Email}</p>
//       <p>Tên đăng nhập: ${u.UserName}</p>
//       <p>Mật khẩu: ${u.Password}</p>

//       <p class="mt-2 text-blue-600 underline">Thay đổi</p>
//       <p class="text-red-600 underline">Xóa</p>
//   `;

//   // Binding row
//   div.children[0].addEventListener("click", () => bindUserToForm(u));
//   div.children[5].addEventListener("click", () => bindUserToForm(u));
//   div.children[6].addEventListener("click", () => deleteUserHandler(u.id));

//   mobileList.appendChild(div);
// }

// function bindUserToForm(u) {
//   CURRENT_ID = u.id;

//   username.value = u.UserName;
//   email.value = u.Email;
//   password.value = u.Password;
//   role.value = u.Role || "";
//   sex.value = u.Sex || "";
//   birthday.value = u.Birthday || "";

//   // Nếu user có avatar → load preview
//   if (u.AvatarUrl) {
//     avatarPreview.src = u.AvatarUrl;
//     avatarPreview.classList.remove("hidden");
//   }
// }

// async function deleteUserHandler(id) {
//   if (!confirm("Bạn có chắc muốn xóa không?")) return;

//   const res = await deleteUser(id);
//   alert(res.result);

//   loadUsersToUI();
// }

// btnSave.addEventListener("click", async () => {
//   if (!CURRENT_ID) {
//     alert("Bạn phải chọn dòng muốn chỉnh sửa");
//     return;
//   }

//   const body = {
//     UserName: username.value,
//     Email: email.value,
//     Password: password.value,
//     Role: role.value,
//     Sex: sex.value,
//     Birthday: birthday.value,
//   };

//   // Nếu có ảnh → upload
//   if (CURRENT_IMAGE_FILE) {
//     const url = await uploadAvatar(CURRENT_ID, CURRENT_IMAGE_FILE);
//     body.AvatarUrl = url;
//   }

//   const res = await updateUser(CURRENT_ID, body);
//   alert(res.result);

//   resetForm();
//   loadUsersToUI();
// });

// ---------------------------------------------------------------------------------------------------------------------------

const CallAPIGetInfoDeveloper = async () => {
  const developerDetail = document.getElementById("developer-detail");
  if (developerDetail)
    try {
      const res = await getInfoDeveloper();
      if (!res.state) {
        ShowNotification(res.state, res.result);
        return;
      }

      const imgDeveloperImage = document.querySelectorAll(".image-developer");
      const txtDeveloperName = document.querySelectorAll(".name-developer");
      const txtDeveloperRole = document.querySelectorAll(".role-developer");
      const txtDeveloperContact =
        document.querySelectorAll(".contact-developer");

      for (let index = 0; index < res.result.length; index++) {
        imgDeveloperImage[index].src = res.result[index].hinhAnh;
        txtDeveloperName[index].textContent = res.result[index].hoTen;
        txtDeveloperRole[index].textContent = res.result[index].vaiTro;
        txtDeveloperContact[index].textContent = res.result[index].lienHe;
      }
      developerDetail.classList.remove("hidden");
    } catch (e) {
      console.log("Lỗi khi gọi API hiển thị nhóm phát triển - ", e);
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
function PaymentAction() {
  if (text_totalPrice && text_PaymentPrice && text_Discount) {
    const totalPrice = localStorage.getItem("totalPrice");
    const discount = 5;
    text_totalPrice.textContent = totalPrice.toLocaleString("vi-VN");
    text_Discount.textContent = discount;
    const sum = totalPrice - totalPrice * (discount / 100);
    text_PaymentPrice.textContent = sum.toLocaleString("vi-VN");
  }
}
function ManagerAction() {
  // Khi click Mẫu
  if (tabMauBtn) {
    tabMauBtn.addEventListener("click", (e) => {
      e.preventDefault();
      tabMau.classList.remove("hidden");
      tabTk.classList.add("hidden");

      tabMauBtn.classList.add("text-sky-400");
      tabTkBtn.classList.remove("text-sky-400");
    });
  }
  // Khi click Tài Khoản
  if (tabTkBtn) {
    tabTkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      tabTk.classList.remove("hidden");
      tabMau.classList.add("hidden");

      tabTkBtn.classList.add("text-sky-400");
      tabMauBtn.classList.remove("text-sky-400");
    });
  }
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
function CartAction() {
  if (btn_Payment) {
    btn_Payment.addEventListener("click", () => {
      const lbe_totalPirce = document.getElementById("cart_totalPirce");
      if (lbe_totalPirce.textContent.replace(/\./g, "") > 0) {
        localStorage.setItem(
          "totalPrice",
          lbe_totalPirce.textContent.replace(/\./g, "")
        );
        window.location.href = "./payment.html";
      } else {
        ShowNotification(false, "Hãy chọn 1 sản phẩm để thanh toán");
      }
    });
  }
}
function AuthenticationFormAction() {
  // Xử lý sự kiện người dùng submit form
  if (btn_Submit) {
    btn_Submit.addEventListener("click", async (e) => {
      e.preventDefault();
      if (stateLogin) {
        // Người dùng nhấn đăng nhập
        const res = await LoginAccount(input_User.value, input_Password.value);
        if (res.state) {
          frm_Auth.classList.add("hidden");
          input_Password.value = "";
          input_User.value = "";
          btn_ShowPassword.classList.add("hidden");
          btn_HidePassword.classList.add("hidden");
          user = JSON.parse(localStorage.getItem("user"));
          btn_OpenAuthForm.textContent = user.HoTen;
        }
        ShowNotification(res.state, res.result);
      } else {
        // Người dùng nhấn đăng ký
        const res = await CreateAccount(input_User.value, input_Password.value);
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
      input_User.value = "";
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
  if (txtUserName) txtUserName.textContent = SubText(user.HoTen, 20);
  // Hiển thị email người dùng
  if (txtUserEmail) txtUserEmail.textContent = user.Email;
  // Đăng xuất
  if (btnLogout)
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "./index.html";
      btn_OpenAuthForm.textContent = "Đăng nhập";
    });
  // Hiển thị hóa đơn đã thanh toán
  if (txtBillCount) txtBillCount.textContent = user.HoaDon.length;

  // Hiển thị tên
  if (txtProfileName) txtProfileName.textContent = NaNText(user.HoTen);

  // Hiển thị email
  if (txtProfileEmail) txtProfileEmail.textContent = NaNText(user.Email);

  // Hiển thị giới tính
  if (txtProfileSex) txtProfileSex.textContent = NaNText(user.GioiTinh);

  // Hiển thị ngày sinh
  if (txtProfileBirthDay)
    txtProfileBirthDay.textContent = NaNText(user.NgaySinh);

  // Hiển thị thời gian đổi mật khẩu cuối
  if (txtTimeChangePass)
    txtTimeChangePass.textContent = user.ThoiGianCapNhatMatKhau;

  // if (frm_User) {
  //   user.HoaDon.map((e) => {
  //     console.log(e.ThoiGian);
  //   });
  //   console.log(user.HoaDon);
  // }
};
function ValueInitalization() {
  menu_Item = document.querySelectorAll("#menu-items li");
  btn_MobileMenu = document.getElementById("mobile-menu");
  navigation_Menu = document.getElementById("menu-items");

  btn_Logo = document.getElementById("logo");
  btn_Close_Login = document.getElementById("close_login_form");

  frm_Auth = document.getElementById("auth-form");
  btn_OpenAuthForm = document.getElementById("navButtonOpenLoginForm");
  input_Password = document.getElementById("pass-input");
  btn_ShowPassword = document.getElementById("show-pass");
  btn_HidePassword = document.getElementById("hide-pass");
  icon_Lock = document.getElementById("lock-icon");
  icon_Unlock = document.getElementById("unlock-icon");

  textfield_Confirm = document.getElementById("confirm-textfield");
  input_ConfirmPass = document.getElementById("confirm-input");

  btn_ShowConfirmPass = document.getElementById("show-confirm-pass");
  btn_HideConfirmPass = document.getElementById("hide-confirm-pass");

  input_User = document.getElementById("user-input");

  btn_Submit = document.getElementById("submit-button");
  btn_Payment = document.getElementById("cart_Payment");

  btn_CreateAccount = document.getElementById("create-account");

  text_TitleAuthForm = document.getElementById("title-auth-form");

  notification = document.getElementById("notification");
  title_notify = document.getElementById("notify-title");
  content_notify = document.getElementById("notify-content");
  icon_success = document.getElementById("success-icon");
  icon_error = document.getElementById("error-icon");
  process_notify = document.getElementById("notify-line");

  tabMauBtn = document.getElementById("tab-mau-btn");
  tabTkBtn = document.getElementById("tab-tk-btn");

  tabMau = document.getElementById("tab-mau");
  tabTk = document.getElementById("tab-tk");

  btn_FooterLogin = document.getElementById("footer-dang-nhap");
  btn_TrangChuReload = document.getElementById("reload-trang-chu");

  sidebar = document.getElementById("sidebar");
  toggleBtn = document.getElementById("icon-sidebar");
  // icon = toggleBtn.querySelector("i");
  templateDetail = document.getElementById("main-content");
  text_totalPrice = document.getElementById("payment_totalPrice");
  text_PaymentPrice = document.getElementById("payment_paymentPrice");
  text_Discount = document.getElementById("payment_Discount");

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
  frm_User = document.getElementById("user_formPaymentHistory");

  desktopList = document.getElementById("desktopList");
  mobileList = document.getElementById("mobileList");
  previewImg = document.getElementById("previewImg");
  fileUpload = document.getElementById("file-upload");
  btnSave = document.getElementById("btnSave");
  btnCancel = document.getElementById("btnCancel");
}

// Xử lý giao diện nếu người dùng đã đăng nhập khi truy cập
const ConfigLoginState = () => {
  // Thiết lập mặc định nếu người dùng đã đăng nhập
  if (btn_OpenAuthForm)
    btn_OpenAuthForm.textContent = SubText(user ? user.HoTen : "Đăng nhập");
};
const SubText = (str, maxLength = 50) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};
const NaNText = (str) => {
  return !str || str.trim() === "" ? "NaN" : str;
};
