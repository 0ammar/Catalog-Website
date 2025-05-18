'use client';

import styles from './ItemDetailsModal.module.scss';
import ImageCarousel from './ImageCarousel';
import ImageControls from './ImageControls';
import StatusButtons from './StatusButtons';
import ImageViewerModal from './ImageViewerModal';

import { ItemDetailsType } from '@/types';
import { useState } from 'react';

type Props = {
  item: ItemDetailsType;
  onClose: () => void;
};

export default function ItemDetailsModal({ item, onClose }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => setIsDescriptionExpanded(prev => !prev);

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modal}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          <ImageCarousel images={item.images} onImageClick={setSelectedImage} />
        </div>

        {/* Item Info */}
        <div className={styles.infoSection}>
          <h2 className={styles.title}>{item.name}</h2>
          <p className={styles.number}>{item.itemNumber}</p>

          <p
            className={`${styles.description} ${
              isDescriptionExpanded ? styles.expanded : styles.collapsed
            }`}
          >
            {item.description || 'لا يوجد وصف متاح...'}
          </p>

          {item.description && item.description.length > 100 && (
            <button className={styles.toggleBtn} onClick={toggleDescription}>
              {isDescriptionExpanded ? 'عرض أقل' : 'عرض المزيد'}
            </button>
          )}
        </div>

        {/* Admin Controls */}
        {item.isAdmin && (
          <div className={styles.adminSection}>
            <ImageControls itemId={item.id} images={item.images} />
            {/* <StatusButtons itemId={item.id} status={item.status} /> */}
          </div>
        )}
      </div>

      {/* Enlarged Image Viewer */}
      {selectedImage && (
        <ImageViewerModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
