import {
  filterTask,
  handleAddChild,
  handleMoveIndex,
  toggleCompleted,
} from "../localStorageArray";

const handleMoveLiActions = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;

  const element = target.closest("li") as HTMLLIElement;

  const parent = element.closest(".timeGrid");

  if (!parent) return;

  const parentId = parent?.id as string;
  const id = element.id;

  switch (action) {
    case "up":
      handleMoveIndex(id, parentId, "up");

      break;

    case "down":
      handleMoveIndex(id, parentId, "down");

      break;

    case "delete":
      filterTask(id, parentId);

      break;

    case "toggle":
      toggleCompleted(id, parentId);
      break;

    case "add":
      event.preventDefault();
      const input = document.getElementById(
        "childNameInput"
      ) as HTMLInputElement;
      const inputTextContent = input.value;

      if (inputTextContent) {
        handleAddChild(id, parentId, inputTextContent);
      }
      break;

    default:
      return new Error("-- handleLiActions -- No element to perform action on");
  }
};

export default handleMoveLiActions;
