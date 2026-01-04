// priority:
// create 3 buttons: today, week, month

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

const tabActions = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;

  switch (action) {
    case "today":
      console.log("today");
      break;

    case "week":
      console.log("week");
      break;

    case "month":
      console.log("month");
      break;

    default:
      return new Error(
        "-- tabController -- Cannot change tab. Probable cause: No target for action."
      );
  }
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
