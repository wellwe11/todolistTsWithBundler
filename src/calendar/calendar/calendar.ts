import { createDate, createTask, liElement } from "../../listItem/listItem";
import handleMoveLiActions from "../../localStorageArray/functions/handleMoveLiActions";
import type { Task, Dates } from "../../localStorageArray/localStorageArray";
import { tasks } from "../../localStorageArray/localStorageArray";
import { currentDate } from "../mainCalendar";

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

const assignDatesToDay = (appender: HTMLElement, obj: Dates) => {
  const ul = document.createElement("list") as HTMLUListElement;
  ul.addEventListener("click", handleMoveLiActions);

  if (appender) {
    appender.append(ul);
  }

  const liDate = createDate(obj);

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

  ul.append(liDate);
};

export const monthController = () => {
  const controller = document.createElement("div");
  controller.innerHTML = `
  <button class="incrementMonth">+</button>
  <h5 class="monthTitle"></h5>
  <button class="decrementMonth">-</button>
  `;

  const title = controller.querySelector(".monthTitle") as HTMLElement;

  const increment = controller.querySelector(
    ".incrementMonth"
  ) as HTMLButtonElement;
  const decrement = controller.querySelector(
    ".decrementMonth"
  ) as HTMLButtonElement;

  return {
    increment,
    decrement,
    title,
    controller,
  };
};

const calendar = () => {
  const monthDaysContainer = document.createElement("div") as HTMLDivElement;
  monthDaysContainer.className = "daysGrid monthDays";

  const weekDayContainer = document.createElement("div") as HTMLDivElement;
  weekDayContainer.className = "daysGrid weekDays";

  const { increment, decrement, title, controller } = monthController();
  const weekDays = newWeekDays();

  weekDayContainer.append(...weekDays);

  const updateCalendar = () => {
    title.textContent = `${currentDate.month} ${currentDate.year}`;
    monthDaysContainer.innerHTML = "";

    const mDays = monthDays();
    // find matching objects from local storage, that match days in month
    tasks.forEach((dateObj) => {
      const dayDate = dateObj.date;
      mDays.forEach((date) => {
        if (date.dataset.action === dayDate) {
          assignDatesToDay(date, dateObj);
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

  updateCalendar();
  return {
    controller,
    weekDayContainer,
    monthDaysContainer,
    updateCalendar,
  };
};

export default calendar;
