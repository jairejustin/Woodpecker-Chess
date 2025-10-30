import "./TrainingInfo.css";
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
      <button onClick={onBack} className="back-button">
        <ArrowLeft size={30} />
      </button>
      <div className="training-header">
        <h2 className="training-title">{playlistName}</h2>
        <div className="puzzle-progress">
          <span className="progress-text">
            Puzzle {puzzleNumber} of {totalPuzzles}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="training-stats">
        <div className="stat-item">
          <span className="stat-value">Rating: {rating}</span>
        </div>
      </div>

      <div className={`feedback-section ${isSolved ? "solved" : ""}`}>
        <p className="feedback-text">{feedback}</p>
      </div>
    </div>
  );
}