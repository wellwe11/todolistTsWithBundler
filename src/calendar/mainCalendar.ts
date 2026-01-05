import { updateCalendarMonth } from "./calendar/monthCalendar";
import { updateWeek } from "./calendar/weekCalendar";
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
  private _week!: number;

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
    this._week = this.makeCurrentWeek;
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

  get week() {
    return this._week;
  }

  get makeCurrentWeek() {
    const date = new Date();
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const dayNum = d.getUTCDay() || 7; // Sunday = 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum); // Thursday of this week
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  incrementWeek() {
    if (this._week >= 52) {
      this._week = 0;
      this._year++;
    } else {
      this._week++;
    }
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

export const updateCalendar = () => {
  const calendarDays = document.querySelector(
    "#calendarDays"
  ) as HTMLDivElement;

  const title = document.querySelector("#title") as HTMLElement;

  const tabType = activeCalendar.type;

  if (tabType === "month") {
    updateCalendarMonth(calendarDays, title);
  } else if (tabType === "week") {
    updateWeek(calendarDays, title);
  } else {
    ("");
  }
};

// main.ts - loads once, displays the standard todo-list
const mainCalendar = () => {
  const buttonsContainer = document.querySelector(
    "#tabTypeContainer"
  ) as HTMLDivElement;
  buttonsContainer.addEventListener("click", (e) => tabActions(e));
};

export default mainCalendar;
