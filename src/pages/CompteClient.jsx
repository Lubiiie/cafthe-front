import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";
import { FiUser, FiMapPin, FiPackage, FiTruck, FiLogOut } from 'react-icons/fi';

const Compte = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { addToCart } = useCard();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [showAllOrders, setShowAllOrders] = useState(false);

    // État pour la notification Toast
    const [showToast, setShowToast] = useState(false);

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
                const userRes = await fetch(`${apiUrl}/api/clients/me`, {
                    headers: { 'Authorization': `Bearer ${storedToken}` }
                });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData.client);
                }

                const orderRes = await fetch(`${apiUrl}/api/clients/my-orders`, {
                    headers: { 'Authorization': `Bearer ${storedToken}` }
                });
                if (orderRes.ok) {
                    const orderData = await orderRes.json();
                    setOrders(Array.isArray(orderData) ? orderData : []);
                }
            } catch (err) {
                console.error("Erreur de chargement:", err);
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

    const handleReorder = async (orderId) => {
        const storedToken = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/clients/order-items/${orderId}`, {
                headers: { 'Authorization': `Bearer ${storedToken}` }
            });

            if (response.ok) {
                const items = await response.json();

                items.forEach(item => {
                    addToCart({
                        ...item,
                        id_produit: item.numero_produit,
                        prix_ttc: item.prix_ttc
                    }, 1);
                });

                // On affiche le toast au lieu de l'alert
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (error) {
            console.error("Erreur lors de la recommandation:", error);
        }
    };

    if (loading) return <div style={styles.loading}>Chargement...</div>;

    return (
        <div style={styles.page}>
            <div style={styles.container}>

                <header style={styles.profileBox}>
                    <h1 style={styles.mainTitle}>Mon espace personnel</h1>
                    <p>Bienvenue, {user?.prenom || "Cher client"}</p>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <FiLogOut /> Déconnexion
                    </button>
                </header>

                <section style={styles.daSectionBox}>
                    <h3 style={styles.daSectionTitle}><FiUser /> Mes informations</h3>
                    <div style={styles.infoCard}>
                        <p><strong>Email :</strong> {user?.email}</p>
                        <button style={styles.daSmallBtn}>Modifier le mot de passe</button>
                    </div>
                </section>

                <section style={styles.daSectionBox}>
                    <h3 style={styles.daSectionTitle}><FiMapPin /> Adresse de livraison</h3>
                    <div style={styles.infoCard}>
                        <p>{user?.adresse || "Aucune adresse enregistrée"}</p>
                    </div>
                </section>

                <section style={styles.daSectionBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2 style={{ ...styles.daSectionTitle, margin: 0 }}>Historique des commandes</h2>
                        {orders.length > 3 && (
                            <button onClick={() => setShowAllOrders(!showAllOrders)} style={styles.daSmallBtn}>
                                {showAllOrders ? "Réduire" : `Voir tout (${orders.length})`}
                            </button>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {orders.length > 0 ? (
                            (showAllOrders ? orders : orders.slice(0, 3)).map((order) => (
                                <div key={order.numero_commande} style={styles.orderCard}>
                                    <div>
                                        <p style={{ margin: 0 }}><strong>Commande #{order.numero_commande}</strong></p>
                                        <p style={{ fontSize: "13px", color: "#888" }}>
                                            {new Date(order.date_commande).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                        <span style={{ fontWeight: "bold", color: '#C9A24D' }}>
                                            {order.montant_paiement || order.total_ttc} €
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

            {/* Notification Toast */}
            {showToast && (
                <div style={styles.toast}>
                    <FiPackage /> Articles ajoutés au panier !
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { backgroundColor: '#E9E3E3', minHeight: '100vh', paddingTop: '140px', paddingBottom: '60px' },
    container: { maxWidth: '900px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' },
    profileBox: { padding: '40px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '8px', position: 'relative' },
    mainTitle: { fontFamily: 'Playfair Display, serif', fontSize: '32px', marginBottom: '10px' },
    logoutBtn: { position: 'absolute', top: '40px', right: '40px', backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' },
    daSectionBox: { padding: '30px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '8px' },
    daSectionTitle: { fontFamily: 'Playfair Display, serif', color: '#C9A24D', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
    infoCard: { lineHeight: '1.8' },
    daSmallBtn: { backgroundColor: 'transparent', border: '1px solid #C9A24D', color: '#C9A24D', padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', fontSize: '12px' },
    orderCard: { backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    daActionBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' },
    loading: { textAlign: 'center', padding: '150px', fontSize: '24px' },
    toast: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#C9A24D',
        color: '#373735',
        padding: '15px 25px',
        borderRadius: '50px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: 'bold',
        zIndex: 9999,
        transition: 'all 0.3s ease'
    }
};

export default Compte;