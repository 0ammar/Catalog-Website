'use client';
import { ItemsPage } from '@/Components/Layout';
import { focusedItems } from '@/mockData'; 

export default function FocusedItems() {
    return <ItemsPage title="العناصر المميزة" items={focusedItems} />;
}