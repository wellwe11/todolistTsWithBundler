import day, { updateDay } from "./calendar/dayCalendar";
import { updateCalendarMonth } from "./calendar/monthCalendar";
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
  private _day!: number;

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
    this._day = date.getDate();
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

  get currentDay() {
    // returns active day
    // starts at current day (real-time)
    // user may go from previous day to next day to view active Tasks
    const dayDate = new Date(
      this.year,
      this.monthIndex,
      this._day - 1
    ).getDay();
    return { date: this._day, weekDay: dayDate };
  }

  incrementDay() {
    const maxDays = this.daysInMonth;

    if (this._day >= maxDays) {
      this._day = 1;
      this.incrementMonth();
    } else {
      this._day++;
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
    "#calendarGridContainer"
  ) as HTMLDivElement;

  const title = document.querySelector("#title") as HTMLElement;

  const tabType = activeCalendar.type;

  if (tabType === "month") {
    updateCalendarMonth(calendarDays, title);
  } else {
    updateDay(calendarDays, title);
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
