const cards = document.querySelectorAll(".card");
const panels = document.querySelectorAll(".panel");

cards.forEach((card, index) => {
  card.addEventListener("click", () => {

    cards.forEach(c => c.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    card.classList.add("active");
    panels[index].classList.add("active");

  });
});