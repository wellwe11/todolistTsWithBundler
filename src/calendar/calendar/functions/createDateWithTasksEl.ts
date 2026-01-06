import { createDate, createTask, liElement } from "../../../listItem/listItem";
import handleMoveLiActions from "../../../localStorageArray/functions/handleMoveLiActions";
import type { Dates, Task } from "../../../localStorageArray/localStorageArray";

const createDateWithTasksEl = (obj: Dates) => {
  const ul = document.createElement("ul") as HTMLUListElement;
  ul.addEventListener("click", handleMoveLiActions);

  const liDate = createDate(obj);

  obj.tasks.forEach((task: Task) => {
    const li = createTask(task);

    if (!li) {
      throw new Error("-- handleNewLi -- no li element");
    }

    if (obj.tasks && task.list.length > 0) {
      task.list.forEach((l) => {
        const child = liElement(l);
        li.append(child);
      });
    }

    liDate.append(li);
  });

  ul.append(liDate);

  return ul;
};

export default createDateWithTasksEl;
