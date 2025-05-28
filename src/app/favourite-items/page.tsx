'use client';

import { useFavouriteItems } from '@/Hooks';
import { ItemsPage, Searchbar } from '@/Components/Layout';
import { EmptyState, Pagination } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/Loading';
import { Trash2 } from 'lucide-react';


const FavouriteItemsPage = () => {
  const {
    items,
    loading,
    error,
    query,
    setQuery,
    page,
    setPage,
    total,
    clearFavourites,
  } = useFavouriteItems();

  if (error) {
    return <EmptyState title="حدث خطأ" message={error} />;
  }

  const showEmpty = !loading && items.length === 0 && !query;
  const showNoResults = !loading && items.length === 0 && query;

  return (
    <>
      <Searchbar
        onQueryChange={(val) => {
          setQuery(val);
        }}
      />
      {total > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <button
            onClick={clearFavourites}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: '0.2s',
              color: "#A01515"
            }}
            title="تفريغ المفضلة"
          >
            <Trash2 size={24} />
          </button>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : showNoResults ? (
        <EmptyState
          title="لا توجد نتائج"
          message={`لا يوجد نتائج تطابق "${query}" ضمن المفضلة.`}
        />
      ) : showEmpty ? (
        <EmptyState
          title="قائمة المفضلة فارغة"
          message="لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد."
        />
      ) : (
        <ItemsPage
          title="المنتجات المفضلة"
          items={items}
          loading={false}
        />
      )}

      {total > 0 && (
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

export default FavouriteItemsPage;
