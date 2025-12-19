import type { Task } from "../localStorageArray/localStorageArray";
import { handleDrag } from "./functions/handleDragActions";

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
  const addButton = document.createElement("button");
  addButton.textContent = "ADD";

  addButton.addEventListener("click", () => {
    parent.appendChild(addChildForm());
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

export const liElement = (task: Task) => {
  const element = document.createElement("li");

  element.id = task.id;

  if (task.completed) {
    element.classList.add("completed");
  }

  addLiInnerHTML(element);
  handleDrag(element);
  element.draggable = true;

  const span = element.querySelector(".task-text") as HTMLSpanElement;
  span.textContent = task.title;

  return element;
};

export const createTask = (task: Task) => {
  const element = liElement(task);

  element.append(addChildButton(element));

  return element;
};
