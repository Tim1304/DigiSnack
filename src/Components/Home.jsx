import { Card, Form } from "react-bootstrap";
import { NavLink } from "react-router";
import valheimImage from "../assets/GameCards/valheim.png";
import rdr2Image from "../assets/GameCards/rdr2.png";
import fallout76Image from "../assets/GameCards/fo76.png";

const games = [
    { title: "Valheim", slug: "valheim", image: valheimImage },
    { title: "Red Dead Redemption 2", slug: "red-dead-redemption-2", image: rdr2Image },
    { title: "Fallout 76", slug: "fallout-76", image: fallout76Image },
];

export default function Home() {
    function handleSearch(e) {
        console.log(e.target.value);
    }

    return (
        <main className="home-page">
            <div id="search" className="search-container">
                <Form.Control
                    className="search-input"
                    placeholder="Search..."
                    onChange={handleSearch}
                />
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
