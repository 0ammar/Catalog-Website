'use client';

import styles from './ItemDetails.module.scss';
import { ImageCarousel, ImageControls, ImageViewer, StatusButtons  } from './index'
import { Menu, X } from 'lucide-react';
import { ItemDetailsType } from '../../../types/itemComponent';
import { useState } from 'react';

type Props = {
  item: ItemDetailsType;
  onClose: () => void;
};

const ItemDetails = ({ item, onClose }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const toggleDescriptionExpansion = () => setIsDescriptionExpanded(prev => !prev);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.modal}>
        <div className={styles.topBar}>
          <button className={styles.menuBtn} onClick={() => setShowStatusMenu(prev => !prev)}>
            <Menu size={22} />
          </button>

          <button className={styles.closeBtn} onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {showStatusMenu && (
          <div className={styles.statusMenu}>
            <StatusButtons itemId={item.id} status={item.status} />
          </div>
        )}

        <div className={styles.carouselWrapper}>
          <ImageCarousel images={item.images} onImageClick={setSelectedImage} />
        </div>

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
            <button className={styles.toggleBtn} onClick={toggleDescriptionExpansion}>
              {isDescriptionExpanded ? 'عرض أقل' : 'عرض المزيد'}
            </button>
          )}
        </div>

        {item.isAdmin && (
          <div className={styles.adminSection}>
            <ImageControls itemId={item.id} images={item.images} />
          </div>
        )}
      </div>

      {selectedImage && (
        <ImageViewer imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}

export default ItemDetails