/* oxlint-disable react/only-export-components -- provider and its colocated hook form one cart API */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dishes } from "../data/dishes.js";

const CartContext = createContext(null);

function loadCart() {
    try {
        const storedItems = JSON.parse(localStorage.getItem("digisnack-cart")) ?? {};
        const validDishSlugs = new Set(dishes.map((dish) => dish.slug));

        return Object.fromEntries(
            Object.entries(storedItems).filter(([slug, quantity]) =>
                validDishSlugs.has(slug) && Number.isInteger(quantity) && quantity > 0,
            ),
        );
    } catch {
        return {};
    }
}

function loadShoppingList() {
    try {
        const storedList = JSON.parse(localStorage.getItem("digisnack-shopping-list"));
        if (!storedList || typeof storedList !== "object") return null;

        const validDishSlugs = new Set(dishes.map((dish) => dish.slug));
        const items = Object.fromEntries(
            Object.entries(storedList.items ?? {}).filter(([slug, quantity]) =>
                validDishSlugs.has(slug) && Number.isInteger(quantity) && quantity > 0,
            ),
        );
        if (Object.keys(items).length === 0) return null;

        const checked = Object.fromEntries(
            Object.entries(storedList.checked ?? {}).filter(([, isChecked]) => isChecked === true),
        );

        return { items, checked };
    } catch {
        return null;
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);
    const [shoppingList, setShoppingList] = useState(loadShoppingList);

    useEffect(() => {
        localStorage.setItem("digisnack-cart", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        if (shoppingList) {
            localStorage.setItem("digisnack-shopping-list", JSON.stringify(shoppingList));
        } else {
            localStorage.removeItem("digisnack-shopping-list");
        }
    }, [shoppingList]);

    const value = useMemo(() => ({
        items,
        itemCount: Object.values(items).reduce((total, quantity) => total + quantity, 0),
        shoppingList,
        hasShoppingList: Boolean(shoppingList && Object.keys(shoppingList.items).length > 0),
        addItem(slug) {
            setItems((current) => ({ ...current, [slug]: (current[slug] ?? 0) + 1 }));
        },
        removeItem(slug) {
            setItems((current) => {
                const next = { ...current };
                delete next[slug];
                return next;
            });
        },
        setQuantity(slug, quantity) {
            if (quantity <= 0) {
                setItems((current) => {
                    const next = { ...current };
                    delete next[slug];
                    return next;
                });
                return;
            }
            setItems((current) => ({ ...current, [slug]: quantity }));
        },
        clearCart() {
            setItems({});
        },
        checkout() {
            if (Object.keys(items).length === 0) return false;
            setShoppingList({ items: { ...items }, checked: {} });
            return true;
        },
        toggleGrocery(key) {
            setShoppingList((current) => {
                if (!current) return current;

                const checked = { ...current.checked };
                if (checked[key]) {
                    delete checked[key];
                } else {
                    checked[key] = true;
                }

                return { ...current, checked };
            });
        },
    }), [items, shoppingList]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}
