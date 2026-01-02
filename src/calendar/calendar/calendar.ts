import day from "../calenderDay/calenderDay";

// step 1
// create a page selector
// each page will be a month, which is based on a year
// when a page is selected, a new date for that month is created
// whenever the page changes, data is re-created, and a new calendar month is made

const date = () => {
  const date = new Date();

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
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const days = new Date(year, monthIndex + 1, 0).getDate();

  return {
    year,
    month,
    months,
    days,
  };
};

const calendarDays = (parent: HTMLElement) => {
  const { days, month, year } = date();

  for (let d = 0; d < days; d++) {
    const newDay = day(`${d}/${month}/${year}`);

    parent.append(newDay);
  }
};

const month = () => {
  const { months } = date();
  const yearContainer = document.createElement("div");
  const currentMonth = new Date();
  let activeYear = currentMonth.getFullYear();
  let activeMonth = currentMonth.getMonth();
  let textMonth = months[activeMonth];

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

  monthTitle.textContent = textMonth;

  incrementYear?.addEventListener("click", () => {
    if (activeMonth >= 11) {
      activeYear++;
      activeMonth = 0;
    } else {
      activeMonth++;
    }

    textMonth = months[activeMonth];
    monthTitle.textContent = textMonth;
  });

  decrementYear?.addEventListener("click", () => {
    if (activeMonth >= 0) {
      activeMonth--;
    } else {
      activeMonth = 11;
      activeYear--;
    }

    textMonth = months[activeMonth];
    monthTitle.textContent = textMonth;
  });

  monthTitle.textContent = textMonth;

  return yearContainer;
};

const calendar = () => {
  const calendar = document.getElementById("calendar") as HTMLElement;

  const yearCont = month();
  calendar.append(yearCont);

  calendarDays(calendar);

  return calendar;
};

export default calendar;
