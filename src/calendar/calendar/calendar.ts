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
  const { days } = date();

  for (let d = 0; d < days; d++) {
    console.log(parent);
    console.log(1);
    const newDay = day(`${d + 1}`);
    console.log(2);
    parent.append(newDay);
    console.log(3);
  }
};

const calendar = () => {
  const calendar = document.getElementById("calendar") as HTMLElement;

  calendarDays(calendar);

  return calendar;
};

export default calendar;
