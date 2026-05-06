document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await apiRequest("/posts/mine");
    const target = document.querySelector("#myPosts");
    target.innerHTML = posts
      .map(
        (post) => `
      <article class="card">
        <h3 class="card-title">${post.title}</h3>
        <p>Status: ${post.status}</p>
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }
});
