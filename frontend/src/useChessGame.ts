// useChessGame.ts
import { useState, useRef } from 'react';
import { Chess } from 'chess.js';
import type { PieceDropHandlerArgs } from './types';

export function useChessGame() {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  const onPieceDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean => {
    if (!targetSquare) {
      return false;
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });
      setChessPosition(chessGame.fen());
      return true;
    } catch {
      return false;
    }
  };

  const resetGame = () => {
    chessGame.reset();
    setChessPosition(chessGame.fen());
  };

  return {
    chessPosition,
    onPieceDrop,
    resetGame,
    isGameOver: chessGame.isGameOver(),
    isCheckmate: chessGame.isCheckmate(),
    isCheck: chessGame.isCheck()
  };
}