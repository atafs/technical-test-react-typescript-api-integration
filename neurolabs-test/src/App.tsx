import React from "react";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome to MyApp</h2>
        <p className="text-gray-600">
          This is a placeholder for the main content.
        </p>
      </main>
    </div>
  );
};

export default App;
