import { createDate, createTask, liElement } from "../listItem/listItem";
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
  dueDate: string;
  time: string | Date;
};

export class Dates {
  createdAt: Date;
  date: string;
  tasks: Task[];
  id: string;

  constructor(createdAt: Date, date: string, tasks: Task[], id: string) {
    this.createdAt = createdAt;
    this.date = date;
    this.tasks = tasks;
    this.id = id;
  }

  findTasks(id: string): Task[] | null {
    return findTaskArray(this.tasks, id) || null;
  }

  pushTask(task: Task) {
    return this.tasks.push(task);
  }
}

export let tasks: Dates[] = loadTasks();

// here & main.ts - tasks
export const notifyChange = (): void => {
  saveTasks();
  sortByDate();
  refreshUI();
};
// here - notifyChange
function refreshUI(): void {
  const ul = document.getElementById("list") as HTMLUListElement;
  if (!ul) return;

  ul.addEventListener("click", handleMoveLiActions);

  ul.innerHTML = "";
  tasks.forEach(sync);
}

// here - refreshUI
function sync(date: Dates) {
  if (!date) return;

  const ul = document.getElementById("list") as HTMLUListElement;

  if (!ul) {
    throw new Error("-- handleNewLi -- no appender");
  }

  if (date.tasks.length <= 0) {
    return;
  }

  const liDate = createDate(date);

  date.tasks.forEach((task: Task) => {
    const li = createTask(task);

    if (!li) {
      throw new Error("-- handleNewLi -- no li element");
    }

    if (date.tasks && task.list.length > 0) {
      task.list.forEach((l) => {
        const child = liElement(l);
        li.append(child);
      });
    }

    liDate.append(li);
  });

  ul.append(liDate);
}

const sortByDate = () => {
  return tasks.sort((a, b) => {
    const aSplittedDate = Number(
      a.date.replaceAll("/", "").split(" ").reverse().join()
    );
    const bSplittedDate = Number(
      b.date.replaceAll("/", "").split(" ").reverse().join()
    );

    return aSplittedDate - bSplittedDate;
  });
};

// here - notifyChange
const saveTasks = (): void => {
  localStorage.setItem("DATES", JSON.stringify(tasks));
};

// here - tasks
function loadTasks(): Dates[] {
  const datesJSON = localStorage.getItem("DATES");

  if (datesJSON === null || datesJSON === undefined) return [];

  return JSON.parse(datesJSON);
}

// main.ts
export const handleAddToArray = (e: Event): void => {
  const { name, date, time } = handleInput(e);

  if (!name) {
    throw new Error("-- handleNewLi -- no input");
  }

  const newDate = date ? new Date(date) : new Date();
  const [day, month, year] = [
    newDate.getDate(),
    newDate.getMonth() + 1,
    newDate.getFullYear(),
  ];

  const liItem = {
    id: crypto.randomUUID(),
    title: name,
    completed: false,
    createdAt: new Date(),
    list: [],
    dueDate: `${day}/${month}/${year}`,
    time: time || new Date(),
  };

  const foundDate = tasks.find((t) => t.date === `${day}/${month}/${year}`);

  if (foundDate) {
    foundDate.tasks.push(liItem);
  } else {
    const liDate = new Dates(
      new Date(),
      `${day}/${month}/${year}`,
      [],
      crypto.randomUUID()
    );

    liDate.tasks.push(liItem);

    tasks.push(liDate);
  }

  notifyChange();
};

// handleMoveLiActions
export const filterTask = (parentId: string, id: string): void => {
  const localArray = [...tasks];

  const dateList = localArray.find((d) => d.id === parentId);

  if (!dateList) return;

  let taskList = findTaskArray(dateList.tasks, id);

  if (!taskList || taskList.length < 1) return;

  const index = taskList.findIndex((l) => l.id === id);

  taskList.splice(index, 1);

  tasks = localArray;

  notifyChange();
};

// handleMoveLiActions
export const handleMoveIndex = (
  id: string,
  parentId: string,
  direction: string
): void => {
  // find tasks own array
  let localArray = [...tasks];
  const dateList = localArray.find((d) => d.id === parentId);

  if (!dateList) return;

  let taskList = findTaskArray(dateList.tasks, id);

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
  id: string,
  parentId: string
): void => {
  if (newIndex === oldIndex) return;

  const localArray = [...tasks];

  const dateList = localArray.find((d) => d.id === parentId);

  if (!dateList) return;

  let taskList = findTaskArray(dateList.tasks, id);

  if (!taskList || taskList.length < 1) return;

  const item = taskList.splice(oldIndex, 1)[0];

  taskList.splice(newIndex, 0, item);
  tasks = localArray;
  notifyChange();
};

// listItem.ts
export const toggleCompleted = (id: string, parentId: string): void => {
  const dateList = localArray.find((d) => d.id === parentId);

  if (!dateList) return;

  let taskList = findTaskArray(dateList.tasks, id);

  if (!taskList || taskList.length < 1) return;

  const index = taskList.findIndex((t) => t.id === id);
  taskList[index].completed = !taskList[index].completed;

  notifyChange();
};

export const handleAddChild = (
  id: string,
  parentId: string,
  name: string
): void => {
  const localArray = [...tasks];

  const dateList = localArray.find((d) => d.id === parentId);

  if (!dateList) return;

  let taskList = findTaskArray(dateList.tasks, id);

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

  tasks = localArray;

  notifyChange();
};

// I think I need to create a new object for each new date inside of the tasks array.
// Inside each new date which is added, I will allow to add tasks.
// If same tasks exist on same date, add those inside of the date objct

// create a new file which is for the calendar-list only
// find all dates for each object and create a specific place for it
// create a row for each calendar-day
// add those objects to those specific date-rows
