import { useState } from "react";
import characters from "./characters";
import Card from "./components/Card";
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
    const [unmatchedIds, setUnmatchedIds] = useState(characterIds);
    const [numOfCards, setNumOfCards] = useState(4);
    const randomCardsIds = getRandomCardIds(
        characterIds,
        unmatchedIds,
        numOfCards
    );

    function handleCardClick(cardId) {
        if (unmatchedIds.includes(cardId)) {
            setUnmatchedIds(unmatchedIds.filter((id) => id !== cardId));
        } else {
            setIsGameOver(true);
        }
    }

    return (
        <div className="game">
            {isGameOver ? (
                "Game over"
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
