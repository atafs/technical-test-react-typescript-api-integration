// src/services/api.ts

const BASE_URL = "/v2"; // Using proxy in package.json: "proxy": "https://staging.api.neurolabs.ai/"
const API_KEY = process.env.REACT_APP_API_KEY || "YOUR_API_KEY"; // Replace with actual API key or use .env

// Interfaces for API responses
interface CatalogItem {
  id: string;
  name: string;
  thumbnail: string;
  status: string; // e.g., 'capture', 'active', etc.
  [key: string]: unknown; // For additional fields
}

interface IRTask {
  uuid: string;
  name: string;
  [key: string]: unknown; // For additional fields
}

interface ImageSubmissionResponse {
  image_id: string;
  status: string;
  [key: string]: unknown; // For additional fields
}

interface ImageStatusResponse {
  image_id: string;
  status: string;
  result?: unknown; // Adjust based on actual response structure
  [key: string]: unknown; // For additional fields
}

// Generic function to handle API requests
const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: unknown
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: body
        ? body instanceof FormData
          ? body
          : JSON.stringify(body)
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// API functions for Task 1: Visualise the Catalog
export const getCatalogItems = async (): Promise<CatalogItem[]> => {
  return apiRequest<CatalogItem[]>("/catalog-items");
};

// API functions for Task 2: Submit IR tasks
export const getIRTasks = async (): Promise<IRTask[]> => {
  return apiRequest<IRTask[]>("/image-recognition/tasks");
};

export const submitImageToTask = async (
  taskUuid: string,
  image: File
): Promise<ImageSubmissionResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  return apiRequest<ImageSubmissionResponse>(
    `/image-recognition/tasks/${taskUuid}/images`,
    "POST",
    formData
  );
};

export const getImageStatus = async (
  taskUuid: string,
  imageId: string
): Promise<ImageStatusResponse> => {
  return apiRequest<ImageStatusResponse>(
    `/image-recognition/tasks/${taskUuid}/images/${imageId}`
  );
};

export default apiRequest;
