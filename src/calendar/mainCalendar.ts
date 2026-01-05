import monthCalendar, { updateCalendarMonth } from "./calendar/monthCalendar";
import weekCalendar from "./calendar/weekCalendar";
import tabActions from "./tabController/tabActions";

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

// used for when something is changed inside of the tasks-array. Recreates only specific elements
export const updateCalendar = () => {
  const calendarDays = document.querySelector(
    "#calendarDays"
  ) as HTMLDivElement;

  const title = document.querySelector("#title") as HTMLElement;

  // in future, check if it is day, week or month

  const tabType = activeCalendar.type;

  if (tabType === "month") {
    updateCalendarMonth(calendarDays, title);
  } else if (tabType === "week") {
    weekCalendar();
  } else {
    ("");
  }

  console.log(activeCalendar.type);
};

// main.ts - loads once, displays the standard todo-list
const mainCalendar = () => {
  const buttonsContainer = document.querySelector(
    "#tabTypeContainer"
  ) as HTMLDivElement;
  buttonsContainer.addEventListener("click", (e) => tabActions(e));
};

export default mainCalendar;
