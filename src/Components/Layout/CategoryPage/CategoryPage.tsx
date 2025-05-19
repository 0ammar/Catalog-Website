'use client';

import styles from './CategoryPage.module.scss';
import { CategoryGrid, EmptyState } from '@/Components/UI';
import { useCategoryNavigator } from '@/Hooks/useCategoryNavigator';

type Props = {
  path: string[];
};

const CategoryPage = ({ path }: Props) => {
  const { currentLevelName, currentData, loading } = useCategoryNavigator(path);

  if (!currentLevelName) {
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
        {currentLevelName} ({currentData.length})
      </h1>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : currentData.length === 0 ? (
        <EmptyState
          title="لا توجد أصناف"
          message="يبدو أن هذه المجموعة فارغة."
        />
      ) : (
        <CategoryGrid data={currentData} />
      )}
    </main>
  );
};

export default CategoryPage;