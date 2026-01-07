import { currentDate } from "../mainCalendar";
import { tasks } from "../../localStorageArray/localStorageArray";

import createDateWithTasksEl from "./functions/createDateWithTasksEl";

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

const updateDay = (calendarDays: HTMLDivElement, title: HTMLElement) => {
  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  if (taskMap.has(activeDate)) {
    console.log(taskMap.get(activeDate));
    const ul = createDateWithTasksEl(taskMap.get(activeDate));

    calendarDays.append(ul);
  } else {
    calendarDays.innerHTML = "";
  }
};

const createDayTimes = () => {
  // next step: each Task in Date > tasks should have a due-date time. If none is selected, take 1 hour in the future.
  // This will be used to add them to the grid-layout.

  const hoursADay = 24;

  const grid = [];

  for (let i = 0; i < hoursADay; i++) {
    const hourContainer = document.createElement("div") as HTMLDivElement;
    hourContainer.className = "hourContainer";
    hourContainer.dataset.name = `time ${i}`;
    hourContainer.innerHTML = `
        <h3 classname="hourText"></h3>
        `;

    grid.push(hourContainer);

    const text = hourContainer.querySelector("h3") as HTMLElement;
    text.textContent = String(i);
  }

  return grid;
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
  calendarDays.classList = "timeGrid";
  const gridElements = createDayTimes();
  calendarDays.append(...gridElements);

  const pageController = calendarContainer.querySelector(
    "#pageController"
  ) as HTMLDivElement;

  const title = pageController.querySelector("#title") as HTMLElement;

  pageController.onclick = (e) => dayActions(e, calendarDays, title);
};

export default day;
