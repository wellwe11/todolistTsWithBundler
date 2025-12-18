export const handleDrag = (element: HTMLElement) => {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();

    const draggingEl = document.querySelector(".dragging") as HTMLElement;
    if (!draggingEl || draggingEl === element) return;

    const rect = element.getBoundingClientRect();
    const offset = e.clientY - rect.top;

    if (offset > rect.height / 2) {
      element.parentNode?.insertBefore(draggingEl, element.nextSibling);
    } else {
      element.parentNode?.insertBefore(draggingEl, element);
    }
  });
};
