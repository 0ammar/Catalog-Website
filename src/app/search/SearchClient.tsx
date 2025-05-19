'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchList } from '@/Hooks';
import { ItemsGrid, EmptyState } from '@/Components/UI';

const SearchClient = () => {

  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { results } = useSearchList(query);

  return (
    <main>
      {results.length === 0 ? (
        <EmptyState
          title="لا توجد نتائج"
          message="حاول استخدام كلمات بحث مختلفة أو تحقق من رقم الصنف."
        />
      ) : (
        <ItemsGrid items={results} />
      )}
    </main>
  );
};

export default SearchClient;
