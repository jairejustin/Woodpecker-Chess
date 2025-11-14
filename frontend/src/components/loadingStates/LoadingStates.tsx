interface LoadingStateProps {
  message: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="loading-state loading-state--loading">
      <p className="loading-state__message">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  errorMessage: string;
}

export function ErrorState({ errorMessage }: ErrorStateProps) {
  return (
    <div className="loading-state loading-state--error">
      <p className="loading-state__title">Error loading puzzles</p>
      <p className="loading-state__message">{errorMessage}</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="loading-state loading-state--empty">
      <p className="loading-state__message">No puzzles available</p>
    </div>
  );
}
