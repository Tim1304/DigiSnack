import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Components/Home.jsx";
import GameFoods from "./Components/GameFoods.jsx";
import FoodDetails from "./Components/FoodDetails.jsx";
import Cart from "./Components/Cart.jsx";
import CartButton from "./Components/CartButton.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function DigiSnack() {
    return (
        <BrowserRouter>
            <CartProvider>
                <CartButton />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/games/:gameSlug" element={<GameFoods />}/>
                    <Route path="/games/:gameSlug/foods/:dishSlug" element={<FoodDetails />}/>
                    <Route path="/cart" element={<Cart />}/>
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}

export default DigiSnack;
