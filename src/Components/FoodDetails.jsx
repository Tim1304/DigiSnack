import { NavLink, useParams } from "react-router";
import { findDish } from "../data/dishes.js";

const gameTitles = {
    "valheim": "Valheim",
    "red-dead-redemption-2": "Red Dead Redemption 2",
    "fallout-76": "Fallout 76",
};

export default function FoodDetails() {
    const { gameSlug, dishSlug } = useParams();
    const dish = dishSlug ? findDish(gameSlug, dishSlug) : null;
    const gameTitle = gameTitles[gameSlug];

    if (dishSlug && !dish) {
        return (
            <main className="details-page details-empty">
                <h1>Dish not found</h1>
                <NavLink to="/" className="back-link">Back to search</NavLink>
            </main>
        );
    }

    if (!dish) {
        return (
            <main className="details-page details-empty">
                <h1>{gameTitle ?? "Game not found"}</h1>
                <p>Use the search on the home page to choose a dish.</p>
                <NavLink to="/" className="back-link">Back to search</NavLink>
            </main>
        );
    }

    return (
        <main className="details-page">
            <NavLink to="/" className="back-link">← Back to search</NavLink>
            <article className="dish-details-card">
                <img className="dish-details-image" src={dish.image} alt={dish.name} />
                <div className="dish-details-content">
                    <p className="dish-game">{dish.game}</p>
                    <h1>{dish.name}</h1>
                    <section>
                        <h2>Description</h2>
                        <p>{dish.description}</p>
                    </section>
                    <section>
                        <h2>Simple recipe</h2>
                        <p>{dish.recipe}</p>
                    </section>
                    <a href={dish.source} target="_blank" rel="noreferrer" className="source-link">
                        View source wiki
                    </a>
                </div>
            </article>
        </main>
    );
}
