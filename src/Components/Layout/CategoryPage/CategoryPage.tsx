'use client';

import styles from './CategoryPage.module.scss';
import { CategoryGrid, EmptyState } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/LoadingClient';
import { useEffect, useState } from 'react';

type Props = {
  path: string[];
};

export default function CategoryPage({ path }: Props) {
  const currentLevel =
    path.length === 1 ? 'المجموعة 1'
      : path.length === 2 ? 'المجموعة 2'
        : path.length === 3 ? 'المجموعة 3'
          : path.length === 4 ? 'المجموعة 4'
            : null;

  const [loading, setLoading] = useState(true);
  const [isEmpty] = useState(true); // بدلها حسب داتا فعلية لاحقًا

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // simulate API loading

    return () => clearTimeout(timer);
  }, []);

  if (!currentLevel) {
    return <EmptyState title="مسار غير صحيح" message="لم يتم العثور على مجموعة مطابقة" />;
  }

  return (
    <main className={styles.categoryPage}>
      <h1 className={styles.pageTitle}>{currentLevel}</h1>
      {loading ? (
        <Loading />
      ) : isEmpty ? (
        <EmptyState title="لا توجد أصناف" message="يبدو أن هذه المجموعة فارغة." />
      ) : (
        <CategoryGrid />
      )}
    </main>
  );
}
