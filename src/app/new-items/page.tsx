'use client';

import { Item } from '@/types/apiTypes';
import { useEffect, useState, useRef } from 'react';
import { ItemsPage, Searchbar } from '@/Components/Layout';
import Pagination from '@/Components/UI/Pagination/Pagination';
import useItemLogic from '@/Hooks/useItemLogic';

const NewItemsPage = () => {
  const statusId = '3';
  const pageSize = 30;

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
const [filtered, setFiltered] = useState<Item[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, loading: dataLoading } = useItemLogic({ statusId, pageSize, query, page });

  useEffect(() => {
    if (!query) setFiltered(data);
  }, [data, query]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLocalLoading(true);

    debounceRef.current = setTimeout(() => {
      const term = query.trim().toLowerCase();
      if (!term) {
        setFiltered(data);
      } else {
        const results = data.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            item.itemNo.includes(term)
        );
        setFiltered(results);
      }
      setLocalLoading(false);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, data]);

  const showLoading = dataLoading || localLoading;

  return (
    <>
      <Searchbar onQueryChange={(val) => {
        setQuery(val);
        setPage(1);
      }} />

      <ItemsPage title="العناصر الجديدة" items={filtered} loading={showLoading} />

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

export default NewItemsPage;
