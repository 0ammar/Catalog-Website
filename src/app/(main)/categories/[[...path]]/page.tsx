import { CategoryPage } from "@/Components/Layout";

export default function Page({ params }: { params: { path?: string[] } }) {
  const path = params.path ?? [];
  return <CategoryPage path={path} />;
}
