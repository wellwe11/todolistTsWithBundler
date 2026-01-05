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
  const ul = document.createElement("ul") as HTMLUListElement;
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

const monthActions = (
  e: MouseEvent,
  monthDaysContainer: HTMLDivElement,
  title: HTMLElement
) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "increment":
      currentDate.incrementMonth();
      updateCalendar(monthDaysContainer, title);
      break;

    case "decrement":
      currentDate.decrementMonth();
      updateCalendar(monthDaysContainer, title);
      break;

    default:
      throw new Error(
        "-- monthCalendar.ts -- No action matches monthActions event."
      );
  }
};

export const updateCalendar = (
  monthDaysContainer: HTMLDivElement,
  title: HTMLElement
) => {
  title.textContent = `${currentDate.month} ${currentDate.year}`;
  monthDaysContainer.innerHTML = "";

  const mDays = monthDays();

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  mDays.forEach((dataElement) => {
    const dateStr = dataElement.dataset.action;
    if (taskMap.has(dateStr)) {
      assignDatesToDay(dataElement, taskMap.get(dateStr));
    }
  });

  monthDaysContainer.replaceChildren(...mDays);
};

const createMonthCalendar = () => {
  const monthDaysContainer = document.createElement("div") as HTMLDivElement;
  monthDaysContainer.className = "daysGrid monthDays";
  monthDaysContainer.innerHTML = "";

  return monthDaysContainer;
};

const monthCalendar = () => {
  const calendarContainer = document.getElementById(
    "calendarTypeContainer"
  ) as HTMLDivElement;

  if (!calendarContainer)
    throw new Error(
      " -- monthCalendar.ts -- Missing HTML element: #calendarTypeContainer"
    );

  const pageController = calendarContainer.querySelector(
    "#pageController"
  ) as HTMLDivElement;

  const calendarDays = calendarContainer.querySelector(
    "#calendarDays"
  ) as HTMLElement;

  const weekDaysContainer = calendarContainer.querySelector(
    "#weekdaysContainer"
  ) as HTMLDivElement;
  weekDaysContainer.innerHTML = "";

  const title = pageController.querySelector("#title") as HTMLElement;

  // create week-days (mon, tue, wed, thur... etc.)
  const weekDayContainer = document.createElement("div") as HTMLDivElement;
  weekDayContainer.className = "daysGrid weekDays";
  const weekDays = newWeekDays();
  weekDayContainer.append(...weekDays);

  weekDaysContainer.append(weekDayContainer);

  const monthDaysContainer = createMonthCalendar();

  calendarDays.replaceChildren(monthDaysContainer);

  pageController.addEventListener("click", (e) => {
    monthActions(e, monthDaysContainer, title);
  });

  // create a new container
  // this container will refresh itself whenever user switches between months
  updateCalendar(monthDaysContainer, title); // add content to container
};

export default monthCalendar;
