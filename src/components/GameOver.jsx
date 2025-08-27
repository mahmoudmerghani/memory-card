import "../styles/GameOver.css";

export default function GameOver({ isPerfect, isNewHighScore, onPlayAgain }) {
    let msg = "Game Over";
    
    if (isPerfect) {
        msg = "Perfect Score!!!";
    } else if (isNewHighScore) {
        msg = "New High Score!";
    }
    
    return (
        <div className="game-over">
            <h2>{msg}</h2>
            <button onClick={onPlayAgain}>Play Again</button>
        </div>
    );
}