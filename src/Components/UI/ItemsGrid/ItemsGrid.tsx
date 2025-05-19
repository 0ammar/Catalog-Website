'use client';

import styles from './ItemsGrid.module.scss';
import { ItemsGridProps } from '../../../../types/itemComponent';
import { ItemCard } from '@/Components/UI';

const ItemsGrid = ({ items }: ItemsGridProps) => {
  return (
    <section className={styles.itemsGrid}>
      {items.map((item, i) => (
        <ItemCard
          key={i}
          imageUrl={item.imageUrl}
          name={item.name}
          itemNumber={item.itemNumber}
          status={item.status}
        />
      ))}
    </section>
  );
}

export default ItemsGrid