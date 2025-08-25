import "../styles/Card.css"

export default function Card({ imageUrl, text, onClick }) {
    return (
        <button onClick={onClick}>
            <div className="card">
                <img src={imageUrl} alt={text} />
                <h2>{text}</h2>
            </div>
        </button>
    );
}