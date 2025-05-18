'use client';

import styles from './ItemsGrid.module.scss';
import { ItemsGridProps } from '@/types';
import { ItemCard } from '@/Components/UI';

export default function ItemsGrid({ items }: ItemsGridProps) {
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
