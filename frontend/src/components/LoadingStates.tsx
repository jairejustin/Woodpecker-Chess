interface LoadingStateProps {
  message: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center h-screen text-gray-400">
      {message}
    </div>
  );
}

interface ErrorStateProps {
  errorMessage: string;
}

export function ErrorState({ errorMessage }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-400">
      <p className="text-xl mb-2">Error loading puzzles</p>
      <p className="text-sm">{errorMessage}</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-screen text-gray-400">
      No puzzles available
    </div>
  );
}