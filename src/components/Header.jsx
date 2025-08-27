import logo from "../assets/logo.webp";
import "../styles/Header.css"

export default function Header({ score, highScore }) {
    return (
        <header>
            <img src={logo} alt="elden ring" />
            <div className="score">
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
            </div>
        </header>
    );
}