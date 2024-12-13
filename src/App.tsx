import { useState } from "react";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import typescriptLogo from "/typescript.svg";
import tailwindLogo from "/tailwind.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-1">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={typescriptLogo}
            className="logo typescript"
            alt="Typescript logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={tailwindLogo}
            className="logo tailwind"
            alt="Tailwind logo"
          />
        </a>
      </div>
      <div className="group">
        <h1 className="font-bold cursor-pointer hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in">CoffeeBreakDev</h1>
        <h2 className="text-sm font-semibold text-gray-900 bg-gray-200 group-hover:bg-gray-900 group-hover:text-gray-200 cursor-pointer transition-all duration-1000 ease-out">
          React + Vite + Typescript + Tailwind
        </h2>
      </div>
      <div className="p-8">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="p-8">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-xs text-gray-400 uppercase">
        Click on the logos to learn more.
      </p>
    </>
  );
}

export default App;
