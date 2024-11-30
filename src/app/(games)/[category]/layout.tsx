import ResultsForm from "@/components/ui/results-form";
import { Category } from "@/lib/types";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: Category }>;
}) {
  const { category } = await params;

  return (
    <div className="mt-8 space-y-16">
      <ResultsForm category={category} />
      {children}
    </div>
  );
}
