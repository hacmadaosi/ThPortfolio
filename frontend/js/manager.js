import { getAllTemplates } from "./Logic_Controller.js";

const TEMPLATE_CACHE_KEY = "templates";
const MANAGER_TEMPLATE_KEY = "managerTemplates";
const ACCOUNT_STORAGE_KEY = "managerAccounts";
const TOAST_DURATION = 4000;

const state = {
  templates: [],
  accounts: [],
  editingTemplateId: null,
  editingAccountId: null,
  templateImageData: "",
  templateImageName: "",
  templateFolderEntries: [],
  templateFolderLabel: "",
};

const elements = {};
let toastTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("manager-page")) return;
  initializeManagerPage();
});

async function initializeManagerPage() {
  cacheElements();
  await hydrateTemplates();
  hydrateAccounts();
  renderTemplateList();
  renderAccountList();
  bindTemplateEvents();
  bindTemplateFileEvents();
  bindAccountEvents();
  updateTemplateActionState();
  updateAccountActionState();
}

function cacheElements() {
  elements.templateTitle = document.getElementById("template-title");
  elements.templateAuthor = document.getElementById("template-author");
  elements.templateDescription = document.getElementById("template-description");
  elements.templateImage = document.getElementById("template-image");
  elements.templateFolder = document.getElementById("template-folder");
  elements.templatePrice = document.getElementById("template-price");
  elements.templateList = document.getElementById("template-list");
  elements.templateAdd = document.getElementById("template-add");
  elements.templateUpdate = document.getElementById("template-update");
  elements.templateDelete = document.getElementById("template-delete");
  elements.templateReset = document.getElementById("template-reset");
  elements.templateImageHelper = document.getElementById("template-image-helper");
  elements.templateFolderHelper = document.getElementById("template-folder-helper");

  elements.accountUsername = document.getElementById("account-username");
  elements.accountEmail = document.getElementById("account-email");
  elements.accountPassword = document.getElementById("account-password");
  elements.accountType = document.getElementById("account-type");
  elements.accountSave = document.getElementById("account-save");
  elements.accountCancel = document.getElementById("account-cancel");
  elements.accountTableBody = document.getElementById("account-table-body");
  elements.accountMobileList = document.getElementById("account-mobile-list");

  elements.toast = document.getElementById("manager-toast");
}

async function hydrateTemplates() {
  const persisted = safeParse(localStorage.getItem(MANAGER_TEMPLATE_KEY));
  if (Array.isArray(persisted) && persisted.length > 0) {
    state.templates = persisted;
    syncTemplateCache();
    return;
  }

  const cached = safeParse(localStorage.getItem(TEMPLATE_CACHE_KEY));
  if (Array.isArray(cached) && cached.length > 0) {
    state.templates = cached;
    syncTemplateCache();
    return;
  }

  try {
    await getAllTemplates();
    const apiData = safeParse(localStorage.getItem(TEMPLATE_CACHE_KEY));
    if (Array.isArray(apiData) && apiData.length > 0) {
      state.templates = apiData;
      syncTemplateCache();
      return;
    }
  } catch (error) {
    console.warn("Không thể đồng bộ template từ server:", error);
  }

  state.templates = getLegacyTemplates();
  syncTemplateCache();
}

function hydrateAccounts() {
  const persisted = safeParse(localStorage.getItem(ACCOUNT_STORAGE_KEY));
  if (Array.isArray(persisted) && persisted.length > 0) {
    state.accounts = persisted;
    return;
  }

  state.accounts = getLegacyAccounts();
  persistAccounts();
}

function bindTemplateEvents() {
  elements.templateAdd?.addEventListener("click", handleTemplateAdd);
  elements.templateUpdate?.addEventListener("click", handleTemplateUpdate);
  elements.templateDelete?.addEventListener("click", handleTemplateDelete);
  elements.templateReset?.addEventListener("click", clearTemplateForm);
}

function bindTemplateFileEvents() {
  elements.templateImage?.addEventListener("change", handleTemplateImageChange);
  elements.templateFolder?.addEventListener("change", handleTemplateFolderChange);
}

function bindAccountEvents() {
  elements.accountSave?.addEventListener("click", handleAccountSave);
  elements.accountCancel?.addEventListener("click", clearAccountForm);
}

function handleTemplateAdd(event) {
  event.preventDefault();
  const payload = collectTemplatePayload();
  if (!payload) return;

  const template = {
    id: generateId(),
    ...payload,
    NgayDang: new Date().toLocaleDateString("vi-VN"),
  };
  state.templates = [template, ...state.templates];
  syncTemplateCache();
  renderTemplateList();
  clearTemplateForm();
  showToast("Đã thêm mẫu mới.", "success");
}

function handleTemplateUpdate(event) {
  event.preventDefault();
  if (!state.editingTemplateId) {
    showToast("Hãy chọn một mẫu trước khi thay đổi.", "error");
    return;
  }
  const payload = collectTemplatePayload();
  if (!payload) return;

  const index = state.templates.findIndex(
    (item) => item.id === state.editingTemplateId
  );
  if (index === -1) {
    showToast("Không tìm thấy mẫu cần cập nhật.", "error");
    return;
  }

  state.templates[index] = {
    ...state.templates[index],
    ...payload,
  };
  syncTemplateCache();
  renderTemplateList();
  showToast("Đã cập nhật mẫu.", "success");
  clearTemplateForm();
}

function handleTemplateDelete(event) {
  event.preventDefault();
  if (!state.editingTemplateId) {
    showToast("Hãy chọn mẫu cần xóa.", "error");
    return;
  }
  if (!confirm("Bạn có chắc muốn xóa mẫu này?")) return;

  state.templates = state.templates.filter(
    (item) => item.id !== state.editingTemplateId
  );
  syncTemplateCache();
  renderTemplateList();
  showToast("Đã xóa mẫu.", "success");
  clearTemplateForm();
}

function handleAccountSave(event) {
  event.preventDefault();
  const payload = collectAccountPayload();
  if (!payload) return;

  if (state.editingAccountId) {
    const index = state.accounts.findIndex(
      (account) => account.id === state.editingAccountId
    );
    if (index === -1) {
      showToast("Không tìm thấy tài khoản để cập nhật.", "error");
      return;
    }
    state.accounts[index] = { ...state.accounts[index], ...payload };
    showToast("Đã cập nhật tài khoản.", "success");
  } else {
    state.accounts = [
      {
        id: generateId(),
        ...payload,
      },
      ...state.accounts,
    ];
    showToast("Đã thêm tài khoản mới.", "success");
  }

  persistAccounts();
  renderAccountList();
  clearAccountForm();
}

function collectTemplatePayload() {
  const title = elements.templateTitle?.value.trim();
  const author = elements.templateAuthor?.value.trim();
  const description = elements.templateDescription?.value.trim();
  const image =
    state.templateImageData ||
    elements.templateImage?.dataset.currentImage ||
    "";
  const folder =
    state.templateFolderEntries.length > 0
      ? state.templateFolderEntries.join(", ")
      : elements.templateFolder?.dataset.currentFolder || "";
  const price = Number(elements.templatePrice?.value || 0);

  if (!title) {
    showToast("Tiêu đề không được để trống.", "error");
    return null;
  }
  if (!author) {
    showToast("Tác giả không được để trống.", "error");
    return null;
  }
  if (!description) {
    showToast("Mô tả không được để trống.", "error");
    return null;
  }

  return {
    TieuDe: title,
    TacGia: author,
    MoTa: description,
    MoTaNgan: shortenText(description, 140),
    LienKetAnh: image || "../resource/template.png",
    ThuMucDuLieu: folder || "",
    Gia: Number.isFinite(price) && price > 0 ? Math.round(price) : 0,
  };
}

function collectAccountPayload() {
  const username = elements.accountUsername?.value.trim();
  const email = elements.accountEmail?.value.trim();
  const password = elements.accountPassword?.value.trim();
  const type = elements.accountType?.value.trim();

  if (!username || !email || !password) {
    showToast("Tên đăng nhập, Email và Mật khẩu là bắt buộc.", "error");
    return null;
  }
  if (!validateEmail(email)) {
    showToast("Email không hợp lệ.", "error");
    return null;
  }

  return {
    TenDangNhap: username,
    Email: email,
    MatKhau: password,
    LoaiTaiKhoan: type || "Người dùng",
  };
}

function renderTemplateList() {
  if (!elements.templateList) return;
  elements.templateList.innerHTML = "";

  if (!state.templates.length) {
    elements.templateList.innerHTML =
      '<p class="p-4 text-center text-gray-500">Chưa có mẫu nào.</p>';
    return;
  }

  state.templates.forEach((template, index) => {
    const card = document.createElement("div");
    card.className =
      "border border-black p-4 lg:p-2 rounded-lg lg:flex lg:justify-evenly lg:border-0 lg:border-t-2 lg:rounded-none";
    card.innerHTML = `
      <div class="flex gap-1 lg:basis-[10%] lg:items-center lg:justify-center">
        <p class="lg:hidden">STT:</p>
        <p>${index + 1}</p>
      </div>
      <div class="flex gap-1 lg:basis-[30%] lg:items-center lg:justify-center">
        <p class="lg:hidden">Tiêu Đề:</p>
        <p>${template.TieuDe}</p>
      </div>
      <div class="flex gap-1 lg:basis-[20%] lg:items-center lg:justify-center">
        <p class="lg:hidden">Tác Giả:</p>
        <p>${template.TacGia}</p>
      </div>
      <div class="flex gap-1 lg:basis-[20%] lg:items-center lg:justify-center">
        <p class="lg:hidden">Ngày Đăng:</p>
        <p>${template.NgayDang || "-"}</p>
      </div>
      <div class="flex gap-1 lg:basis-[20%] lg:items-center lg:justify-center text-sky-500">
        <button class="hover:underline manager-template-edit" type="button">Chỉnh sửa</button>
        <span class="hidden lg:inline-block text-black px-1">|</span>
        <a class="hover:underline manager-template-view" target="_blank" href="../pages/templateDetail.html?id=${encodeURIComponent(
          template.id
        )}">Xem</a>
      </div>
    `;
    card
      .querySelector(".manager-template-edit")
      ?.addEventListener("click", () => handleTemplateSelect(template.id));
    elements.templateList.appendChild(card);
  });
}

function renderAccountList() {
  if (elements.accountTableBody) {
    elements.accountTableBody.innerHTML = "";
  }
  if (elements.accountMobileList) {
    elements.accountMobileList.innerHTML = "";
  }

  if (!state.accounts.length) {
    if (elements.accountTableBody) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.className = "py-4 text-center text-gray-500";
      td.textContent = "Chưa có tài khoản nào.";
      tr.appendChild(td);
      elements.accountTableBody.appendChild(tr);
    }
    if (elements.accountMobileList) {
      elements.accountMobileList.innerHTML =
        '<p class="text-center text-gray-500">Chưa có tài khoản nào.</p>';
    }
    return;
  }

  state.accounts.forEach((account, index) => {
    if (elements.accountTableBody) {
      const tr = document.createElement("tr");
      tr.className = "border-2 border-black";
      tr.innerHTML = `
        <td class="py-2 px-4">${index + 1}</td>
        <td class="py-2 px-4">${account.Email}</td>
        <td class="py-2 px-4">${account.TenDangNhap}</td>
        <td class="py-2 px-4">${maskPassword(account.MatKhau)}</td>
        <td class="py-2 px-4 space-x-2">
          <button class="hover:underline text-sky-500 manager-account-edit" type="button">Thay đổi</button>
          <button class="text-red-600 hover:underline manager-account-delete" type="button">Xóa</button>
        </td>
      `;
      tr
        .querySelector(".manager-account-edit")
        ?.addEventListener("click", () => handleAccountSelect(account.id));
      tr
        .querySelector(".manager-account-delete")
        ?.addEventListener("click", () => handleAccountDelete(account.id));
      elements.accountTableBody.appendChild(tr);
    }

    if (elements.accountMobileList) {
      const card = document.createElement("div");
      card.className = "border-2 border-black p-4 rounded-lg";
      card.innerHTML = `
        <p class="font-semibold">STT: ${index + 1}</p>
        <p>Email: ${account.Email}</p>
        <p>Tên Đăng Nhập: ${account.TenDangNhap}</p>
        <p>Mật Khẩu: ${maskPassword(account.MatKhau)}</p>
        <p class="mt-2 flex gap-2">
          <button class="hover:underline text-sky-500 manager-account-edit" type="button">Thay đổi</button>
          <button class="text-red-600 hover:underline manager-account-delete" type="button">| Xóa</button>
        </p>
      `;
      card
        .querySelector(".manager-account-edit")
        ?.addEventListener("click", () => handleAccountSelect(account.id));
      card
        .querySelector(".manager-account-delete")
        ?.addEventListener("click", () => handleAccountDelete(account.id));
      elements.accountMobileList.appendChild(card);
    }
  });
}

function handleTemplateSelect(templateId) {
  const template = state.templates.find((item) => item.id === templateId);
  if (!template) return;
  state.editingTemplateId = templateId;

  elements.templateTitle.value = template.TieuDe || "";
  elements.templateAuthor.value = template.TacGia || "";
  elements.templateDescription.value = template.MoTa || template.MoTaNgan || "";
  elements.templateImage.value = "";
  elements.templateFolder.value = "";
  state.templateImageData = "";
  state.templateImageName = "";
  state.templateFolderEntries = [];
  state.templateFolderLabel = "";
  if (elements.templateImage)
    elements.templateImage.dataset.currentImage = template.LienKetAnh || "";
  if (elements.templateFolder)
    elements.templateFolder.dataset.currentFolder =
      template.ThuMucDuLieu || "";
  updateTemplateFileHelpers({
    imageText: template.LienKetAnh
      ? template.LienKetAnh.startsWith("data:")
        ? "Đã lưu ảnh đính kèm."
        : template.LienKetAnh
      : "Chưa chọn tệp ảnh.",
    folderText: template.ThuMucDuLieu || "Chưa chọn thư mục.",
  });
  elements.templatePrice.value = template.Gia || "";

  updateTemplateActionState();
  showToast(`Đang chỉnh sửa: ${template.TieuDe}`, "info");
}

function handleAccountSelect(accountId) {
  const account = state.accounts.find((item) => item.id === accountId);
  if (!account) return;
  state.editingAccountId = accountId;

  elements.accountUsername.value = account.TenDangNhap || "";
  elements.accountEmail.value = account.Email || "";
  elements.accountPassword.value = account.MatKhau || "";
  elements.accountType.value = account.LoaiTaiKhoan || "";

  updateAccountActionState();
  showToast(`Đang chỉnh sửa: ${account.TenDangNhap}`, "info");
}

function handleAccountDelete(accountId) {
  if (!confirm("Bạn có chắc muốn xóa tài khoản này?")) return;
  state.accounts = state.accounts.filter((account) => account.id !== accountId);
  persistAccounts();
  renderAccountList();
  if (state.editingAccountId === accountId) {
    clearAccountForm();
  }
  showToast("Đã xóa tài khoản.", "success");
}

function clearTemplateForm(event) {
  event?.preventDefault();
  state.editingTemplateId = null;
  state.templateImageData = "";
  state.templateImageName = "";
  state.templateFolderEntries = [];
  state.templateFolderLabel = "";

  if (elements.templateTitle) elements.templateTitle.value = "";
  if (elements.templateAuthor) elements.templateAuthor.value = "";
  if (elements.templateDescription) elements.templateDescription.value = "";
  if (elements.templateImage) {
    elements.templateImage.value = "";
    elements.templateImage.dataset.currentImage = "";
  }
  if (elements.templateFolder) {
    elements.templateFolder.value = "";
    elements.templateFolder.dataset.currentFolder = "";
  }
  if (elements.templatePrice) elements.templatePrice.value = "";

  updateTemplateFileHelpers();
  updateTemplateActionState();
}

function clearAccountForm(event) {
  event?.preventDefault();
  state.editingAccountId = null;

  if (elements.accountUsername) elements.accountUsername.value = "";
  if (elements.accountEmail) elements.accountEmail.value = "";
  if (elements.accountPassword) elements.accountPassword.value = "";
  if (elements.accountType) elements.accountType.value = "";

  updateAccountActionState();
}

function updateTemplateActionState() {
  const hasSelection = Boolean(state.editingTemplateId);
  toggleButtonState(elements.templateDelete, hasSelection);
  toggleButtonState(elements.templateUpdate, hasSelection);
  if (elements.templateUpdate) {
    elements.templateUpdate.textContent = hasSelection
      ? "Lưu thay đổi"
      : "Thay đổi";
  }
}

function updateAccountActionState() {
  const hasSelection = Boolean(state.editingAccountId);
  if (elements.accountSave) {
    elements.accountSave.textContent = hasSelection ? "Lưu" : "Thêm";
  }
}

function toggleButtonState(button, enabled) {
  if (!button) return;
  button.disabled = !enabled;
  button.classList.toggle("opacity-50", !enabled);
  button.classList.toggle("cursor-not-allowed", !enabled);
}

function syncTemplateCache() {
  localStorage.setItem(
    MANAGER_TEMPLATE_KEY,
    JSON.stringify(state.templates || [])
  );
  localStorage.setItem(
    TEMPLATE_CACHE_KEY,
    JSON.stringify(state.templates || [])
  );
}

function persistAccounts() {
  localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(state.accounts));
}

function handleTemplateImageChange(event) {
  const file = event.target.files?.[0];
  if (!file) {
    state.templateImageData = "";
    state.templateImageName = "";
    updateTemplateFileHelpers();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    state.templateImageData = reader.result;
    state.templateImageName = file.name;
    updateTemplateFileHelpers({
      imageText: `Đã chọn: ${file.name}`,
    });
  };
  reader.onerror = () => {
    showToast("Không thể đọc tệp ảnh.", "error");
  };
  reader.readAsDataURL(file);
}

function handleTemplateFolderChange(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) {
    state.templateFolderEntries = [];
    state.templateFolderLabel = "";
    updateTemplateFileHelpers();
    return;
  }

  state.templateFolderEntries = files.map(
    (file) => file.webkitRelativePath || file.name
  );
  const folderName =
    files[0].webkitRelativePath?.split("/")[0] || files[0].name || "Thư mục";
  state.templateFolderLabel = `${folderName} · ${files.length} tệp`;
  updateTemplateFileHelpers({
    folderText: state.templateFolderLabel,
  });
}

function updateTemplateFileHelpers({
  imageText = "Chưa chọn tệp ảnh.",
  folderText = "Chưa chọn thư mục.",
} = {}) {
  if (elements.templateImageHelper)
    elements.templateImageHelper.textContent = imageText;
  if (elements.templateFolderHelper)
    elements.templateFolderHelper.textContent = folderText;
}

function getLegacyTemplates() {
  let legacy = [];
  try {
    if (Array.isArray(window.LegacyTemplates)) {
      legacy = window.LegacyTemplates;
    }
  } catch (error) {
    legacy = [];
  }

  if (!legacy.length) {
    legacy = defaultTemplateSeed();
  }

  return legacy.map((item) => ({
    id: item.id?.toString() || generateId(),
    TieuDe: item.TieuDe || item.title || "Template mới",
    TacGia: item.TacGia || item.author || "Không rõ",
    MoTa: item.MoTa || item.description || item.subtitle || "",
    MoTaNgan:
      item.MoTaNgan || item.subtitle || shortenText(item.description || "", 140),
    LienKetAnh: item.LienKetAnh || item.imgLink || "../resource/template.png",
    ThuMucDuLieu: item.ThuMucDuLieu || item.folder || "",
    NgayDang: item.NgayDang || item.date || new Date().toLocaleDateString("vi-VN"),
    Gia: Number(item.Gia || item.price) || 0,
  }));
}

function getLegacyAccounts() {
  let legacy = [];
  try {
    if (Array.isArray(window.Users)) {
      legacy = window.Users;
    }
  } catch (error) {
    legacy = [];
  }

  if (!legacy.length) {
    legacy = defaultAccountSeed();
  }

  return legacy.map((item) => ({
    id: item.id?.toString() || generateId(),
    TenDangNhap: item.TenDangNhap || item.username || "user",
    Email: item.Email || item.email || "",
    MatKhau: item.MatKhau || item.password || "",
    LoaiTaiKhoan: item.LoaiTaiKhoan || item.type || "Người dùng",
  }));
}

function defaultTemplateSeed() {
  return [
    {
      id: "seed-0",
      title: "Vũ trụ xanh đen",
      author: "Lê Khánh Vinh",
      subtitle: "Có hỗ trợ xuất CV",
      imgLink: "../resource/img0.png",
      date: "22/09/2025",
      price: 490000,
      description:
        "Template Portfolio Dark Mode giúp thể hiện cá tính chuyên nghiệp trên nền giao diện tối giản.",
    },
  ];
}

function defaultAccountSeed() {
  return [
    {
      id: "seed-user-0",
      username: "admin",
      email: "admin@example.com",
      password: "Admin@123",
      type: "Quản trị",
    },
  ];
}

function shortenText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength
    ? `${text.substring(0, maxLength - 3)}...`
    : text;
}

function maskPassword(value = "") {
  if (!value) return "";
  return value.length > 6 ? `${value.substring(0, 6)}...` : value;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function generateId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function showToast(message, type = "info") {
  if (!elements.toast) {
    alert(message);
    return;
  }
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  elements.toast.classList.toggle("text-green-600", type === "success");
  elements.toast.classList.toggle("text-red-600", type === "error");
  elements.toast.classList.toggle("text-slate-700", type === "info");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, TOAST_DURATION);
}

