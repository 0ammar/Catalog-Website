'use client';

import styles from './ItemsPage.module.scss';
import { ItemsPageProps } from '@/types';
import { ItemsGrid, EmptyState } from '@/Components/UI';

export default function ItemsPage({ title, items }: ItemsPageProps) {
  return (
    <main className={styles.itemsPage}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}

      {items.length === 0 ? (
        <EmptyState title="لا توجد عناصر" message="لم يتم العثور على أي نتائج ضمن هذه المجموعة." />
      ) : (
        <ItemsGrid items={items} />
      )}
    </main>
  );
}
