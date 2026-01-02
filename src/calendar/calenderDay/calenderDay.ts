const addDayInnerHTML = (element: HTMLElement) => {
  element.innerHTML = `
    <h4 class="dayTitle"></h4>
    `;
};

const day = (date: string) => {
  const element = document.createElement("div");
  element.id = date;

  addDayInnerHTML(element);

  const title = element.querySelector(".dayTitle") as HTMLElement;

  title.textContent = date;

  return element;
};

export default day;
