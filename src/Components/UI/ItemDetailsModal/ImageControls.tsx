'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './ImageControls.module.scss';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props {
  itemId: string;
  images: (string | StaticImageData)[];
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export default function ImageControls({ itemId, images, onUploadSuccess, onDeleteSuccess }: Props) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteGrid, setShowDeleteGrid] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('newImages', file);
      });

      await axios.post(`/api/admin/items/${itemId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('تم رفع الصور بنجاح!');
      onUploadSuccess?.();
    } catch {
      toast.error('فشل في رفع الصور!');
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (selectedImages.length === 0) return;

    setDeleting(true);

    try {
      await axios.delete(`/api/admin/items/${itemId}/images`, {
        data: selectedImages,
        headers: { 'Content-Type': 'application/json' },
      });

      toast.warn(`تم حذف ${selectedImages.length} صورة!`);
      onDeleteSuccess?.();
      setShowDeleteGrid(false);
      setSelectedImages([]);
    } catch {
      toast.error('فشل في حذف الصور!');
    } finally {
      setDeleting(false);
    }
  };

  const handleImageToggle = (src: string) => {
    setSelectedImages((prev) =>
      prev.includes(src) ? prev.filter((i) => i !== src) : [...prev, src]
    );
  };

  return (
    <div className={styles.controlsWrapper}>
      {images.length > 0 && !showDeleteGrid && (
        <button
          className={`${styles.btn} ${styles.deleteBtn} ${deleting ? styles.loading : ''}`}
          onClick={() => setShowDeleteGrid(true)}
          disabled={deleting}
        >
          حذف الصور
        </button>
      )}

      <label className={`${styles.btn} ${styles.uploadBtn} ${uploading ? styles.loading : ''}`}>
        {uploading ? 'جارٍ الرفع...' : 'رفع الصور'}
        <input type="file" multiple hidden onChange={handleUpload} disabled={uploading} />
      </label>

      {showDeleteGrid && (
        <div className={styles.deleteList}>
          <p className={styles.warning}>اختر الصور التي ترغب بحذفها</p>
          <div className={styles.imageGrid}>
            {images.map((img, idx) => (
              <Image
  key={idx}
  src={img as string}
  alt={`delete-${idx}`}
  width={90}
  height={80}
  onClick={() => handleImageToggle(img as string)}
  className={`${styles.preview} ${selectedImages.includes(img as string) ? styles.selected : ''}`}
/>

            ))}
          </div>

          <div className={styles.confirmActions}>
            <button
              className={styles.uploadBtn}
              onClick={() => setShowDeleteGrid(false)}
              disabled={deleting}
            >
              تراجع
            </button>
            <button
              className={styles.deleteBtn}
              onClick={confirmDelete}
              disabled={deleting || selectedImages.length === 0}
            >
              حذف {selectedImages.length} صور
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
