import React, { useEffect, useState } from "react";
import { getCatalogItems } from "../services/api";

interface CatalogItem {
  id: string;
  name: string;
  thumbnail: string;
  status: string;
}

const CatalogList: React.FC = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getCatalogItems();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error(`err ${err}`);
        setError("Failed to fetch catalog items");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catalog Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg shadow-md transition-shadow ${
              item.status === "capture"
                ? "border-2 border-blue-500 bg-blue-50"
                : "border border-gray-200 bg-white"
            } hover:shadow-lg`}
          >
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
              }}
            />
            <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
            <p
              className={`text-sm ${
                item.status === "capture" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
