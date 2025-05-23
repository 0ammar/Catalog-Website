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
import { ItemStatuses } from '@/types/apiTypes';
import Loading from '@/Components/UI/Loading/Loading';

type Props = {
  itemNo: string;
  onClose: () => void;
  onStatusUpdate?: () => void;
};

const ItemDetails = ({ itemNo, onClose, onStatusUpdate }: Props) => {
  const {
    item,
    error,
    itemStatus,
    setItemStatus,
  } = useItemDetails(itemNo);
  const { isAdmin } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const toggleDescriptionExpansion = () =>
    setIsDescriptionExpanded((prev) => !prev);

  const handleStatusChange = (newStatus: ItemStatuses) => {
    console.log('✅ New status received in ItemDetails:', newStatus);
    setItemStatus(newStatus);
    onStatusUpdate?.();
    setShowStatusMenu(false);
  };

  if (!item && !error) {
    return (
      <>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.modal}>
          <Loading />
        </div>
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
              itemId={item.itemNo}
              status={itemStatus?.code}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}

        {item && (
          <>
            <div className={styles.carouselWrapper}>
              <ImageCarousel images={item.images ?? []} onImageClick={setSelectedImage} />
            </div>

            <div className={styles.infoSection}>
              <h2 className={styles.title}>{item.name}</h2>
              <p className={styles.number}>{item.itemNo}</p>

              <p
                className={`${styles.description} ${isDescriptionExpanded ? styles.expanded : styles.collapsed}`}
              >
                {item.description?.trim()
                  ? item.description
                  : 'لا يوجد وصف متاح لهذا المنتج.'}
              </p>

              {item.description && item.description.length > 100 && (
                <button
                  className={styles.toggleBtn}
                  onClick={toggleDescriptionExpansion}
                >
                  {isDescriptionExpanded ? 'عرض أقل' : 'عرض المزيد'}
                </button>
              )}
            </div>

            {isAdmin && (
              <div className={styles.adminSection}>
                <ImageControls itemId={item.itemNo} images={item.images ?? []} />
              </div>
            )}
          </>
        )}

        <AnimatePresence>
          {itemStatus && (
            <motion.div
              key={itemStatus.code}
              className={styles.statusIconFixed}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                src={itemStatus.iconUrl}
                alt={itemStatus.name}
                width={60}
                height={60}
                className={styles.statusIconImage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default ItemDetails;
