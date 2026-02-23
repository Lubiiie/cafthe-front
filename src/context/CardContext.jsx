import React, { createContext, useState, useEffect, useContext } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cafethe_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cafethe_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        const qtyToAdd = parseInt(quantity, 10);

        // --- SÉCURITÉ : On identifie l'ID et le PRIX peu importe la source ---
        const productId = product.id_produit || product.numero_produit || product.id;
        const price = product.prix_ttc || product.prix_unitaire || product.prix;

        setCart(prevCart => {
            const exists = prevCart.find(item =>
                (item.id_produit || item.numero_produit || item.id) === productId
            );

            if (exists) {
                return prevCart.map(item =>
                    (item.id_produit || item.numero_produit || item.id) === productId
                        ? { ...item, quantite: item.quantite + qtyToAdd }
                        : item
                );
            }

            // On normalise l'objet pour qu'il soit lisible partout (Panier, Header, etc.)
            return [...prevCart, {
                ...product,
                id_produit: productId,
                prix_ttc: price,
                quantite: qtyToAdd
            }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prevCart => prevCart.map(item =>
            (item.id_produit || item.numero_produit || item.id) === id
                ? { ...item, quantite: Math.max(1, item.quantite + delta) }
                : item
        ));
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item =>
            (item.id_produit || item.numero_produit || item.id) !== id
        ));
    };

    // Calcul du sous-total basé sur la propriété normalisée prix_ttc
    const getSubTotal = () => cart.reduce((acc, item) => {
        const price = parseFloat(item.prix_ttc || item.prix_unitaire || 0);
        return acc + (price * item.quantite);
    }, 0);

    return (
        <CardContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getSubTotal }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCard = () => useContext(CardContext);
export const useCart = () => useContext(CardContext);