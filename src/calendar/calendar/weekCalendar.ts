import { currentDate } from "../mainCalendar";

const weekAction = (
  e: MouseEvent,
  weekDaysContainer: HTMLDivElement,
  title: HTMLElement
) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "increment":
      currentDate.incrementWeek();
      updateWeek(weekDaysContainer, title);
      break;

    case "decrement":
      currentDate.decrementWeek();
      updateWeek(weekDaysContainer, title);
      break;

    default:
      throw new Error(
        "-- weekCalendar.ts -- No action matches weekAction event."
      );
  }
};

export const updateWeek = (
  monthDaysContainer: HTMLDivElement,
  title: HTMLElement
) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (currentDate.week % 4 === 0) {
    // if first week of month - could start on any day
    const firstDayOfWeek = daysOfWeek[currentDate.firstDayOfMonth - 1];
  } else {
    // else always start on a monday
  }

  title.textContent = `Week: ${currentDate.week} ${currentDate.year}`;
  monthDaysContainer.innerHTML = "";
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

  const weekDaysContainer = calendarContainer.querySelector(
    "#weekdaysContainer"
  ) as HTMLDivElement;

  const title = pageController.querySelector("#title") as HTMLElement;

  calendarDays.className = "daysGrid monthDays";
  weekDaysContainer.innerHTML = "";

  pageController.onclick = (e) => weekAction(e, weekDaysContainer, title);

  updateWeek(weekDaysContainer, title);
};

export default weekCalendar;
