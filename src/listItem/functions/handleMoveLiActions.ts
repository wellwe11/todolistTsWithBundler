import {
  filterTask,
  handleMoveIndex,
} from "../../localStorageArray/localStorageArray";

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

  switch (action) {
    case "up":
      handleMoveOrderUp(element);
      handleMoveIndex(id, "up");

      break;

    case "down":
      handleMoveOrderDown(element);
      handleMoveIndex(id, "down");

      break;

    case "delete":
      handleRemove(element);

      break;

    default:
      return new Error("-- handleLiActions -- No element to perform action on");
  }
};

export default handleMoveLiActions;
