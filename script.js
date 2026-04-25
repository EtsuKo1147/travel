const defaultPlans = [
  {
    tag: "✈️ 出发日",
    date: "4月28日（周二）",
    shortText: "gogogo出发咯",
    route: "✈️ 关西机场 - 上海浦东",
    day: "DAY 1",
    summary: "📌 春秋航空9C6575｜关西机场T2出发｜上海浦东T2到达｜08:05-11:20",
    scheduleTitle: "✈️ 大阪-上海（08:05-11:20）",
    details: [
      "6:15｜起床",
      "6:30-6:50｜机场大巴到关西机场",
      "08:05-11:20｜大阪飞上海",
      "12:00-13:00｜机场到家"
    ],
    note: "酒店名称、地址、注意事项等"
  },
  {
    tag: "🌿 苏州",
    date: "4月29日",
    shortText: "苏州oneday",
    route: "🚄 上海 - 苏州",
    day: "DAY 2",
    summary: "📌 上海出发去苏州，一日游，晚上返回上海。",
    scheduleTitle: "🌿 苏州一日游",
    details: [
      "8:30｜起床",
      "10:00｜出发去苏州",
      "12:00｜午餐",
      "14:00｜逛园林 / 平江路",
      "18:00｜晚餐",
      "20:00｜返回上海"
    ],
    note: "可以写餐厅、交通、门票、想拍照的地方"
  }
];

let plans = JSON.parse(localStorage.getItem("travelPlans")) || defaultPlans;
let currentIndex = 0;

const dateSlider = document.getElementById("dateSlider");
const mainCard = document.getElementById("mainCard");

const indicatorThumb = document.getElementById("indicatorThumb");

function savePlans() {
  localStorage.setItem("travelPlans", JSON.stringify(plans));
}

function renderDateCards() {
  dateSlider.innerHTML = "";

  plans.forEach((plan, index) => {
    const card = document.createElement("div");
    card.className = `date-card ${index === currentIndex ? "active" : ""}`;

    card.innerHTML = `
      <span class="date-tag">${plan.tag}</span>
      <h2>${plan.date}</h2>
      <p>${plan.shortText}</p>
      <span class="route-pill">${plan.route}</span>
    `;

    card.addEventListener("click", () => {
      currentIndex = index;
      render();
    });

    dateSlider.appendChild(card);
  });
}

function renderMainCard() {
  const plan = plans[currentIndex];

  mainCard.innerHTML = `
    <div class="card-top">
      <h2>${plan.day}</h2>
      <button class="edit-btn" onclick="openEditor()">编辑</button>
    </div>

    <div class="summary">${plan.summary}</div>

    <section class="schedule-box">
      <h3>${plan.scheduleTitle}</h3>
      <ul>
        ${plan.details.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="note-box">
      <h3>备注内容：</h3>
      <p>${plan.note}</p>
    </section>

    <button class="add-btn" onclick="addNewPlan()">＋ 添加新一天</button>
  `;
}

function updateIndicator() {
  if (!indicatorThumb || plans.length <= 1) return;

  const trackWidth = 72;
  const thumbWidth = 24;
  const maxMove = trackWidth - thumbWidth;
  const move = (currentIndex / (plans.length - 1)) * maxMove;

  indicatorThumb.style.transform = `translateX(${move}px)`;
}

function render() {
  renderDateCards();
  renderMainCard();
  updateIndicator();
}

function openEditor() {
  const plan = plans[currentIndex];

  mainCard.innerHTML = `
    <h2>编辑 ${plan.day}</h2>

    <label>标签</label>
    <input id="editTag" value="${plan.tag}">

    <label>日期</label>
    <input id="editDate" value="${plan.date}">

    <label>小卡片文字</label>
    <input id="editShortText" value="${plan.shortText}">

    <label>路线</label>
    <input id="editRoute" value="${plan.route}">

    <label>DAY标题</label>
    <input id="editDay" value="${plan.day}">

    <label>概要</label>
    <textarea id="editSummary">${plan.summary}</textarea>

    <label>行程标题</label>
    <input id="editScheduleTitle" value="${plan.scheduleTitle}">

    <label>详细行程（一行一个）</label>
    <textarea id="editDetails">${plan.details.join("\n")}</textarea>

    <label>备注</label>
    <textarea id="editNote">${plan.note}</textarea>

    <div class="edit-actions">
      <button class="save-btn" onclick="saveEdit()">保存</button>
      <button class="cancel-btn" onclick="render()">取消</button>
    </div>
  `;
}

function saveEdit() {
  plans[currentIndex] = {
    tag: document.getElementById("editTag").value,
    date: document.getElementById("editDate").value,
    shortText: document.getElementById("editShortText").value,
    route: document.getElementById("editRoute").value,
    day: document.getElementById("editDay").value,
    summary: document.getElementById("editSummary").value,
    scheduleTitle: document.getElementById("editScheduleTitle").value,
    details: document.getElementById("editDetails").value.split("\n").filter(item => item.trim() !== ""),
    note: document.getElementById("editNote").value
  };

  savePlans();
  render();
}

function addNewPlan() {
  plans.push({
    tag: "📍 新行程",
    date: "新日期",
    shortText: "这里写简短说明",
    route: "路线信息",
    day: `DAY ${plans.length + 1}`,
    summary: "这里写概要内容",
    scheduleTitle: "行程标题",
    details: [
      "上午｜填写安排",
      "下午｜填写安排",
      "晚上｜填写安排"
    ],
    note: "这里写备注"
  });

  currentIndex = plans.length - 1;
  savePlans();
  render();
}

render();