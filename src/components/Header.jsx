import logo from "../assets/logo.webp";
import "../styles/Header.css"

export default function Header({ score, highScore, difficulty, onDifficultyChange }) {
    return (
        <header>
            <img src={logo} alt="elden ring" />
            <div className="difficulty-selector">
                <label htmlFor="difficulty">Difficulty:</label>
                <select 
                    id="difficulty" 
                    value={difficulty} 
                    onChange={(e) => onDifficultyChange(e.target.value)}
                >
                    <option value="easy">Easy (3 cards)</option>
                    <option value="medium">Medium (5 cards)</option>
                    <option value="hard">Hard (7 cards)</option>
                </select>
            </div>
            <div className="score">
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
            </div>
        </header>
    );
}