'use client';

interface HistoryErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: HistoryErrorProps) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-6">
      <h2 className="text-xl font-semibold text-red-700">
        Error en el Historial
      </h2>

      <p className="mt-2 text-red-600">
        {error.message}
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
      >
        Reintentar
      </button>
    </div>
  );
}