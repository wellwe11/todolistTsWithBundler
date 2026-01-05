import { activeCalendar, week, month } from "../mainCalendar";

const calendarDays = document.querySelector("#calendarDays") as HTMLDivElement;

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
      }
      break;

    case "week":
      // display the week as in tall columns. Each day will have it's weekday on-top.
      // two buttons that allows user to switch weeks.
      // clicking a specific day will take user to that day

      if (activeCalendar.type !== "week") {
        activeCalendar.type = "week";

        calendarDays.innerHTML = "";
        week();
      }
      break;

    case "month":
      // display entire month.
      // two buttons that allows user to switch between months.
      // clicking a specific day will take user to that day.

      if (activeCalendar.type !== "month") {
        activeCalendar.type = "month";

        calendarDays.innerHTML = "";
        month();
      }
      break;

    default:
      activeCalendar.type = "week";
      return new Error(
        "-- tabController -- Cannot change tab. Probable cause: No target for action."
      );
  }
};

export default tabActions;
