"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getItemByItemNo,
  getItemStatuses,
  updateItemStatus,
  getItemImagesOnly,
  uploadItemImages,
  deleteItemImages,
  getItemStatus,
} from "@/Services/itemServices";
import { GetItemDto, ItemStatuses } from "@/types/apiTypes";

export type ItemDetails = GetItemDto & {
  firstImage?: string;
  images?: string[];
  status?: ItemStatuses;
};

export default function useItemDetails(itemNo: string) {
  const router = useRouter();

  const [item, setItem] = useState<ItemDetails | null>(null);
  const [statuses, setStatuses] = useState<ItemStatuses[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fullImageUrl, setFullImageUrl] = useState<string | null>(null);
  const imageCache = useRef<Record<string, string>>({});

  const [expandedDescription, setExpandedDescription] = useState(false);

  const fetchItemDetails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getItemByItemNo(itemNo);
      const images = await getItemImagesOnly(itemNo);
      const status = await getItemStatus(itemNo);
      setItem({ ...data, images, status });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load item");
    } finally {
      setLoading(false);
    }
  }, [itemNo]);

  const fetchStatuses = useCallback(async () => {
    try {
      const result = await getItemStatuses();
      setStatuses(result);
    } catch (err) {
      console.error("❌ Failed to fetch statuses:", err);
    }
  }, []);

  const changeStatus = async (
    newStatusId: string,
    onStatusUpdate?: () => void
  ) => {
    if (statusLoading) return;
    setStatusLoading(true);
    try {
      await updateItemStatus(itemNo, newStatusId);
      const updated = await getItemByItemNo(itemNo);
      const images = await getItemImagesOnly(itemNo);
      const status = await getItemStatus(itemNo);
      setItem({ ...updated, images, status });

      onStatusUpdate?.();
    } catch (err) {
      console.error("❌ Failed to update status:", err);
    } finally {
      setStatusLoading(false);
    }
  };

const openImage = async (imageName: string) => {
  setPreviewImage(imageName);

  if (imageCache.current[imageName]) {
    setFullImageUrl(imageCache.current[imageName]);
    return;
  }

  try {
    let url = imageName;

    if (!imageName.startsWith('http') && !imageName.includes('/UploadedImages/')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      url = `${baseUrl}/UploadedImages/${imageName}`;
    }

    imageCache.current[imageName] = url;
    setFullImageUrl(url);
  } catch (err) {
    console.error("❌ Failed to open image:", err);
  }
};



  const closeImage = () => {
    setPreviewImage(null);
    setFullImageUrl(null);
  };

  const uploadImages = async (files: File[]) => {
    await uploadItemImages(itemNo, files);
    await fetchItemDetails();
    router.refresh();
  };

  const deleteImages = async (imageUrls: string[]) => {
    const names = imageUrls.map((url) => url.split("/").pop() ?? "");
    await deleteItemImages(itemNo, names);
    await fetchItemDetails();
    router.refresh();
  };

  useEffect(() => {
    fetchItemDetails();
    fetchStatuses();
  }, [fetchItemDetails, fetchStatuses]);

  return {
    item,
    itemStatus: item?.status ?? null,
    setItemStatus: (status: ItemStatuses) => {
      setItem((prev) => (prev ? { ...prev, status } : prev));
    },
    loading,
    error,
    statuses,
    changeStatus,
    previewImage,
    fullImageUrl,
    openImage,
    closeImage,
    expandedDescription,
    toggleDescription: () => setExpandedDescription((prev) => !prev),
    uploadImages,
    deleteImages,
  };
}
