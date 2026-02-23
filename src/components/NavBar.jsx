import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingBag, FiUser, FiSearch, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cart } = useCard();

    const [hvrCart, setHvrCart] = useState(false);
    const [hvrUser, setHvrUser] = useState(false);
    const [hvrOut, setHvrOut] = useState(false);

    // CORRECTIF : On cherche le prénom dans le contexte OU dans le localStorage pour le refresh
    const prenomAffiche = user?.prenom_client || user?.prenom || localStorage.getItem('userPrenom');

    const totalArticles = cart.reduce((acc, item) => acc + item.quantite, 0);

    // Fonction de déconnexion propre
    const handleLogout = () => {
        logout(); // Appelle la fonction du AuthContext qui doit vider le localStorage
        navigate("/login");
    };

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <div style={styles.sectionSide}>
                    <Link to="/">
                        <img src="/logo1.webp" alt="Logo" style={styles.logo} />
                    </Link>
                </div>

                <div style={styles.sectionCenter}>
                    <div style={styles.searchWrapper}>
                        <input type="text" placeholder="Rechercher un produit..." style={styles.searchInput} />
                        <FiSearch style={styles.searchIcon} />
                    </div>
                </div>

                <div style={styles.sectionSideRight}>
                    <div
                        style={{...styles.iconWrapper, color: hvrCart ? "#C9A24D" : "#E9E3E3"}}
                        onMouseEnter={() => setHvrCart(true)}
                        onMouseLeave={() => setHvrCart(false)}
                        onClick={() => navigate("/panier")}
                    >
                        <FiShoppingBag size={28} />
                        {totalArticles > 0 && <span style={styles.badge}>{totalArticles}</span>}
                    </div>

                    <div
                        style={{...styles.iconWrapper, color: hvrUser ? "#C9A24D" : "#E9E3E3"}}
                        onMouseEnter={() => setHvrUser(true)}
                        onMouseLeave={() => setHvrUser(false)}
                        onClick={() => navigate(user || localStorage.getItem('token') ? "/compte" : "/login")}
                    >
                        <FiUser size={28} />
                    </div>

                    {/* CORRECTIF : On vérifie l'user OU le token pour l'affichage permanent */}
                    {(user || localStorage.getItem('token')) && (
                        <div style={styles.userControls}>
                            <span style={styles.welcomeText}>Bonjour, {prenomAffiche || 'Client'}</span>
                            <FiLogOut
                                size={22}
                                style={{...styles.logoutIcon, color: hvrOut ? "#C9A24D" : "#E9E3E3"}}
                                onMouseEnter={() => setHvrOut(true)}
                                onMouseLeave={() => setHvrOut(false)}
                                onClick={handleLogout}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: { width: "100%", height: "85px", backgroundColor: "#373735", position: "fixed", top: 0, left: 0, zIndex: 1000, display: "flex", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" },
    container: { width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" },
    sectionSide: { flex: "1 1 200px" },
    sectionCenter: { flex: "2", display: "flex", justifyContent: "center" },
    sectionSideRight: { flex: "1 1 auto", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "25px" },
    logo: { height: "80px", cursor: "pointer" },
    searchWrapper: { position: "relative", width: "100%", maxWidth: "400px", display: "flex", alignItems: "center" },
    searchInput: { width: "100%", padding: "12px 45px 12px 20px", borderRadius: "30px", border: "none", backgroundColor: "#E9E3E3", fontSize: "14px", outline: "none", color: "#373735" },
    searchIcon: { position: "absolute", right: "15px", color: "#373735", fontSize: "20px", pointerEvents: "none" },
    iconWrapper: { position: "relative", cursor: "pointer", transition: "color 0.3s ease, transform 0.2s ease", display: "flex", alignItems: "center" },
    badge: { position: "absolute", top: "-8px", right: "-10px", backgroundColor: "#C9A24D", color: "#373735", fontSize: "11px", fontWeight: "bold", borderRadius: "50%", width: "19px", height: "19px", display: "flex", justifyContent: "center", alignItems: "center", border: "1.5px solid #373735" },
    userControls: { display: "flex", alignItems: "center", gap: "15px", borderLeft: "1px solid rgba(233, 227, 227, 0.2)", paddingLeft: "15px", marginLeft: "5px" },
    welcomeText: { color: "#C9A24D", fontSize: "14px", fontWeight: "bold" },
    logoutIcon: { cursor: "pointer", transition: "color 0.3s ease" }
};

export default Header;