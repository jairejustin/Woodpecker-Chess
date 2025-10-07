// GameStatus.tsx
interface GameStatusProps {
  isCheckmate: boolean;
  isGameOver: boolean;
}

export function GameStatus({ isCheckmate, isGameOver }: GameStatusProps) {
  if (!isCheckmate && !isGameOver) return null;

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      backgroundColor: isCheckmate ? '#d32f2f' : '#757575',
      color: 'white',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      {isCheckmate && 'Checkmate!'}
      {isGameOver && !isCheckmate && 'Game Over!'}
    </div>
  );
}