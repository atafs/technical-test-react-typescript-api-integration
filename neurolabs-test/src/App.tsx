import React from "react";
import Header from "./components/Header";
import CatalogList from "./components/CatalogList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <CatalogList />
      </main>
    </div>
  );
};

export default App;
