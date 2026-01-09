import { currentDate, updateCalendar } from "../mainCalendar";
import { tasks, type Task } from "../../localStorageArray/localStorageArray";

import createDateWithTasksEl from "./functions/createDateWithTasksEl";
import { createDate, createTask, liElement } from "../../listItem/listItem";
import handleMoveLiActions from "../../localStorageArray/functions/handleMoveLiActions";
import createDayTasks from "./functions/createDayTasks";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayActions = (
  e: MouseEvent,
  calendarDays: HTMLDivElement,
  title: HTMLElement
) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "increment":
      currentDate.incrementDay();
      updateDay(calendarDays, title);
  }
};

export const updateDay = (calendarDays: HTMLDivElement, title: HTMLElement) => {
  calendarDays.innerHTML = "";
  calendarDays.classList = "";

  calendarDays.className += " " + "timeGrid";

  // find specific day-date
  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  // Create a map for each day - this returns an object: {date => obj}
  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));
  if (!taskMap.has(activeDate)) return;

  const ul = createDayTasks(taskMap, activeDate) as HTMLUListElement;

  calendarDays.append(ul);
};

const day = () => {
  const calendarContainer = document.getElementById(
    "calendarTypeContainer"
  ) as HTMLDivElement;

  if (!calendarContainer)
    throw new Error(
      " -- monthCalendar.ts -- Missing HTML element: #calendarTypeContainer"
    );

  const weekDaysContainer = calendarContainer.querySelector(
    "#gridSectionNamesContainer"
  ) as HTMLDivElement;

  const calendarDays = calendarContainer.querySelector(
    "#calendarGridContainer"
  ) as HTMLDivElement;

  const pageController = calendarContainer.querySelector(
    "#pageController"
  ) as HTMLDivElement;

  const title = pageController.querySelector("#title") as HTMLElement;

  pageController.onclick = (e) => dayActions(e, calendarDays, title);

  updateDay(calendarDays, title);
};

export default day;
