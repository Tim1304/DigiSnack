import { Card } from "react-bootstrap";
import { NavLink, useParams } from "react-router";
import { dishes } from "../data/dishes.js";
import { useCart } from "../context/CartContext.jsx";

const gameTitles = {
    valheim: "Valheim",
    "red-dead-redemption-2": "Red Dead Redemption 2",
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
                <h1>Game not found</h1>
                <NavLink to="/" className="back-link">Back to games</NavLink>
            </main>
        );
    }

    return (
        <main className="game-foods-page">
            <NavLink to="/" className="back-link">&larr; Back to games</NavLink>
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
                                <Card.Img variant="top" src={dish.image} alt={dish.name} />
                            </div>
                        </NavLink>
                        <Card.Body>
                            <NavLink to={`/games/${gameSlug}/foods/${dish.slug}`} className="food-card-title-link">
                                <Card.Title>{dish.name}</Card.Title>
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
