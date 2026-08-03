import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Components/Home.jsx";
import GameFoods from "./Components/GameFoods.jsx";
import FoodDetails from "./Components/FoodDetails.jsx";
import Cart from "./Components/Cart.jsx";
import PrimaryNav from "./Components/PrimaryNav.jsx";
import AllDishes from "./Components/AllDishes.jsx";
import LuckyDish from "./Components/LuckyDish.jsx";
import ShoppingList from "./Components/ShoppingList.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function DigiSnack() {
    return (
        <BrowserRouter>
            <CartProvider>
                <PrimaryNav />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/dishes" element={<AllDishes />}/>
                    <Route path="/lucky" element={<LuckyDish />}/>
                    <Route path="/games/:gameSlug" element={<GameFoods />}/>
                    <Route path="/games/:gameSlug/foods/:dishSlug" element={<FoodDetails />}/>
                    <Route path="/cart" element={<Cart />}/>
                    <Route path="/shopping-list" element={<ShoppingList />}/>
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}

export default DigiSnack;
