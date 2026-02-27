import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiShoppingBag, FiUser, FiSearch, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCard } from "../context/CardContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const { cart } = useCard();

    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('search');
        if (q) setSearchQuery(q);
    }, [location.search]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== "") {
            navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false);
        }
    };

    const isConnected = !!user || !!localStorage.getItem('token');
    const totalArticles = cart.reduce((acc, item) => acc + item.quantite, 0);

    return (
        <header style={styles.header}>
            <style>
                {`
                .header-main-container, .nav-container { box-sizing: border-box !important; }
                
                /* FIX DESKTOP : On force le comportement horizontal */
                @media (min-width: 993px) {
                    .nav-container {
                        display: flex !important;
                        flex-direction: row !important;
                        justify-content: space-between !important;
                        width: 100% !important;
                        position: static !important;
                        height: auto !important;
                        background: transparent !important;
                        transform: none !important;
                        visibility: visible !important;
                    }
                }

                @media (max-width: 992px) {
                    .nav-container {
                        position: fixed;
                        top: 85px;
                        left: 0;
                        width: 100%;
                        height: calc(100vh - 85px);
                        background-color: #373735;
                        flex-direction: column !important;
                        justify-content: center !important; 
                        padding: 20px !important;
                        transition: 0.4s cubic-bezier(0.77,0.2,0.05,1.0);
                        gap: 25px !important; 
                        transform: ${isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
                        visibility: ${isMenuOpen ? "visible" : "hidden"};
                    }
                    .mobile-toggle { display: flex !important; }
                    .search-box { margin-bottom: 10px !important; width: 100% !important; max-width: 320px !important; }
                    .actions-box { width: 100%; justify-content: center !important; gap: 40px !important; } 
                }
                
                @media (max-width: 480px) {
                    .header-main-container { padding: 0 15px !important; }
                    .logo-img { height: 60px !important; }
                }
                `}
            </style>

            <div style={styles.container} className="header-main-container">
                <div style={styles.sectionSide}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <img src="/logo1.webp" alt="CafThé" style={styles.logo} className="logo-img" />
                    </Link>
                </div>

                <div style={styles.mobileToggle} className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FiX size={32} color="#E9E3E3" /> : <FiMenu size={32} color="#E9E3E3" />}
                </div>

                <nav style={styles.navWrapper} className="nav-container">
                    <div style={styles.sectionCenter} className="search-box">
                        <div style={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                            <FiSearch style={styles.searchIcon} />
                        </div>
                    </div>

                    <div style={styles.sectionSideRight} className="actions-box">
                        <div style={styles.iconWrapper} onClick={() => { navigate("/panier"); setIsMenuOpen(false); }}>
                            <FiShoppingBag size={28} />
                            {totalArticles > 0 && <span style={styles.badge}>{totalArticles}</span>}
                        </div>
                        <div style={styles.iconWrapper} onClick={() => { navigate(isConnected ? "/compte" : "/login"); setIsMenuOpen(false); }}>
                            <FiUser size={28} />
                        </div>
                        {isConnected && (
                            <div style={styles.userControls}>
                                <FiLogOut size={22} style={styles.logoutIcon} onClick={() => { logout(); navigate("/login"); setIsMenuOpen(false); }} />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

const styles = {
    header: { width: "100%", height: "85px", backgroundColor: "#373735", position: "fixed", top: 0, left: 0, zIndex: 1000, display: "flex", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" },
    container: { width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" },
    sectionSide: { flex: "1" }, // Réajusté pour l'équilibre desktop
    navWrapper: { display: "flex", flex: "3", alignItems: "center", justifyContent: "space-between" },
    sectionCenter: { flex: "2", display: "flex", justifyContent: "center" },
    sectionSideRight: { flex: "1", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "25px" },
    logo: { height: "80px", cursor: "pointer" },
    mobileToggle: { display: "none", cursor: "pointer" },
    searchWrapper: { position: "relative", width: "100%", maxWidth: "400px", display: "flex", alignItems: "center" },
    searchInput: { width: "100%", padding: "10px 45px 10px 20px", borderRadius: "30px", border: "none", backgroundColor: "#E9E3E3", fontSize: "1rem", outline: "none", color: "#373735" },
    searchIcon: { position: "absolute", right: "15px", color: "#373735" },
    iconWrapper: { position: "relative", cursor: "pointer", color: "#E9E3E3" },
    badge: { position: "absolute", top: "-8px", right: "-10px", backgroundColor: "#C9A24D", color: "#373735", fontSize: "12px", borderRadius: "50%", width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center" },
    userControls: { display: "flex", alignItems: "center", gap: "15px", borderLeft: "1px solid rgba(233, 227, 227, 0.2)", paddingLeft: "15px" },
    logoutIcon: { cursor: "pointer", color: "#E9E3E3" }
};

export default Header;