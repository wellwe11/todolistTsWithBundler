import type { Task } from "../localStorageArray";

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
