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
        // On récupère l'ID que ce soit 'id_produit' ou 'numero_produit'
        const productId = product.id_produit || product.numero_produit;

        setCart(prevCart => {
            const exists = prevCart.find(item => (item.id_produit || item.numero_produit) === productId);

            if (exists) {
                return prevCart.map(item =>
                    (item.id_produit || item.numero_produit) === productId
                        ? { ...item, quantite: item.quantite + qtyToAdd }
                        : item
                );
            }

            // On s'assure que le nouvel objet possède bien id_produit pour le Panier.jsx
            return [...prevCart, { ...product, id_produit: productId, quantite: qtyToAdd }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prevCart => prevCart.map(item =>
            (item.id_produit || item.numero_produit) === id
                ? { ...item, quantite: Math.max(1, item.quantite + delta) }
                : item
        ));
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => (item.id_produit || item.numero_produit) !== id));
    };

    const getSubTotal = () => cart.reduce((acc, item) => acc + (parseFloat(item.prix_ttc) * item.quantite), 0);

    return (
        <CardContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getSubTotal }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCard = () => useContext(CardContext);
export const useCart = () => useContext(CardContext);