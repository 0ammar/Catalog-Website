'use client';

import styles from './CategoryPage.module.scss';
import { CategoryGrid, EmptyState } from '@/Components/UI';

type Props = {
  path: string[];
};

const CategoryPage = ({ path }: Props) => {
  const currentLevel =
    path.length === 1 ? 'المجموعة 1'
      : path.length === 2 ? 'المجموعة 2'
        : path.length === 3 ? 'المجموعة 3'
          : path.length === 4 ? 'المجموعة 4'
            : null;

  const items = Array.from({ length: 10 }, (_, i) => i); 

  if (!currentLevel) {
    return (
      <EmptyState
        title="مسار غير صحيح"
        message="لم يتم العثور على مجموعة مطابقة"
      />
    );
  }

  return (
    <main className={styles.categoryPage}>
      <h1 className={styles.pageTitle}>
        {currentLevel} ({items.length})
      </h1>

      {items.length === 0 ? (
        <EmptyState
          title="لا توجد أصناف"
          message="يبدو أن هذه المجموعة فارغة."
        />
      ) : (
        <CategoryGrid />
      )}
    </main>
  );
};

export default CategoryPage;
