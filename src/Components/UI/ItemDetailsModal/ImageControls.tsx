'use client';

import { StaticImageData } from 'next/image';
import styles from './ImageControls.module.scss';
import { BiTrash, BiUpload } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

/**
 * Props definition for ImageControls component
 */
type Props = {
  itemId: string;
  images: (string | StaticImageData)[];
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
};

/**
 * ImageControls Component
 */
export default function ImageControls({ itemId, images, onUploadSuccess, onDeleteSuccess }: Props) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('images', file));

    // simulate API call
    setTimeout(() => {
      console.log(`✅ Uploaded images to item ${itemId}`, files);
      toast.success('تم رفع الصور بنجاح!');
      onUploadSuccess?.();
      setUploading(false);
    }, 1000);
  };

  const handleDelete = async () => {
    if (confirm('هل أنت متأكد أنك تريد حذف كل الصور؟')) {
      setDeleting(true);

      // simulate API call
      setTimeout(() => {
        console.log(`🗑️ Deleted all images for item ${itemId}`);
        toast.warn('تم حذف الصور!');
        onDeleteSuccess?.();
        setDeleting(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.controlsWrapper}>
      <label className={`${styles.btn} ${styles.uploadBtn} ${uploading ? styles.loading : ''}`}>
        <BiUpload className={styles.icon} /> {uploading ? 'جارٍ الرفع...' : 'رفع الصور'}
        <input type="file" multiple hidden onChange={handleUpload} />
      </label>

      {images.length > 0 && (
        <button
          className={`${styles.btn} ${styles.deleteBtn} ${deleting ? styles.loading : ''}`}
          onClick={handleDelete}
          disabled={deleting}
        >
          <BiTrash className={styles.icon} /> {deleting ? 'جارٍ الحذف...' : 'حذف الصور'}
        </button>
      )}
    </div>
  );
}
