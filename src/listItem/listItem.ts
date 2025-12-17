type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const handleLiActions = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;
  const element = target.closest("li") as HTMLLIElement;

  switch (action) {
    case "up":
      const previous = element.previousElementSibling;
      if (previous) {
        element.parentNode?.insertBefore(element, previous);
      }
      break;

    case "down":
      const next = element.nextElementSibling;
      if (next) {
        element.parentNode?.insertBefore(next, element);
      }
      break;

    case "delete":
      element.remove();
      break;

    default:
      return new Error("-- handleLiActions -- No element to perform action on");
  }
};

const buttonSet = () => {
  const deleteButton = document.createElement("button");
  const upButton = document.createElement("button");
  const downButton = document.createElement("button");

  deleteButton.dataset.action = "delete";
  upButton.dataset.action = "up";
  downButton.dataset.action = "down";

  deleteButton.textContent = "Delete";
  upButton.textContent = "^";
  downButton.textContent = "v";

  try {
    deleteButton.addEventListener("click", handleLiActions);
    upButton.addEventListener("click", handleLiActions);
    downButton.addEventListener("click", handleLiActions);
  } catch (error) {
    let errorMessage = "Error ";
    if (error instanceof Error) {
      errorMessage + error.message;
    }
    console.log(errorMessage);
  }

  return {
    deleteButton,
    upButton,
    downButton,
  };
};

const createLi = (task: Task): HTMLLIElement => {
  const element = document.createElement("li");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const { deleteButton, upButton, downButton } = buttonSet();

  checkbox.type = "checkbox";
  label.append(checkbox, task.title);
  element.append(label, deleteButton, upButton, downButton);

  return element;
};

// create method for completed
// create method for delete
// create method for up & down

export default createLi;
