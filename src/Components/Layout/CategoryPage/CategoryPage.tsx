'use client';

import styles from './CategoryPage.module.scss';
import { useEffect, useState } from 'react';

import { ItemsPage, Searchbar } from '@/Components/Layout';
import { CategoryGrid, EmptyState, Pagination } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/Loading';

import { useItemLogic, useCategory, useSearchList, useAuth } from '@/Hooks';

type Props = {
  path: string[];
};

const CategoryPage = ({ path }: Props) => {
  const { isAdmin } = useAuth();
  const {
    data: categories,
    ids,
    loading: categoryLoading,
    uploadImage,
    deleteImage,
    refetch,
    shouldShowItems,
    selectedCategoryName,
    handleCategoryClick,
  } = useCategory(path);

  const [isSearching, setIsSearching] = useState(false);

  const {
    items: searchResults,
    query,
    setQuery,
    loading: searchLoading,
    page: searchPage,
    setPage: setSearchPage,
  } = useSearchList({
    groupId: ids.groupId,
    subOneId: ids.subOneId,
    subTwoId: ids.subTwoId,
    subThreeId: ids.subThreeId,
    isGlobal: !shouldShowItems,
    pageSize: 30,
  });

  const {
    data: categoryItems,
    loading: itemLoading,
    page,
    setPage,
  } = useItemLogic({
    groupId: ids.groupId,
    subOneId: ids.subOneId,
    subTwoId: ids.subTwoId,
    subThreeId: ids.subThreeId,
    pageSize: 30,
    page: searchPage,
  });

  useEffect(() => {
    setIsSearching(Boolean(query));
  }, [query]);

  const showItems = isSearching ? searchResults : categoryItems;
  const isLoading = isSearching ? searchLoading : itemLoading;
  const currentPage = isSearching ? searchPage : page;
  const updatePage = isSearching ? setSearchPage : setPage;

  if (categoryLoading) return <Loading />;

  const showItemsPage = isSearching || shouldShowItems;
  console.log('Category Name:', selectedCategoryName);

  return (
    <main className={styles.categoryPage}>
      <Searchbar onQueryChange={setQuery} />

      {showItemsPage ? (
        <>
          <ItemsPage
            title={selectedCategoryName ?? 'العناصر'}
            items={showItems}
            loading={isLoading}
          />
          {!query && (
            <Pagination
              page={currentPage}
              pageSize={30}
              currentCount={categoryItems.length}
              onPageChange={updatePage}
            />
          )}
        </>
      ) : (
        <>
          {selectedCategoryName && (
            <h1 className={styles.pageTitle}>
              {selectedCategoryName}
            </h1>
          )}

          {categories.length === 0 ? (
            <EmptyState
              title="لا توجد أصناف"
              message="يبدو أن هذه المجموعة فارغة."
            />
          ) : (
            <CategoryGrid
              data={categories}
              onClick={handleCategoryClick}
              uploadImage={uploadImage}
              deleteImage={deleteImage}
              refetch={refetch}
              isAdmin={isAdmin}
            />
          )}
        </>
      )}
    </main>

  );
};

export default CategoryPage;
