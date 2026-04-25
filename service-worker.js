const plans = [
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
  },
  {
    tag: "🏠 休息",
    date: "4月30日",
    shortText: "在家休息整理",
    route: "🏠 上海市内",
    day: "DAY 3",
    summary: "📌 休息、整理行李、陪家人、吃好吃的。",
    scheduleTitle: "🏠 轻松日程",
    details: [
      "上午｜睡到自然醒",
      "中午｜和家人吃饭",
      "下午｜整理东西",
      "晚上｜附近散步"
    ],
    note: "这一天可以自由安排，不要太累"
  }
];

let currentIndex = 0;

const dateSlider = document.getElementById("dateSlider");
const mainCard = document.getElementById("mainCard");

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
    <h2>${plan.day}</h2>

    <div class="summary">
      ${plan.summary}
    </div>

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
  `;
}

function render() {
  renderDateCards();
  renderMainCard();
}

render();