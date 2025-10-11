import { Chessboard } from 'react-chessboard';
import type { PieceDropHandlerArgs, Square } from '../types';

interface ChessBoardProps {
  position: Square;
  onPieceDrop: (args: PieceDropHandlerArgs) => boolean;
}

export function ChessBoard({ position, onPieceDrop }: ChessBoardProps) {
  return (

      <div style={{ maxWidth: '450px' }}>
        <Chessboard 
          options={{
            position,
            onPieceDrop,
            id: 'playable-board'
          }} 
        />

      </div>
  );
}