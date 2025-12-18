import { insertInArr } from "../../localStorageArray/localStorageArray";

export const handleDrag = (element: HTMLElement) => {
  let originalIndex: number;

  window.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  element.addEventListener("dragstart", (e) => {
    const index = findIndexOfEl(element);
    originalIndex = Number(index);

    setTimeout(() => {
      element.classList.add("dragging");
    }, 0);

    if (e.dataTransfer) {
      const ghost = ghostEl(element);
      e.dataTransfer.setDragImage(ghost, 0, 0);
    }
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");

    const index = Number(findIndexOfEl(element));
    insertInArr(index, originalIndex);
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();

    const draggingEl = document.querySelector(".dragging") as HTMLElement;
    if (!draggingEl || draggingEl === element) return;

    const rect = element.getBoundingClientRect();
    const offset = e.clientY - rect.top;

    if (offset > rect.height / 2) {
      element.parentNode?.insertBefore(draggingEl, element.nextSibling);
    } else if (offset < rect.height / 2) {
      element.parentNode?.insertBefore(draggingEl, element);
    }
  });
};

const findIndexOfEl = (el: HTMLElement) => {
  const parent = el.parentElement;
  if (!parent) return;

  const listArray = Array.from(parent.children);
  const index = listArray.indexOf(el);
  return index;
};

const ghostEl = (element: HTMLElement): HTMLElement => {
  const ghost = element.cloneNode(true) as HTMLElement;
  ghost.classList.add("draggedGhost");
  document.body.appendChild(ghost);

  setTimeout(() => ghost.remove(), 0);

  return ghost;
};
