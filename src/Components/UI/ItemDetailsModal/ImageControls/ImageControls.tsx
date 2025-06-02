'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, UploadCloud, FileText } from 'lucide-react';
import styles from './ImageControls.module.scss';
import { uploadItemImages } from '@/Services/itemServices';

interface Props {
  itemId: string;
  images: string[];
  onUploadSuccess?: () => void;
  onDeleteSuccess?: (fileNames: string[]) => void;
  onDescriptionSave?: (desc: string) => void;
  initialDescription?: string;
}

const ImageControls = ({
  itemId,
  images,
  onUploadSuccess,
  onDeleteSuccess,
  onDescriptionSave,
  initialDescription
}: Props) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingDesc, setUpdatingDesc] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);
  const [description, setDescription] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const fileList = Array.from(files);
      await uploadItemImages(itemId, fileList);

      toast.success('✅ تم رفع الصور بنجاح');
      onUploadSuccess?.();
    } catch {
      toast.error('❌ فشل في رفع الصور');
    } finally {
      setUploading(false);
    }
  };

  const toggleImage = (src: string) => {
    setSelectedImages((prev) =>
      prev.includes(src) ? prev.filter((i) => i !== src) : [...prev, src]
    );
  };

  const confirmDelete = async () => {
    if (selectedImages.length === 0) return;
    setDeleting(true);
    try {
      const fileNames = selectedImages
        .map((url) => url.split('/').pop()?.split('?')[0])
        .filter((name): name is string => !!name && name.trim().length > 0);

      onDeleteSuccess?.(fileNames);
      toast.warn(`🗑️ تم حذف ${selectedImages.length} صورة`);
      setSelectedImages([]);
      setShowDeleteModal(false);
    } catch {
      toast.error('❌ فشل في حذف الصور');
    } finally {
      setDeleting(false);
    }
  };

  const addDescription = async () => {

    setUpdatingDesc(true);
    try {
      onDescriptionSave?.(description);
      toast.success('✅ تم حفظ الوصف بنجاح');
      setShowDescModal(false);
      setDescription('');
    } catch {
      toast.error('❌ فشل في حفظ الوصف');
    } finally {
      setUpdatingDesc(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={() => setShowDeleteModal(true)}
          disabled={deleting}
          title="حذف الصور"
        >
          <Trash2 size={20} />
        </button>

        <label className={styles.iconBtn} title="رفع الصور">
          <UploadCloud size={20} />
          <input
            type="file"
            hidden
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>

        <button
          className={styles.iconBtn}
          title="إضافة وصف"
          onClick={() => {
            setShowDescModal(true);
            setDescription(initialDescription || '');
          }}
        >
          <FileText size={20} />
        </button>

      </div>
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className={styles.modalHeader}>
                <p>اختر الصور التي تريد حذفها</p>
                <button onClick={() => setShowDeleteModal(false)} className={styles.closeBtn}>
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
                <button onClick={confirmDelete} disabled={deleting}>
                  {deleting ? '...جاري الحذف' : 'حذف الصور المحددة'}
                </button>
                <button onClick={() => setShowDeleteModal(false)}>إغلاق</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {showDescModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDescModal(false)}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className={styles.modalHeader}>
                <p className='titleDescModal'>أدخل وصفًا جديدًا لهذا العنصر</p>
                <button onClick={() => setShowDescModal(false)} className={styles.closeBtn}>
                  <X size={18} />
                </button>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب هنا..."
                className={styles.textarea}
              />
              <div className={styles.modalActions}>
                <button onClick={addDescription} disabled={updatingDesc}>
                  {updatingDesc ? '...جاري الحفظ' : 'حفظ'}
                </button>
                <button onClick={() => setShowDescModal(false)}>إغلاق</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageControls;