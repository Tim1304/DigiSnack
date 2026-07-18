/* oxlint-disable react/only-export-components -- provider and its colocated hook form one cart API */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem("digisnack-cart")) ?? {};
    } catch {
        return {};
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);

    useEffect(() => {
        localStorage.setItem("digisnack-cart", JSON.stringify(items));
    }, [items]);

    const value = useMemo(() => ({
        items,
        itemCount: Object.values(items).reduce((total, quantity) => total + quantity, 0),
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
    }), [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}
