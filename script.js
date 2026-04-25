const cards = document.querySelectorAll(".trip-card");
const panels = document.querySelectorAll(".day-panel");
const slider = document.getElementById("tripSlider");

let currentIndex = 0;

function showDay(index) {
  currentIndex = index;

  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  panels.forEach((panel, i) => {
    panel.classList.toggle("active", i === index);
  });

  cards[index].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    showDay(index);
  });
});

/* 手机滑动后自动切换内容 */
let scrollTimer;

slider.addEventListener("scroll", () => {
  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const screenCenter = window.innerWidth / 2;
      const distance = Math.abs(cardCenter - screenCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentIndex) {
      showDay(closestIndex);
    }
  }, 120);
});

showDay(0);