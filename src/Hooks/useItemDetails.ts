'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getItemByItemNo,
  getItemStatuses,
  updateItemStatus,
  getItemImagesOnly,
  getItemImage,
  uploadItemImages,
  deleteItemImages,
} from '@/Services/itemServices';
import { GetItemDto, ItemStatuses } from '@/types/apiTypes';

export type ItemDetails = GetItemDto & {
  firstImage?: string;
  images?: string[];
};

export default function useItemDetails(itemNo: string) {
  const router = useRouter();

  const [item, setItem] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statuses, setStatuses] = useState<ItemStatuses[]>([]);
  const [itemStatus, setItemStatus] = useState<ItemStatuses | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fullImageUrl, setFullImageUrl] = useState<string | null>(null);
  const imageCache = useRef<Record<string, string>>({});

  const [expandedDescription, setExpandedDescription] = useState(false);

  const fetchItemDetails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getItemByItemNo(itemNo);
      const images = await getItemImagesOnly(itemNo);
      setItem({ ...data, images });
      setItemStatus(data.status ?? null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load item');
    } finally {
      setLoading(false);
    }
  }, [itemNo]);

  const fetchStatuses = useCallback(async () => {
    try {
      const result = await getItemStatuses();
      setStatuses(result);
    } catch (err) {
      console.error('❌ Failed to fetch statuses:', err);
    }
  }, []);

  const changeStatus = async (newStatusId: string, onStatusUpdate?: () => void) => {
    if (statusLoading) return;
    setStatusLoading(true);
    try {
      await updateItemStatus(itemNo, newStatusId);
      const updated = await getItemByItemNo(itemNo);
      setItem((prev) => (prev ? { ...updated, images: prev.images } : null));
      setItemStatus(updated.status ?? null);
      onStatusUpdate?.(); // ✅ Notify parent
    } catch (err) {
      console.error('❌ Failed to update status:', err);
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
      const url = await getItemImage(itemNo, imageName);
      imageCache.current[imageName] = url;
      setFullImageUrl(url);
    } catch (err) {
      console.error('❌ Failed to open image:', err);
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
    const names = imageUrls.map((url) => url.split('/').pop() ?? '');
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
    loading,
    error,
    statuses,
    itemStatus,
    setItemStatus,
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
