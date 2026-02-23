import React, { createContext, useState, useEffect, useContext } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
    // Initialisation du panier avec le localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cafethe_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sauvegarde automatique du panier dès qu'il est modifié
    useEffect(() => {
        localStorage.setItem('cafethe_cart', JSON.stringify(cart));
    }, [cart]);

    // Ajouter un produit au panier
    const addToCart = (product, quantity) => {
        const qtyToAdd = parseInt(quantity, 10);

        // Identification normalisée de l'ID et du Prix
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

            // Normalisation de l'objet pour le reste de l'app
            return [...prevCart, {
                ...product,
                id_produit: productId,
                prix_ttc: price,
                quantite: qtyToAdd
            }];
        });
    };

    // Modifier la quantité (+1 ou -1)
    const updateQuantity = (id, delta) => {
        setCart(prevCart => prevCart.map(item =>
            (item.id_produit || item.numero_produit || item.id) === id
                ? { ...item, quantite: Math.max(1, item.quantite + delta) }
                : item
        ));
    };

    // Supprimer un article
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item =>
            (item.id_produit || item.numero_produit || item.id) !== id
        ));
    };

    // Calcul du montant total
    const getSubTotal = () => cart.reduce((acc, item) => {
        const price = parseFloat(item.prix_ttc || item.prix_unitaire || 0);
        return acc + (price * item.quantite);
    }, 0);

    // Vider le panier (utilisé sur la page Merci)
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cafethe_cart');
    };

    return (
        <CardContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getSubTotal,
            clearCart
        }}>
            {children}
        </CardContext.Provider>
    );
}; // Fermeture correcte du CardProvider

// Export du hook personnalisé avec le "d"
export const useCard = () => useContext(CardContext);