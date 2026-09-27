"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-red-50 text-red-900 p-10">
      <h2 className="text-2xl font-bold mb-4">Sistem Xətası Baş Verdi!</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200 mb-6 w-full max-w-2xl overflow-auto text-sm">
        <p className="font-mono text-red-600">{error.message}</p>
        <p className="font-mono text-red-400 mt-2 whitespace-pre-wrap">{error.stack}</p>
      </div>
      <button
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold"
        onClick={() => reset()}
      >
        Yenidən Sınayın
      </button>
    </div>
  );
}
