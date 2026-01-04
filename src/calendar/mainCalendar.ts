import calendar from "./calendar/calendar";
import tabController from "./tabController/tabController";

// create 3 buttons
// today, week, month

// clicking today will display a list of todos for today
// on top - a button to click back and forth, displaying for example tomorrow's todo-list, yesterdays, and so forth.

// clicking week will display columns, containing todo's. Each day will have a time-frame, where todo's as sorted by time and associated to those specific time-rows
// on top - a button to click which scrolls from previous week to next week
// clicking on a specific day will take user to that day

// clicking month will show a big grid showing all days, with minimized main-events
// on top - a button to clikc which scrolls previous month, next month, etc
// clicking on a specific day will take user to that day

// priority:
// create 3 buttons: today, week, month
// create 2 buttons: next, previous

// create a day component

// create a week component

// create a month component

const mainCalendar = () => {
  const container = document.getElementById("calendar") as HTMLDivElement;

  const { controller, weekDayContainer, monthDaysContainer } = calendar();
  const listTypeController = tabController();

  container.replaceChildren(controller);

  container.replaceChildren(controller, weekDayContainer, monthDaysContainer);

  return container;
};

export default mainCalendar;
