import { currentDate } from "../mainCalendar";
import { tasks } from "../../localStorageArray/localStorageArray";
import { Dates } from "../../localStorageArray/localStorageArray";

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

const createDailyTasks = (date: Dates, appender: HTMLDivElement) => {
  const dayList = document.createElement("div");
  const text = document.createElement("h1");
  text.textContent = `HELLO ${date.date}`;

  dayList.append(text);

  appender.append(dayList);
  console.log(date, appender);
};

const updateDay = (calendarDays: HTMLDivElement, title: HTMLElement) => {
  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;

  title.textContent = `${weekDay}, ${date} ${currentDate.month}`;
  const activeDate = `${date}/${currentDate.monthIndex}/${currentDate.year}`;

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  if (taskMap.has(activeDate)) {
    createDailyTasks(taskMap.get(activeDate), calendarDays);
  } else {
    calendarDays.innerHTML = "";
  }
};

const day = () => {
  const calendarContainer = document.getElementById(
    "calendarTypeContainer"
  ) as HTMLDivElement;

  if (!calendarContainer)
    throw new Error(
      " -- monthCalendar.ts -- Missing HTML element: #calendarTypeContainer"
    );

  const calendarDays = calendarContainer.querySelector(
    "#calendarDays"
  ) as HTMLDivElement;

  const pageController = calendarContainer.querySelector(
    "#pageController"
  ) as HTMLDivElement;

  const title = pageController.querySelector("#title") as HTMLElement;

  pageController.onclick = (e) => dayActions(e, calendarDays, title);
};

export default day;
