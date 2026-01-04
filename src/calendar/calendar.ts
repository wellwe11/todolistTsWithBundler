import { createDate, createTask, liElement } from "../listItem/listItem";
import type { Task } from "../localStorageArray/localStorageArray";

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
    // adapted for euorpean calendar-days
    const date = new Date(this.year, this.monthIndex, 1).getDay();
    return date === 0 ? 7 : date;
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

const newController = () => {
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

  return {
    increment,
    decrement,
    title,
    controller,
  };
};

// static never-changing weekdays: monday, tuesday, wednesday etc.
const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const newWeekDays = () =>
  dayNames.map((name) => {
    const div = document.createElement("div");
    div.className = "weekday" + " " + name;
    div.textContent = name;
    return div;
  });

const monthDays = () => {
  const monthDays = [];

  for (let d = 0; d < currentDate.daysInMonth; d++) {
    const dayEl = document.createElement("div");
    dayEl.dataset.action = `${d + 1}/${currentDate.monthIndex}/${
      currentDate.year
    }`;
    dayEl.className = "day";
    dayEl.textContent = String(d + 1);

    if (d === 0) {
      dayEl.style.gridColumnStart = String(currentDate.firstDayOfMonth);
    }

    monthDays.push(dayEl);
  }

  return monthDays;
};

const calendar = (dates) => {
  console.log(dates);
  const calendar = document.getElementById("calendar") as HTMLElement;

  const weekDayContainer = document.createElement("div");
  const monthDaysContainer = document.createElement("div");

  const { increment, decrement, title, controller } = newController();
  const weekDays = newWeekDays();

  weekDayContainer.className = "daysGrid weekDays";

  weekDayContainer.append(...weekDays);

  monthDaysContainer.className = "daysGrid monthDays";

  const updateCalendar = () => {
    title.textContent = `${currentDate.month} ${currentDate.year}`;

    monthDaysContainer.innerHTML = "";

    const mDays = monthDays();

    const assignDatesToDay = (element, obj) => {
      const ul = document.createElement("list") as HTMLUListElement;
      element.append(ul);

      const liDate = createDate(obj);
      ul.append(liDate);

      console.log(obj);

      obj.tasks.forEach((task: Task) => {
        const li = createTask(task);

        if (!li) {
          throw new Error("-- handleNewLi -- no li element");
        }

        if (obj.tasks && task.list.length > 0) {
          task.list.forEach((l) => {
            const child = liElement(l);
            li.append(child);
          });
        }

        liDate.append(li);
      });
    };

    // find matching objects from local storage, that match days in month
    dates.forEach((dateObj) => {
      const dayDate = dateObj.date;

      mDays.forEach((date) => {
        if (date.dataset.action === dayDate) {
          console.log(dateObj, date);
          assignDatesToDay(date, dateObj);
        } else {
        }
      });
    });

    monthDaysContainer.append(...mDays);
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
