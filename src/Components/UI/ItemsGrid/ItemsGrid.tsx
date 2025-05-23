'use client';

import styles from './ItemsGrid.module.scss';
import { ItemCard } from '@/Components/UI';
import { Item } from '@/types/apiTypes';

type Props = {
  items: Item[];
};

const ItemsGrid = ({ items }: Props) => {
  return (
    <section className={styles.itemsGrid}>
      {items.map((item) => {
  console.log("🎯 Rendering item:", item.itemNo, "—", item.status?.code || "no status");
  return <ItemCard key={item.itemNo} item={item} />;
})}

    </section>
  );
};

export default ItemsGrid;
