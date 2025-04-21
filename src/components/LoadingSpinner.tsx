import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" role="status">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}