import { ChessBoard } from '../components/ChessBoard';
import { GameStatus } from '../components/GameStatus';
import { InfoCard } from '../components/InfoCard';
import { useChessGame } from '../useChessGame';

export default function PuzzleExplorerPage() {
  const {
    chessPosition,
    onPieceDrop,
    resetGame,
    isCheckmate,
    isGameOver,
  } = useChessGame();

  return (
    <div className="main-layout">
        <div className="main-content">
          <div className="chessBoardContainer">
            <ChessBoard position={chessPosition} onPieceDrop={onPieceDrop} onReset={resetGame} />
            <GameStatus
              isCheckmate={isCheckmate}
              isGameOver={isGameOver}
            />
            
          </div>
        </div>
        <InfoCard />
    </div>
  );
}