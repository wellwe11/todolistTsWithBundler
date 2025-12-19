import { createTask, liElement } from "../listItem/listItem";
import handleInput from "../handleInput/handleInput";
import handleMoveLiActions from "./functions/handleMoveLiActions";
import findTaskArray from "./functions/findTaskArray";
import setToIndex from "./functions/setToIndex";

// handleMoveLiActions
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  list: Task[];
  dueDate: Date;
};

export let tasks: Task[] = loadTasks();

// here - tasks
export const notifyChange = (): void => {
  saveTasks();
  refreshUI();
};
// here - notifyChange
export function refreshUI(): void {
  const ul = document.getElementById("list") as HTMLUListElement;
  if (!ul) return;

  ul.addEventListener("click", handleMoveLiActions);

  ul.innerHTML = "";
  tasks.forEach(sync);
}

// here - refreshUI
function sync(task: Task) {
  if (!task) return;

  const ul = document.getElementById("list") as HTMLUListElement;

  if (!ul) {
    throw new Error("-- handleNewLi -- no appender");
  }

  const li = createTask(task);

  if (!li) {
    throw new Error("-- handleNewLi -- no li element");
  }

  if (task.list && task.list.length > 0) {
    task.list.forEach((l) => {
      const child = liElement(l);
      li.append(child);
    });
  }

  ul.append(li);
}

// here - notifyChange
export const saveTasks = (): void => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

// here - tasks
export function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");

  if (taskJSON === null || taskJSON === undefined) return [];

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
export const filterTask = (id: string): void => {
  const localArray = [...tasks];
  let taskList = findTaskArray(localArray, id);

  if (!taskList || taskList.length < 1) return;

  const index = taskList.findIndex((l) => l.id === id);

  taskList.splice(index, 1);

  tasks = localArray;

  notifyChange();
};

// handleMoveLiActions
export const handleMoveIndex = (id: string, direction: string): void => {
  // find tasks own array
  let localArray = [...tasks];
  const taskList = findTaskArray(localArray, id);

  if (!taskList || taskList.length < 1) return;

  // defined index
  const index = taskList.findIndex((l) => l.id === id);

  // define new index where object will be placed at
  const toIndex = setToIndex(direction, index, taskList.length);

  if (toIndex === null) return;

  const item = taskList.splice(index, 1)[0];
  taskList.splice(toIndex, 0, item);
  tasks = localArray;

  notifyChange();
};

// handleDragACtions - changes index of one object in tasks
export const syncNewOrder = (
  newIndex: number,
  oldIndex: number,
  id: string
): void => {
  if (newIndex === oldIndex) return;

  const localArray = [...tasks];

  const taskList = findTaskArray(localArray, id);
  if (!taskList || taskList.length < 1) return;

  const item = taskList.splice(oldIndex, 1)[0];

  console.log(taskList, item, oldIndex, newIndex);

  taskList.splice(newIndex, 0, item);
  tasks = localArray;
  notifyChange();
};

// listItem.ts
export const toggleCompleted = (id: string): void => {
  const taskList = findTaskArray(tasks, id);

  if (!taskList || taskList.length < 1) return;

  const index = taskList.findIndex((t) => t.id === id);
  taskList[index].completed = !taskList[index].completed;

  notifyChange();
};

export const handleAddChild = (id: string, name: string): void => {
  const localArray = [...tasks];

  const taskList = findTaskArray(localArray, id);

  if (!taskList || taskList.length < 1) return;

  const index = taskList.findIndex((t) => t.id === id);

  const liItem: Task = {
    id: crypto.randomUUID(),
    title: name,
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(),
    list: [],
  };

  taskList[index].list.push(liItem);

  tasks = taskList;

  notifyChange();
};
