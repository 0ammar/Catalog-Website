'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchList } from '@/Hooks';
import { ItemsGrid, EmptyState } from '@/Components/UI';
import Loading from '@/Components/UI/Loading/LoadingClient';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { results, loading } = useSearchList(query);

  return (
    <main>
      {loading ? (
        <Loading />
      ) : results.length === 0 ? (
        <EmptyState
          title="لا توجد نتائج"
          message="حاول استخدام كلمات بحث مختلفة أو تحقق من رقم الصنف."
        />
      ) : (
        <ItemsGrid items={results} />
      )}
    </main>
  );
}
