import { tasks } from "../main";
import handleMoveLiActions from "./functions/handleMoveLiActions";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

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
    const foundArrayElement = tasks.find((e) => e.id === task.id);
    task.completed = checkbox.checked;

    if (foundArrayElement) {
      foundArrayElement.completed = checkbox.checked;
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
