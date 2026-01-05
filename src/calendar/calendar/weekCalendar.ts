const weekCalendar = () => {
  const controller = document.createElement("div");
  controller.innerHTML = `
  <button class="incrementMonth">+</button>
  <h5 class="monthTitle"></h5>
  <button class="decrementMonth">-</button>
  `;

  const title = controller.querySelector(".monthTitle") as HTMLElement;
};

export default weekCalendar;
