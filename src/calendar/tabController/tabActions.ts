import { activeCalendar } from "../mainCalendar";

import monthCalendar from "../calendar/monthCalendar";
import day from "../calendar/dayCalendar";

const weekdaysContainer = document.querySelector(
  "#gridSectionNamesContainer"
) as HTMLDivElement;

const calendarDays = document.querySelector(
  "#calendarGridContainer"
) as HTMLDivElement;

export const tabActions = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "today":
      // display a single day list.
      // have two buttons that allows user to switch days.
      // Start as today, and allow user to switch between today, tomorrow, next day, previous day
      if (activeCalendar.type !== "today") {
        activeCalendar.type = "today";
        calendarDays.innerHTML = "";
        weekdaysContainer.innerHTML = "";
        day();
      }
      break;

    case "month":
      // display entire month.
      // two buttons that allows user to switch between months.
      // clicking a specific day will take user to that day.

      if (activeCalendar.type !== "month") {
        activeCalendar.type = "month";
        weekdaysContainer.innerHTML = "";
        calendarDays.innerHTML = "";
        monthCalendar();
      }
      break;

    default:
      activeCalendar.type = "day";
      return new Error(
        "-- tabController -- Cannot change tab. Probable cause: No target for action."
      );
  }
};

export default tabActions;
