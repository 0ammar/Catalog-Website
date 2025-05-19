'use client';

import { ItemsPage } from '@/Components/Layout';
import { newItems } from '@/mockData';

const NewItemsPage = () => {
  return (
    <ItemsPage title="العناصر الجديدة" items={newItems} />
  );
};

export default NewItemsPage;
