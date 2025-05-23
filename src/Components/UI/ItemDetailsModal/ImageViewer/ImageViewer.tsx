'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageViewer.module.scss';

type Props = {
  imageUrl: string;
  onClose: () => void;
};

const ImageViewer = ({ imageUrl, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.viewerWrapper}>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt="عرض الصورة"
            fill
            sizes="(max-width: 768px) 90vw, 90vh"
            className={styles.image}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
