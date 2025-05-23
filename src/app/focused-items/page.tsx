'use client';

import { useState } from 'react';
import { ItemsPage, Searchbar } from '@/Components/Layout';
import Pagination from '@/Components/UI/Pagination/Pagination';
import useItemLogic from '@/Hooks/useItemLogic';
import EmptyState from '@/Components/UI/EmptyState/EmptyState';

const FocusedItemsPage = () => {
  const statusId = '4';
  const pageSize = 30;

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, loading } = useItemLogic({
    statusId,
    pageSize,
    query,
    page,
  });

  return (
    <>
      <Searchbar
        onQueryChange={(val) => {
          setQuery(val);
          setPage(1);
        }}
      />

      {!loading && data.length === 0 ? (
        <EmptyState
          title="لا توجد عناصر"
          message="لم يتم العثور على عناصر مميزة."
        />
      ) : (
        <ItemsPage title="العناصر المميزة" items={data} loading={loading} />
      )}

      {!query && (
        <Pagination
          page={page}
          pageSize={pageSize}
          currentCount={data.length}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </>
  );
};

export default FocusedItemsPage;
