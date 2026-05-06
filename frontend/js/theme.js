function toggleTheme() {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
}

function initTheme() {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
}

document.addEventListener("DOMContentLoaded", initTheme);
