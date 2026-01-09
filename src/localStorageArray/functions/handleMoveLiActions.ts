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

  const parent = target.closest(".dateLi");
  if (!parent) return;

  const parentId = parent!.id;

  const containerList = target.closest(".timeContainer") as HTMLElement;
  const arrayList = Array.from(containerList.querySelectorAll("li"));

  const allParents = Array.from(parent?.querySelectorAll("[data-list]"));
  const parentListLength = Array.from(
    containerList.querySelectorAll("[data-list")
  ).length;

  const firstElementInList = arrayList[0];
  const indexOfFirstEl = allParents.indexOf(firstElementInList);

  const id = element.id;

  switch (action) {
    case "up":
      handleMoveIndex(id, parentId, "up", parentListLength, indexOfFirstEl);

      break;

    case "down":
      handleMoveIndex(id, parentId, "down", parentListLength, indexOfFirstEl);

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
      return new Error(
        `-- handleLiActions -- No element to perform action on, or parent missing: Element: ${element}, Parent: ${parent}`
      );
  }
};

export default handleMoveLiActions;
