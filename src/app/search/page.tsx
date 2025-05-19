import { Suspense } from 'react';
import SearchClient from './SearchClient';

const SearchPage = () => {
  return (
    <Suspense fallback={<div>جاري تحميل نتائج البحث...</div>}>
      <SearchClient />
    </Suspense>
  );
}

export default SearchPage