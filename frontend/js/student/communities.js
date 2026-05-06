document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rows = await apiRequest("/communities");
    const target = document.querySelector("#communities");
    target.innerHTML = rows
      .map(
        (row) => `
      <article class="card">
        <h3 class="card-title">${row.name}</h3>
        <p>${row.description || ""}</p>
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }
});
