'use client';

import styles from './ItemsPage.module.scss';
import { ItemsGrid, EmptyState } from '@/Components/UI';

import { ItemsPageProps } from '@/types/itemComponent';

const ItemsPage = ({ title, items }: ItemsPageProps) => {

  return (
    <main className={styles.itemsPage}>
      {title && (
        <h1 className={styles.pageTitle}>
          {title} ({items.length})
        </h1>
      )}

      {!items?.length ? (
        <EmptyState
          title="لا توجد عناصر"
          message="لم يتم العثور على أي نتائج ضمن هذه المجموعة."
        />
      ) : (
        <ItemsGrid items={items} />
      )}
    </main>
  );
};
export default ItemsPage;