import createLi from "../listItem/listItem";
import handleInput from "../handleInput/handleInput";
const ul = document.getElementById("list") as HTMLUListElement;

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const state = createObservableArray(
  {
    tasks: loadTasks() as Task[],
  },
  () => {
    saveTasks();
    refreshUI();
  }
);

function refreshUI() {
  if (!ul) return;

  ul.innerHTML = "";

  state.tasks.forEach(sync);
}

function sync(task: Task) {
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

  state.tasks = [...state.tasks, liItem];
};

export const getTasks = () => state.tasks;

export const filterTask = (id: string) => {
  state.tasks = state.tasks.filter((t) => t.id !== id);
};

export const updateTasks = (arr: Task[]) => {
  const hasUpdated =
    arr.length !== state.tasks.length ||
    arr.some((value, index) => value !== state.tasks[index]);

  if (hasUpdated) {
    state.tasks = arr;
  }
};

export function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");

  if (taskJSON == null) return [];

  return JSON.parse(taskJSON);
}

export const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(state.tasks));
};

export const findTask = (task: Task) => {
  const foundArrayElement = state.tasks.find((e) => e.id === task.id);
  return foundArrayElement;
};

function createObservableArray<T extends object>(
  obj: T,
  onchange: () => void
): T {
  return new Proxy(obj, {
    set(target, property, value) {
      const success = Reflect.set(target, property, value);

      if (success) {
        onchange();
      }

      return true;
    },
  }) as T;
}

// list.addEventListener("change", saveTasks);
