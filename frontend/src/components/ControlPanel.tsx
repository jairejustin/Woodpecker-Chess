import { RotateCcw, Lightbulb, ChevronRight } from 'lucide-react';
import './ControlPanel.css';

interface ControlPanelProps {
  onReset?: () => void;
  onHint?: () => void;
  onNext?: () => void;
}

export function ControlPanel({ onReset, onHint, onNext }: ControlPanelProps) {
  return (
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
  );
}