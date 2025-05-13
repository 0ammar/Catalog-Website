import { CategoryPage } from "@/Components/Layout";

type Props = {
  params: Promise<{ path?: string[] }>;
};

export default async function Page({ params }: Props) {
  const { path = [] } = await params;
  return <CategoryPage path={path} />;
}
