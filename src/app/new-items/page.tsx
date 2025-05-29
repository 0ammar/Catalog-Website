'use client';

import { ItemsPage, Searchbar } from '@/Components/Layout';
import Pagination from '@/Components/UI/Pagination/Pagination';
import EmptyState from '@/Components/UI/EmptyState/EmptyState';
import useStatusItemsWithSearch from '@/Hooks/useStatusItemsWithSearch';
import '@/styles/globals.scss';

const NewItemsPage = () => {
  const {
    query,
    setQuery,
    page,
    setPage,
    items,
    loading,
    total,
  } = useStatusItemsWithSearch('3');

  return (
    <>
      <Searchbar
        onQueryChange={(val) => {
          setQuery(val);
          setPage(1);
        }}
      />
      <h1 className="title">
        الأصناف الجديدة
      </h1>
      {!loading && items.length === 0 ? (
        <EmptyState
          title="لا توجد عناصر"
          message="لم يتم العثور على عناصر جديدة."
        />
      ) : (
        <ItemsPage title="العناصر الجديدة" items={items} loading={loading} />
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

export default NewItemsPage;
