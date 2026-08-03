import { NavLink, useNavigate } from "react-router";
import { dishes } from "../data/dishes.js";
import { useCart } from "../context/CartContext.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

export default function Cart() {
    const { items, itemCount, removeItem, setQuantity, clearCart, checkout } = useCart();
    const navigate = useNavigate();
    const cartDishes = dishes.filter((dish) => items[dish.slug]);

    return (
        <main className="cart-page">
            <Breadcrumbs items={[
                { label: "Home", to: "/" },
                { label: "Cart" },
            ]} />
            <header className="cart-header">
                <div>
                    <p>Your collection</p>
                    <h1>Cart</h1>
                    <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
                </div>
                {cartDishes.length > 0 && (
                    <button type="button" className="clear-cart-button" onClick={clearCart}>
                        Clear cart
                    </button>
                )}
            </header>

            {cartDishes.length === 0 ? (
                <section className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add dishes from a game gallery or food detail page.</p>
                    <NavLink to="/" className="browse-button">Browse games</NavLink>
                </section>
            ) : (
                <>
                    <section className="cart-list" aria-label="Cart items">
                        {cartDishes.map((dish) => (
                            <article className="cart-item" key={dish.slug}>
                                <NavLink to={`/games/${dish.gameSlug}/foods/${dish.slug}`}>
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className={dish.gameSlug === "minecraft" ? "pixel-art" : undefined}
                                    />
                                </NavLink>
                                <div className="cart-item-info">
                                    <small>{dish.game}</small>
                                    <NavLink to={`/games/${dish.gameSlug}/foods/${dish.slug}`}>
                                        <h2>{dish.name}</h2>
                                    </NavLink>
                                    <p>{dish.description}</p>
                                </div>
                                <label className="quantity-control">
                                    <span>Quantity</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={items[dish.slug]}
                                        onChange={(event) => {
                                            const quantity = Number(event.target.value);
                                            if (Number.isInteger(quantity) && quantity >= 1) {
                                                setQuantity(dish.slug, quantity);
                                            }
                                        }}
                                    />
                                </label>
                                <button type="button" className="remove-cart-button" onClick={() => removeItem(dish.slug)}>
                                    Remove
                                </button>
                            </article>
                        ))}
                    </section>
                    <section className="cart-checkout" aria-labelledby="checkout-heading">
                        <div>
                            <h2 id="checkout-heading">Ready to cook?</h2>
                            <p>Turn these dishes into a persistent grocery checklist and expanded recipe plan.</p>
                        </div>
                        <button
                            type="button"
                            className="checkout-button"
                            onClick={() => {
                                if (checkout()) navigate("/shopping-list");
                            }}
                        >
                            Checkout
                        </button>
                    </section>
                </>
            )}
        </main>
    );
}
