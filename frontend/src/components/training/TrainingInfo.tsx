import './TrainingInfo.css'
import { ArrowLeft } from "lucide-react";

interface TrainingInfoProps {
  playlistName: string;
  puzzleNumber: number;
  totalPuzzles: number;
  rating: number;
  feedback: string;
  isSolved: boolean;
  onBack: () => void;
}

export default function TrainingInfo(props: TrainingInfoProps) {
  const { puzzleNumber, totalPuzzles, rating, feedback, isSolved, playlistName, onBack } = props;

  const progressPercentage = (puzzleNumber / totalPuzzles) * 100;

  return (
    <div className="training-info">
      <button onClick={onBack} className="training-info__back-button">
        <ArrowLeft size={30} />
      </button>
      <div className="training-header">
        <h2 className="training-info__title">{playlistName}</h2>
        <div className="training-info__puzzle-progress">
          <span className="training-info__progress-text">
            Puzzle {puzzleNumber} of {totalPuzzles}
          </span>
          <div className="training-info__progress-bar">
            <div
              className="training-info__progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="training-info__stats">
        <div className="training-info__stat-item">
          <span className="training-info__stat-value">Rating: {rating}</span>
        </div>
      </div>

      <div className={`training-info__feedback-section ${isSolved ? "training-info__feedback-section--solved" : ""}`}>
        <p className="training-info__feedback-text">{feedback}</p>
      </div>
    </div>
  );
}