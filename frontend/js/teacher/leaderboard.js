document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rows = await apiRequest("/leaderboard/top/10");
    const target = document.querySelector("#teacherLeaderboard");
    target.innerHTML = rows
      .map(
        (row, index) => `
      <article class="card">
        <strong>#${index + 1}</strong> ${row.name} - ${formatScore(row.total_score)}
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }

  const pdfBtn = document.querySelector("#downloadPdf");
  const excelBtn = document.querySelector("#downloadExcel");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", async () => {
      await downloadReport("/reports/pdf?top=10", "leaderboard.pdf");
    });
  }
  if (excelBtn) {
    excelBtn.addEventListener("click", async () => {
      await downloadReport("/reports/excel?top=10", "leaderboard.xlsx");
    });
  }
});

async function downloadReport(path, filename) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    showToast("Report download failed");
    return;
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
