document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await apiRequest("/analytics/department-performance");
    const target = document.querySelector("#deptStats");
    target.innerHTML = data
      .map(
        (row) => `
      <article class="card">
        <h3 class="card-title">${row.department}</h3>
        <p>Avg Score: ${formatScore(row.avg_score)}</p>
      </article>`,
      )
      .join("");

    if (window.Chart) {
      const ctx = document.querySelector("#deptChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((row) => row.department),
          datasets: [
            {
              label: "Average Score",
              data: data.map((row) => row.avg_score),
              backgroundColor: "rgba(39, 193, 200, 0.65)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }
  } catch (err) {
    showToast(err.message);
  }
});
