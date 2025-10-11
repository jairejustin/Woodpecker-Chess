import { InfoCard } from "./components/InfoCard";
import { Sidebar } from "./components/Sidebar";
import { ChessBoard } from "./components/ChessBoard";
import { GameStatus } from "./components/GameStatus";
import { useChessGame } from "./useChessGame";
import { ControlPanel } from './components/ControlPanel';
import './App.css';

export default function App() {
  const {
    chessPosition,
    onPieceDrop,
    resetGame,
    isCheckmate,
    isGameOver,
  } = useChessGame();

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-layout">
        <div className="main-content">
          <div className="chessBoardContainer">
            <ChessBoard position={chessPosition} onPieceDrop={onPieceDrop} />
            <ControlPanel onReset={resetGame} />
            <GameStatus
              isCheckmate={isCheckmate}
              isGameOver={isGameOver}
            />
            
          </div>
        </div>
        <InfoCard />
      </div>
    </div>
  );
}
