document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#badges");
  const badges = [
    { name: "Top Performer", desc: "Avg score above 90" },
    { name: "Consistent Contributor", desc: "10 approved posts" },
    { name: "Creative Thinker", desc: "High engagement" },
  ];
  target.innerHTML = badges
    .map(
      (badge) => `
      <article class="card float">
        <h3 class="card-title">${badge.name}</h3>
        <p>${badge.desc}</p>
      </article>`,
    )
    .join("");
});
