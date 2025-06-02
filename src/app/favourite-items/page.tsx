'use client';

import { useState } from 'react';
import { useFavouriteItems } from '@/Hooks';
import { ItemsPage, Searchbar } from '@/Components/Layout';
import { EmptyState, Pagination } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/Loading';
import Modal from '@/Components/UI/Modal/Modal';
import { Trash2 } from 'lucide-react';
import '@/styles/globals.scss';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '12px 0' }}>
          <h1 className="title">قائمة المفضلة</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: '0.2s',
              color: '#A01515',
              alignSelf: 'flex-start'
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

      <Modal
        isOpen={isModalOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد أنك تريد تفريغ قائمة المفضلة بالكامل؟"
        onConfirm={() => {
          clearFavourites();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FavouriteItemsPage;
