import { currentDate } from "../mainCalendar";

const weekAction = (
  e: MouseEvent,
  calendarDays: HTMLDivElement,
  title: HTMLElement
) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "increment":
      currentDate.incrementWeek();
      updateWeek(calendarDays, title);
      break;

    case "decrement":
      currentDate.decrementWeek();
      updateWeek(calendarDays, title);
      break;

    default:
      throw new Error(
        "-- weekCalendar.ts -- No action matches weekAction event."
      );
  }
};

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
const newWeekDays = () => {
  const isFirstWeekOfMonth = currentDate.week % 4 === 1;
  const array = [];

  const firstDayOfWeek = dayNames[currentDate.firstDayOfMonth - 1];
  const startIndex = isFirstWeekOfMonth ? dayNames.indexOf(firstDayOfWeek) : 0;

  for (let i = startIndex; i <= dayNames.length; i++) {
    const div = document.createElement("div");
    div.className = "weekday" + " " + dayNames[i];
    div.textContent = dayNames[i];

    if (isFirstWeekOfMonth && i === startIndex && currentDate.week) {
      div.style.gridColumnStart = String(startIndex + 1);
    }

    array.push(div);
  }

  return array;
};

export const updateWeek = (
  calendarDays: HTMLDivElement,
  title: HTMLElement
) => {
  title.textContent = `Week: ${currentDate.week} ${currentDate.month} ${currentDate.year}`;
  calendarDays.innerHTML = "";

  const weekDays = newWeekDays();
  calendarDays.append(...weekDays);
};

const weekCalendar = () => {
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
  ) as HTMLDivElement;

  const title = pageController.querySelector("#title") as HTMLElement;

  calendarDays.className = "daysGrid monthDays";
  calendarDays.innerHTML = "";

  pageController.onclick = (e) => weekAction(e, calendarDays, title);

  updateWeek(calendarDays, title);
};

export default weekCalendar;
