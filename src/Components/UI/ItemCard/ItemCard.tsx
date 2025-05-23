'use client';

import styles from './ItemCard.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import ItemDetailsModal from '@/Components/UI/ItemDetailsModal/ItemDetails';
import { Item } from '@/types/apiTypes';


type Props = {
  item: Item;
};

const ItemCard = ({ item }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className={styles.itemCard} onClick={() => setShowDetails(true)}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.firstImage}
            alt={item.name}
            width={150}
            height={150}
            className={styles.image}
            priority
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.itemNumber}>{item.itemNo}</p>
        </div>

        {item.status?.iconUrl && (
          <div className={styles.statusIcon} title={item.status?.name}>
            <Image
              src={item.status.iconUrl}
              alt={item.status.name}
              width={20}
              height={20}
            />
          </div>
        )}
      </div>

      {showDetails && (
        <ItemDetailsModal
          itemNo={item.itemNo}
          onClose={() => setShowDetails(false)}
          onStatusUpdate={() => router.refresh()} 
        />
      )}
    </>
  );
}
export default ItemCard