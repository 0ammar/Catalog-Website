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
    if (file && uploadImage) {
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
          <Image
            className={styles.categImg}
            src={imageUrl}
            alt={name}
            width={100}
            height={100}
            priority
          />
          <h2 className={styles.categTitle}>{name}</h2>
        </div>

        {isAdmin && (
          <div className={styles.buttonsWrapper} onClick={(e) => e.stopPropagation()}>
            <FiRefreshCw
              className={styles.icon}
              title="Delete"
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