import { NavLink } from "react-router";
import cartIcon from "../assets/cart.png";
import { useCart } from "../context/CartContext.jsx";

export default function CartButton() {
    const { itemCount } = useCart();

    return (
        <NavLink to="/cart" className="cart-nav" aria-label={`Cart with ${itemCount} items`}>
            <img src={cartIcon} alt="" />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </NavLink>
    );
}
