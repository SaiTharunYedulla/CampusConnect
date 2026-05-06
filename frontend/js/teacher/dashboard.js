document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await apiRequest("/analytics/overview");
    document.querySelector("#totalPosts").textContent = data.total_posts || 0;
    document.querySelector("#pendingPosts").textContent =
      data.pending_posts || 0;
    document.querySelector("#avgScore").textContent = formatScore(
      data.avg_score,
    );
  } catch (err) {
    showToast(err.message);
  }
});
