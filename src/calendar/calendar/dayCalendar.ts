import { currentDate } from "../mainCalendar";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayActions = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "increment":
      currentDate.incrementDay();
      console.log(currentDate.currentDay, currentDate.month);
  }
};

const day = () => {
  const weekDay = dayNames[currentDate.currentDay.weekDay];
  const date = currentDate.currentDay.date;
  console.log(weekDay, date);

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

  pageController.onclick = (e) => dayActions(e);
};

export default day;
