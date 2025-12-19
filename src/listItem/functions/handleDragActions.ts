import { syncNewOrder } from "../../localStorageArray/localStorageArray";

window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => e.preventDefault());

export const handleDrag = (element: HTMLElement): void => {
  let oldIndex: number;

  element.addEventListener("dragstart", (e) => {
    e.stopPropagation();

    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      const ghost = ghostEl(element);
      e.dataTransfer.setDragImage(ghost, 0, 0);
    }

    oldIndex = Number(findIndexOfEl(element));

    setTimeout(() => {
      element.classList.add("dragging");
    }, 0);
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const draggingEl = document.querySelector(".dragging") as HTMLElement;
    if (!draggingEl || draggingEl === element) return;

    if (draggingEl.parentElement !== element.parentElement) return;

    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";

    const shouldBeAfter = placeElAfter(element, e);

    if (shouldBeAfter) {
      element.parentNode?.insertBefore(draggingEl, element.nextElementSibling);
    } else {
      element.parentNode?.insertBefore(draggingEl, element);
    }
  });

  element.addEventListener("dragend", (e) => {
    e.stopPropagation();
    element.classList.remove("dragging");

    const newIndex = Number(findIndexOfEl(element));
    if (newIndex === undefined || newIndex === oldIndex) return;

    syncNewOrder(newIndex, oldIndex);
  });
};

const placeElAfter = (element: HTMLElement, event: DragEvent) => {
  const rect = element.getBoundingClientRect();
  const offset = event.clientY - rect.top;
  return offset > rect.height / 2;
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
