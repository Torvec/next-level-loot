"use client";

import ErrorBoundary from "@/components/ui/error-boundary";

export default function Error({ error }: { error: Error }) {
  return <ErrorBoundary error={error} />;
}
