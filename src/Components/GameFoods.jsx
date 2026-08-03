import { Card } from "react-bootstrap";
import { NavLink, useParams } from "react-router";
import { dishes } from "../data/dishes.js";
import { useCart } from "../context/CartContext.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const gameTitles = {
    valheim: "Valheim",
    minecraft: "Minecraft",
    "fallout-76": "Fallout 76",
};

export default function GameFoods() {
    const { gameSlug } = useParams();
    const gameTitle = gameTitles[gameSlug];
    const gameDishes = dishes.filter((dish) => dish.gameSlug === gameSlug);
    const { addItem, items } = useCart();

    if (!gameTitle) {
        return (
            <main className="game-foods-page details-empty">
                <Breadcrumbs items={[
                    { label: "Home", to: "/" },
                    { label: "Game not found" },
                ]} />
                <h1>Game not found</h1>
            </main>
        );
    }

    return (
        <main className="game-foods-page">
            <Breadcrumbs items={[
                { label: "Home", to: "/" },
                { label: gameTitle },
            ]} />
            <header className="game-foods-header">
                <p>Food collection</p>
                <h1>{gameTitle}</h1>
                <span>{gameDishes.length} dishes</span>
            </header>
            <section className="food-card-grid" aria-label={`${gameTitle} dishes`}>
                {gameDishes.map((dish) => (
                    <Card className="food-card" key={dish.slug}>
                        <NavLink
                            to={`/games/${gameSlug}/foods/${dish.slug}`}
                            className="food-card-link"
                            aria-label={`View ${dish.name}`}
                        >
                            <div className="food-card-image-wrap">
                                <Card.Img
                                    variant="top"
                                    src={dish.image}
                                    alt={dish.name}
                                    className={dish.gameSlug === "minecraft" ? "pixel-art" : undefined}
                                />
                            </div>
                        </NavLink>
                        <Card.Body>
                            <NavLink to={`/games/${gameSlug}/foods/${dish.slug}`} className="food-card-title-link">
                                <Card.Title as="h2">{dish.name}</Card.Title>
                            </NavLink>
                            <Card.Text>{dish.description}</Card.Text>
                            <button type="button" className="add-cart-button" onClick={() => addItem(dish.slug)}>
                                {items[dish.slug] ? `Add another (${items[dish.slug]})` : "Add to cart"}
                            </button>
                        </Card.Body>
                    </Card>
                ))}
            </section>
        </main>
    );
}
