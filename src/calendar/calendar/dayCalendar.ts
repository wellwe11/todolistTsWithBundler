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

  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  if (taskMap.has(activeDate)) {
    const tasks = taskMap.get(activeDate).tasks;

    const timeMap = new Map();
    tasks.forEach((t: Task) => timeMap.set(t.dueTime, t));

    const filterByTime = () => {
      const tasksByTime: Record<string, Task[]> = {};

      tasks.forEach((t: Task) => {
        if (!tasksByTime.hasOwnProperty(t.dueTime)) {
          tasksByTime[t.dueTime] = [];
        }
        tasksByTime[t.dueTime].push(t);
      });

      return tasksByTime;
    };

    // create list with times for same day
    const ul = createDateWithTasksEl(taskMap.get(activeDate));

    // ul's grid-container
    const liParent = ul.querySelector("li") as HTMLElement;
    liParent.classList = "timeGrid";

    const liElements = liParent.querySelectorAll("li");
    console.log(liElements);

    const filteredTasks = filterByTime();
    const taskEntries = Object.entries(filteredTasks);

    taskEntries.forEach(([time, tasks]) => {
      const timeContainer = createTimeElement(time);

      tasks.forEach((task, index) => {
        const findEl = [...liElements].find(
          (e) => e.id === task.id
        ) as HTMLElement;

        timeContainer.append(findEl);
      });

      ul.append(timeContainer);
    });

    // taskEntries.forEach(([entry]) => {
    //   const timeContainer = createTimeElement(t);
    //   timeContainer.append(liElements[index]);
    //   liParent.append(timeContainer);
    // });

    calendarDays.append(ul);
  } else {
    calendarDays.innerHTML = "";
  }
};

const createTimeElement = (time: string) => {
  const hourContainer = document.createElement("div") as HTMLDivElement;
  hourContainer.className = "hourContainer";
  hourContainer.dataset.name = `time ${time}`;
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
