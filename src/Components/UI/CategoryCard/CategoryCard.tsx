'use client';

import styles from './CategoryCard.module.scss';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { FiUploadCloud, FiRefreshCw } from 'react-icons/fi';
import { Modal } from '@/Components/UI';

export type CategoryCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  isAdmin?: boolean;
  onClick?: () => void;
  uploadImage?: (file: File) => Promise<void>;
  deleteImage?: (imageUrl: string) => Promise<void>;
  refetch?: () => void;
};

const CategoryCard = ({
  name,
  imageUrl,
  isAdmin = false,
  onClick,
  uploadImage,
  deleteImage,
  refetch,
}: CategoryCardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteImage?.(imageUrl);
    await refetch?.();
    setShowDeleteModal(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 500 * 1024) { // 500KB
    alert("❌ حجم الصورة يجب أن لا يتجاوز 500KB");
    return;
  }

  if (uploadImage) {
    await uploadImage(file);
    await refetch?.();
  }
};


  return (
    <>
      <section
        className={styles.categoryCard}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <div className={styles.imgTitle}>
          <div className={styles.categImgWrapper}>
            <div className={styles.categImgWrapper}>
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

          </div>
          <h2 className={styles.categTitle}>{name}</h2>
        </div>

        {isAdmin && (
          <div className={styles.buttonsWrapper} onClick={(e) => e.stopPropagation()}>
            <FiRefreshCw
              className={styles.icon}
              title="Reset"
              onClick={handleDeleteClick}
            />
            <FiUploadCloud
              className={styles.icon}
              title="Upload"
              onClick={handleUploadClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            />
          </div>
        )}
      </section>

      <Modal
        isOpen={showDeleteModal}
        title="تأكيد حذف الصورة"
        message="هل أنت متأكد أنك تريد حذف صورة هذا التصنيف؟"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default CategoryCard;