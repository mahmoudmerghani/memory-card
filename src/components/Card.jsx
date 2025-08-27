import "../styles/Card.css";

export default function Card({ id, imageUrl, text, onClick }) {
    return (
        <button onClick={() => onClick(id)} className="card">
            <div className="image">
                <img src={imageUrl} alt={text} />
            </div>
            <div className="text">
                <h2>{text}</h2>
            </div>
        </button>
    );
}
