const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

class CalendarData {
  private _year!: number;
  private _monthIndex!: number;

  readonly months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(date: Date) {
    this._year = date.getFullYear();
    this._monthIndex = date.getMonth();
  }

  get year() {
    return this._year;
  }

  get monthIndex() {
    return this._monthIndex;
  }

  get month() {
    return this.months[this.monthIndex];
  }

  get daysInMonth() {
    return new Date(this._year, this.monthIndex + 1, 0).getDate();
  }

  get firstDayOfMonth() {
    const date = new Date();
    const dateIndex = date.getDate();
    const daysIndex = date.getDay();
    const firstDayOfMonth = daysIndex - dateIndex;
    return firstDayOfMonth;
  }

  incrementMonth() {
    if (this._monthIndex >= 11) {
      this._monthIndex = 0;
      this._year++;
    } else {
      this._monthIndex++;
    }
  }

  decrementMonth() {
    if (this._monthIndex <= 0) {
      this._monthIndex = 11;
      this._year--;
    } else {
      this._monthIndex--;
    }
  }
}

const currentDate = new CalendarData(new Date());

const calendar = () => {
  const calendar = document.getElementById("calendar") as HTMLElement;

  const controller = document.createElement("div");
  controller.innerHTML = `
  <button class="incrementMonth">+</button>
  <h5 class="monthTitle"></h5>
  <button class="decrementMonth">-</button>
  `;

  const increment = controller.querySelector(
    ".incrementMonth"
  ) as HTMLButtonElement;
  const decrement = controller.querySelector(
    ".decrementMonth"
  ) as HTMLButtonElement;
  const title = controller.querySelector(".monthTitle") as HTMLElement;

  const weekDays = dayNames.map((name) => {
    const div = document.createElement("div");
    div.className = "weekday" + " " + name;
    div.textContent = name;
    return div;
  });

  const weekDayContainer = document.createElement("div");
  weekDayContainer.className = "daysGrid weekDays";

  weekDayContainer.append(...weekDays);

  const startDaysAt = currentDate.firstDayOfMonth + 1;
  const monthDaysContainer = document.createElement("div");
  monthDaysContainer.className = "daysGrid monthDays";

  const updateCalendar = () => {
    title.textContent = `${currentDate.month} ${currentDate.year}`;

    monthDaysContainer.innerHTML = "";
    for (let d = 0; d < currentDate.daysInMonth; d++) {
      const dayEl = document.createElement("div");
      dayEl.className = "day";
      dayEl.textContent = String(d + 1);

      if (d === 0) {
        dayEl.style.gridColumnStart = String(startDaysAt);
      }

      monthDaysContainer.append(dayEl);
    }
  };

  increment.addEventListener("click", () => {
    currentDate.incrementMonth();
    updateCalendar();
  });

  decrement.addEventListener("click", () => {
    currentDate.decrementMonth();
    updateCalendar();
  });

  calendar.replaceChildren(controller, weekDayContainer, monthDaysContainer);
  updateCalendar();
};

export default calendar;
