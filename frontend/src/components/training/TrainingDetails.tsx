import './TrainingDetails.css'
import { ArrowLeft } from "lucide-react";

interface TrainingDetailsProps {
  playlistName: string;
  puzzleNumber: number;
  totalPuzzles: number;
  rating: number;
  feedback: string;
  isSolved: boolean;
  onBack: () => void;
}

export default function TrainingDetails(props: TrainingDetailsProps) {
  const { puzzleNumber, totalPuzzles, rating, feedback, isSolved, playlistName, onBack } = props;

  const progressPercentage = (puzzleNumber / totalPuzzles) * 100;

  return (
    <div className="training-details">
      <button onClick={onBack} className="training-details__back-button">
        <ArrowLeft size={30} />
      </button>
      <div className="training-header">
        <h2 className="training-details__title">{playlistName}</h2>
        <div className="training-details__puzzle-progress">
          <span className="training-details__progress-text">
            Puzzle {puzzleNumber} of {totalPuzzles}
          </span>
          <div className="training-details__progress-bar">
            <div
              className="training-details__progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="training-details__stats">
        <div className="training-details__stat-item">
          <span className="training-details__stat-value">Rating: {rating}</span>
        </div>
      </div>

      <div className={`training-details__feedback-section ${isSolved ? "training-info__feedback-section--solved" : ""}`}>
        <p className="training-details__feedback-text">{feedback}</p>
      </div>
    </div>
  );
}