document.addEventListener("DOMContentLoaded", () => {
  // Authentication Form
  const frm_Auth = document.getElementById("auth-form");
  const btn_OpenAuthForm = document.getElementById("login-button");
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
  const tn_CreateAccount = document.getElementById("create-account");

  const text_TitleAuthForm = document.getElementById("title-auth-form");
  const btn_Close_Login = document.getElementById("close_login_form");

  // Xử lý sự kiện người dùng nhấn đóng form đăng nhập
  if (btn_Close_Login) {
    btn_Close_Login.addEventListener("click", () => {
      frm_Auth.classList.toggle("hidden");
    });
  }
});
