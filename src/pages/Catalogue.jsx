import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiX, FiPlus, FiMinus, FiShoppingBag, FiRefreshCw } from "react-icons/fi";
import { useCard } from "../context/CardContext.jsx";

const Catalogue = () => {
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState({});
    const [filter, setFilter] = useState("Tous");
    const [quantities, setQuantities] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCard();
    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/produits`);
                const data = await response.json();
                setProduits(Array.isArray(data) ? data : (data.produits || []));
            } catch (err) {
                console.error("Erreur Fetch:", err.message);
                setProduits([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProduits();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filterParam = params.get("filter");
        if (filterParam) setFilter(filterParam);
    }, [location]);

    const handleQtyChange = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta)
        }));
    };

    const renderSection = (title, filterFn, sectionKey) => {
        const list = produits.filter(filterFn);
        if (list.length === 0) return null;

        const normalizedFilter = filter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedKey = sectionKey.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (filter !== "Tous" && normalizedKey !== normalizedFilter) return null;

        const isExpanded = expandedSections[sectionKey];
        const displayedList = (isExpanded || filter !== "Tous") ? list : list.slice(0, 8);

        return (
            <section style={styles.section}>
                <h2 style={styles.titleSection}>{title}</h2>
                <div style={styles.gridContainer}>
                    {displayedList.map((item) => {
                        const itemId = item.numero_produit;
                        const currentQty = quantities[itemId] || 1;

                        return (
                            <div key={itemId} style={styles.card} className="catalogue-card">
                                <div onClick={() => navigate(`/produit/${itemId}`)} style={{cursor: 'pointer', flex: 1}}>
                                    {item.numero_promotion && <div style={styles.promoBadge}>{item.numero_promotion}</div>}
                                    <div style={styles.imageContainer}>
                                        <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.img} className="catalogue-img" />
                                    </div>
                                    <div style={styles.infoContainer}>
                                        <h4 style={styles.productName}>{item.nom_produit}</h4>
                                        <p style={styles.productDesc}>{item.description}</p>
                                        <span style={styles.price}>{item.prix_ttc} €</span>
                                    </div>
                                </div>

                                <div style={styles.quickAction}>
                                    <div style={styles.miniQtySelector}>
                                        <button style={styles.miniQtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, -1); }}><FiMinus/></button>
                                        <span style={styles.miniQtyVal}>{currentQty}</span>
                                        <button style={styles.miniQtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, 1); }}><FiPlus/></button>
                                    </div>
                                    <button
                                        className="add-btn-cat"
                                        style={styles.addToCartBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart({ ...item, id_produit: itemId }, currentQty);
                                        }}
                                    >
                                        <FiShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {list.length > 8 && filter === "Tous" && (
                    <div style={styles.viewMoreContainer}>
                        <button
                            style={isExpanded ? styles.viewMoreButtonActive : styles.viewMoreButton}
                            onClick={() => setExpandedSections(prev => ({...prev, [sectionKey]: !isExpanded}))}
                        >
                            {isExpanded ? <><FiChevronUp /> Voir moins</> : <><FiChevronDown /> Voir tous les produits ({list.length})</>}
                        </button>
                    </div>
                )}
            </section>
        );
    };

    if (loading) return <div style={styles.loading}>Chargement...</div>;

    return (
        <div style={{ backgroundColor: "#E9E3E3", minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px" }}>
            <style>
                {`
                .catalogue-card { border: 2px solid #373735; transition: all 0.4s ease; }
                .catalogue-card:hover { transform: translateY(-10px); border-color: #C9A24D; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .catalogue-card:hover .catalogue-img { transform: scale(1.1); }
                .add-btn-cat:hover { background-color: #FFF !important; transform: scale(1.1); color: #373735 !important; }
                
                /* Filtres stylisés comme l'accueil */
                .filter-card { transition: all 0.3s ease; cursor: pointer; border-radius: 20px; }
                .filter-card:hover { transform: translateY(-5px); background-color: #FFF !important; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
                .bubble-active { border-bottom: 4px solid #C9A24D !important; background-color: #FFF !important; }

                /* Hover simple bouton réinitialiser */
                .reset-btn-simple:hover { opacity: 0.8; transform: scale(0.98); transition: 0.3s; }
                `}
            </style>

            <div style={styles.filterArea}>
                <h3 style={styles.filterTitle}>Explorez notre catalogue</h3>
                <div style={styles.bubbleGroup}>
                    {[
                        { label: "Café", img: "/cafe_icon.webp" },
                        { label: "Thé", img: "/the_icon.webp" },
                        { label: "Accessoire", img: "/accessoires_icon.webp" }
                    ].map(cat => (
                        <div
                            key={cat.label}
                            className={`filter-card ${filter === cat.label ? "bubble-active" : ""}`}
                            style={styles.bubble}
                            onClick={() => setFilter(filter === cat.label ? "Tous" : cat.label)}
                        >
                            <div style={styles.bubbleImgContainer}>
                                <img src={cat.img} style={styles.bubbleImg} alt={cat.label} />
                            </div>
                            <span style={styles.bubbleLabel}>{cat.label}s</span>
                        </div>
                    ))}
                </div>
                {filter !== "Tous" && (
                    <button className="reset-btn-simple" style={styles.resetFilter} onClick={() => setFilter("Tous")}>
                        <FiRefreshCw /> Réinitialiser les filtres
                    </button>
                )}
            </div>

            {filter === "Tous" && renderSection("Nos offres et promotions",
                p => p.numero_promotion && p.numero_promotion !== "NO_PROMO",
                "promo"
            )}
            {renderSection("Nos cafés", p => p.categorie === "Café", "cafe")}
            {renderSection("Nos thés", p => p.categorie === "Thé", "the")}
            {renderSection("Nos accessoires", p => p.categorie === "Accessoire", "accessoire")}
        </div>
    );
};

const styles = {
    section: { width: "100%", padding: "40px 0" },
    titleSection: { marginLeft: "5%", fontFamily: "'Playfair Display', serif", color: "#373735", fontSize: "30px", marginBottom: "30px" },
    gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "35px", padding: "0 5%" },
    card: { height: "520px", backgroundColor: "#373735", borderRadius: "20px", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" },
    promoBadge: { position: "absolute", top: "15px", right: "15px", backgroundColor: "#C9A24D", color: "white", padding: "5px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", zIndex: 5 },
    imageContainer: { height: "220px", width: "100%", overflow: "hidden", backgroundColor: "white" },
    img: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" },
    infoContainer: { padding: "20px", color: "#E9E3E3", flexGrow: 1 },
    productName: { color: "#C9A24D", fontSize: "19px", margin: "0 0 10px 0", fontFamily: "'Playfair Display', serif" },
    productDesc: { fontSize: "13px", opacity: 0.8, height: "40px", overflow: "hidden" },
    price: { fontSize: "22px", fontWeight: "bold", color: "#FFF", marginTop: "10px", display: "block" },
    quickAction: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "rgba(0,0,0,0.2)", marginTop: "auto" },
    miniQtySelector: { display: "flex", alignItems: "center", backgroundColor: "#E9E3E3", borderRadius: "20px", padding: "5px 10px", gap: "10px" },
    miniQtyBtn: { border: "none", background: "none", cursor: "pointer", color: "#373735", display: "flex" },
    miniQtyVal: { color: "#373735", fontWeight: "bold" },
    addToCartBtn: { backgroundColor: "#C9A24D", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#373735", transition: "0.3s" },

    // FILTRES
    filterArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginBottom: "40px" },
    filterTitle: { fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#373735", fontWeight: 'bold' },
    bubbleGroup: { display: "flex", gap: "30px" },
    bubble: { width: "150px", padding: "20px", backgroundColor: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
    bubbleImgContainer: { width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#FFF", border: "2px solid #C9A24D", display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    bubbleImg: { width: "70%", height: "70%", objectFit: "contain" },
    bubbleLabel: { fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: "bold", color: "#373735" },

    // RÉINITIALISER
    resetFilter: { backgroundColor: "#373735", color: "#FFF", border: "none", borderRadius: "30px", padding: "10px 25px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: "bold" },

    viewMoreContainer: { display: "flex", justifyContent: "center", marginTop: "40px" },
    viewMoreButton: { backgroundColor: "#373735", color: "#C9A24D", border: "1.5px solid #C9A24D", padding: "12px 35px", borderRadius: "30px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" },
    viewMoreButtonActive: { backgroundColor: "#C9A24D", color: "#373735", border: "1.5px solid #C9A24D", padding: "12px 35px", borderRadius: "30px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" },
    loading: { textAlign: 'center', padding: '100px', color: '#373735', fontFamily: 'Playfair Display', fontSize: '24px' }
};

export default Catalogue;