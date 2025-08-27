import { useState } from "react";
import characters from "./characters";
import Card from "./components/Card";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import "./App.css";

const characterIds = characters.map((c) => c.id);

function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomCardIds(cardIds, unmatchedIds, numOfCards) {
    if (unmatchedIds.length === 0 || cardIds.length === 0) return [];
    // unmatched ids are the cards that are still not clicked
    // there should be at least one card from the unmatched ids
    const ids = new Set();
    const guaranteedId =
        unmatchedIds[Math.floor(Math.random() * unmatchedIds.length)];
    ids.add(guaranteedId);

    while (ids.size < numOfCards) {
        const randomId = cardIds[Math.floor(Math.random() * cardIds.length)];

        if (!ids.has(randomId)) {
            ids.add(randomId);
        }
    }

    return shuffle([...ids]);
}

export default function App() {
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [unmatchedIds, setUnmatchedIds] = useState(characterIds);
    const [difficulty, setDifficulty] = useState('easy');
    
    const getDifficultyCards = (difficulty) => {
        switch(difficulty) {
            case 'easy': return 3;
            case 'medium': return 5;
            case 'hard': return 7;
            default: return 3;
        }
    };
    
    const numOfCards = getDifficultyCards(difficulty);
    const randomCardsIds = getRandomCardIds(
        characterIds,
        unmatchedIds,
        numOfCards
    );

    function handleCardClick(cardId) {
        if (unmatchedIds.includes(cardId)) {
            setUnmatchedIds(unmatchedIds.filter((id) => id !== cardId));
            setScore(score + 1);
            // if all cards are clicked when perfect score
            if ((score + 1) === characterIds.length) {
                const newScore = score + 1;
                const isNewHigh = newScore > highScore;
                setHighScore(Math.max(highScore, newScore));
                setIsNewHighScore(isNewHigh);
                setIsGameOver(true);
            }
        } else {
            const isNewHigh = score > highScore;
            setHighScore(Math.max(highScore, score));
            setIsNewHighScore(isNewHigh);
            setIsGameOver(true);
        }
    }

    function handlePlayAgain() {
        setIsGameOver(false);
        setScore(0);
        setIsNewHighScore(false);
        setUnmatchedIds(characterIds);
    }

    function handleDifficultyChange(newDifficulty) {
        setDifficulty(newDifficulty);
        // Reset game when difficulty changes
        setIsGameOver(false);
        setScore(0);
        setIsNewHighScore(false);
        setUnmatchedIds(characterIds);
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
                    onPlayAgain={handlePlayAgain} 
                    isPerfect={score === characterIds.length}
                    isNewHighScore={isNewHighScore}
                />
            ) : (
                <div className="card-container">
                    {randomCardsIds.map((id) => {
                        const card = characters.find((c) => c.id === id);
                        return (
                            <Card
                                id={id}
                                imageUrl={card.url}
                                text={card.name}
                                onClick={handleCardClick}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
