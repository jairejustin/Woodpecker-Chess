// GameStatus.tsx
interface GameStatusProps {
  isCheck: boolean;
  isCheckmate: boolean;
  isGameOver: boolean;
}

export function GameStatus({ isCheck, isCheckmate, isGameOver }: GameStatusProps) {
  if (!isCheck && !isCheckmate && !isGameOver) return null;

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      backgroundColor: isCheckmate ? '#d32f2f' : isCheck ? '#f57c00' : '#757575',
      color: 'white',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      {isCheckmate && 'Checkmate!'}
      {isCheck && !isCheckmate && 'Check!'}
      {isGameOver && !isCheckmate && 'Game Over!'}
    </div>
  );
}