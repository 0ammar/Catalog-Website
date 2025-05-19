import { CategoryPage } from "@/Components/Layout";

type Props = {
  params: Promise<{ path?: string[] }>;
};

const Categories = async ({ params }: Props) => {
  const { path = [] } = await params;
  return <CategoryPage path={path} />;
}

export default Categories