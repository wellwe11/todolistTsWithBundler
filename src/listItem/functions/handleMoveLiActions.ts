import {
  filterTask,
  getTasks,
  saveTasks,
} from "../../localStorageArray/localStorageArray";
import type { Task } from "../../localStorageArray/localStorageArray";

const tasks = getTasks();

const handleRemove = (element: HTMLElement): void => {
  filterTask(element.id);
  element.remove();
};

const handleMoveOrderUp = (element: HTMLElement): void => {
  const previous = element.previousElementSibling;

  if (previous) {
    element.parentNode?.insertBefore(element, previous);
  }
};

const handleMoveIndex = (
  array: Task[],
  fromIndex: number,
  toIndex: number
): void => {
  const item = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, item);
};

const handleMoveOrderDown = (element: HTMLElement): void => {
  const next = element.nextElementSibling;
  if (next) {
    element.parentNode?.insertBefore(next, element);
  }
};

const handleMoveLiActions = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;

  const element = target.closest("li") as HTMLLIElement;
  const id = element.id;
  const index = tasks.findIndex((t) => t.id === id);

  switch (action) {
    case "up":
      if (index > 0) {
        handleMoveOrderUp(element);
        handleMoveIndex(tasks, index, index - 1);
        saveTasks();
      }
      break;

    case "down":
      if (index < tasks.length - 1) {
        handleMoveOrderDown(element);
        handleMoveIndex(tasks, index, index + 1);
        saveTasks();
      }
      break;

    case "delete":
      handleRemove(element);
      saveTasks();
      break;

    default:
      return new Error("-- handleLiActions -- No element to perform action on");
  }
};

export default handleMoveLiActions;
