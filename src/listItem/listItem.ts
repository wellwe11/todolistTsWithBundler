import { findTask } from "../localStorageArray/localStorageArray";
import type { Task } from "../localStorageArray/localStorageArray";
import handleMoveLiActions from "./functions/handleMoveLiActions";

const buttonSet = () => {
  const deleteButton = document.createElement("button");
  const upButton = document.createElement("button");
  const downButton = document.createElement("button");

  deleteButton.dataset.action = "delete";
  upButton.dataset.action = "up";
  downButton.dataset.action = "down";

  deleteButton.textContent = "Delete";
  upButton.textContent = "^";
  downButton.textContent = "v";

  try {
    deleteButton.addEventListener("click", handleMoveLiActions);
    upButton.addEventListener("click", handleMoveLiActions);
    downButton.addEventListener("click", handleMoveLiActions);
  } catch (error) {
    let errorMessage = "Error ";
    if (error instanceof Error) {
      errorMessage + error.message;
    }
    console.log(errorMessage);
  }

  return {
    deleteButton,
    upButton,
    downButton,
  };
};

const newCheckBox = (task: Task) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const handleChecked = (): void => {
    const foundTask = findTask(task);

    if (foundTask) {
      task.completed = checkbox.checked;
      foundTask.completed = checkbox.checked;
    }
  };

  checkbox.addEventListener("change", handleChecked);

  return checkbox;
};

const createLi = (task: Task): HTMLLIElement => {
  const element = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = newCheckBox(task);

  const { deleteButton, upButton, downButton } = buttonSet();

  element.id = task.id;

  label.append(checkbox, task.title);
  element.append(label, deleteButton, upButton, downButton);

  return element;
};

export default createLi;
