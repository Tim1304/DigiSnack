import { NavLink, useParams } from "react-router";

const gameTitles = {
    "valheim": "Valheim",
    "red-dead-redemption-2": "Red Dead Redemption 2",
    "fallout-76": "Fallout 76",
};

export default function FoodDetails() {
    const { gameSlug } = useParams();
    const title = gameTitles[gameSlug] ?? "Game not found";

    return (
        <main className="details-page">
            <h1>{title}</h1>
            <NavLink to="/" className="back-link">Back to games</NavLink>
        </main>
    );
}
