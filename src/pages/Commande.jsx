import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCard } from "../context/CardContext";
import { FiMapPin, FiShoppingBag, FiInfo, FiCheckCircle, FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

const Commande = () => {
    // Ajout de updateQuantity depuis ton context
    const { cart, getSubTotal, removeFromCart, updateQuantity } = useCard();
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState('mondial_relay');
    const [selectedRelay, setSelectedRelay] = useState(null);
    const [cgvAccepted, setCgvAccepted] = useState(false);
    const [isHovered, setIsHovered] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/catalogue');
        }
    }, [cart, navigate]);

    const initMondialRelay = () => {
        if (window.jQuery && window.jQuery("#Zone_Widget").MR_ParcelShopPicker) {
            window.jQuery("#Zone_Widget").MR_ParcelShopPicker({
                Target: "#Target_Widget",
                Brand: "BDTEST  ",
                Country: "FR",
                PostCode: "41000",
                ColLivMod: "24R",
                NbResults: "7",
                OnParcelShopSelected: (data) => {
                    setSelectedRelay({
                        id: data.ID,
                        nom: data.Nom,
                        adresse: `${data.Adresse1}, ${data.CP} ${data.Ville}`
                    });
                }
            });
        }
    };

    const subtotal = getSubTotal();
    const isFreeRelay = subtotal >= 45;
    const deliveryFees = deliveryMethod === 'mondial_relay' ? (isFreeRelay ? 0 : 4.90) : 0;
    const totalTTC = subtotal + deliveryFees;

    const handlePaymentSuccess = async (details) => {
        const token = localStorage.getItem('token');

        // 1. Préparation propre des données
        const orderData = {
            items: cart,
            total: totalTTC,
            deliveryMethod: deliveryMethod,
            relayInfo: selectedRelay, // Sera null si Click & Collect
            paypalDetails: details
        };

        try {
            // 2. Un seul appel fetch propre
            const response = await fetch(`${apiUrl}/api/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                // Si le serveur répond 201 ou 200
                console.log("Commande enregistrée avec succès !");
                window.location.href = "/merci";
            } else {
                // Si le serveur renvoie une erreur (401, 500, etc.)
                const errorData = await response.json();
                console.error("Erreur serveur :", errorData.message || errorData.error);
                alert("Erreur lors de la validation : " + (errorData.message || "Vérifiez votre connexion"));
            }
        } catch (error) {
            console.error("Erreur réseau (le serveur est peut-être éteint) :", error);
        }
    };

    const canPay = cgvAccepted && (deliveryMethod === 'click_collect' || selectedRelay);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.mainTitle}>Finaliser ma commande</h1>
                    <p style={styles.breadcrumb}>Panier <FiChevronRight /> <strong>Livraison & Paiement</strong></p>
                </header>

                <div style={styles.mainGrid}>
                    <div style={styles.leftCol}>
                        <section style={styles.sectionBox}>
                            <h2 style={styles.sectionTitle}><FiMapPin /> Livraison</h2>

                            <div
                                style={{
                                    ...styles.methodCard,
                                    borderColor: deliveryMethod === 'mondial_relay' ? '#C9A24D' : (isHovered === 'relay-card' ? 'rgba(201, 162, 77, 0.5)' : 'rgba(255,255,255,0.1)'),
                                    backgroundColor: deliveryMethod === 'mondial_relay' ? 'rgba(201, 162, 77, 0.08)' : (isHovered === 'relay-card' ? 'rgba(255,255,255,0.02)' : 'transparent'),
                                    transform: isHovered === 'relay-card' ? 'translateY(-2px)' : 'translateY(0)'
                                }}
                                onClick={() => setDeliveryMethod('mondial_relay')}
                                onMouseEnter={() => setIsHovered('relay-card')}
                                onMouseLeave={() => setIsHovered(null)}
                            >
                                <div style={styles.methodInfo}>
                                    <span style={styles.methodName}>Mondial Relay</span>
                                    <span style={styles.methodPrice}>{isFreeRelay ? "OFFERT" : "4,90 € - (GRATUIT dès 45€)"}</span>
                                    <p style={styles.methodDesc}>Livraison sous 3-5 jours.</p>
                                    {selectedRelay && deliveryMethod === 'mondial_relay' && (
                                        <div style={styles.relayBadge}><FiCheckCircle /> {selectedRelay.nom}</div>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); initMondialRelay(); }}
                                    style={{
                                        ...styles.actionBtn,
                                        backgroundColor: isHovered === 'btn-relay' ? '#d9b35a' : '#C9A24D',
                                        transform: isHovered === 'btn-relay' ? 'scale(1.05)' : 'scale(1)',
                                        color: '#373735'
                                    }}
                                    onMouseEnter={() => setIsHovered('btn-relay')}
                                    onMouseLeave={() => setIsHovered('relay-card')}
                                >
                                    {selectedRelay ? "Modifier" : "Choisir mon point"}
                                </button>
                            </div>

                            <div id="Zone_Widget" style={styles.widgetZone}></div>

                            <div style={styles.divider} />

                            <div
                                style={{
                                    ...styles.methodCard,
                                    borderColor: deliveryMethod === 'click_collect' ? '#C9A24D' : (isHovered === 'cc-card' ? 'rgba(201, 162, 77, 0.5)' : 'rgba(255,255,255,0.1)'),
                                    backgroundColor: deliveryMethod === 'click_collect' ? 'rgba(201, 162, 77, 0.08)' : (isHovered === 'cc-card' ? 'rgba(255,255,255,0.02)' : 'transparent'),
                                    transform: isHovered === 'cc-card' ? 'translateY(-2px)' : 'translateY(0)'
                                }}
                                onClick={() => setDeliveryMethod('click_collect')}
                                onMouseEnter={() => setIsHovered('cc-card')}
                                onMouseLeave={() => setIsHovered(null)}
                            >
                                <div style={styles.methodInfo}>
                                    <span style={styles.methodName}>Retrait à l'Atelier</span>
                                    <span style={styles.methodPrice}>0,00 €</span>
                                    <p style={styles.methodDesc}>La Fabrique Numérique, Blois. Prêt sous 24h.</p>
                                </div>
                                <FiShoppingBag size={24} color={deliveryMethod === 'click_collect' ? '#C9A24D' : '#E9E3E3'} />
                            </div>
                        </section>
                    </div>

                    <div style={styles.rightCol}>
                        <section style={styles.sectionBox}>
                            <h2 style={styles.sectionTitle}>Récapitulatif de votre commande</h2>

                            <div style={styles.articlesList} className="custom-scroll">
                                {cart.map((item) => {
                                    const itemId = item.id_produit || item.numero_produit;
                                    return (
                                        <div key={itemId} style={styles.articleItem}>
                                            <img
                                                src={`${apiUrl}/images/${item.image}`}
                                                alt={item.nom_produit}
                                                style={styles.miniImg}
                                            />
                                            <div style={styles.articleDetails}>
                                                <p style={styles.articleName}>{item.nom_produit}</p>
                                                {/* SÉLECTEUR DE QUANTITÉ AJOUTÉ */}
                                                <div style={styles.qtyContainer}>
                                                    <button
                                                        onClick={() => updateQuantity(itemId, -1)}
                                                        style={{...styles.qtyBtn, opacity: isHovered === `minus-${itemId}` ? 0.7 : 1}}
                                                        onMouseEnter={() => setIsHovered(`minus-${itemId}`)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                    >-</button>
                                                    <span style={styles.qtyVal}>{item.quantite}</span>
                                                    <button
                                                        onClick={() => updateQuantity(itemId, 1)}
                                                        style={{...styles.qtyBtn, opacity: isHovered === `plus-${itemId}` ? 0.7 : 1}}
                                                        onMouseEnter={() => setIsHovered(`plus-${itemId}`)}
                                                        onMouseLeave={() => setIsHovered(null)}
                                                    >+</button>
                                                </div>
                                            </div>
                                            <div style={styles.articlePriceBlock}>
                                                <p style={styles.articlePrice}>{(item.prix_ttc * item.quantite).toFixed(2)}€</p>
                                                <FiTrash2
                                                    style={{
                                                        ...styles.deleteIcon,
                                                        color: isHovered === `trash-${itemId}` ? '#ff4d4d' : '#ff6b6b',
                                                        transform: isHovered === `trash-${itemId}` ? 'scale(1.2)' : 'scale(1)'
                                                    }}
                                                    onMouseEnter={() => setIsHovered(`trash-${itemId}`)}
                                                    onMouseLeave={() => setIsHovered(null)}
                                                    onClick={() => removeFromCart(itemId)}
                                                    title="Retirer l'article"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={styles.divider} />

                            <div style={styles.summaryTable}>
                                <div style={styles.summaryRow}>
                                    <span>Sous-total articles</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>
                                <div style={styles.summaryRow}>
                                    <span>Livraison ({deliveryMethod === 'click_collect' ? 'Retrait' : 'Relay'})</span>
                                    <span style={{color: deliveryFees === 0 ? '#C9A24D' : '#E9E3E3'}}>
                                        {deliveryMethod === 'click_collect' ? "0,00 €" : (isFreeRelay ? "OFFERT" : "4,90 €")}
                                    </span>
                                </div>
                                <div style={styles.totalRow}>
                                    <span>TOTAL TTC</span>
                                    <span>{totalTTC.toFixed(2)} €</span>
                                </div>
                            </div>

                            <div style={styles.cgvBox}>
                                <label
                                    style={{...styles.checkboxLabel, opacity: isHovered === 'cgv-label' ? 1 : 0.8}}
                                    onMouseEnter={() => setIsHovered('cgv-label')}
                                    onMouseLeave={() => setIsHovered(null)}
                                >
                                    <input type="checkbox" checked={cgvAccepted} onChange={() => setCgvAccepted(!cgvAccepted)} style={styles.checkbox}/>
                                    <span>J'accepte les <Link to="/cgv" style={styles.cgvLink}>Conditions Générales de Vente</Link></span>
                                </label>
                            </div>

                            <div style={{
                                ...styles.paypalWrapper,
                                opacity: canPay ? 1 : 0.2,
                                pointerEvents: canPay ? 'auto' : 'none',
                                transform: canPay && isHovered === 'paypal-area' ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.3s ease'
                            }}
                                 onMouseEnter={() => setIsHovered('paypal-area')}
                                 onMouseLeave={() => setIsHovered(null)}
                            >
                                <PayPalButtons
                                    style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                                    createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: totalTTC.toFixed(2) } }] })}
                                    onApprove={(data, actions) => actions.order.capture().then(handlePaymentSuccess)}
                                />
                            </div>
                            {!canPay && <p style={styles.helperText}>{!cgvAccepted ? "Veuillez accepter les CGV" : "Veuillez choisir un point relay"}</p>}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { backgroundColor: '#E9E3E3', minHeight: '100vh', paddingTop: '140px', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" },
    container: { maxWidth: '1100px', margin: '0 auto', padding: '0 20px' },
    header: { marginBottom: '40px', textAlign: 'center' },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: '42px', color: '#373735' },
    breadcrumb: { fontSize: '14px', color: '#373735', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px', alignItems: 'start' },
    sectionBox: { backgroundColor: '#373735', borderRadius: '16px', padding: '30px', color: '#E9E3E3', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#C9A24D', marginBottom: '20px', borderBottom: '1px solid rgba(201, 162, 77, 0.2)', paddingBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' },

    articlesList: { maxHeight: '220px', overflowY: 'auto', marginBottom: '15px', paddingRight: '10px' },
    articleItem: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', transition: '0.3s' },
    miniImg: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' },
    articleDetails: { flex: 1 },
    articleName: { fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#E9E3E3' },

    // Styles pour le sélecteur de quantité
    qtyContainer: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '15px', width: 'fit-content', padding: '2px 8px' },
    qtyBtn: { background: 'none', border: 'none', color: '#C9A24D', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: '0.2s' },
    qtyVal: { fontSize: '12px', fontWeight: 'bold', minWidth: '15px', textAlign: 'center' },

    articlePriceBlock: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' },
    articlePrice: { fontSize: '14px', fontWeight: 'bold', color: '#C9A24D', margin: 0 },
    deleteIcon: { cursor: 'pointer', fontSize: '16px', transition: '0.3s', opacity: 0.8 },

    methodCard: { padding: '20px', borderRadius: '12px', border: '2px solid', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    methodInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
    methodName: { fontSize: '18px', fontWeight: 'bold' },
    methodPrice: { color: '#C9A24D', fontWeight: 'bold' },
    methodDesc: { fontSize: '13px', opacity: 0.6 },
    relayBadge: { backgroundColor: 'rgba(201, 162, 77, 0.15)', color: '#C9A24D', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' },
    actionBtn: { border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' },
    widgetZone: { marginTop: '10px', borderRadius: '8px', overflow: 'hidden' },
    divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '20px 0' },
    summaryTable: { marginBottom: '20px' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', opacity: 0.8 },
    totalRow: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginTop: '15px', fontSize: '20px', fontWeight: 'bold', color: '#C9A24D' },
    cgvBox: { marginBottom: '20px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px' },
    checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', transition: '0.3s' },
    checkbox: { width: '16px', height: '16px', accentColor: '#C9A24D', cursor: 'pointer' },
    cgvLink: { color: '#C9A24D', textDecoration: 'underline', transition: '0.2s' },
    paypalWrapper: { transition: 'all 0.3s ease' },
    helperText: { textAlign: 'center', color: '#ff6b6b', fontSize: '11px', marginTop: '10px', fontWeight: 'bold' }
};

export default Commande;