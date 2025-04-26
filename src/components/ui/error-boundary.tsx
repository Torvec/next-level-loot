"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="space-y-16 py-32 text-center">
      <h2 className="text-3xl font-black md:text-4xl lg:text-5xl xl:text-6xl">
        Oops!
        <br /> Something went wrong.
      </h2>
      <h3 className="text-xl font-bold md:text-2xl lg:text-4xl">{error.message}</h3>
    </div>
  );
}
