async function login(role) {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
    localStorage.setItem("token", data.token);
    window.location.href =
      role === "teacher"
        ? "pages/teacher/dashboard.html"
        : "pages/student/dashboard.html";
  } catch (err) {
    showToast(err.message);
  }
}

async function register(role) {
  const payload = {
    role,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    name: document.querySelector("#name").value,
    department: document.querySelector("#department").value,
    roll_number: document.querySelector("#roll").value,
    year: document.querySelector("#year").value,
  };
  try {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    localStorage.setItem("token", data.token);
    window.location.href =
      role === "teacher"
        ? "pages/teacher/dashboard.html"
        : "pages/student/dashboard.html";
  } catch (err) {
    showToast(err.message);
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}
