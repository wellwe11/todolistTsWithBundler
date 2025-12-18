import createLi, { childLi } from "../listItem/listItem";
import handleInput from "../handleInput/handleInput";
import handleMoveLiActions from "./functions/handleMoveLiActions";

// handleMoveLiActions
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  list: Object[];
  dueDate: Date;
};

export let tasks: Task[] = loadTasks();

// here - tasks
export const notifyChange = () => {
  saveTasks();
  refreshUI();
};
// here - notifyChange
export function refreshUI() {
  const ul = document.getElementById("list") as HTMLUListElement;
  if (!ul) return;

  ul.addEventListener("click", handleMoveLiActions);

  ul.innerHTML = "";
  tasks.forEach(sync);
}

// here - refreshUI
function sync(task: Task) {
  const ul = document.getElementById("list") as HTMLUListElement;

  if (!ul) {
    throw new Error("-- handleNewLi -- no appender");
  }

  const li = createLi(task);

  task.list.forEach((l) => {
    const child = childLi();
    li.append(child);
  });

  if (!li) {
    throw new Error("-- handleNewLi -- no li element");
  }

  ul.append(li);
}

// here - notifyChange
export const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

// here - tasks
export function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");

  if (taskJSON == null) return [];

  return JSON.parse(taskJSON);
}

// main.ts
export const handleAddToArray = (e: Event): void => {
  const title = handleInput(e);

  if (!title) {
    throw new Error("-- handleNewLi -- no input");
  }

  const liItem = {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
    createdAt: new Date(),
    list: [],
    dueDate: new Date(),
  };

  tasks.push(liItem);
  notifyChange();
};

// handleMoveLiActions
export const filterTask = (id: string) => {
  tasks = tasks.filter((t) => t.id !== id);
  notifyChange();
};

// listItem.ts
export const findTask = (task: Task) => {
  const foundArrayElement = tasks.find((e) => e.id === task.id);
  return foundArrayElement;
};

// handleMoveLiActions
export const handleMoveIndex = (id: string, direction: string): void => {
  if (!id) return;

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  let toIndex: number;

  if (direction === "up") {
    if (index === 0) return;
    toIndex = index - 1;
  } else {
    if (index === tasks.length - 1) return;
    toIndex = index + 1;
  }

  const item = tasks.splice(index, 1)[0];
  tasks.splice(toIndex, 0, item);
  notifyChange();
};

// handleDragACtions - changes index of one object in tasks
export const syncNewOrder = (newIndex: number, oldIndex: number) => {
  if (newIndex === oldIndex) return;

  const newTasks = [...tasks];
  const item = newTasks.splice(oldIndex, 1)[0];

  newTasks.splice(newIndex, 0, item);

  tasks = newTasks;
  notifyChange();
};

// listItem.ts
export const toggleCompleted = (id: string): void => {
  const index = tasks.findIndex((t) => t.id === id);
  tasks[index].completed = !tasks[index].completed;

  notifyChange();
};

export const handleAddChild = (element: HTMLElement) => {
  const index = tasks.findIndex((t) => t.id === element.id);

  const liItem = {
    id: crypto.randomUUID(),
    title: "helklo",
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(),
  };

  console.log(tasks[index]);

  tasks[index].list.push(liItem);

  notifyChange();

  // find todo (parent)
  // add naked element
  // element should have an input

  // childObject:
  // a check if its done
  // due date
  //
};
