document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rows = await apiRequest("/leaderboard");
    const target = document.querySelector("#leaderboard");
    target.innerHTML = rows
      .map(
        (row, index) => `
      <article class="card">
        <strong>#${index + 1}</strong> ${row.name} - ${formatScore(row.total_score)} pts
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }
});
