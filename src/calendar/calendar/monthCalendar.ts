import { tasks } from "../../localStorageArray/localStorageArray";
import { currentDate } from "../mainCalendar";
import createDateWithTasksEl from "./functions/createDateWithTasksEl";
import createDayTasks from "./functions/createDayTasks";

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

// actions for when user changes current month
const monthActions = (
  e: MouseEvent,
  calendarDays: HTMLDivElement,
  title: HTMLElement
) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "increment":
      currentDate.incrementMonth();
      updateCalendarMonth(calendarDays, title);
      break;

    case "decrement":
      currentDate.decrementMonth();
      updateCalendarMonth(calendarDays, title);
      break;

    default:
      throw new Error(
        "-- monthCalendar.ts -- No action matches monthActions event."
      );
  }
};

// updates calendar based on active month
// if user changes month, calendar-divs are updated and the matching events are found and placed inside of new calendar
export const updateCalendarMonth = (
  calendarDays: HTMLDivElement,
  title: HTMLElement
) => {
  title.textContent = `${currentDate.month} ${currentDate.year}`;
  calendarDays.innerHTML = "";

  const mDays = monthDays();

  const taskMap = new Map();
  tasks.forEach((t) => taskMap.set(t.date, t));

  mDays.forEach((dataElement) => {
    const dateStr: string = dataElement.dataset.action!;
    if (taskMap.has(dateStr)) {
      const ul = createDayTasks(taskMap, dateStr) as HTMLUListElement;
      dataElement.append(ul);
    }
  });

  calendarDays.replaceChildren(...mDays);
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

  const weekDaysContainer = calendarContainer.querySelector(
    "#gridSectionNamesContainer"
  ) as HTMLDivElement;

  const calendarDays = calendarContainer.querySelector(
    "#calendarGridContainer"
  ) as HTMLDivElement;

  calendarDays.className = "daysGrid monthDays"; // same layout for both monthly days and weekly days
  weekDaysContainer.innerHTML = "";
  const title = pageController.querySelector("#title") as HTMLElement;

  // create week-days (mon, tue, wed, thur... etc.)
  const weekDayContainer = document.createElement("div") as HTMLDivElement;
  weekDayContainer.className = "daysGrid weekDays"; // same layout for both monthly days and weekly days
  const weekDays = newWeekDays();
  weekDayContainer.append(...weekDays);

  weekDaysContainer.append(weekDayContainer);

  pageController.onclick = (e) => monthActions(e, calendarDays, title);

  updateCalendarMonth(calendarDays, title);
};

export default monthCalendar;
