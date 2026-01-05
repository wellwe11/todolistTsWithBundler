import monthCalendar from "./calendar/monthCalendar";
import weekCalendar from "./calendar/weekCalendar";

const container = document.getElementById("calendar") as HTMLDivElement,
  calendarDays = container.querySelector("#calendarDays") as HTMLDivElement;

const tabController = document.getElementById(
    "tabTypeContainer"
  ) as HTMLDivElement,
  buttons = tabController.querySelectorAll("button");

class CalendarType {
  private _type: string;

  constructor(type: string) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  set type(setter: string) {
    this._type = setter;
  }
}

export class CalendarData {
  private _year!: number;
  private _monthIndex!: number;

  readonly months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(date: Date) {
    this._year = date.getFullYear();
    this._monthIndex = date.getMonth();
  }

  get year() {
    return this._year;
  }

  get monthIndex() {
    return this._monthIndex;
  }

  get month() {
    return this.months[this.monthIndex];
  }

  get daysInMonth() {
    return new Date(this._year, this.monthIndex + 1, 0).getDate();
  }

  get firstDayOfMonth() {
    // adapted for euorpean calendar-days
    const date = new Date(this.year, this.monthIndex, 1).getDay();
    return date === 0 ? 7 : date;
  }

  incrementMonth() {
    if (this._monthIndex >= 11) {
      this._monthIndex = 0;
      this._year++;
    } else {
      this._monthIndex++;
    }
  }

  decrementMonth() {
    if (this._monthIndex <= 0) {
      this._monthIndex = 11;
      this._year--;
    } else {
      this._monthIndex--;
    }
  }
}

export const currentDate: CalendarData = new CalendarData(new Date());
export const activeCalendar: CalendarType = new CalendarType("week");

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

const week = () => {
  weekCalendar();
};

const month = () => {
  const { monthDaysContainer, controller, weekDayContainer } = monthCalendar();

  calendarDays.replaceChildren(
    controller,
    weekDayContainer,
    monthDaysContainer
  );
};

const mainCalendar = () => {
  buttons.forEach((button) =>
    button.addEventListener("click", (e) => tabActions(e))
  );

  week(); // standard page that loads

  return container;
};

export default mainCalendar;
