export default function ResultsList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-32 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}
