import handleInput from "./handleInput/handleInput";
import createLi from "./listItem/listItem";
import "./style.css";

const form = document.querySelector("form");

const handleNewLI = (e: Event): void => {
  e.preventDefault();
  const ul = document.getElementById("list") as HTMLUListElement;
  if (!ul) {
    throw new Error("-- handleNewLi -- no appender");
  }

  const input = handleInput(e);

  if (!input) {
    throw new Error("-- handleNewLi -- no input");
  }

  const liItem = {
    id: crypto.randomUUID(),
    title: input,
    completed: false,
    createdAt: new Date(),
  };

  const li = createLi(liItem);

  if (!li) {
    throw new Error("-- handleNewLi -- no li element");
  }
  ul.append(li);
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
