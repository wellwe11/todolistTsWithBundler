import type { Task } from "../localStorageArray";

// Because localStorage consists of different lists, this function helps find specific ararys
// example:
// A list of Dates contains a list of Tasks, and each individual Task has an array of tasks, which may contain childTasks.
// A Task can be completed, as well as a childTask.
// Therefore, we need to skim through both Task's and their respective children, or any other nested array, hence this function.

const findTaskArray = (arr: Task[], id: string) => {
  for (const task of arr) {
    if (task.id === id) {
      return arr;
    }

    if (task.list) {
      const found = findTaskArray(task.list, id);
      if (found) {
        return task.list;
      }
    }
  }

  return null;
};

export default findTaskArray;
