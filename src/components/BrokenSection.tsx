import { useState } from 'react';

/** Dev-only test component — forces an error to validate ErrorBoundary UI */
function BrokenSection() {
  const [boom, setBoom] = useState(false);

  if (boom) {
    throw new Error('Test error: ErrorBoundary triggered manually.');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="px-3 py-1.5 rounded-md text-xs font-mono border border-destructive text-destructive bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-md"
        onClick={() => setBoom(true)}
      >
        💥 Throw error
      </button>
    </div>
  );
}

export default BrokenSection;
