import { useMemo } from "react";
import { NavLink } from "react-router";
import { dishes } from "../data/dishes.js";
import { getDetailedRecipeSteps, getRecipeIngredients, groceryKey } from "../data/recipeDetails.js";
import { useCart } from "../context/CartContext.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

export default function ShoppingList() {
    const { shoppingList, toggleGrocery } = useCart();
    const plannedDishes = useMemo(
        () => dishes.filter((dish) => shoppingList?.items[dish.slug]),
        [shoppingList],
    );
    const groceries = useMemo(() => {
        const groceryMap = new Map();

        plannedDishes.forEach((dish) => {
            getRecipeIngredients(dish).forEach((name) => {
                const key = groceryKey(name);
                const grocery = groceryMap.get(key) ?? { key, name, dishes: [] };
                grocery.dishes.push({
                    name: dish.name,
                    quantity: shoppingList.items[dish.slug],
                });
                groceryMap.set(key, grocery);
            });
        });

        return [...groceryMap.values()].sort((left, right) => left.name.localeCompare(right.name));
    }, [plannedDishes, shoppingList]);

    const checkedCount = groceries.filter((grocery) => shoppingList?.checked[grocery.key]).length;
    const progress = groceries.length === 0 ? 0 : Math.round((checkedCount / groceries.length) * 100);

    return (
        <main className="shopping-list-page">
            <Breadcrumbs items={[
                { label: "Home", to: "/" },
                { label: "Shopping list" },
            ]} />
            <header className="shopping-list-header">
                <p>Checkout plan</p>
                <h1>Shopping list</h1>
                <span>Your checked groceries are saved automatically on this device.</span>
            </header>

            {!shoppingList || plannedDishes.length === 0 ? (
                <section className="empty-shopping-list">
                    <h2>No shopping list yet</h2>
                    <p>Add dishes to your cart and press Checkout to build your grocery plan.</p>
                    <NavLink to="/cart" className="browse-button">Go to cart</NavLink>
                </section>
            ) : (
                <>
                    <section className="grocery-checklist" aria-labelledby="grocery-heading">
                        <div className="grocery-checklist-heading">
                            <div>
                                <p>Start here</p>
                                <h2 id="grocery-heading">Groceries</h2>
                            </div>
                            <span>{groceries.length} {groceries.length === 1 ? "ingredient" : "ingredients"}</span>
                        </div>
                        <div className="grocery-checklist-grid">
                            {groceries.map((grocery) => {
                                const isChecked = Boolean(shoppingList.checked[grocery.key]);
                                const usedBy = grocery.dishes
                                    .map((dish) => `${dish.name}${dish.quantity > 1 ? ` ×${dish.quantity}` : ""}`)
                                    .join(", ");

                                return (
                                    <label
                                        className={`grocery-check${isChecked ? " checked" : ""}`}
                                        key={grocery.key}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleGrocery(grocery.key)}
                                        />
                                        <span>
                                            <strong>{grocery.name}</strong>
                                            <small>For {usedBy}</small>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </section>

                    <section className="grocery-progress" aria-labelledby="progress-heading">
                        <div>
                            <h2 id="progress-heading">Purchased groceries</h2>
                            <strong>{checkedCount} of {groceries.length}</strong>
                        </div>
                        <div
                            className="grocery-progress-track"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={progress}
                            aria-label={`${progress}% of groceries purchased`}
                        >
                            <span style={{ width: `${progress}%` }} />
                        </div>
                        <p>{progress}% complete</p>
                    </section>

                    <section className="shopping-recipes" aria-labelledby="recipe-plan-heading">
                        <header>
                            <p>Cooking plan</p>
                            <h2 id="recipe-plan-heading">Your detailed recipes</h2>
                            <span>{plannedDishes.length} {plannedDishes.length === 1 ? "dish" : "dishes"} from checkout</span>
                        </header>
                        <div className="shopping-recipe-list">
                            {plannedDishes.map((dish) => (
                                <article className="shopping-recipe-card" key={dish.slug}>
                                    <div className="shopping-recipe-image-wrap">
                                        <img
                                            src={dish.image}
                                            alt={dish.name}
                                            className={dish.gameSlug === "minecraft" ? "pixel-art" : undefined}
                                        />
                                    </div>
                                    <div className="shopping-recipe-content">
                                        <div className="shopping-recipe-title-row">
                                            <div>
                                                <p>{dish.game}</p>
                                                <h3>{dish.name}</h3>
                                            </div>
                                            {shoppingList.items[dish.slug] > 1 && (
                                                <span>Make ×{shoppingList.items[dish.slug]}</span>
                                            )}
                                        </div>
                                        <p className="shopping-recipe-description">{dish.description}</p>
                                        <div className="shopping-recipe-details">
                                            <section>
                                                <h4>Ingredients</h4>
                                                <ul>
                                                    {getRecipeIngredients(dish).map((ingredient) => (
                                                        <li key={ingredient}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </section>
                                            <section>
                                                <h4>Detailed method</h4>
                                                <ol>
                                                    {getDetailedRecipeSteps(dish).map((step, index) => (
                                                        <li key={`${dish.slug}-step-${index}`}>{step}</li>
                                                    ))}
                                                </ol>
                                            </section>
                                        </div>
                                        <NavLink
                                            to={`/games/${dish.gameSlug}/foods/${dish.slug}`}
                                            className="shopping-recipe-link"
                                        >
                                            View dish page
                                        </NavLink>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}
