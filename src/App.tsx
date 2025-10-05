// App.tsx
import { useChessGame } from './useChessGame';
import { ChessBoard } from './components/ChessBoard';
import { GameStatus } from './components/GameStatus';
import { ResetButton } from './components/ResetButton';
import './App.css';

export default function App() {
  const { 
    chessPosition, 
    onPieceDrop, 
    resetGame, 
    isCheck, 
    isCheckmate, 
    isGameOver 
  } = useChessGame();

  return (
    <div className='chessContainer'>
      <ChessBoard position={chessPosition} onPieceDrop={onPieceDrop} />
      <GameStatus 
        isCheck={isCheck} 
        isCheckmate={isCheckmate} 
        isGameOver={isGameOver} 
      />
      <ResetButton onReset={resetGame} />
    </div>
  );
}