// src/services/api.test.ts
import {
  getCatalogItems,
  submitImageToTask,
  getIRTasks,
  getImageStatus,
} from "./api";

// Mock the entire api module
const mockApiRequest = jest.fn();
jest.mock("./api", () => ({
  getCatalogItems: jest.fn(() => mockApiRequest("/catalog-items")),
  submitImageToTask: jest.fn((taskUuid: string, image: File) =>
    mockApiRequest(
      `/image-recognition/tasks/${taskUuid}/images`,
      "POST",
      expect.any(FormData)
    )
  ),
  getIRTasks: jest.fn(() => mockApiRequest("/image-recognition/tasks")),
  getImageStatus: jest.fn((taskUuid: string, imageId: string) =>
    mockApiRequest(`/image-recognition/tasks/${taskUuid}/images/${imageId}`)
  ),
  default: mockApiRequest,
}));

describe("API Service", () => {
  beforeEach(() => {
    mockApiRequest.mockClear();
  });

  it("fetches catalog items", async () => {
    const mockItems = [
      { id: "1", name: "Item 1", thumbnail: "url", status: "capture" },
    ];
    mockApiRequest.mockResolvedValue(mockItems);
    const items = await getCatalogItems();
    expect(items).toEqual(mockItems);
    expect(mockApiRequest).toHaveBeenCalledWith("/catalog-items");
  });

  it("submits an image to a task", async () => {
    const mockResponse = { image_id: "123", status: "pending" };
    const mockFile = new File(["image"], "test.jpg", { type: "image/jpeg" });
    mockApiRequest.mockResolvedValue(mockResponse);
    const response = await submitImageToTask("task-uuid", mockFile);
    expect(response).toEqual(mockResponse);
    expect(mockApiRequest).toHaveBeenCalledWith(
      "/image-recognition/tasks/task-uuid/images",
      "POST",
      expect.any(FormData)
    );
  });

  it("fetches IR tasks", async () => {
    const mockTasks = [{ uuid: "task-uuid", name: "Test Task" }];
    mockApiRequest.mockResolvedValue(mockTasks);
    const tasks = await getIRTasks();
    expect(tasks).toEqual(mockTasks);
    expect(mockApiRequest).toHaveBeenCalledWith("/image-recognition/tasks");
  });

  it("fetches image status", async () => {
    const mockStatus = { image_id: "123", status: "completed", result: {} };
    mockApiRequest.mockResolvedValue(mockStatus);
    const status = await getImageStatus("task-uuid", "123");
    expect(status).toEqual(mockStatus);
    expect(mockApiRequest).toHaveBeenCalledWith(
      "/image-recognition/tasks/task-uuid/images/123"
    );
  });
});
