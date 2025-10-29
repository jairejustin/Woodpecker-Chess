import { Chessboard } from "react-chessboard";
import type { PieceDropHandlerArgs } from "../types";
import { RotateCcw, Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";
import "./ChessBoard.css";

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
}: ChessBoardProps) {
  return (
    <div style={{ maxWidth: "500px" }}>
      <Chessboard
        options={{
          position,
          boardOrientation,
          onPieceDrop,
          showAnimations
        }}
      />

      <div className="control-panel">
        <button
          className="control-btn basic"
          onClick={onPrevious}
          title="Previous Puzzle"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="control-btn basic"
          onClick={onReset}
          title="Reset Puzzle"
        >
          <RotateCcw size={20} />
        </button>
        <button
          className="control-btn hint"
          onClick={onHint}
          title="Get Hint"
        >
          <Lightbulb size={20} />
        </button>
        <button
          className="control-btn basic"
          onClick={onNext}
          title="Next Puzzle"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
