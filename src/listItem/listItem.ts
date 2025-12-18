import type { Task } from "../localStorageArray/localStorageArray";
import { handleDrag } from "./functions/handleDragActions";

const createLi = (task: Task): HTMLLIElement => {
  const element = document.createElement("li");

  element.id = task.id;
  element.draggable = true;
  handleDrag(element);

  element.innerHTML = `
  <input type="checkbox" data-action="toggle" ${
    task.completed ? "checked" : ""
  } />
  <span class="task-text"></span>
  <button data-action="add">ADD</button>
  <button data-action="up">UP</button>
  <button data-action="down">DOWN</button>
  <button data-action="delete">DELETE</button>
  `;

  const span = element.querySelector(".task-text") as HTMLSpanElement;
  span.textContent = task.title;

  return element;
};

export default createLi;
