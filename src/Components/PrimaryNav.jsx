import { NavLink } from "react-router";
import hologramMuffin from "../assets/hologram-muffin-transparent.png";
import { useCart } from "../context/CartContext.jsx";

const primaryNavItems = [
    { to: "/", label: "Game library", end: true },
    { to: "/dishes", label: "All dishes" },
    { to: "/lucky", label: "Random Dish" },
    { to: "/cart", label: "Cart" },
];

export default function PrimaryNav() {
    const { hasShoppingList } = useCart();
    const navItems = hasShoppingList
        ? [...primaryNavItems, { to: "/shopping-list", label: "Shopping list" }]
        : primaryNavItems;

    return (
        <header className="site-header">
            <nav className="primary-nav" aria-label="Primary navigation">
                <NavLink to="/" className="site-brand" aria-label="DigiSnack home">
                    <img className="site-brand-logo" src={hologramMuffin} alt="" />
                    DigiSnack
                </NavLink>
                <div className="primary-nav-links" style={{ "--nav-item-count": navItems.length }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) => isActive ? "primary-nav-link active" : "primary-nav-link"}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    );
}
