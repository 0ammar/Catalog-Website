'use client';

import styles from './CategoryPage.module.scss';
import { useEffect, useMemo, useState } from 'react';

import { ItemsPage, Searchbar } from '@/Components/Layout';
import { CategoryGrid, EmptyState, Pagination } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/Loading';

import { useItemLogic, useCategory, useSearchList } from '@/Hooks';
import { getSubThrees } from '@/Services/groupServices';

type Props = {
  path: string[];
};

const CategoryPage = ({ path }: Props) => {
  const {
    data: categories,
    level,
    ids,
    loading: categoryLoading,
    uploadImage,
    deleteImage,
    refetch,
  } = useCategory(path);

  const [page, setPage] = useState(1);
  const [hasSubThrees, setHasSubThrees] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const levelNames = useMemo(() => (
    ['المجموعات', 'الفئة الأولى', 'الفئة الثانية', 'الفئة الثالثة', 'العناصر']
  ), []);

  const currentLevelName = useMemo(() => levelNames[level], [level, levelNames]);

  const shouldShowCategoryItems = useMemo(() => (
    (level === 2 && !hasSubThrees && ids.subTwoId) ||
    (level === 3 && ids.subThreeId) ||
    level === 4
  ), [level, hasSubThrees, ids]);

  const shouldShowItemsPage = useMemo(() => (
    isSearching || shouldShowCategoryItems
  ), [isSearching, shouldShowCategoryItems]);

  useEffect(() => {
    const checkSubThrees = async () => {
      if (level === 2 && ids.groupId && ids.subOneId && ids.subTwoId) {
        try {
          const result = await getSubThrees(ids.groupId, ids.subOneId, ids.subTwoId);
          setHasSubThrees(result.length > 0);
        } catch {
          setHasSubThrees(false);
        }
      }
    };
    checkSubThrees();
  }, [level, ids]);

  const {
    data: searchResults,
    query,
    setQuery,
    loading: searchLoading,
  } = useSearchList({
    groupId: ids.groupId,
    subOneId: ids.subOneId,
    subTwoId: ids.subTwoId,
    subThreeId: ids.subThreeId,
    isGlobal: !shouldShowCategoryItems,
    pageSize: 30,
  });

  const {
    data: categoryItems,
    loading: itemLoading,
  } = useItemLogic({
    groupId: ids.groupId,
    subOneId: ids.subOneId,
    subTwoId: ids.subTwoId,
    subThreeId: ids.subThreeId,
    pageSize: 30,
    query,
    page,
  });

  useEffect(() => {
    setIsSearching(Boolean(query));
  }, [query]);

  const showItems = isSearching ? searchResults : categoryItems;
  const isLoading = isSearching ? searchLoading : itemLoading;

  if (!currentLevelName) {
    return <EmptyState title="مسار غير صحيح" message="لم يتم العثور على مجموعة مطابقة" />;
  }

  if (categoryLoading) {
    return <Loading />;
  }

  return (
    <main className={styles.categoryPage}>
      <Searchbar onQueryChange={setQuery} />

      {shouldShowItemsPage ? (
        <>
          <ItemsPage
            title={currentLevelName}
            items={showItems}
            loading={isLoading}
          />
          {!query && (
            <Pagination
              page={page}
              pageSize={30}
              currentCount={categoryItems.length}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      ) : (
        <>
          <h1 className={styles.pageTitle}>
            {currentLevelName} ({categories.length})
          </h1>

          {categories.length === 0 ? (
            <EmptyState
              title="لا توجد أصناف"
              message="يبدو أن هذه المجموعة فارغة."
            />
          ) : (
            <CategoryGrid
              data={categories}
              path={path}
              uploadImage={uploadImage}
              deleteImage={deleteImage}
              refetch={refetch}
            />
          )}
        </>
      )}
    </main>
  );
};

export default CategoryPage;