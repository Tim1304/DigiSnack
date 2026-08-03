import { NavLink } from "react-router";
import { dishes } from "../data/dishes.js";
import DishTags from "./DishTags.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

export default function AllDishes() {
    return (
        <main className="all-dishes-page">
            <Breadcrumbs items={[
                { label: "Home", to: "/" },
                { label: "All dishes" },
            ]} />
            <header className="page-heading">
                <p>Complete collection</p>
                <h1>All dishes</h1>
                <span>{dishes.length} dishes across 3 games</span>
            </header>

            <div className="dish-table-wrap">
                <table className="dish-table">
                    <thead>
                        <tr>
                            <th scope="col">Dish</th>
                            <th scope="col">Game</th>
                            <th scope="col">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDishes.map((dish) => (
                            <tr key={`${dish.gameSlug}-${dish.slug}`}>
                                <td>
                                    <NavLink className="table-dish-link" to={`/games/${dish.gameSlug}/foods/${dish.slug}`}>
                                        <img
                                            src={dish.image}
                                            alt=""
                                            className={dish.gameSlug === "minecraft" ? "pixel-art" : undefined}
                                        />
                                        <span>{dish.name}</span>
                                    </NavLink>
                                </td>
                                <td className="table-game">{dish.game}</td>
                                <td><DishTags tags={dish.tags} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
