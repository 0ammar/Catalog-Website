import { CategoryPage } from '@/Components/Layout';

export default async function Categories({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  return <CategoryPage path={path} />;
}
