document.addEventListener("DOMContentLoaded", () => {
  let stateLogin = true;

  const btn_Login = document.getElementById("dang-nhap");
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

  const btn_CreateAccount = document.getElementById("create-account");
  const text_TitleAuthForm = document.getElementById("title-auth-form");
  const textfield_Confirm = document.getElementById("confirm-pass-textfield");
  // Xử lý sự kiện người dùng nhấn nút đăng nhập
  btn_Login.addEventListener("click", () => {
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
    btn_ShowPass.style.display =
      event.target.value.length > 0 ? "block" : "none";
  });

  // Xử lý sự kiện người dùng hiện xác nhận mật khẩu
  btn_ShowConfirmPass.addEventListener("click", () => {
    btn_ShowConfirmPass.style.display = "none";
    btn_HideConfirmPass.style.display = "block";
    input_ConfirmPass.type = "text";
  });

  // Xử lý sự kiện người dùng ẩn xác nhận mật khẩu
  btn_HidePass.addEventListener("click", () => {
    btn_ShowConfirmPass.style.display = "block";
    btn_HideConfirmPass.style.display = "none";
    input_ConfirmPass.type = "password";
  });
  // Xử lý sự kiện người dùng tạo tài khoản
  btn_CreateAccount.addEventListener("click", () => {
    stateLogin = !stateLogin;
    text_TitleAuthForm.textContent = stateLogin ? "Đăng nhập" : "Tạo tài khoản";
  });
});
