import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";
import { FiUser, FiMapPin, FiPackage, FiLogOut, FiSave, FiEdit2, FiX } from 'react-icons/fi';

const Compte = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { addToCart } = useCard();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [showAllOrders, setShowAllOrders] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        prenom: "", nom: "", email: "", telephone: "", adresse: "", cp: "", ville: ""
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

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
                    setFormData({
                        prenom: userData.client.prenom_client || "",
                        nom: userData.client.nom_client || "",
                        email: userData.client.email_client || "",
                        telephone: userData.client.telephone || "",
                        adresse: userData.client.adresse_livraison || "",
                        cp: userData.client.code_postal_livraison || "",
                        ville: userData.client.ville_livraison || ""
                    });
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

    const handleUpdateProfile = async () => {
        const storedToken = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/clients/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setToastMessage("Profil mis à jour avec succès !");
                setShowToast(true);
                setIsEditing(false);
                setUser({
                    ...user,
                    prenom_client: formData.prenom,
                    nom_client: formData.nom,
                    email_client: formData.email,
                    telephone: formData.telephone,
                    adresse_livraison: formData.adresse,
                    code_postal_livraison: formData.cp,
                    ville_livraison: formData.ville
                });
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

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
                setToastMessage("Articles ajoutés au panier !");
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
                    <h1 style={styles.mainTitle}>Mon espace client</h1>
                    <p style={{ opacity: 0.8 }}>Bienvenue dans votre espace client. Retrouvez ici l'essence de vos rituels.</p>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <FiLogOut /> Déconnexion
                    </button>
                </header>

                {/* SECTION INFORMATIONS & ADRESSE COMBINÉE POUR PLUS DE FLUIDITÉ */}
                <section style={styles.daSectionBox}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.daSectionTitle}><FiUser /> Mes données personnelles</h3>
                        {!isEditing ? (
                            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                                <FiEdit2 /> Modifier le profil
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                                    <FiX /> Annuler
                                </button>
                                <button onClick={handleUpdateProfile} style={styles.saveBtn}>
                                    <FiSave /> Enregistrer
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={styles.formContainer}>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Prénom</label>
                                {isEditing ? (
                                    <input style={styles.input} value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
                                ) : (
                                    <p style={styles.staticText}>{user?.prenom_client}</p>
                                )}
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nom</label>
                                {isEditing ? (
                                    <input style={styles.input} value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                                ) : (
                                    <p style={styles.staticText}>{user?.nom_client}</p>
                                )}
                            </div>
                        </div>

                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email</label>
                                {isEditing ? (
                                    <input style={styles.input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                ) : (
                                    <p style={styles.staticText}>{user?.email_client}</p>
                                )}
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Téléphone</label>
                                {isEditing ? (
                                    <input style={styles.input} value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
                                ) : (
                                    <p style={styles.staticText}>{user?.telephone || "—"}</p>
                                )}
                            </div>
                        </div>

                        <div style={{...styles.divider, margin: '20px 0'}} />

                        <div style={styles.formGroup}>
                            <label style={styles.label}><FiMapPin /> Adresse de livraison</label>
                            {isEditing ? (
                                <>
                                    <input style={{...styles.input, marginBottom: '10px'}} value={formData.adresse} onChange={(e) => setFormData({...formData, adresse: e.target.value})} placeholder="N° et nom de rue" />
                                    <div style={styles.formRow}>
                                        <input style={{...styles.input, flex: 1}} value={formData.cp} onChange={(e) => setFormData({...formData, cp: e.target.value})} placeholder="Code Postal" />
                                        <input style={{...styles.input, flex: 2}} value={formData.ville} onChange={(e) => setFormData({...formData, ville: e.target.value})} placeholder="Ville" />
                                    </div>
                                </>
                            ) : (
                                <p style={styles.staticText}>
                                    {user?.adresse_livraison
                                        ? `${user.adresse_livraison}, ${user.code_postal_livraison} ${user.ville_livraison}`
                                        : "Aucune adresse enregistrée"}
                                </p>
                            )}
                        </div>

                        {!isEditing && (
                            <button style={{...styles.daSmallBtn, marginTop: '15px'}}>Modifier le mot de passe</button>
                        )}
                    </div>
                </section>

                <section style={styles.daSectionBox}>
                    <div style={styles.sectionHeader}>
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
                                        <p style={{ fontSize: "13px", color: "#aaa" }}>
                                            {new Date(order.date_commande).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                        <span style={{ fontWeight: "bold", color: '#C9A24D' }}>
                                            {order.montant_paiement || order.total_ttc} €
                                        </span>
                                        <button onClick={() => handleReorder(order.numero_commande)} style={styles.daActionBtn}>
                                            Recommander
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ opacity: 0.5 }}>Aucune commande passée pour le moment.</p>
                        )}
                    </div>
                </section>
            </div>

            {showToast && (
                <div style={styles.toast}>
                    <FiPackage /> {toastMessage}
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { backgroundColor: '#E9E3E3', minHeight: '100vh', paddingTop: '140px', paddingBottom: '60px' },
    container: { maxWidth: '900px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' },
    profileBox: { padding: '40px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '12px', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' },
    mainTitle: { fontFamily: 'Playfair Display, serif', fontSize: '36px', marginBottom: '10px', color: '#C9A24D' },
    logoutBtn: { position: 'absolute', top: '40px', right: '40px', backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' },

    daSectionBox: { padding: '35px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
    daSectionTitle: { fontFamily: 'Playfair Display, serif', color: '#C9A24D', fontSize: '26px', display: 'flex', alignItems: 'center', gap: '12px' },

    formContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
    formRow: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
    formGroup: { flex: 1, minWidth: '200px' },
    label: { display: 'block', fontSize: '13px', color: '#C9A24D', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' },
    staticText: { fontSize: '16px', margin: 0, padding: '10px 0', borderBottom: '1px solid rgba(201, 162, 77, 0.1)' },
    input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid rgba(201, 162, 77, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#E9E3E3', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' },

    editBtn: { backgroundColor: 'transparent', border: '1px solid #C9A24D', color: '#C9A24D', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' },
    saveBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' },
    cancelBtn: { backgroundColor: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },

    daSmallBtn: { backgroundColor: 'transparent', border: '1px solid #C9A24D', color: '#C9A24D', padding: '6px 16px', borderRadius: '15px', cursor: 'pointer', fontSize: '13px' },
    divider: { height: '1px', backgroundColor: 'rgba(233, 227, 227, 0.1)' },

    orderCard: { backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' },
    daActionBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '10px 22px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', transition: 'filter 0.2s' },

    loading: { textAlign: 'center', padding: '150px', fontSize: '24px', color: '#373735' },
    toast: { position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#C9A24D', color: '#373735', padding: '16px 28px', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold', zIndex: 9999, animation: 'slideIn 0.3s ease-out' }
};

export default Compte;