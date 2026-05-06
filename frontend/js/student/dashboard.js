document.addEventListener("DOMContentLoaded", async () => {
  try {
    const feed = await apiRequest("/posts/feed?limit=6");
    const target = document.querySelector("#feed");
    target.innerHTML = feed
      .map(
        (post) => `
      <article class="card feed-card fade-up">
        <div class="meta"><span>${post.name}</span><span>${post.department}</span></div>
        <h3 class="card-title">${post.title}</h3>
        <p>${post.description}</p>
        <div class="tag-list">${(post.hashtags || "")
          .split(",")
          .map((tag) => `<span class="chip">${tag}</span>`)
          .join("")}</div>
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }
});
