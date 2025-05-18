'use client';

import styles from './ImageViewerModal.module.scss';
import Image from 'next/image';
import { useEffect } from 'react';

type Props = {
  imageUrl: string;
  onClose: () => void;
};

export default function ImageViewerModal({ imageUrl, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt="Enlarged Image"
            fill
            sizes="(max-width: 768px) 90vw, 600px"
            className={styles.image}
          />
        </div>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </>
  );
}
