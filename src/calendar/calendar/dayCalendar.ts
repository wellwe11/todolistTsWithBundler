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

export const updateDay = (calendarDays: HTMLDivElement, title: HTMLElement) => {
  calendarDays.innerHTML = "";

  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  if (taskMap.has(activeDate)) {
    const tasks = taskMap.get(activeDate).tasks;

    const ul = createDateWithTasksEl(taskMap.get(activeDate));

    const liParent = ul.querySelector("li") as HTMLElement;
    liParent.classList = "timeGrid";

    const gridElements = createDayTimes();

    const liElements = liParent.querySelectorAll("li");

    tasks.forEach((t, index) => {
      const hour = t.dueTime.split(":")[0];
      console.log(gridElements[index]);

      gridElements[index].append(liElements[index]);
    });

    liParent.append(...gridElements);

    calendarDays.append(ul);
  } else {
    calendarDays.innerHTML = "";
  }
};

const createDayTimes = () => {
  const hoursADay = 24;

  const timeDivs = [];

  for (let i = 0; i < hoursADay; i++) {
    const hourContainer = document.createElement("div") as HTMLDivElement;
    hourContainer.className = "hourContainer";
    hourContainer.dataset.name = `time ${i}`;
    hourContainer.innerHTML = `
        <h3 classname="hourText"></h3>
        `;

    timeDivs.push(hourContainer);

    const text = hourContainer.querySelector("h3") as HTMLElement;
    text.textContent = String(i);
  }

  return timeDivs;
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
};

export default day;
