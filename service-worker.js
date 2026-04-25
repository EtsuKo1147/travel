const dateCards = document.querySelectorAll(".date-card");
const planPanels = document.querySelectorAll(".plan-panel");
const addBtn = document.getElementById("addBtn");

let currentIndex = 0;

function showPlan(index) {
  currentIndex = index;

  dateCards.forEach((card, i) => {
    card.classList.toggle("active", i === currentIndex);
  });

  planPanels.forEach((panel, i) => {
    panel.classList.toggle("active", i === currentIndex);
  });
}

dateCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    showPlan(index);
  });
});

addBtn.addEventListener("click", () => {
  alert("这里之后可以做成添加新行程的功能。现在先确认按钮能正常点击。");
});

showPlan(0);