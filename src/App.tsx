import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
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
      <Header />
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
        <Sidebar />
      </div>
    </div>
  );
}
