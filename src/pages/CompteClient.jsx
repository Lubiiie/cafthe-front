import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
// Import des icônes nécessaires
import { FiUser, FiMapPin, FiPackage, FiTruck } from 'react-icons/fi';

const Compte = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // États pour l'historique (orders)
    const [orders, setOrders] = useState([]);
    const [showAllOrders, setShowAllOrders] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = localStorage.getItem('userId');
            const storedToken = localStorage.getItem('token');

            if (!storedUserId || !storedToken) {
                navigate('/login');
                return;
            }

            try {
                // 1. Récupération profil
                const response = await fetch(`${apiUrl}/api/clients/${storedUserId}`, {
                    headers: { 'Authorization': `Bearer ${storedToken}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client || data);
                }

                // 2. Récupération historique (ajusté selon ton besoin)
                const orderRes = await fetch(`${apiUrl}/api/commandes/client/${storedUserId}`, {
                    headers: { 'Authorization': `Bearer ${storedToken}` }
                });
                if (orderRes.ok) {
                    const orderData = await orderRes.json();
                    setOrders(Array.isArray(orderData) ? orderData : []);
                }

            } catch (err) {
                console.error("Erreur récupération données:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, apiUrl]);

    const handleLogout = () => {
        localStorage.clear();
        logout();
        navigate('/login');
    };

    const handleReorder = (orderId) => {
        console.log("Recommander la commande :", orderId);
        // Logique pour ajouter les produits au panier ici
    };

    if (loading) return <div style={{textAlign: 'center', padding: '100px'}}>Chargement...</div>;

    return (
        <div style={styles.page}>
            <div style={styles.container}>

                {/* EN-TÊTE PROFIL */}
                <div style={styles.profileBox}>
                    <h1 style={{fontFamily: 'Playfair Display', fontSize: '32px', margin: 0}}>Mon espace client</h1>
                    <p>Bienvenue dans votre espace client. Retrouvez ici l'essence de vos rituels et l'historique de vos découvertes.</p>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Se déconnecter
                    </button>
                </div>

                {/* --- SECTION 1 : INFORMATIONS PERSONNELLES --- */}
                <section style={styles.daSectionBox}>
                    <h3 style={styles.daSectionTitle}><FiUser /> Mes informations personnelles</h3>
                    <div style={styles.infoCard}>
                        <div style={styles.infoRow}><strong>Nom :</strong> {user?.nom_client}</div>
                        <div style={styles.infoRow}><strong>E-mail :</strong> {user?.email_client}</div>
                        <div style={styles.infoRow}><strong>Mot de passe :</strong> **********</div>
                        <button style={styles.daSmallBtn}>Modifier le mot de passe</button>
                    </div>
                </section>

                {/* --- SECTION 2 : CARNET D'ADRESSES --- */}
                <section style={styles.daSectionBox}>
                    <h3 style={styles.daSectionTitle}><FiMapPin /> Carnet d'adresses</h3>
                    <div style={styles.infoCard}>
                        <p style={{margin: '0 0 10px 0'}}>{user?.adresse_client || "Aucune adresse enregistrée"}</p>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={styles.daSmallBtn}>Modifier l'adresse</button>
                            <button style={styles.daSmallBtn}>Ajouter une adresse</button>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 4 : SUIVI (AJOUTÉ) --- */}
                <section style={styles.daSectionBox}>
                    <h3 style={styles.daSectionTitle}><FiTruck /> Suivi de commande en cours</h3>
                    <div style={styles.infoCard}>
                        <p style={{fontStyle: 'italic', opacity: 0.8}}>Aucune commande en cours de livraison.</p>
                    </div>
                </section>

                {/* --- SECTION 3 : HISTORIQUE COMPLET --- */}
                <section style={styles.daSectionBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h3 style={styles.daSectionTitle}><FiPackage /> Historique des commandes</h3>
                        {orders.length > 3 && (
                            <button onClick={() => setShowAllOrders(!showAllOrders)} style={styles.daSmallBtn}>
                                {showAllOrders ? "Réduire" : `Tout voir (${orders.length})`}
                            </button>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {orders.length > 0 ? (
                            (showAllOrders ? orders : orders.slice(0, 3)).map((order) => (
                                <div key={order.numero_commande} style={styles.orderCard}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, color: '#C9A24D' }}>
                                            <strong>Commande #{order.numero_commande}</strong>
                                        </p>
                                        <p style={{ fontSize: "13px", color: "#888", marginBottom: '10px' }}>
                                            {new Date(order.date_commande).toLocaleDateString()}
                                        </p>

                                        <div style={styles.contenirDetail}>
                                            {order.produits && order.produits.map((p, i) => (
                                                <div key={i} style={{fontSize: '13px', opacity: 0.8}}>
                                                    • {p.nom_produit} ({p.quantite_gramme}g)
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                        <span style={{ fontWeight: "bold", fontSize: '18px' }}>
                                            {order.total_ttc || order.montant_paiement} €
                                        </span>
                                        <button
                                            onClick={() => handleReorder(order.numero_commande)}
                                            style={styles.daActionBtn}
                                        >
                                            Recommander
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ opacity: 0.6 }}>Aucune commande passée.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

// Styles regroupés pour la clarté
const styles = {
    page: { backgroundColor: '#E9E3E3', minHeight: '100vh', paddingTop: '140px', paddingBottom: '40px' },
    container: { maxWidth: '900px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' },
    profileBox: { padding: '40px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '8px' },
    daSectionBox: { padding: '30px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '8px' },
    daSectionTitle: { fontFamily: 'Playfair Display', color: '#C9A24D', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0' },
    infoCard: { lineHeight: '1.8' },
    infoRow: { marginBottom: '5px' },
    daSmallBtn: { backgroundColor: 'transparent', border: '1px solid #C9A24D', color: '#C9A24D', padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', fontSize: '12px', marginTop: '10px' },
    orderCard: { backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)' },
    daActionBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' },
    logoutBtn: { marginTop: '30px', padding: '10px 20px', backgroundColor: '#C9A24D', border: 'none', color: '#373735', cursor: 'pointer', borderRadius: '20px', fontWeight: 'bold' },
    contenirDetail: { marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }
};

export default Compte;