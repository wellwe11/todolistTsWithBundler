import type { ChildTask, Task } from "../localStorageArray";

// Because localStorage consists of different lists, this function helps find specific ararys
// example:
// A list of Dates contains a list of Tasks, and each individual Task has an array of tasks, which may contain childTasks.
// A Task can be completed, as well as a childTask.
// Therefore, we need to skim through both Task's and their respective children, or any other nested array, hence this function.

const isTask = (obj: any, typeCheck: string): obj is Task => {
  return typeof obj === "object" && obj !== null && typeCheck in obj;
};

const findTaskArray = (arr: Task[] | ChildTask[], id: string) => {
  for (const task of arr) {
    if (isTask(task, "id") && task.id === id) {
      return arr;
    }

    if (isTask(task, "list") && task.list) {
      const found = findTaskArray(task.list, id);
      if (found) {
        return task.list;
      }
    }
  }

  return null;
};

export default findTaskArray;
