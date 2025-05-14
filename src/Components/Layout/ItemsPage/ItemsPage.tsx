'use client';

import styles from './ItemsPage.module.scss';
import { ItemsPageProps } from '@/types';
import { ItemsGrid } from '@/Components/UI';

export default function ItemsPage({ title, items }: ItemsPageProps) {
  return (
    <main className={styles.itemsPage}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
      <ItemsGrid items={items} />
    </main>
  );
}
