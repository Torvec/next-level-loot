export default function ResultsList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
