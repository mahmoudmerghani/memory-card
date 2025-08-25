let idCounter = 0;

const files = import.meta.glob("./assets/characters/*.webp", { eager: true });

const characters = Object.entries(files).map(([path, module]) => {
    const filename = path.split("/").pop().replace(".webp", "");

    const name = filename
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
        id: idCounter++,
        name,
        url: module.default,
    };
});

export default characters;
