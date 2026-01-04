// priority:
// create 3 buttons: today, week, month

const tabController = () => {
  const tabContainer = document.createElement("div");
  const tabs = ["Today", "Week", "Month"];

  const buttons = tabs.map((btn) => {
    const element = document.createElement("button") as HTMLButtonElement;
    element.classList = "tabButton";
    element.textContent = btn;

    return element;
  });

  tabContainer.append(...buttons);
  return tabContainer;
};

export default tabController;
