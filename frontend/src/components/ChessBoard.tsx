import { Chessboard } from "react-chessboard";
import type { PieceDropHandlerArgs } from "../types";
import { RotateCcw, Lightbulb, ChevronRight } from "lucide-react";
import "./ChessBoard.css";
import { useState } from "react";

interface ChessBoardProps {
  key: string;
  position: string | { [square: string]: { pieceType: string } };
  onPieceDrop: (args: PieceDropHandlerArgs) => boolean;
  boardOrientation?: "white" | "black";
  onReset?: () => void;
  onHint?: () => void;
  onNext?: () => void;
  showAnimations?: boolean;
}

export function ChessBoard({
  position,
  onPieceDrop,
  boardOrientation = "white",
  onReset,
  onHint,
  onNext,
  showAnimations,
}: ChessBoardProps) {
  return (
    <div style={{ maxWidth: "450px" }}>
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
          className="control-btn reset"
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
          className="control-btn next"
          onClick={onNext}
          title="Next Puzzle"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
