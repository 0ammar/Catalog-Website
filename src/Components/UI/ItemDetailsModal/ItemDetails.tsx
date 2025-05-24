'use client';

import styles from './ItemDetails.module.scss';
import {
  ImageCarousel,
  ImageControls,
  ImageViewer,
  StatusButtons,
} from './index';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth, useItemDetails } from '@/Hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Loading from '@/Components/UI/Loading/Loading';

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
  } = useItemDetails(itemNo);

  const { isAdmin } = useAuth();
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  if (loading) {
    return (
      <>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}><Loading /></div>
      </>
    );
  }
  console.log("itemStatus:", itemStatus);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.topBar}>
          {isAdmin && (
            <button
              className={styles.menuBtn}
              onClick={() => setShowStatusMenu((prev) => !prev)}
            >
              <Menu size={22} />
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {isAdmin && showStatusMenu && item && (
          <div className={styles.statusMenu}>
            <StatusButtons
              status={itemStatus?.id}
              statuses={statuses}
              loading={false}
              onChange={(code) => changeStatus(code, onStatusUpdate)}
            />
          </div>
        )}

        {item && (
          <>
            <div className={styles.carouselWrapper}>
              <ImageCarousel images={item.images ?? []} onImageClick={openImage} />
            </div>

            <div className={styles.infoSection}>
              <h2 className={styles.title}>{item.name}</h2>
              <p className={styles.number}>{item.itemNo}</p>

              <p className={`${styles.description} ${expandedDescription ? styles.expanded : styles.collapsed}`}>
                {item.description?.trim() || 'لا يوجد وصف متاح لهذا المنتج. لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.لا يوجد وصف متاح لهذا المنتج.'}
              </p>

              {item.description && item.description.length > 100 && (
                <button className={styles.toggleBtn} onClick={toggleDescription}>
                  {expandedDescription ? 'عرض أقل' : 'عرض المزيد'}
                </button>
              )}

            </div>

            {isAdmin && (
              <div className={styles.adminSection}>
                <ImageControls
                  itemId={item.itemNo}
                  images={item.images ?? []}
                  onUploadSuccess={() => uploadImages([])}
                  onDeleteSuccess={() => deleteImages([])}
                />
              </div>
            )}
          </>
        )}

        <AnimatePresence>
          {itemStatus?.iconUrl && (
            <motion.div
              key={itemStatus.id}
              className={styles.statusIconFixed}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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

      </div>
      {previewImage && fullImageUrl && (
        <ImageViewer imageUrl={fullImageUrl} onClose={closeImage} />
      )}
    </>
  );
};
export default ItemDetails;