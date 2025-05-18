import { StaticImageData } from "next/image";

export type ItemCardProps = {
  imageUrl: string | StaticImageData;
  name: string;
  itemNumber: string;
  status?: 'New' | 'Focused' | 'Active' | 'InActive';
};

export type ItemsGridProps = {
  items: ItemCardProps[];
};

export type ItemsPageProps = {
  title?: string;
  items: ItemCardProps[];
};

export type ItemDetailsType = {
  id: string;
  name: string;
  itemNumber: string;
  description?: string;
  status: 'New' | 'Focused' | 'Active' | 'InActive';
  images: (string | StaticImageData)[];
  isAdmin?: boolean;
};
