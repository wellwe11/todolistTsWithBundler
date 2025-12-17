import { filterTask } from "../../main";
import { tasks } from "../../main";

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
  array: any[],
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
      handleMoveOrderUp(element);
      handleMoveIndex(tasks, index, index - 1);
      break;

    case "down":
      handleMoveOrderDown(element);
      handleMoveIndex(tasks, index, index + 1);
      break;

    case "delete":
      handleRemove(element);
      break;

    default:
      return new Error("-- handleLiActions -- No element to perform action on");
  }
};

export default handleMoveLiActions;
