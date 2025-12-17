import handleInput from "../handleInput/handleInput.js"; // stores input and clears it
import appendListItem from "../appendListItem/appendListItem.js"; // adds new list-item to list
import findElement from "../abstract/functions/findElement/findElement.js";
const inputElement = findElement("#taskInput"), listUl = findElement("#todoList"), // handleACtion here
form = findElement("#taskForm");
function handleListAction(event) {
    const target = event.target;
    const action = target.dataset.action;
    if (!action)
        return;
    const listItem = target.closest("li");
    if (!listItem)
        return;
    switch (action) {
        case "up":
            // will use order to increase orderNr by 1
            console.log(`Moving item ${listItem.id} up`);
            break;
        case "down":
            // will use order to decrease orderNr by 1
            console.log(`Moving item ${listItem.id} down`);
            break;
        case "delete":
            console.log(`Deleting item ${listItem.id}`);
            listItem.remove();
            break;
        default:
            break;
    }
}
function handleSubmit(e) {
    const input = handleInput(e, inputElement);
    if (!input)
        return;
    appendListItem(listUl, input);
}
if (form) {
    form.addEventListener("submit", handleSubmit);
}
if (listUl) {
    listUl.addEventListener("click", handleListAction);
}
// all li-items needs attribute("draggable", "tr ue");
// -- store current dragged item in variable
// -- apply eventListener dragonstart to todoList
// ---- const targetLi = (e.target as HTMLElement).closest('li') on event
// ---- e.dataTransfer.setData('text/plain'. '')
// -- apply eventListener dragover to todoList
// ---- e.preventDefault();
// -- apply eventListener drop on todoList
// ---- e.preventDefault();
// ---- const dropTarget = (e.target as HTMLElement).closest('li');
// ---- check if dropTarget !== draggedItem
// ---- todoList.insertBefore(draggedItem, dropTarget)
// ---- draggedItem.classList.remove('draggin')
// ---- draggedItem = null
// -- clean up eventListener
// ---- todoList.addEventListener('dragend', (e))
// ---- (e.target as HTMLElement).classList.remove('draggon')
// ---- draggedItem = null;
