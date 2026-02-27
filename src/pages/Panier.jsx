import React from 'react';
import { useCard } from '../context/CardContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Panier = () => {
    const { cart, updateQuantity, removeFromCart, getSubTotal } = useCard();
    const { user } = useAuth();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const handleCheckout = () => {
        if (user) {
            navigate('/commande');
        } else {
            navigate('/login');
        }
    };

    return (
        <div style={styles.overlay}>
            <style>
                {`
                .item-row:hover { background-color: #454542 !important; }
                .validate-btn:hover { background-color: #C9A24D !important; color: #373735 !important; transform: scale(1.02); }
                .remove-btn:hover { color: #FFF !important; }
                .qty-op:hover { opacity: 0.7; }
                .continue-btn:hover { color: #C9A24D !important; transform: translateX(5px); }
                .custom-scroll::-webkit-scrollbar { width: 6px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: #C9A24D; border-radius: 10px; }
                `}
            </style>

            <div style={styles.modal}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Votre panier</h1>
                    <FiX style={styles.closeIcon} onClick={() => navigate("/")} />
                </div>

                <div style={styles.itemsContainer} className="custom-scroll">
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px', color: '#373735' }}>
                            <p>Votre panier est vide.</p>
                        </div>
                    ) : (
                        cart.map((item) => {
                            const itemId = item.id_produit || item.numero_produit;
                            return (
                                <div key={itemId} style={styles.itemRow} className="item-row">
                                    <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.itemImg} />
                                    <div style={styles.itemInfo}>
                                        <h3 style={styles.itemName}>{item.nom_produit}</h3>
                                        {/* CORRECTION ICI : Ajout de Number().toFixed(2) */}
                                        <p style={styles.itemPrice}>{Number(item.prix_ttc).toFixed(2)} €</p>
                                        <button onClick={() => removeFromCart(itemId)} style={styles.removeBtn} className="remove-btn">Supprimer</button>
                                    </div>
                                    <div style={styles.qtySelector}>
                                        <button onClick={() => updateQuantity(itemId, -1)} style={styles.qtyOp} className="qty-op">-</button>
                                        <span style={styles.qtyVal}>{item.quantite}</span>
                                        <button onClick={() => updateQuantity(itemId, 1)} style={styles.qtyOp} className="qty-op">+</button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div style={styles.emptyPrompt}>
                        <img src="/logo1.webp" alt="logo" style={styles.miniLogo} />
                        <button style={styles.continueBtn} className="continue-btn" onClick={() => navigate('/catalogue')}>Continuer mes achats <FiArrowRight /></button>
                    </div>
                </div>

                <div style={styles.footer}>
                    <div style={styles.totalBlock}>
                        {/* Le total était déjà bien formaté ici */}
                        <span style={styles.totalPrice}>{getSubTotal().toFixed(2)} €</span>
                        <span style={{color: '#FFF', display: 'block', fontSize: '12px'}}>Livraison offerte dès 45€</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        style={styles.validateBtn}
                        className="validate-btn"
                        disabled={cart.length === 0}
                    >
                        <FiShoppingBag size={24} /> Valider
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { backgroundColor: '#1a1a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' },
    modal: { width: '850px', backgroundColor: '#E9E3E3', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' },
    header: { padding: '40px', textAlign: 'center', position: 'relative' },
    // Ajustement : passage à 2.75rem (~44px) pour le titre
    title: { fontFamily: "'Playfair Display', serif", fontSize: '2.75rem', color: '#373735' },
    closeIcon: { position: 'absolute', right: '30px', top: '30px', fontSize: '30px', cursor: 'pointer' },
    itemsContainer: { flex: '1', overflowY: 'auto' },
    itemRow: { backgroundColor: '#373735', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '30px', color: '#FFF', transition: '0.3s' },
    itemImg: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' },
    itemInfo: { flex: 1 },
    // Nom produit : Monté à 1.5rem pour la cohérence avec le catalogue
    itemName: { color: '#C9A24D', fontSize: '1.5rem', fontFamily: "'Playfair Display', serif" },
    // Prix article : Ajusté à 1.2rem
    itemPrice: { fontSize: '1.2rem' },
    // Lien supprimer : Monté à 1rem (16px) pour l'accessibilité
    removeBtn: { background: 'none', border: 'none', color: '#C9A24D', textDecoration: 'underline', cursor: 'pointer', marginTop: '10px', transition: '0.3s', fontSize: '1rem' },
    qtySelector: {
        backgroundColor: '#FFF',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        padding: '5px 15px',
        gap: '15px',
        color: '#373735'
    },
    qtyOp: { border: 'none', background: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#C9A24D', transition: '0.2s', padding: '0 5px' },
    qtyVal: { fontWeight: 'bold', minWidth: '25px', textAlign: 'center', fontSize: '1.1rem' },
    emptyPrompt: { padding: '30px', textAlign: 'center' },
    miniLogo: { width: '40px', marginBottom: '10px' },
    // Bouton continuer : Monté à 1.1rem
    continueBtn: { background: 'none', border: 'none', color: '#373735', textDecoration: 'underline', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', transition: '0.3s', fontSize: '1.1rem' },
    footer: { backgroundColor: '#373735', padding: '25px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    // Total final : Imposant à 2.25rem
    totalPrice: { color: '#C9A24D', fontSize: '2.25rem', fontWeight: 'bold' },
    // Bouton valider : Harmonisé à 1.2rem
    validateBtn: { backgroundColor: '#E9E3E3', color: '#C9A24D', border: 'none', borderRadius: '30px', height: '55px', padding: '0 35px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s', fontSize: '1.2rem' }
};

export default Panier;