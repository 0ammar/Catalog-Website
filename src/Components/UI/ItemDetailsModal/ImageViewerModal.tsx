'use client';

import styles from './ImageViewerModal.module.scss';
import Image from 'next/image';

type Props = {
  imageUrl: string;
  onClose: () => void;
};

export default function ImageViewerModal({ imageUrl, onClose }: Props) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <Image
          src={imageUrl}
          alt="enlarged"
          width={400}
          height={400}
          className={styles.image}
        />
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </>
  );
}
