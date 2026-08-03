import { useMemo, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { NavLink } from "react-router";
import { dishes, facetOptions } from "../data/dishes.js";
import CartButton from "./CartButton.jsx";
import SearchFacets from "./SearchFacets.jsx";
import valheimImage from "../assets/GameCards/valheim.png";
import minecraftImage from "../assets/GameCards/minecraft.png";
import fallout76Image from "../assets/GameCards/fo76.png";

const games = [
    { title: "Valheim", slug: "valheim", image: valheimImage },
    { title: "Minecraft", slug: "minecraft", image: minecraftImage },
    { title: "Fallout 76", slug: "fallout-76", image: fallout76Image },
];

export default function Home() {
    const [search, setSearch] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedFacets, setSelectedFacets] = useState([]);

    const filteredDishes = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();
        const dietFacets = selectedFacets.filter((facet) =>
            facetOptions.some((option) => option.id === facet && option.group === "diet"),
        );
        const mealFacets = selectedFacets.filter((facet) =>
            facetOptions.some((option) => option.id === facet && option.group === "meal"),
        );

        return dishes
            .filter((dish) => !query ||
                `${dish.name} ${dish.game}`.toLocaleLowerCase().includes(query))
            .filter((dish) => dietFacets.length === 0 ||
                dietFacets.some((facet) => dish.tags.includes(facet)))
            .filter((dish) => mealFacets.length === 0 ||
                mealFacets.some((facet) => dish.tags.includes(facet)));
    }, [search, selectedFacets]);

    const suggestions = filteredDishes.slice(0, 8);

    function toggleFacet(facet) {
        setSelectedFacets((current) => {
            if (current.includes(facet)) {
                return current.filter((item) => item !== facet);
            }

            const selectedOption = facetOptions.find((option) => option.id === facet);
            if (selectedOption?.group === "diet") {
                const dietFacetIds = facetOptions
                    .filter((option) => option.group === "diet")
                    .map((option) => option.id);

                return [
                    ...current.filter((item) => !dietFacetIds.includes(item)),
                    facet,
                ];
            }

            return [...current, facet];
        });
    }

    return (
        <main className="home-page">
            <div className="search-row">
                <div
                    id="search"
                    className="search-container"
                    onFocusCapture={() => setIsSearchOpen(true)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            setIsSearchOpen(false);
                        }
                    }}
                >
                    <Form.Control
                        className="search-input"
                        placeholder="Search dishes..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setIsSearchOpen(true);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                setIsSearchOpen(false);
                                event.currentTarget.blur();
                            }
                        }}
                        role="combobox"
                        aria-label="Search dishes"
                        aria-autocomplete="list"
                        aria-controls="dish-suggestions"
                        aria-expanded={isSearchOpen}
                    />
                    {isSearchOpen && (
                        <div className="search-suggestions">
                            <div className="suggestion-results">
                                <p className="suggestion-count">
                                    {filteredDishes.length} {filteredDishes.length === 1 ? "dish" : "dishes"}
                                </p>
                                <div id="dish-suggestions" role="listbox">
                                    {suggestions.length > 0 ? (
                                        suggestions.map((dish) => (
                                            <NavLink
                                                key={`${dish.gameSlug}-${dish.slug}`}
                                                to={`/games/${dish.gameSlug}/foods/${dish.slug}`}
                                                className="search-suggestion"
                                                role="option"
                                            >
                                                <img
                                                    src={dish.image}
                                                    alt=""
                                                    className={dish.gameSlug === "minecraft" ? "pixel-art" : undefined}
                                                />
                                                <span>
                                                    <strong>{dish.name}</strong>
                                                    <small>{dish.game}</small>
                                                </span>
                                            </NavLink>
                                        ))
                                    ) : (
                                        <p className="no-suggestions">No dishes match those filters.</p>
                                    )}
                                </div>
                            </div>
                            <SearchFacets
                                selectedFacets={selectedFacets}
                                onToggle={toggleFacet}
                                onClear={() => setSelectedFacets([])}
                            />
                        </div>
                    )}
                </div>
                <CartButton />
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
