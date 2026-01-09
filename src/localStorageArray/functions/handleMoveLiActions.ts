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

  const parentId = parent!.id;

  const containerList = target.closest(".timeContainer") as HTMLElement;
  const arrayList = Array.from(containerList.querySelectorAll("li"));
  const arrayListLength = arrayList.length;

  console.log(parent);

  const allParents = Array.from(parent?.querySelectorAll("[data-list]"));

  const firstElementInList = arrayList[0];
  const indexOfFirstEl = allParents.indexOf(firstElementInList);
  console.log(indexOfFirstEl);

  const id = element.id;

  switch (action) {
    case "up":
      handleMoveIndex(id, parentId, "up", arrayListLength, indexOfFirstEl);

      break;

    case "down":
      handleMoveIndex(id, parentId, "down", arrayListLength, indexOfFirstEl);

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
