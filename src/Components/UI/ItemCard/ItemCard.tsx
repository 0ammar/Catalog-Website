'use client';

import styles from './ItemCard.module.scss';
import { ItemCardProps } from '../../../types/itemComponent';
import Image from 'next/image';
import { FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';
import ItemDetailsModal from '../ItemDetailsModal/ItemDetails';
import { img1, img2, img3, img4 } from '@/assets/images'

const ItemCard = ({ name, itemNumber, status = 'Active' }: ItemCardProps) => {

  const [showDetails, setShowDetails] = useState(false);

  const itemDetails = {
    id: itemNumber,
    name,
    itemNumber,
    description: 'لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً لا يوجد وصف حالياً ',
    images: [ img1, img2, img3, img4],
    status,
    isAdmin: true,
  };

  return (
    <>
      <div className={styles.itemCard} onClick={() => setShowDetails(true)}>
        <div className={styles.imageWrapper}>
          <Image src={img1} alt={name} width={150} height={150} className={styles.image} />
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

      {showDetails && (
        <ItemDetailsModal item={itemDetails} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}
export default ItemCard