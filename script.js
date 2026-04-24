const mainTitle = document.getElementById("mainTitle");
const titleInput = document.getElementById("titleInput");
const saveTitleBtn = document.getElementById("saveTitleBtn");

const savedTitle = localStorage.getItem("shushuMainTitle");

if (savedTitle) {
  mainTitle.textContent = savedTitle;
}

saveTitleBtn.addEventListener("click", () => {
  const newTitle = titleInput.value.trim();

  if (!newTitle) {
    alert("请输入标题");
    return;
  }

  mainTitle.textContent = newTitle;
  localStorage.setItem("shushuMainTitle", newTitle);
  titleInput.value = "";
});

const plansSlider = document.getElementById("plansSlider");
const planDetails = document.querySelector("planDetails");

const editorTitle = document.getElementById("editorTitle");
const dayInput = document.getElementById("dayInput");
const dateInput = document.getElementById("dateInput");
const tagInput = document.getElementById("tagInput");
const summaryInput = document.getElementById("summaryInput");
const infoInput = document.getElementById("infoInput");
const subtextInput = document.getElementById("subtextInput");
const itemsInput = document.getElementById("itemsInput");
const hotelTitleInput = document.getElementById("hotelTitleInput");
const hotelTextInput = document.getElementById("hotelTextInput");
const savePlanBtn = document.getElementById("savePlanBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let editingIndex = null;

let plans = JSON.parse(localStorage.getItem("shushuPlans")) || [
  {
    day: "DAY 1",
    date: "4月28日（周二）",
    tag: "✈️ 出发日",
    tagClass: "gogogo",
    summary: "gogogo出发咯",
    info: "✈️ 关西机场-上海浦东",
    subtext: "📌 乐桃航空MM079｜关西机场T2出发｜浦东机场T2到达｜22:20-00:05",
    highlightTitle: "✈️大阪-上海（22:20-00:05）",
    items: [
      "上班｜9:00AM-19:00PM",
      "下班｜去机场-大阪环状线19:04-20:21（T1）-接驳车20:30-20:45（T2）",
      "20:50值机-22:20起飞",
      "00:05到达浦东机场-打车去酒店"
    ],
    hotelTitle: "酒店名",
    hotelText: "维也纳国际酒店上海浦东机场店"
  }
];

function saveToLocalStorage() {
  localStorage.setItem("shushuPlans", JSON.stringify(plans));
}

function renderPlans() {
  plansSlider.innerHTML = "";
  planDetails.innerHTML = "";

  plans.forEach((plan, index) => {
    const card = document.createElement("div");
    card.className = `plan-card ${index === 0 ? "active" : ""}`;

    card.innerHTML = `
      <span class="tag ${plan.tagClass || "gogogo"}">${plan.tag}</span>
      <h3>${plan.date}</h3>
      <p>${plan.summary}</p>
      <div class="info">${plan.info}</div>

      <div class="card-buttons">
        <button onclick="editPlan(${index}); event.stopPropagation();">编辑</button>
        <button onclick="deletePlan(${index}); event.stopPropagation();">删除</button>
      </div>
    `;

    card.addEventListener("click", () => {
      showPlan(index);
    });

    plansSlider.appendChild(card);

    const panel = document.createElement("div");
    panel.className = `plan-panel ${index === 0 ? "active" : ""}`;

    const itemsHTML = plan.items.map(item => `<li>${item}</li>`).join("");

    panel.innerHTML = `
      <h2>${plan.day}</h2>
      <p class="subtext">${plan.subtext}</p>

      <div class="highlight-box">
        <h4>${plan.highlightTitle}</h4>
        <ul>
          ${itemsHTML}
        </ul>
      </div>

      <div class="day-box">
        <h4>${plan.hotelTitle}</h4>
        <p>${plan.hotelText}</p>
      </div>
    `;

    planDetails.appendChild(panel);
  });
}

function showPlan(index) {
  const planCards = document.querySelectorAll(".plan-card");
  const planPanels = document.querySelectorAll(".plan-panel");

  planCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  planPanels.forEach((panel, i) => {
    panel.classList.toggle("active", i === index);
  });
}

savePlanBtn.addEventListener("click", () => {
  const newPlan = {
    day: dayInput.value.trim(),
    date: dateInput.value.trim(),
    tag: tagInput.value.trim(),
    tagClass: "gogogo",
    summary: summaryInput.value.trim(),
    info: infoInput.value.trim(),
    subtext: subtextInput.value.trim(),
    highlightTitle: infoInput.value.trim(),
    items: itemsInput.value
      .split("\n")
      .map(item => item.trim())
      .filter(item => item !== ""),
    hotelTitle: hotelTitleInput.value.trim(),
    hotelText: hotelTextInput.value.trim()
  };

  if (!newPlan.day || !newPlan.date || !newPlan.tag) {
    alert("DAY、日期、标签至少要填写哦");
    return;
  }

  if (editingIndex === null) {
    plans.push(newPlan);
  } else {
    plans[editingIndex] = newPlan;
  }

  saveToLocalStorage();
  renderPlans();
  clearEditor();
});

function editPlan(index) {
  const plan = plans[index];

  editingIndex = index;

  editorTitle.textContent = "正在编辑行程";
  savePlanBtn.textContent = "保存修改";
  cancelEditBtn.style.display = "block";

  dayInput.value = plan.day;
  dateInput.value = plan.date;
  tagInput.value = plan.tag;
  summaryInput.value = plan.summary;
  infoInput.value = plan.info;
  subtextInput.value = plan.subtext;
  itemsInput.value = plan.items.join("\n");
  hotelTitleInput.value = plan.hotelTitle;
  hotelTextInput.value = plan.hotelText;

  document.querySelector(".editor-box").scrollIntoView({
  behavior: "smooth"
});
}

function deletePlan(index) {
  if (!confirm("确定删除这个行程吗？")) return;

  plans.splice(index, 1);
  saveToLocalStorage();
  renderPlans();
}

function clearEditor() {
  editingIndex = null;

  editorTitle.textContent = "添加行程";
  savePlanBtn.textContent = "＋ 添加行程";
  cancelEditBtn.style.display = "none";

  dayInput.value = "";
  dateInput.value = "";
  tagInput.value = "";
  summaryInput.value = "";
  infoInput.value = "";
  subtextInput.value = "";
  itemsInput.value = "";
  hotelTitleInput.value = "";
  hotelTextInput.value = "";
}

cancelEditBtn.addEventListener("click", clearEditor);

renderPlans();