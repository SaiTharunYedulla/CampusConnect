document.addEventListener("DOMContentLoaded", async () => {
  try {
    const profile = await apiRequest("/auth/me");
    document.querySelector("#profileName").textContent =
      profile.name || "Student";
    document.querySelector("#profileDept").textContent =
      profile.department || "";
  } catch (err) {
    showToast(err.message);
  }
});
