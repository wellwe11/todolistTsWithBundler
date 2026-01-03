import day from "../calenderDay/calenderDay";

// step 1
// create a page selector
// each page will be a month, which is based on a year
// when a page is selected, a new date for that month is created
// whenever the page changes, data is re-created, and a new calendar month is made

interface CalendarData {
  days: number;
  month: string;
  months: string[];
  year: number;
  monthIndex: number;
  incrementMonth: Function;
}

const newDate = (date: Date) => {
  const months = [
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

  const year = date.getFullYear();
  let monthIndex = date.getMonth();
  const month = months[monthIndex];
  const days = new Date(year, monthIndex + 1, 0).getDate();

  const incrementMonth = monthIndex++;
  const decrementMonth = monthIndex--;

  return {
    year,
    month,
    months,
    days,

    incrementMonth,
    decrementMonth,
  };
};

const currentDate = newDate(new Date());

const weekDayDivs = (parent: HTMLElement) => {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  for (let i = 0; i < dayNames.length; i++) {
    const day = dayNames[i];
    const element = document.createElement("div");

    element.innerHTML = `
        <h5 class="dayName"></h5>
        `;

    const text = element.querySelector(".dayName");

    if (text) {
      text.textContent = day;
    }

    parent.append(element);
  }
};

const calendarDaysDivs = (parent: HTMLElement, date: CalendarData) => {
  const { days, month, year } = date;

  for (let d = 0; d < days; d++) {
    const newDay = day(`${d + 1}/${month}/${year}`);

    parent.append(newDay);
  }
};

const activeDate = (
  increment: HTMLButtonElement,
  decrement: HTMLButtonElement,
  text: HTMLElement,
  date: CalendarData
) => {
  const { months, incrementMonth } = currentDate;

  // initial year on-load
  const currentMonth = new Date();
  let activeYear = currentMonth.getFullYear();
  let activeMonth = currentMonth.getMonth();
  let textMonth = months[activeMonth];

  console.log(currentDate);

  increment.addEventListener("click", () => {
    if (activeMonth >= 11) {
      incrementMonth();
      activeYear++;
      activeMonth = 0;
    } else {
      activeMonth++;
    }
  });

  decrement.addEventListener("click", () => {
    if (activeMonth >= 0) {
      activeMonth--;
    } else {
      activeMonth = 11;
      activeYear--;
    }

    textMonth = months[activeMonth];
    text.textContent = activeYear + " " + textMonth;
  });

  return {
    activeYear,
    textMonth,
    activeMonth,
  };
};

const scrollDate = (date: CalendarData) => {
  const yearContainer = document.createElement("div");

  yearContainer.innerHTML = `
  <button class="incrementMonth">+</button>
  <h5 class="monthTitle"></h5>
  <button class="decrementMonth">-</button>
  `;

  const incrementYear = yearContainer.querySelector(
      ".incrementMonth"
    ) as HTMLButtonElement,
    decrementYear = yearContainer.querySelector(
      ".decrementMonth"
    ) as HTMLButtonElement;

  const monthTitle = yearContainer.querySelector(
    ".monthTitle"
  ) as HTMLTitleElement;

  const { activeYear, textMonth, activeMonth } = activeDate(
    incrementYear,
    decrementYear,
    monthTitle,
    date
  );

  monthTitle.textContent = activeYear + " " + textMonth;

  return {
    yearContainer,
    activeYear,
    activeMonth,
  };
};

const calendar = () => {
  const calendar = document.getElementById("calendar") as HTMLElement;

  const date = new Date();
  const newD: CalendarData = newDate(date);
  const { yearContainer, activeMonth, activeYear } = scrollDate(newD);

  calendar.append(yearContainer);
  weekDayDivs(calendar);
  calendarDaysDivs(calendar, newD);

  const updateDate = new Date(activeMonth, activeYear);

  console.log(activeMonth, activeYear);
  console.log(updateDate);

  return calendar;
};

export default calendar;
