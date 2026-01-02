const addDayInnerHTML = (element: HTMLElement) => {
  element.innerHTML = `
    <h4 class="dayTitle"></h4>
    `;
};

const day = (date: string) => {
  const element = document.createElement("div");
  element.id = date;
  element.className = "calenderDay";

  addDayInnerHTML(element);

  const title = element.querySelector(".dayTitle") as HTMLElement;

  const day = date.split("/")[0];
  title.textContent = day;

  return element;
};

export default day;
