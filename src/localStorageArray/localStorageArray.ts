import createLi from "../listItem/listItem";
import handleInput from "../handleInput/handleInput";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export let tasks: Task[] = loadTasks();

export const notifyChange = () => {
  saveTasks();
  refreshUI();
};

export function refreshUI() {
  const ul = document.getElementById("list") as HTMLUListElement;

  if (!ul) return;

  ul.innerHTML = "";

  tasks.forEach(sync);
}

function sync(task: Task) {
  const ul = document.getElementById("list") as HTMLUListElement;

  if (!ul) {
    throw new Error("-- handleNewLi -- no appender");
  }

  const li = createLi(task);
  if (!li) {
    throw new Error("-- handleNewLi -- no li element");
  }

  ul.append(li);
}

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
  };

  tasks.push(liItem);
  notifyChange();
};

export const filterTask = (id: string) => {
  tasks = tasks.filter((t) => t.id !== id);
  notifyChange();
};

export const updateTasks = (arr: Task[]) => {
  const hasUpdated =
    arr.length !== tasks.length ||
    arr.some((value, index) => value !== tasks[index]);

  if (hasUpdated) {
    tasks = arr;
  }

  notifyChange();
};

export function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");

  if (taskJSON == null) return [];

  return JSON.parse(taskJSON);
}

export const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

export const findTask = (task: Task) => {
  const foundArrayElement = tasks.find((e) => e.id === task.id);
  return foundArrayElement;
};
