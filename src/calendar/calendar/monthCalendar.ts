const calendarControllerContainer = document.getElementById(
    "calendarContainer"
  ) as HTMLElement,
  monthDaysContainer = document.createElement("div") as HTMLDivElement;

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

const monthActions = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  console.log("asd");

  switch (action) {
    case "increment":
      currentDate.incrementMonth();
      updateCalendar();
      break;

    case "decrement":
      currentDate.decrementMonth();
      updateCalendar();
      break;

    default:
      console.error(
        "-- monthCalendar.ts -- No action matches monthActions event."
      );
  }
};

const monthController = () => {
  const controllerButtons =
    calendarControllerContainer?.querySelectorAll("button");

  controllerButtons?.forEach((btn) =>
    btn.addEventListener("click", (e) => monthActions(e))
  );
};

const updateCalendar = () => {
  const title = calendarControllerContainer.querySelector(
    "#title"
  ) as HTMLElement;

  if (title) {
    title.textContent = `${currentDate.month} ${currentDate.year}`;
  }

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

const monthCalendar = () => {
  monthDaysContainer.className = "daysGrid monthDays";
  monthController();

  const weekDayContainer = document.createElement("div") as HTMLDivElement;
  weekDayContainer.className = "daysGrid weekDays";

  const weekDays = newWeekDays();

  weekDayContainer.append(...weekDays);

  updateCalendar();

  return {
    weekDayContainer,
    monthDaysContainer,
    updateCalendar,
  };
};

export default monthCalendar;
