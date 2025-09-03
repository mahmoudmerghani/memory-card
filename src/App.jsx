import { useState } from "react";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import Game from "./components/Game";
import characters from "./characters"
import "./App.css";

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");

    function reset() {
        setIsGameOver(false);
        setScore(0);
        setIsNewHighScore(false);
    }

    function handleCorrectPick() {
        const newScore = score + 1;
        setScore(newScore);

        // if all cards are clicked then it is a perfect score
        if (newScore === characters.length) {
            setHighScore(newScore);
            setIsGameOver(true);
            return;
        }
    }

    function handleWrongPick() {
        const isNewHigh = score > highScore;
        setHighScore(Math.max(highScore, score));
        setIsNewHighScore(isNewHigh);
        setIsGameOver(true);
    }

    function handleDifficultyChange(newDifficulty) {
        setDifficulty(newDifficulty);
        reset();
    }

    return (
        <div className="game">
            <Header
                score={score}
                highScore={highScore}
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
            />
            {isGameOver ? (
                <GameOver
                    onPlayAgain={reset}
                    isPerfect={score === characters.length}
                    isNewHighScore={isNewHighScore}
                />
            ) : (
                <Game
                    // changing difficult should reset the game
                    key={difficulty}
                    difficulty={difficulty}
                    onCorrectPick={handleCorrectPick}
                    onWrongPick={handleWrongPick}
                />
            )}
        </div>
    );
}
