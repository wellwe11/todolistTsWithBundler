import "./style.css";

import {
  handleAddToArray,
  notifyChange,
} from "./localStorageArray/localStorageArray";

const form = document.querySelector<HTMLFormElement>("form");

try {
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      handleAddToArray(e);
    });
    notifyChange();
  }
} catch (error) {
  let message = "Error ";
  if (error instanceof Error) {
    message += error.message;
  }
}
