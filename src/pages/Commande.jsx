import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCard } from "../context/CardContext";
import { FiMapPin, FiShoppingBag, FiInfo, FiCheckCircle, FiChevronRight } from 'react-icons/fi';

const Commande = () => {
    const { cart, getSubTotal } = useCard();
    const [deliveryMethod, setDeliveryMethod] = useState('mondial_relay');
    const [selectedRelay, setSelectedRelay] = useState(null);
    const [cgvAccepted, setCgvAccepted] = useState(false);
    const [isHovered, setIsHovered] = useState(null); // Gestion des hovers

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
        try {
            const response = await fetch(`${apiUrl}/api/orders/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    items: cart,
                    total: totalTTC,
                    deliveryMethod: deliveryMethod,
                    relayInfo: selectedRelay,
                    paypalDetails: details
                })
            });
            if (response.ok) window.location.href = "/merci";
        } catch (error) { console.error(error); }
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
                    {/* COLONNE GAUCHE */}
                    <div style={styles.leftCol}>
                        <section style={styles.sectionBox}>
                            <h2 style={styles.sectionTitle}><FiMapPin /> Mode de transport</h2>

                            {/* MONDIAL RELAY */}
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
                                    <span style={styles.methodPrice}>{isFreeRelay ? "OFFERT" : "4,90 €"}</span>
                                    <p style={styles.methodDesc}>Livraison en point relais sous 3-5 jours.</p>
                                    {selectedRelay && deliveryMethod === 'mondial_relay' && (
                                        <div style={styles.relayBadge}><FiCheckCircle /> {selectedRelay.nom}</div>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); initMondialRelay(); }}
                                    style={{
                                        ...styles.actionBtn,
                                        backgroundColor: isHovered === 'btn-relay' ? '#d9b35a' : '#C9A24D',
                                        transform: isHovered === 'btn-relay' ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                    onMouseEnter={() => setIsHovered('btn-relay')}
                                    onMouseLeave={() => setIsHovered('relay-card')}
                                >
                                    {selectedRelay ? "Modifier" : "Choisir mon point"}
                                </button>
                            </div>

                            <div id="Zone_Widget" style={styles.widgetZone}></div>

                            <div style={styles.divider} />

                            {/* CLICK & COLLECT */}
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
                                    <p style={styles.methodDesc}>La Fabrique Numérique, Blois. Prêt sous 2h.</p>
                                </div>
                                <FiShoppingBag size={24} color={deliveryMethod === 'click_collect' ? '#C9A24D' : '#E9E3E3'} />
                            </div>
                        </section>
                    </div>

                    {/* COLONNE DROITE */}
                    <div style={styles.rightCol}>
                        <section style={styles.sectionBox}>
                            <h2 style={styles.sectionTitle}>Récapitulatif</h2>

                            <div style={styles.summaryTable}>
                                <div style={styles.summaryRow}><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
                                <div style={styles.summaryRow}>
                                    <span>Livraison</span>
                                    <span style={{color: deliveryFees === 0 ? '#C9A24D' : '#E9E3E3'}}>
                                        {deliveryMethod === 'click_collect' ? "0,00 €" : (isFreeRelay ? "OFFERT" : "4,90 €")}
                                    </span>
                                </div>
                                <div style={styles.totalRow}><span>Total TTC</span><span>{totalTTC.toFixed(2)} €</span></div>
                            </div>

                            <div style={styles.cgvBox}>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" checked={cgvAccepted} onChange={() => setCgvAccepted(!cgvAccepted)} style={styles.checkbox}/>
                                    J'accepte les CGV
                                </label>
                            </div>

                            <div style={{
                                ...styles.paypalWrapper,
                                opacity: canPay ? 1 : 0.2,
                                pointerEvents: canPay ? 'auto' : 'none',
                                transform: canPay && isHovered === 'paypal' ? 'scale(1.02)' : 'scale(1)'
                            }}
                                 onMouseEnter={() => setHoveredBtn('paypal')}
                                 onMouseLeave={() => setHoveredBtn(null)}
                            >
                                <PayPalScriptProvider options={{ "client-id": "TON_ID" }}>
                                    <PayPalButtons style={{ layout: "vertical", color: "gold", shape: "pill" }}
                                                   createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: totalTTC.toFixed(2) } }] })}
                                                   onApprove={(data, actions) => actions.order.capture().then(handlePaymentSuccess)}
                                    />
                                </PayPalScriptProvider>
                            </div>
                            {!canPay && <p style={styles.helperText}>{!cgvAccepted ? "Acceptez les CGV" : "Choisissez un point relay"}</p>}
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
    mainGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' },
    sectionBox: { backgroundColor: '#373735', borderRadius: '16px', padding: '35px', color: '#E9E3E3', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#C9A24D', marginBottom: '25px', borderBottom: '1px solid rgba(201, 162, 77, 0.2)', paddingBottom: '15px' },
    methodCard: { padding: '20px', borderRadius: '12px', border: '2px solid', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    methodInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
    methodName: { fontSize: '18px', fontWeight: 'bold' },
    methodPrice: { color: '#C9A24D', fontWeight: 'bold' },
    methodDesc: { fontSize: '13px', opacity: 0.6 },
    relayBadge: { backgroundColor: 'rgba(201, 162, 77, 0.15)', color: '#C9A24D', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' },
    actionBtn: { border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' },
    widgetZone: { marginTop: '10px', borderRadius: '8px', overflow: 'hidden' },
    divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '25px 0' },
    summaryTable: { marginBottom: '25px' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', opacity: 0.8 },
    totalRow: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginTop: '15px', fontSize: '22px', fontWeight: 'bold', color: '#C9A24D' },
    cgvBox: { marginBottom: '25px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px' },
    checkboxLabel: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', cursor: 'pointer' },
    checkbox: { width: '18px', height: '18px', accentColor: '#C9A24D' },
    paypalWrapper: { transition: 'all 0.3s ease' },
    helperText: { textAlign: 'center', color: '#ff6b6b', fontSize: '12px', marginTop: '15px', fontWeight: 'bold' }
};

export default Commande;