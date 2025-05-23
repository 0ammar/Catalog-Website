'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getItemByItemNo,
  getItemImage,
  getItemStatuses,
  updateItemStatus,
  getItemImagesOnly,
} from '@/Services/itemServices';
import { GetItemDto, ItemStatuses } from '@/types/apiTypes';

// ✅ النوع المخصص للتفاصيل (حل ذكي للمشكلة)
type ItemDetails = GetItemDto & {
  firstImage?: string;
};

export default function useItemDetails(itemNo: string) {
  const router = useRouter();

  const [item, setItem] = useState<ItemDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [statuses, setStatuses] = useState<ItemStatuses[]>([]);
  const [itemStatus, setItemStatus] = useState<ItemStatuses | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const [previewImageName, setPreviewImageName] = useState<string | null>(null);
  const [fullImageUri, setFullImageUri] = useState<string | null>(null);
  const cache = useRef<Record<string, string>>({});

  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const fetchItem = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getItemByItemNo(itemNo);
      const images = await getItemImagesOnly(itemNo);
      setItem({ ...data, images });
    } catch (err: unknown) {
      console.error('❌ Error loading item:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load item.');
      }
    } finally {
      setLoading(false);
    }
  }, [itemNo]);

  const fetchStatuses = useCallback(async () => {
    try {
      const data = await getItemStatuses();
      setStatuses(data);
    } catch (err: unknown) {
      console.error('❌ Failed to load statuses:', err);
    }
  }, []);

  const changeStatus = async (newStatusId: string) => {
    if (statusLoading) return;

    setStatusLoading(true);
    try {
      await updateItemStatus(itemNo, newStatusId);
      const updatedItem = await getItemByItemNo(itemNo);
      setItem((prev) => prev ? { ...updatedItem, images: prev.images } : null);
      setItemStatus(updatedItem.status!);
    } catch (err: unknown) {
      console.error('❌ Failed to update status:', err);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleOpenImage = async (imgName: string) => {
    setPreviewImageName(imgName);
    if (cache.current[imgName]) {
      setFullImageUri(cache.current[imgName]);
      return;
    }

    try {
      const uri = await getItemImage(itemNo, imgName);
      cache.current[imgName] = uri;
      setFullImageUri(uri);
    } catch (err) {
      console.error('❌ Failed to load image:', err);
    }
  };

  const handleCloseImage = () => {
    setPreviewImageName(null);
    setFullImageUri(null);
  };

  const toggleDescription = () => {
    if (!showFullDescription && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setShowFullDescription((prev) => !prev);
  };

  const handleUpload = () => router.push(`/ItemDetails/upload/${itemNo}`);
  const handleEdit = () => router.push(`/ItemDetails/edit/${itemNo}`);

  useEffect(() => {
    fetchItem();
    fetchStatuses();
  }, [fetchItem, fetchStatuses]);

  return {
    item,
    loading,
    error,
    statuses,
    itemStatus,
    statusLoading,
    setItemStatus,
    changeStatus,
    previewImageName,
    fullImageUri,
    handleOpenImage,
    handleCloseImage,
    showFullDescription,
    descriptionRef,
    toggleDescription,
    handleUpload,
    handleEdit,
  };
}
