type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const createLi = (task: Task): HTMLLIElement => {
  const element = document.createElement("li");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const deleteButton = document.createElement("button");
  const upButton = document.createElement("button");
  const downButton = document.createElement("button");

  checkbox.type = "checkbox";
  label.append(checkbox, task.title);
  element.append(label, deleteButton, upButton, downButton);

  return element;
};

// create method for completed
// create method for delete
// create method for up & down

export default createLi;
