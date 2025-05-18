import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>جاري تحميل نتائج البحث...</div>}>
      <SearchClient />
    </Suspense>
  );
}
