'use client';

import styles from './ItemsGrid.module.scss';
import { Item } from '@/types/apiTypes'

import { ItemCard } from '@/Components/UI';

type Props = {
  items: Item[];
};

const ItemsGrid = ({ items }: Props) => {
  return (
    <section className={styles.itemsGrid}>
      {items.map((item) => (
        <ItemCard key={item.itemNo} item={item} />
      ))}
    </section>
  );
};

export default ItemsGrid;