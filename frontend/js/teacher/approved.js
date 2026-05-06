document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rows = await apiRequest("/leaderboard");
    const target = document.querySelector("#approvedList");
    target.innerHTML = rows
      .map(
        (row) => `
      <article class="card">
        <strong>${row.name}</strong> - ${formatScore(row.total_score)}
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }
});
