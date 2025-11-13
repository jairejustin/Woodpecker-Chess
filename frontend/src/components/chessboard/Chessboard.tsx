import { Chessboard } from "react-chessboard";
import type { PieceDropHandlerArgs } from "../../types";
import { RotateCcw, Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";
import "./Chessboard.css";

interface ChessBoardProps {
  key: string;
  position: string | { [square: string]: { pieceType: string } };
  onPieceDrop: (args: PieceDropHandlerArgs) => boolean;
  boardOrientation?: "white" | "black";
  onReset?: () => void;
  onHint?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showAnimations?: boolean;
  isSolved?: boolean;
}

export function ChessBoard({
  position,
  onPieceDrop,
  boardOrientation = "white",
  onReset,
  onHint,
  onNext,
  onPrevious,
  showAnimations,
  isSolved,
}: ChessBoardProps) {
  return (
    <div className="chessboard">
      <div className="chessboard__board">
        <Chessboard
          options={{
            position,
            boardOrientation,
            onPieceDrop,
            showAnimations,
          }}
        />
      </div>

      <div className="chessboard__controls">
        <button
          className="chessboard__btn chessboard__btn--basic"
          onClick={onPrevious}
          title="Previous Puzzle"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="chessboard__btn chessboard__btn--basic"
          onClick={onReset}
          title="Reset Puzzle"
        >
          <RotateCcw size={20} />
        </button>

        <button
          className="chessboard__btn chessboard__btn--hint"
          onClick={onHint}
          title="Get Hint"
        >
          <Lightbulb size={20} />
        </button>

        <button
          className="chessboard__btn chessboard__btn--basic"
          disabled={!isSolved}
          onClick={onNext}
          title="Next Puzzle"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
