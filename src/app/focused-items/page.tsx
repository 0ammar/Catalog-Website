'use client';

import { ItemsPage } from '@/Components/Layout';
import { focusedItems } from '@/mockData';

const FocusedItems = () => {
  return (
    <ItemsPage title="العناصر المميزة" items={focusedItems} />
  );
};

export default FocusedItems;
