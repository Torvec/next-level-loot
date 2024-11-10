export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto flex-grow px-4 leading-relaxed xl:px-0">
      {children}
    </main>
  );
}
