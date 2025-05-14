'use client';

import styles from './ItemCard.module.scss';
import { ItemCardProps } from '@/types';
import Image from 'next/image';
import { FiCheckCircle } from 'react-icons/fi';

export default function ItemCard({ imageUrl, name, itemNumber, status = 'Active' }: ItemCardProps) {
  return (
    <div className={styles.itemCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.itemNumber}>{itemNumber}</p>
      </div>
      {status !== 'Active' && (
        <div className={styles.statusIcon} title={status}>
          <FiCheckCircle />
        </div>
      )}
    </div>
  );
}
