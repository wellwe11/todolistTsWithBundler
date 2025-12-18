import { syncNewOrder } from "../../localStorageArray/localStorageArray";

window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => e.preventDefault());

export const handleDrag = (element: HTMLElement): void => {
  let oldIndex: number;

  element.addEventListener("dragstart", (e) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }

    const index = findIndexOfEl(element);
    oldIndex = Number(index);

    setTimeout(() => {
      element.classList.add("dragging");
    }, 0);

    if (e.dataTransfer) {
      const ghost = ghostEl(element);
      e.dataTransfer.setDragImage(ghost, 0, 0);
    }
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();

    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
    const draggingEl = document.querySelector(".dragging") as HTMLElement;
    const shouldBeBefore = placeElBefore(element, e);

    if (shouldBeBefore) {
      element.parentNode?.insertBefore(draggingEl, element.nextSibling);
    } else {
      element.parentNode?.insertBefore(draggingEl, element);
    }
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");

    const newIndex = Number(findIndexOfEl(element));

    if (newIndex === undefined || newIndex === oldIndex) return;

    syncNewOrder(newIndex, oldIndex);
  });
};

const placeElBefore = (element: HTMLElement, event: DragEvent) => {
  const rect = element.getBoundingClientRect();
  const rectHeight = rect.height;
  const offset = event.clientY - rect.top;

  if (offset > rectHeight / 2) {
    return true;
  } else {
    return false;
  }
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
