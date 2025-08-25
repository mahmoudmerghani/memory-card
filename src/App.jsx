import characters from "./characters";
import Card from "./components/Card";

export default function App() {
    return (
        <div>
            {characters.map((c) => (
                <Card imageUrl={c.url} text={c.name}/>
            ))}
        </div>
    );
}