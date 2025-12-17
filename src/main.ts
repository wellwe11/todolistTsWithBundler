import handleInput from "./handleInput/handleInput";
import createLi from "./listItem/listItem";
import type { Task } from "./listItem/listItem";

import "./style.css";

const form = document.querySelector("form");

export let tasks: Task[] = loadTasks();
tasks.forEach(addNewListItem);

export const filterTask = (id: string) => {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
};

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
};

export const updateTasks = (arr: Task[]) => {
  tasks = arr;
};

function addNewListItem(task: Task) {
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

const handleNewLI = (e: Event): void => {
  e.preventDefault();
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

  addNewListItem(liItem);
  tasks.push(liItem);
};

try {
  if (form) {
    form.addEventListener("submit", handleNewLI);
  }
} catch (error) {
  let message = "Error ";
  if (error instanceof Error) {
    message += error.message;
  }
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

window.addEventListener("beforeunload", saveTasks);
