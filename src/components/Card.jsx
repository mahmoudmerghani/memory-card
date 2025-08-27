import "../styles/Card.css";
import backfaceImage from "../assets/backface.jpg";

export default function Card({ id, imageUrl, text, isFlipped, onClick }) {
    return (
        <button onClick={() => onClick(id)} className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-inner">
                <div className="card-front">
                    <div className="image">
                        <img src={imageUrl} alt={text} />
                    </div>
                    <div className="text">
                        <h2>{text}</h2>
                    </div>
                </div>
                <div className="card-back">
                    <div className="image">
                        <img src={backfaceImage} alt="Card back" />
                    </div>
                </div>
            </div>
        </button>
    );
}
