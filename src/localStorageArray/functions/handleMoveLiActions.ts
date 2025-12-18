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
  const id = element.id;

  switch (action) {
    case "up":
      handleMoveIndex(id, "up");

      break;

    case "down":
      handleMoveIndex(id, "down");

      break;

    case "delete":
      filterTask(element.id);

      break;

    case "toggle":
      toggleCompleted(id);
      break;

    case "add":
      event.preventDefault();
      const input = document.getElementById(
        "childNameInput"
      ) as HTMLInputElement;
      const inputTextContent = input.value;

      if (inputTextContent) {
        handleAddChild(id, inputTextContent);
      }
      break;

    default:
      return new Error("-- handleLiActions -- No element to perform action on");
  }
};

export default handleMoveLiActions;
