import type { Task } from "../localStorageArray/localStorageArray";
import { handleDrag } from "./functions/handleDragActions";

export const childLi = () => {
  const element = document.createElement("li");
  element.innerHTML = `
  <button data-action="up">UP</button>
  <button data-action="down">DOWN</button>
  <button data-action="delete">DELETE</button>
  `;

  return element;
};

const addChildForm = () => {
  const extendedBarContainer = document.createElement("form");
  extendedBarContainer.id = "extendedBarForm";

  extendedBarContainer.innerHTML = `
  <label for="nameInput">Name of event</label>
  <input type="text" id="nameInput" name="nameInput" required />

  <label for="dateInput">Due date</label>
  <input type="date" id="dateInput" name="dateInput" />
  
  <button data-action="add">ADD</button>
  `;

  return extendedBarContainer;
};

const addChildButton = (parent: HTMLElement) => {
  const addButton = document.createElement("button");
  addButton.textContent = "ADD";

  // container with inputs to add new child
  // name of event
  // due date
  // up and down buttons
  // drag and drop (within container) possibilities

  addButton.addEventListener("click", () => {
    parent.appendChild(addChildForm());
  });

  return addButton;
};

const innerLiHTML = (task: Task) => {
  return `
  <input type="checkbox" data-action="toggle" ${
    task.completed ? "checked" : ""
  } />
  <span class="task-text"></span>
  <button>ADD</button>
  <button data-action="up">UP</button>
  <button data-action="down">DOWN</button>
  <button data-action="delete">DELETE</button>
  `;
};

const createLi = (task: Task): HTMLLIElement => {
  const element = document.createElement("li");

  element.id = task.id;
  element.draggable = true;
  if (task.completed) {
    element.classList.add("completed");
  }
  handleDrag(element);

  element.innerHTML = innerLiHTML(task);

  const span = element.querySelector(".task-text") as HTMLSpanElement;
  span.textContent = task.title;

  element.append(addChildButton(element));

  return element;
};

export default createLi;
