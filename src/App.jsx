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
    if (
        unmatchedIds.length === 0 ||
        cardIds.length === 0 ||
        numOfCards > cardIds.length
    )
        return [];
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
    const [difficulty, setDifficulty] = useState("easy");
    const [areCardsFlipped, setAreCardsFlipped] = useState(false);
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

    const getDifficultyCards = (difficulty) => {
        switch (difficulty) {
            case "easy":
                return 3;
            case "medium":
                return 5;
            case "hard":
                return 7;
            default:
                return 3;
        }
    };

    const numOfCards = getDifficultyCards(difficulty);

    const [randomCardsIds, setRandomCardsIds] = useState(
        getRandomCardIds(characterIds, unmatchedIds, numOfCards)
    );

    // the function takes the number of cards as a parameter
    // to prevent using stale values of numOfCards when changing the difficulty
    function reset(currentNumberOfCards = numOfCards) {
        setIsGameOver(false);
        setScore(0);
        setIsNewHighScore(false);
        setUnmatchedIds(characterIds);
        setRandomCardsIds(
            getRandomCardIds(characterIds, characterIds, currentNumberOfCards)
        );
        setAreCardsFlipped(false);
        setIsAnimationPlaying(false);
    }

    function handleCardClick(cardId) {
        if (isAnimationPlaying) return;

        setAreCardsFlipped(true);
        setIsAnimationPlaying(true);

        if (unmatchedIds.includes(cardId)) {
            const newUnmatchedIds = unmatchedIds.filter((id) => id !== cardId);
            setUnmatchedIds(newUnmatchedIds);
            setScore(score + 1);
            // if all cards are clicked then it is a perfect score
            if (score + 1 === characterIds.length) {
                const newScore = score + 1;
                const isNewHigh = newScore > highScore;
                setHighScore(Math.max(highScore, newScore));
                setIsNewHighScore(isNewHigh);
                setIsGameOver(true);
                return;
            }

            /*
                the timeline of the animation:
                0 -> 0.5s: card flipping and showing the backface
                0.5s -> 0.7s: card showing the backface for 0.2s
                0.7s -> 1.2s: card flipping back to show front face

                the user can only interact again after 1s
            */

            // get the next set of cards only after the first half of the animation
            // has ended to prevent the user from seeing the new cards before the animation end
            setTimeout(() => {
                setRandomCardsIds(
                    getRandomCardIds(characterIds, newUnmatchedIds, numOfCards)
                );
                setAreCardsFlipped(false);
            }, 700);

            // allow the user to click again after 1s to prevent accidental clicks during the animation
            setTimeout(() => {
                setIsAnimationPlaying(false);
            }, 1000);
        } else {
            const isNewHigh = score > highScore;
            setHighScore(Math.max(highScore, score));
            setIsNewHighScore(isNewHigh);
            setIsGameOver(true);
        }
    }

    function handleDifficultyChange(newDifficulty) {
        setDifficulty(newDifficulty);
        // Reset game when difficulty changes
        reset(getDifficultyCards(newDifficulty));
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
                    // call reset() explicity to prevent the click event (e)
                    // from being passed to reset
                    onPlayAgain={() => reset()}
                    isPerfect={score === characterIds.length}
                    isNewHighScore={isNewHighScore}
                />
            ) : (
                <div className="card-container">
                    {randomCardsIds.map((id, index) => {
                        const card = characters.find((c) => c.id === id);
                        return (
                            <Card
                                // use index as key so cards stay stable across shuffles,
                                // preventing react from remounting cards and breaking the flip animation
                                key={index}
                                id={id}
                                imageUrl={card.url}
                                text={card.name}
                                onClick={handleCardClick}
                                isFlipped={areCardsFlipped}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
