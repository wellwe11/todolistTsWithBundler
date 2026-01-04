// priority:
// create 3 buttons: today, week, month

export let tab = "";

export const monthController = () => {
  const controller = document.createElement("div");
  controller.innerHTML = `
  <button class="incrementMonth">+</button>
  <h5 class="monthTitle"></h5>
  <button class="decrementMonth">-</button>
  `;

  const increment = controller.querySelector(
    ".incrementMonth"
  ) as HTMLButtonElement;
  const decrement = controller.querySelector(
    ".decrementMonth"
  ) as HTMLButtonElement;
  const title = controller.querySelector(".monthTitle") as HTMLElement;

  return {
    increment,
    decrement,
    title,
    controller,
  };
};

export const tabActions = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;
  const title = document.querySelector("#activeTabTitle") as HTMLElement;

  switch (action) {
    case "today":
      // display a single day list.
      // have two buttons that allows user to switch days.
      // Start as today, and allow user to switch between today, tomorrow, next day, previous day
      if (tab !== "today") {
        tab = "today";
      }

      return "today";
      break;

    case "week":
      // display the week as in tall columns. Each day will have it's weekday on-top.
      // two buttons that allows user to switch weeks.
      // clicking a specific day will take user to that day

      if (tab !== "week") {
        tab = "week";
      }

      break;

    case "month":
      // display entire month.
      // two buttons that allows user to switch between months.
      // clicking a specific day will take user to that day.

      if (tab !== "month") {
        tab = "month";
      }

      break;

    default:
      tab = "Week";
      return new Error(
        "-- tabController -- Cannot change tab. Probable cause: No target for action."
      );
  }

  title.textContent = tab;
};

const tabController = () => {
  const controllersContainer = document.getElementById(
    "tabTypeContainer"
  ) as HTMLDivElement;
  if (!controllersContainer) return;

  const buttons = controllersContainer.querySelectorAll("button");

  buttons.forEach((button) =>
    button.addEventListener("click", (e) => tabActions(e))
  );
};

export default tabController;
