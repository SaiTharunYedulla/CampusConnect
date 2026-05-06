let currentPostId = null;
let currentStudentId = null;

function openModal(postId, title, studentName, studentId) {
  currentPostId = postId;
  currentStudentId = studentId;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalAuthor").textContent = `by ${studentName}`;
  document.getElementById("scoreInput").value = "";
  document.getElementById("feedbackInput").value = "";
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  currentPostId = null;
  currentStudentId = null;
}

async function handleApprove() {
  const score = document.getElementById("scoreInput").value;
  const suggestions = document.getElementById("feedbackInput").value;

  if (!score) {
    showToast("Please enter a score");
    return;
  }

  try {
    await apiRequest(`/approvals/${currentPostId}/approve`, {
      method: "POST",
      body: JSON.stringify({ score: Number(score), suggestions }),
    });
    showToast("Post approved!");
    closeModal();
    location.reload();
  } catch (err) {
    showToast(err.message);
  }
}

async function handleReject() {
  const reason = document.getElementById("feedbackInput").value;

  try {
    await apiRequest(`/approvals/${currentPostId}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason, studentUserId: currentStudentId }),
    });
    showToast("Post rejected!");
    closeModal();
    location.reload();
  } catch (err) {
    showToast(err.message);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const rows = await apiRequest("/approvals/pending");
    const target = document.querySelector("#pendingList");

    if (rows.length === 0) {
      target.innerHTML =
        '<div class="card" style="grid-column: 1/-1; text-align: center; color: var(--muted);">No pending posts to review</div>';
      return;
    }

    target.innerHTML = rows
      .map(
        (post) => `
      <article class="card" style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 class="card-title">${post.title}</h3>
          <p style="color: var(--muted); font-size: 14px; margin-bottom: 8px;">${post.name} • ${post.department}</p>
          <p style="color: var(--text); line-height: 1.5;">${post.description}</p>
          <div style="display: flex; gap: 6px; margin-top: 12px; flex-wrap: wrap;">
            ${(post.hashtags || "")
              .split(",")
              .map((tag) => `<span class="chip">${tag.trim()}</span>`)
              .join("")}
          </div>
        </div>
        <div style="display: flex; gap: 10px; border-top: 1px solid var(--border); padding-top: 16px;">
          <button class="btn btn-success" onclick='openModal(${post.id}, "${post.title.replace(/"/g, '\\"')}", "${post.name.replace(/"/g, '\\"')}", ${post.student_id})' style="flex: 1;">Review</button>
        </div>
      </article>`,
      )
      .join("");
  } catch (err) {
    showToast(err.message);
  }
});
