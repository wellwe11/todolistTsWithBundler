import { createTask, liElement } from "../../../listItem/listItem";
import handleMoveLiActions from "../../../localStorageArray/functions/handleMoveLiActions";
import type { Task, Dates } from "../../../localStorageArray/localStorageArray";

// splits tasks based on time, and sorts them by time: 0 > 24
const tasksByTime = (map) => {
  // sort tasks by time and push times together
  const timeMap = new Map<string, Task[]>();

  map.tasks.forEach((t: Task) => {
    if (!t) return;

    const existingTime = timeMap.get(t.dueTime) || [];
    existingTime.push(t);

    timeMap.set(t.dueTime, existingTime);
  });

  const compareTimes = (a, b) => {
    const aVal = +a[0].replace(":", "");
    const bVal = +b[0].replace(":", "");

    return aVal - bVal;
  };

  // cannot sort yet, because it messes with the handleDragActions (since it's based on their element-index)
  // check localStorage file - will rerender all items by time there instead after each render
  //   return [...timeMap].sort(compareTimes);
  return [...timeMap];
};

const createDayTasks = (taskMap: Map<string, Dates>, activeDate: string) => {
  const activeDay = taskMap.get(activeDate); // find date which is based on activeDate
  if (!activeDay) return;

  // ul will handle the click-events
  const ul = document.createElement("ul") as HTMLUListElement;
  ul.addEventListener("click", handleMoveLiActions);
  ul.id = activeDay.id;
  ul.className = "dateLi";

  // time-appender
  const list = document.createElement("li") as HTMLLIElement;
  list.className = "timesList";
  ul.append(list);

  const timeMap = tasksByTime(activeDay);

  [...timeMap].forEach(([time, objArr], arrIndex) => {
    const container = document.createElement("div");
    container.classList = `timeContainer`;

    const timeText = document.createElement("h3");

    timeText.textContent = time;
    timeText.style.gridRow = String(arrIndex + 1);
    timeText.style.gridColumn = "1";

    container.append(timeText);

    objArr.forEach((obj, index) => {
      const li = createTask(obj);
      li.dataset.type = "parent";
      li.dataset.list = String(arrIndex);
      li.style.gridRow = String(index + 1);
      li.style.gridColumn = "1";

      container.append(li);

      if (obj.list && obj.list.length > 0) {
        obj.list.forEach((l) => {
          const child = liElement(l);
          child.dataset.type = "child";
          li.append(child);
        });
      }
    });

    list.append(container);
  });

  return ul;
};

export default createDayTasks;
