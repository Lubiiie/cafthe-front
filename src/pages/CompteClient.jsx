import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";
import { FiUser, FiMapPin, FiPackage, FiLogOut, FiSave, FiEdit2, FiX, FiTrash2 } from 'react-icons/fi';

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

    // --- LOGIQUE POUR LES HOVERS ---
    const [hoveredBtn, setHoveredBtn] = useState(null);

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

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        );

        if (confirmDelete) {
            const storedToken = localStorage.getItem('token');
            try {
                const response = await fetch(`${apiUrl}/api/clients/delete-account`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert("Votre compte a été supprimé. Retour à l'accueil.");
                } else {
                    console.error("Le serveur a répondu avec une erreur.");
                }

            } catch (error) {
                console.error("Erreur réseau lors de la suppression:", error);
            } finally {
                localStorage.clear();
                logout();
                window.location.href = "/";
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        logout();
        window.location.href = "/";
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

    if (loading) return <div style={styles.loading}>Chargement de vos rituels...</div>;

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <header style={styles.profileBox}>
                    <div style={{ flex: 1 }}>
                        <h1 style={styles.mainTitle}>Mon espace client</h1>
                        <p style={styles.subTitle}>Bienvenue dans votre univers sensoriel. Retrouvez ici l'essence de vos rituels.</p>
                    </div>
                    <button
                        onMouseEnter={() => setHoveredBtn('logout')}
                        onMouseLeave={() => setHoveredBtn(null)}
                        onClick={handleLogout}
                        style={{
                            ...styles.logoutBtn,
                            transform: hoveredBtn === 'logout' ? 'scale(1.05)' : 'scale(1)',
                            backgroundColor: hoveredBtn === 'logout' ? '#d9b35a' : '#C9A24D'
                        }}
                    >
                        <FiLogOut /> Déconnexion
                    </button>
                </header>

                <section style={styles.daSectionBox}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.daSectionTitle}><FiUser /> Mes données personnelles</h3>
                        {!isEditing ? (
                            <button
                                onMouseEnter={() => setHoveredBtn('edit')}
                                onMouseLeave={() => setHoveredBtn(null)}
                                onClick={() => setIsEditing(true)}
                                style={{
                                    ...styles.editBtn,
                                    backgroundColor: hoveredBtn === 'edit' ? 'rgba(201, 162, 77, 0.1)' : 'transparent'
                                }}
                            >
                                <FiEdit2 /> Modifier le profil
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}><FiX /> Annuler</button>
                                <button onClick={handleUpdateProfile} style={styles.saveBtn}><FiSave /> Enregistrer</button>
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
                                <label style={styles.label}>Email professionnel</label>
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

                        <div style={styles.divider} />

                        <div style={styles.formGroup}>
                            <label style={styles.label}><FiMapPin /> Adresse de livraison par défaut</label>
                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input style={styles.input} value={formData.adresse} onChange={(e) => setFormData({...formData, adresse: e.target.value})} placeholder="N° et nom de rue" />
                                    <div style={styles.formRow}>
                                        <input style={{...styles.input, flex: 1}} value={formData.cp} onChange={(e) => setFormData({...formData, cp: e.target.value})} placeholder="Code Postal" />
                                        <input style={{...styles.input, flex: 2}} value={formData.ville} onChange={(e) => setFormData({...formData, ville: e.target.value})} placeholder="Ville" />
                                    </div>
                                </div>
                            ) : (
                                <p style={styles.staticText}>
                                    {user?.adresse_livraison
                                        ? `${user.adresse_livraison}, ${user.code_postal_livraison} ${user.ville_livraison}`
                                        : "Aucune adresse enregistrée à ce jour."}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                <section style={styles.daSectionBox}>
                    <div style={styles.sectionHeader}>
                        <h2 style={{ ...styles.daSectionTitle, margin: 0 }}><FiPackage /> Historique des commandes</h2>
                        {orders.length > 3 && (
                            <button
                                onClick={() => setShowAllOrders(!showAllOrders)}
                                style={styles.daSmallBtn}
                            >
                                {showAllOrders ? "Voir moins" : `Voir tout (${orders.length})`}
                            </button>
                        )}
                    </div>

                    <div style={styles.ordersList}>
                        {orders.length > 0 ? (
                            (showAllOrders ? orders : orders.slice(0, 3)).map((order) => (
                                <div
                                    key={order.numero_commande}
                                    style={styles.orderCard}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                                >
                                    <div style={styles.orderInfo}>
                                        <span style={styles.orderId}>Commande #{order.numero_commande}</span>
                                        <span style={styles.orderDate}>{new Date(order.date_commande).toLocaleDateString()}</span>
                                    </div>
                                    <div style={styles.orderActions}>
                                        {/* CORRECTION DES DÉCIMALES ICI */}
                                        <span style={styles.orderPrice}>
                                            {Number(order.montant_paiement || order.total_ttc).toFixed(2)} €
                                        </span>
                                        <button
                                            onMouseEnter={() => setHoveredBtn(`reorder-${order.numero_commande}`)}
                                            onMouseLeave={() => setHoveredBtn(null)}
                                            onClick={() => handleReorder(order.numero_commande)}
                                            style={{
                                                ...styles.daActionBtn,
                                                transform: hoveredBtn === `reorder-${order.numero_commande}` ? 'translateY(-2px)' : 'translateY(0)',
                                                boxShadow: hoveredBtn === `reorder-${order.numero_commande}` ? '0 5px 15px rgba(0,0,0,0.3)' : 'none'
                                            }}
                                        >
                                            Commander à nouveau
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={styles.emptyOrders}>Aucune commande pour le moment.</p>
                        )}
                    </div>
                </section>

                <section style={styles.dangerZone}>
                    <div style={{ flex: 1 }}>
                        <h3 style={styles.dangerTitle}><FiTrash2 /> Suppression du compte</h3>
                        <p style={styles.dangerText}>
                            La suppression anonymise vos données personnelles.
                        </p>
                    </div>
                    <button
                        onMouseEnter={() => setHoveredBtn('danger')}
                        onMouseLeave={() => setHoveredBtn(null)}
                        onClick={handleDeleteAccount}
                        style={{
                            ...styles.dangerBtn,
                            backgroundColor: hoveredBtn === 'danger' ? '#ff6b6b' : 'transparent',
                            color: hoveredBtn === 'danger' ? '#373735' : '#ff6b6b'
                        }}
                    >
                        Supprimer le compte
                    </button>
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
    page: { backgroundColor: '#E9E3E3', minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px', fontFamily: "'Inter', sans-serif" },
    container: { maxWidth: '900px', margin: '0 auto', padding: '0 25px', display: 'flex', flexDirection: 'column', gap: '35px' },
    profileBox: { padding: '50px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'all 0.3s ease' },
    // Titre principal harmonisé à 2.5rem (~40px)
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '10px', color: '#C9A24D' },
    subTitle: { fontSize: '1.1rem', opacity: 0.8, maxWidth: '500px' },
    logoutBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', fontSize: '1rem' },

    daSectionBox: { padding: '40px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(201, 162, 77, 0.2)', paddingBottom: '15px' },
    // Titres de section à 1.5rem
    daSectionTitle: { fontFamily: "'Playfair Display', serif", color: '#C9A24D', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' },

    formContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
    formRow: { display: 'flex', gap: '25px', flexWrap: 'wrap' },
    formGroup: { flex: 1, minWidth: '250px' },
    label: { display: 'block', fontSize: '0.85rem', color: '#C9A24D', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' },
    // Texte statique monté à 1.1rem pour le confort
    staticText: { fontSize: '1.1rem', margin: 0, padding: '8px 0', color: '#E9E3E3' },
    input: { width: '100%', padding: '14px 18px', borderRadius: '8px', border: '1px solid rgba(201, 162, 77, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.03)', color: '#E9E3E3', fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' },

    editBtn: { backgroundColor: 'transparent', border: '1px solid #C9A24D', color: '#C9A24D', padding: '8px 20px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', transition: 'all 0.3s ease', fontSize: '0.95rem' },
    saveBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '10px 22px', borderRadius: '50px', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' },
    cancelBtn: { backgroundColor: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '10px 22px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.95rem' },

    daSmallBtn: { backgroundColor: 'transparent', border: '1px solid rgba(233, 227, 227, 0.3)', color: '#E9E3E3', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s ease' },
    divider: { height: '1px', backgroundColor: 'rgba(201, 162, 77, 0.15)', margin: '10px 0' },

    orderCard: { backgroundColor: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' },
    orderInfo: { display: 'flex', flexDirection: 'column', gap: '5px' },
    orderId: { fontWeight: '700', fontSize: '1.15rem', color: '#E9E3E3' },
    orderDate: { fontSize: '0.95rem', color: '#aaa' },
    orderActions: { display: 'flex', alignItems: 'center', gap: '25px' },
    // Prix commande bien visible à 1.4rem
    orderPrice: { fontWeight: '700', fontSize: '1.4rem', color: '#C9A24D' },
    daActionBtn: { backgroundColor: '#C9A24D', border: 'none', color: '#373735', padding: '12px 25px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.95rem' },
    emptyOrders: { textAlign: 'center', padding: '40px', opacity: 0.5, fontSize: '1.1rem' },

    dangerZone: { padding: '35px', backgroundColor: 'rgba(255, 77, 77, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 77, 77, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
    dangerTitle: { color: '#ff6b6b', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' },
    dangerText: { color: '#373735', fontSize: '1rem', maxWidth: '500px' },
    dangerBtn: { backgroundColor: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '12px 25px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.95rem' },

    loading: { textAlign: 'center', padding: '150px', fontSize: '1.5rem', color: '#373735', fontFamily: "'Playfair Display', serif" },
    toast: { position: 'fixed', bottom: '40px', right: '40px', backgroundColor: '#C9A24D', color: '#373735', padding: '18px 30px', borderRadius: '50px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '800', zIndex: 9999, fontSize: '1.1rem' }
};

export default Compte;