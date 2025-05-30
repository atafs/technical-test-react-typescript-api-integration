import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:px-12 bg-gray-100 sm:bg-blue-100 md:bg-green-100 lg:bg-purple-100">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0 mb-6">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="h-12 md:h-16 lg:h-20 hover:scale-110 transition-transform"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-12 md:h-16 lg:h-20 hover:scale-110 transition-transform"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-center">
        Vite + React
      </h1>
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm sm:text-base lg:text-lg"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600 text-sm sm:text-base lg:text-lg text-center">
          Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="mt-6 text-gray-500 text-xs sm:text-sm lg:text-base text-center">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
