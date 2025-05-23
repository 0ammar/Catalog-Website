'use client';

import { ItemsPage, Searchbar } from '@/Components/Layout';
import Pagination from '@/Components/UI/Pagination/Pagination';
import EmptyState from '@/Components/UI/EmptyState/EmptyState';
import useStatusItemsWithSearch from '@/Hooks/useStatusItemsWithSearch';

const FocusedItemsPage = () => {
  const {
    query,
    setQuery,
    page,
    setPage,
    items,
    loading,
    total,
  } = useStatusItemsWithSearch('4');

  return (
    <>
      <Searchbar
        onQueryChange={(val) => {
          setQuery(val);
          setPage(1);
        }}
      />

      {!loading && items.length === 0 ? (
        <EmptyState
          title="لا توجد عناصر"
          message="لم يتم العثور على عناصر مميزة."
        />
      ) : (
        <ItemsPage title="العناصر المميزة" items={items} loading={loading} />
      )}

      {!query && (
        <Pagination
          page={page}
          pageSize={30}
          currentCount={total}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default FocusedItemsPage;
