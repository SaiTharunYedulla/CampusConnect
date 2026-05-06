document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#createPostForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      showToast("Post submitted for approval");
      form.reset();
    } catch (err) {
      showToast(err.message);
    }
  });
});
