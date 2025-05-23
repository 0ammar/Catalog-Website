'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { uploadItemImages, deleteItemImages } from '@/Services/itemServices';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './ImageControls.module.scss';

interface Props {
  itemId: string;
  images: string[];
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

const ImageControls = ({ itemId, images, onUploadSuccess, onDeleteSuccess }: Props) => {
  const router = useRouter();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Upload new item images
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      await uploadItemImages(itemId, Array.from(files));
      toast.success('✅ تم رفع الصور بنجاح');
      onUploadSuccess?.();
      router.refresh();
    } catch {
      toast.error('❌ فشل في رفع الصور');
    } finally {
      setUploading(false);
    }
  };

  // Toggle image selection for deletion
  const toggleImage = (src: string) => {
    setSelectedImages((prev) =>
      prev.includes(src) ? prev.filter((i) => i !== src) : [...prev, src]
    );
  };

  // Confirm and delete selected images
  const confirmDelete = async () => {
    if (selectedImages.length === 0) return;

    setDeleting(true);
    try {
      const fileNames = selectedImages.map((url) => url.split('/').pop()!);
      await deleteItemImages(itemId, fileNames);
      toast.warn(`🗑️ تم حذف ${selectedImages.length} صورة`);
      onDeleteSuccess?.();
      setSelectedImages([]);
      setShowModal(false);
      router.refresh();
    } catch {
      toast.error('❌ فشل في حذف الصور');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <button
          className={styles.deleteBtn}
          onClick={() => setShowModal(true)}
          disabled={deleting}
        >
          حذف الصور
        </button>

        <label className={`${styles.uploadBtn} ${uploading ? styles.disabled : ''}`}>
          {uploading ? 'جاري الرفع...' : 'رفع الصور'}
          <input
            type="file"
            hidden
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.modalHeader}>
                <p>اختر الصور التي تريد حذفها</p>
                <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
                  <X size={18} />
                </button>
              </div>

              <div className={styles.grid}>
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`${styles.imageCard} ${selectedImages.includes(img) ? styles.selected : ''}`}
                    onClick={() => toggleImage(img)}
                  >
                    <Image src={img} alt={`delete-${i}`} width={90} height={80} />
                  </div>
                ))}
              </div>

              <div className={styles.modalActions}>
                <button onClick={() => setShowModal(false)}>تراجع</button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting || selectedImages.length === 0}
                >
                  {deleting ? 'جاري الحذف...' : `حذف ${selectedImages.length} صور`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ImageControls;