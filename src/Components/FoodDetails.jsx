import { useParams } from "react-router";
import { findDish } from "../data/dishes.js";
import { useCart } from "../context/CartContext.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

export default function FoodDetails() {
    const { gameSlug, dishSlug } = useParams();
    const dish = findDish(gameSlug, dishSlug);
    const { addItem, items } = useCart();

    if (!dish) {
        return (
            <main className="details-page details-empty">
                <Breadcrumbs items={[
                    { label: "Home", to: "/" },
                    { label: "Dishes", to: `/games/${gameSlug}` },
                    { label: "Dish not found" },
                ]} />
                <h1>Dish not found</h1>
            </main>
        );
    }

    return (
        <main className="details-page">
            <Breadcrumbs items={[
                { label: "Home", to: "/" },
                { label: dish.game, to: `/games/${gameSlug}` },
                { label: dish.name },
            ]} />
            <article className="dish-details-card">
                <img
                    className={`dish-details-image${dish.gameSlug === "minecraft" ? " pixel-art" : ""}`}
                    src={dish.image}
                    alt={dish.name}
                />
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
                    <button type="button" className="add-cart-button details-cart-button" onClick={() => addItem(dish.slug)}>
                        {items[dish.slug] ? `Add another (${items[dish.slug]} in cart)` : "Add to cart"}
                    </button>
                    <a href={dish.source} target="_blank" rel="noreferrer" className="source-link">
                        View source wiki
                    </a>
                </div>
            </article>
        </main>
    );
}
