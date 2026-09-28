export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-56 rounded bg-gray-200" />
      </div>

      <div className="space-y-4">
        <div className="animate-pulse rounded-lg border p-6">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
          <div className="mt-4 h-5 w-24 rounded bg-gray-200" />
        </div>

        <div className="animate-pulse rounded-lg border p-6">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
          <div className="mt-4 h-5 w-24 rounded bg-gray-200" />
        </div>

        <div className="animate-pulse rounded-lg border p-6">
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
          <div className="mt-4 h-5 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}