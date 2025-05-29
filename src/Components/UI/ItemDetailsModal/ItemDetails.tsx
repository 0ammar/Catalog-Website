'use client';

import styles from './ItemDetails.module.scss';
import {
  ImageCarousel,
  ImageControls,
  ImageViewer,
  StatusButtons,
} from './index';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth, useItemDetails } from '@/Hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Loading from '@/Components/UI/Loading/Loading';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

interface Props {
  itemNo: string;
  onClose: () => void;
  onStatusUpdate?: () => void;
}

const ItemDetails = ({ itemNo, onClose, onStatusUpdate }: Props) => {
  const {
    item,
    itemStatus,
    statuses,
    loading,
    changeStatus,
    previewImage,
    fullImageUrl,
    openImage,
    closeImage,
    expandedDescription,
    toggleDescription,
    uploadImages,
    deleteImages,
    updateDescription,
  } = useItemDetails(itemNo);

  const { isAdmin } = useAuth();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favList = getFavouriteList();
    setIsFavorite(favList.includes(itemNo));
  }, [itemNo]);

  const getFavouriteList = (): string[] =>
    JSON.parse(localStorage.getItem('favoriteItems') || '[]');

  const updateFavouriteList = (list: string[]) => {
    localStorage.setItem('favoriteItems', JSON.stringify(list));
    window.dispatchEvent(new Event('favourites-updated'));
  };

  const handleToggleFavorite = () => {
    const favList = getFavouriteList();
    const updated = favList.includes(itemNo)
      ? favList.filter(no => no !== itemNo)
      : [...favList, itemNo];

    updateFavouriteList(updated);
    setIsFavorite(updated.includes(itemNo));
  };

  if (loading) {
    return (
      <>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}><Loading /></div>
      </>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.topBar}>
          {isAdmin && (
            <button
              className={styles.menuBtn}
              onClick={() => setShowStatusMenu(prev => !prev)}
              aria-label="Toggle status menu"
            >
              <Menu size={22} />
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {isAdmin && showStatusMenu && item && (
          <div className={styles.statusMenu}>
            <StatusButtons
              status={itemStatus?.id}
              statuses={statuses}
              loading={false}
              onChange={code => changeStatus(code, onStatusUpdate)}
            />
          </div>
        )}

        {item && (
          <>
            <div className={styles.carouselWrapper}>
              <ImageCarousel images={item.images ?? []} onImageClick={openImage} />
            </div>

            <AnimatePresence>
              {itemStatus?.iconUrl && (
                <motion.div
                  className={styles.statusIconFixed}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={itemStatus.iconUrl}
                    alt={itemStatus.name}
                    width={30}
                    height={30}
                    className={styles.statusIconImage}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.infoSection}>
              <h2 className={styles.title}>{item.name}</h2>
              <p className={styles.number}>{item.itemNo}</p>
              <p className={styles.imageCount}>عدد الصور: {item.images?.length ?? 0}</p>
              <div className={styles.divider} />
              <p className={`${styles.description} ${expandedDescription ? styles.expanded : styles.collapsed}`}>
                {item.description?.trim() || 'لا يوجد وصف متاح لهذا المنتج'}
              </p>


              {item.description?.length > 100 && (
                <button className={styles.toggleBtn} onClick={toggleDescription}>
                  {expandedDescription ? 'عرض أقل' : '...عرض المزيد'}
                </button>
              )}
            </div>

            {isAdmin && (
              <div className={styles.adminSection}>
                <ImageControls
                  itemId={item.itemNo}
                  images={item.images ?? []}
                  onUploadSuccess={() => uploadImages([])}
                  onDeleteSuccess={(names) => deleteImages(names)}
                  onDescriptionSave={(desc) => updateDescription(desc)}
                  initialDescription={item.description}
                />
              </div>
            )}
          </>
        )}

        <button
          className={`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleToggleFavorite}
          aria-label="Toggle favourite"
        >
          {isFavorite
            ? <HeartSolid className={styles.favIcon} />
            : <HeartOutline className={styles.favIcon} />}
        </button>
      </div>

      {previewImage && fullImageUrl && (
        <ImageViewer imageUrl={fullImageUrl} onClose={closeImage} />
      )}
    </>
  );
};

export default ItemDetails;
