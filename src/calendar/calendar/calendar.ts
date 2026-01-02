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

const year = () => {
  const yearContainer = document.createElement("div");
  const minYear = new Date().getFullYear();
  let activeYear = minYear;

  yearContainer.innerHTML = `
  <button class="incrementYear">+</button>
  <h5 class="yearTitle"></h5>
  <button class="decrementYear">-</button>
  `;

  const incrementYear = yearContainer.querySelector(
      ".incrementYear"
    ) as HTMLButtonElement,
    decrementYear = yearContainer.querySelector(
      ".decrementYear"
    ) as HTMLButtonElement;

  incrementYear?.addEventListener("click", () => {
    activeYear++;

    yearTitle.textContent = activeYear.toString();
  });

  decrementYear?.addEventListener("click", () => {
    activeYear--;

    yearTitle.textContent = activeYear.toString();
  });

  const yearTitle = yearContainer.querySelector(
    ".yearTitle"
  ) as HTMLTitleElement;

  yearTitle.textContent = activeYear.toString();

  return yearContainer;
};

const calendar = () => {
  const calendar = document.getElementById("calendar") as HTMLElement;

  const yearCont = year();
  calendar.append(yearCont);

  calendarDays(calendar);

  return calendar;
};

export default calendar;
