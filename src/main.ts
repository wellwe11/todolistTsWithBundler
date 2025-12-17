import "./style.css";

import {
  handleAddToArray,
  saveTasks,
} from "./localStorageArray/localStorageArray";

const form = document.querySelector<HTMLFormElement>("form");

window.addEventListener("beforeunload", saveTasks);

try {
  if (form) {
    form.addEventListener("submit", handleAddToArray);
  }
} catch (error) {
  let message = "Error ";
  if (error instanceof Error) {
    message += error.message;
  }
}
