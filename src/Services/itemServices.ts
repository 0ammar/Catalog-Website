import { api } from "@/Services/axios";
import { Item, GetItemDto, ItemStatuses } from "@/types/apiTypes";

// 🔹 1. Get items (with optional search)
export const getItems = async (
  groupId?: string,
  subOneId?: string,
  subTwoId?: string,
  subThreeId?: string,
  page: number = 1,
  pageSize: number = 30,
  searchTerm?: string
): Promise<Item[]> => {
  const endpoint = searchTerm ? "/api/items/search" : "/api/items";
  const response = await api.get<Item[]>(endpoint, {
    params: {
      groupId,
      subOneId,
      ...(subTwoId ? { subTwoId } : {}),
      ...(subThreeId && subThreeId !== "items" && subThreeId !== "0"
        ? { subThreeId }
        : {}),
      page,
      pageSize,
      ...(searchTerm ? { term: searchTerm } : {}),
    },
  });
  return response.data;
};

// 🔹 2. Global search
export const searchItemsGlobal = async (
  term: string,
  page: number = 1
): Promise<Item[]> => {
  const response = await api.get<Item[]>("/api/items/all", {
    params: { term, page },
  });
  return response.data;
};

// 🔹 3. Get items by status
export const getItemsByStatus = async (
  statusId: string,
  page = 1,
  pageSize = 30
): Promise<Item[]> => {
  const response = await api.get<Item[]>("/api/items/by-status", {
    params: { statusId, page, pageSize },
  });
  return response.data;
};

// 🔹 4. Get single item details
export const getItemByItemNo = async (itemNo: string): Promise<GetItemDto> => {
  const response = await api.get<GetItemDto>(`/api/items/${itemNo}`);
  console.log("🔍 item data from backend:", response.data);

  return response.data;
};

// 🔹 5. Get item statuses
export const getItemStatuses = async (): Promise<ItemStatuses[]> => {
  const response = await api.get<ItemStatuses[]>("/api/admin/items/statuses");
  return response.data;
};

// 🔹 6. Update item status
export const updateItemStatus = async (itemNo: string, statusId: string) => {
  console.log("🚀 Sending PUT to update status:", { itemNo, statusId });

  await api.put(`/api/admin/items/${itemNo}/status?statusId=${statusId}`);

  console.log("✅ Status update request sent successfully");
};

// 🔹 7. Get item images only
export const getItemImagesOnly = async (itemNo: string): Promise<string[]> => {
  const response = await api.get<string[]>(`/api/admin/items/${itemNo}/images`);
  return response.data;
};

// ✅ 8. Get full-size image
// ✅ Final version - build full image URL directly



// 🔹 9. Upload item images
export const uploadItemImages = async (itemNo: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("newImages", file);
  });

  await api.post(`/api/admin/items/${itemNo}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🔹 10. Delete item images
export const deleteItemImages = async (
  itemNo: string,
  imageNames: string[]
) => {
  await api.delete(`/api/admin/items/${itemNo}/images`, {
    data: imageNames,
    headers: { "Content-Type": "application/json" },
  });
};

// 🔹 11. Get specific item status
export const getItemStatus = async (itemNo: string): Promise<ItemStatuses> => {
  const response = await api.get<ItemStatuses>(`/api/items/${itemNo}/status`);
  return response.data;
};

