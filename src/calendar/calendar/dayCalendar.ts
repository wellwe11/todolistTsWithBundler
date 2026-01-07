import { currentDate, updateCalendar } from "../mainCalendar";
import { tasks, type Task } from "../../localStorageArray/localStorageArray";

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
  calendarDays.classList = "";

  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  if (taskMap.has(activeDate)) {
    const activeDateMapped = taskMap.get(activeDate);

    const tasks = activeDateMapped.tasks.sort(
      (a, b) => +a.dueTime.replace(":", "") - +b.dueTime.replace(":", "")
    );

    // create list with times for same day
    const ul = createDateWithTasksEl(taskMap.get(activeDate));

    // ul's grid-container
    const liParent = ul.querySelector("li") as HTMLElement;
    liParent.classList = "timeGrid";

    const liElements = liParent.querySelectorAll("li");

    const timeMap = new Map<string, Task[]>();
    tasks.forEach((t: Task) => {
      const existing = timeMap.get(t.dueTime) || [];

      existing.push(t);

      timeMap.set(t.dueTime, existing);
    });

    [...timeMap].forEach(([time, tasks]) => {
      const timeContainer = createTimeElement(time);
      const tasksContainer = document.createElement("ul");
      tasksContainer.className = "dateLi";
      tasksContainer.id = activeDateMapped.id;

      timeContainer.append(tasksContainer);

      tasks.forEach((task) => {
        const findEl = [...liElements].find(
          (e) => e.id === task.id
        ) as HTMLElement;

        tasksContainer.append(findEl);
      });

      ul.append(timeContainer);
    });

    calendarDays.append(ul);
  } else {
    calendarDays.innerHTML = "";
  }
};

const createTimeElement = (time: string) => {
  const hourContainer = document.createElement("div") as HTMLDivElement;
  hourContainer.className = "hourContainer";
  hourContainer.dataset.name = `time ${time}`;
  hourContainer.id = "hourContainer";
  hourContainer.innerHTML = `
          <h3 classname="hourText"></h3>
          `;

  const text = hourContainer.querySelector("h3") as HTMLElement;
  text.textContent = String(time);

  return hourContainer;
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
