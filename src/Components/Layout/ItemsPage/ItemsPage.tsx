'use client';

import styles from './ItemsPage.module.scss';
import { Item } from '@/types/apiTypes';
import Loading from '@/Components/UI/Loading/Loading';

import { ItemsGrid, EmptyState } from '@/Components/UI';

type Props = {
  title?: string;
  items: Item[];
  loading?: boolean;
};

const ItemsPage = ({ items, loading = false }: Props) => {
  const showEmpty = !loading && items.length === 0;

  return (
    <main className={styles.itemsPage}>


      {loading ? (
        <Loading />
      ) : showEmpty ? (
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
