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

// sort form by date
// for each day (based on date) - a grid should be greated with times, where user can drag and drop item into correct time

// // finish this project & style it
// // then for next project:
// /**
//  * vite
//  * React
//  * TypeScript
//  * npm create vite@latest fileName -- --template react-ts
//  *
//  * react routing
//  * npm install react-router-dom
//  *
//  *
//  * ** for framer-motion scene:
//  *
//  * npm i sass
//  * npm i framer-motion
//  * npm i gasp
//  * npm i @studio-freight/lenis
//  *
//  *
//  * Tailwind
//  * npm install -D tailwindcss postcss autoprefixer
//  * npx tailwindcss init -p
//  *
//  * @type {import("tailwindcss").Config}
//  * export default {
//  * content: [
//  *            "/index.html",
//  *            "./src/**/*.{js,ts,jsx,tsx}"
//  *              ],
//  *            theme: {
//  *                 extend: {},
//  *            },
//  *            plugins: [],
//  *          }
//  *
//  * vitest
//  * npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
//  *
//  * "scripts": {
//  *  "dev": "vite",
//  *  "build": "tsc && vite build",
//  *  "test": "vitest"
//  *  }
//  *
//  * zustand (for cart etc.)
//  * npm install zustand
//  *
//  *
//  *
//  * for ts:
//  * "noEmit": true so ts doesnt create extra js files
//  */
