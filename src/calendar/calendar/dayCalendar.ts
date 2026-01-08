import { currentDate, updateCalendar } from "../mainCalendar";
import { tasks, type Task } from "../../localStorageArray/localStorageArray";

import createDateWithTasksEl from "./functions/createDateWithTasksEl";
import { createDate, createTask, liElement } from "../../listItem/listItem";
import handleMoveLiActions from "../../localStorageArray/functions/handleMoveLiActions";

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

  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  // find current day (user scrolls between days and this maps out each day based on date)
  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));
  if (!taskMap.has(activeDate)) return;

  const activeDay = taskMap.get(activeDate);

  const ul = document.createElement("ul") as HTMLUListElement;
  ul.addEventListener("click", handleMoveLiActions);
  const list = document.createElement("li") as HTMLLIElement;
  list.className = "timesList";

  calendarDays.append(ul);
  ul.append(list);
  ul.id = activeDay.id;
  ul.className = "dateLi";

  // sort tasks by time and push times together
  const timeMap = new Map<string, Task[]>();

  activeDay.tasks.forEach((t: Task) => {
    if (!t) return;

    const existingTime = timeMap.get(t.dueTime) || [];
    existingTime.push(t);

    timeMap.set(t.dueTime, existingTime);
  });

  // need to sort by time as well

  [...timeMap].forEach(([time, objArr], arrIndex) => {
    const container = document.createElement("div");
    container.classList = `timeContainer`;

    const timeText = document.createElement("h3");

    timeText.textContent = time;
    timeText.style.gridRow = String(arrIndex + 1);
    timeText.style.gridColumn = "1";

    container.append(timeText);

    objArr.forEach((obj, index) => {
      const li = createTask(obj);
      li.dataset.list = String(arrIndex);
      li.style.gridRow = String(index + 1);
      li.style.gridColumn = "1";
      container.append(li);

      if (obj.list && obj.list.length > 0) {
        obj.list.forEach((l) => {});
      }
    });

    list.append(container);
  });
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
