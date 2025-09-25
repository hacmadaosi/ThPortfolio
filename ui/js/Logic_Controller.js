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
