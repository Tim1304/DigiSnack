import { useState } from "react";
import { NavLink } from "react-router";
import { dishes } from "../data/dishes.js";
import DishTags from "./DishTags.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

function randomIndex(excludingIndex = -1) {
    if (dishes.length < 2) return 0;

    const index = Math.floor(Math.random() * (dishes.length - 1));
    return index >= excludingIndex ? index + 1 : index;
}

export default function LuckyDish() {
    const [dishIndex, setDishIndex] = useState(() => Math.floor(Math.random() * dishes.length));
    const dish = dishes[dishIndex];

    return (
        <main className="lucky-page">
            <Breadcrumbs items={[
                { label: "Home", to: "/" },
                { label: "Random Dish" },
            ]} />
            <header className="page-heading lucky-heading">
                <p>Chef's choice</p>
                <h1>Random Dish</h1>
                <span>Let fate pick something delicious from the game kitchen.</span>
            </header>

            <article className="lucky-dish-card">
                <div className="lucky-image-wrap">
                    <span className="featured-badge">Featured dish</span>
                    <img
                        src={dish.image}
                        alt={dish.name}
                        className={dish.gameSlug === "minecraft" ? "pixel-art" : undefined}
                    />
                </div>
                <div className="lucky-dish-content">
                    <p className="dish-game">{dish.game}</p>
                    <h2>{dish.name}</h2>
                    <DishTags tags={dish.tags} />
                    <p>{dish.description}</p>
                    <div className="lucky-actions">
                        <NavLink className="add-cart-button" to={`/games/${dish.gameSlug}/foods/${dish.slug}`}>
                            View dish
                        </NavLink>
                        <button type="button" className="lucky-again-button" onClick={() => setDishIndex(randomIndex(dishIndex))}>
                            Surprise me again
                        </button>
                    </div>
                </div>
            </article>
        </main>
    );
}
