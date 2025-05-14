import { ItemCardProps } from '@/types';
import { Logo } from './assets/images/';

export const newItems: ItemCardProps[] = Array.from({ length: 20 }, (_, i) => ({
  imageUrl: Logo,
  name: `صنف جديد ${i + 1}`,
  itemNumber: `${i + 2003800248034}`,
  status: 'New',
}));

export const focusedItems: ItemCardProps[] = Array.from({ length: 20 }, (_, i) => ({
  imageUrl: Logo,
  name: `صنف جديد ${i + 1}`,
  itemNumber: `${i + 2003800248034}`,
  status: 'New',
}));