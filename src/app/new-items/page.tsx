'use client';
import { ItemsPage } from '@/Components/Layout';
import { newItems } from '@/mockData'; 

export default function NewItemsPage() {
    return <ItemsPage title="العناصر الجديدة" items={newItems} />;
}
