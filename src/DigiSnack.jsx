import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Components/Home.jsx";
import GameFoods from "./Components/GameFoods.jsx";
import FoodDetails from "./Components/FoodDetails.jsx";

function DigiSnack() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/games/:gameSlug" element={<GameFoods />}/>
                <Route path="/games/:gameSlug/foods/:dishSlug" element={<FoodDetails />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default DigiSnack;
