import type {
  Task,
  Dates,
  ChildTask,
} from "../localStorageArray/localStorageArray";
import { handleDrag } from "./functions/handleDragActions";

// form which is displayed when user clicks 'add' - inputs for new child displayed
const addChildForm = () => {
  const extendedBarContainer = document.createElement("form");
  extendedBarContainer.id = "extendedBarForm";

  extendedBarContainer.innerHTML = `
  <label for="childNameInput">Name of event</label>
  <input type="text" id="childNameInput" name="childNameInput" required />
  <label for="childDateInput">Due date</label>
  <input type="date" id="childDateInput" name="childDateInput" />
  <button data-action="add">ADD</button>
  `;

  return extendedBarContainer;
};

const addChildButton = (parent: HTMLElement) => {
  // disables further adding child while another input is active
  // resets on reload, meaning, once child is added, isActive will again be false
  let isActive = false;

  const addButton = document.createElement("button");
  addButton.textContent = "ADD";

  addButton.addEventListener("click", () => {
    if (!isActive) {
      parent.appendChild(addChildForm());
    }
    isActive = true;
  });

  return addButton;
};

const addLiInnerHTML = (element: HTMLLIElement) => {
  element.innerHTML = `
  <input type="checkbox" data-action="toggle" ${
    element.classList.contains("completed") ? "checked" : ""
  } />
  <span class="task-text"></span>
  <button data-action="up">UP</button>
  <button data-action="down">DOWN</button>
  <button data-action="delete">DELETE</button>
  `;
};

export const liElement = (task: Task | ChildTask) => {
  const element = document.createElement("li");

  element.id = task.id;

  if (task.completed) {
    element.classList.add("completed");
  }

  addLiInnerHTML(element);
  element.draggable = true;
  handleDrag(element);

  const span = element.querySelector(".task-text") as HTMLSpanElement;
  span.textContent = task.title;

  return element;
};

export const createDate = (date: Dates) => {
  const element = document.createElement("li");
  element.innerHTML = `
  <span class="date-text></span>
  `;
  const elementDate = date.date;
  element.textContent = `${elementDate}`;
  element.id = date.id;
  element.className = "dateLi";

  return element;
};

export const createTask = (task: Task) => {
  const element = liElement(task);

  element.append(addChildButton(element));

  return element;
};
