import { useMemo, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { NavLink } from "react-router";
import { dishes } from "../data/dishes.js";
import valheimImage from "../assets/GameCards/valheim.png";
import rdr2Image from "../assets/GameCards/rdr2.png";
import fallout76Image from "../assets/GameCards/fo76.png";

const games = [
    { title: "Valheim", slug: "valheim", image: valheimImage },
    { title: "Red Dead Redemption 2", slug: "red-dead-redemption-2", image: rdr2Image },
    { title: "Fallout 76", slug: "fallout-76", image: fallout76Image },
];

export default function Home() {
    const [search, setSearch] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const suggestions = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();
        if (!query) return [];

        return dishes
            .filter((dish) =>
                `${dish.name} ${dish.game}`.toLocaleLowerCase().includes(query),
            )
            .slice(0, 8);
    }, [search]);

    const showSuggestions = hasFocus && search.trim().length > 0;

    return (
        <main className="home-page">
            <div id="search" className="search-container">
                <Form.Control
                    className="search-input"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    role="combobox"
                    aria-label="Search dishes"
                    aria-autocomplete="list"
                    aria-controls="dish-suggestions"
                    aria-expanded={showSuggestions}
                />
                {showSuggestions && (
                    <div
                        id="dish-suggestions"
                        className="search-suggestions"
                        role="listbox"
                    >
                        {suggestions.length > 0 ? (
                            suggestions.map((dish) => (
                                <NavLink
                                    key={`${dish.gameSlug}-${dish.slug}`}
                                    to={`/games/${dish.gameSlug}/foods/${dish.slug}`}
                                    className="search-suggestion"
                                    role="option"
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    <img src={dish.image} alt="" />
                                    <span>
                                        <strong>{dish.name}</strong>
                                        <small>{dish.game}</small>
                                    </span>
                                </NavLink>
                            ))
                        ) : (
                            <p className="no-suggestions">No dishes found.</p>
                        )}
                    </div>
                )}
            </div>

            <section className="game-card-grid" aria-label="Games">
                {games.map((game) => (
                    <NavLink
                        key={game.slug}
                        to={`/games/${game.slug}`}
                        className="game-card-link"
                        aria-label={`View ${game.title}`}
                    >
                        <Card className="game-card">
                            <Card.Img variant="top" src={game.image} alt={game.title} />
                            <Card.Body>
                                <Card.Title>{game.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </NavLink>
                ))}
            </section>
        </main>
    );
}
