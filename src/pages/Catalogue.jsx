import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
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

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";

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

    const handleQtyChange = (id, delta, stockDisponible) => {
        setQuantities(prev => {
            const current = parseInt(prev[id], 10) || 1;
            const next = current + delta;
            if (next >= 1 && next <= stockDisponible) {
                return { ...prev, [id]: next };
            }
            return prev;
        });
    };

    const handleInputChange = (id, value, stockDisponible) => {
        if (value === "") {
            setQuantities(prev => ({ ...prev, [id]: "" }));
            return;
        }
        const val = parseInt(value, 10);
        if (!isNaN(val)) {
            const safeVal = Math.max(1, Math.min(val, stockDisponible));
            setQuantities(prev => ({ ...prev, [id]: safeVal }));
        }
    };

    const renderSection = (title, filterFn, sectionKey) => {
        const list = produits.filter(item => {
            const matchesCategory = filterFn(item);
            const matchesSearch = item.nom_produit.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (list.length === 0) return null;

        const normalizedFilter = filter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedKey = sectionKey.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (filter !== "Tous" && normalizedKey !== normalizedFilter) return null;

        const isExpanded = expandedSections[sectionKey];
        const displayedList = (isExpanded || filter !== "Tous" || searchTerm !== "") ? list : list.slice(0, 8);

        return (
            <section style={styles.section}>
                <h2 style={styles.titleSection}>{title}</h2>
                <div style={styles.gridContainer}>
                    {displayedList.map((item) => {
                        const itemId = item.numero_produit;
                        const currentQty = quantities[itemId] || 1;
                        const isOutOfStock = item.stock <= 0;

                        return (
                            <div key={itemId} style={styles.card} className={`catalogue-card ${isOutOfStock ? "card-out-of-stock" : ""}`}>
                                <div onClick={() => !isOutOfStock && navigate(`/produit/${itemId}`)} style={{cursor: isOutOfStock ? 'default' : 'pointer', flex: 1, position: 'relative'}}>
                                    {isOutOfStock && (
                                        <div className="out-of-stock-overlay">
                                            <span className="out-of-stock-text">RUPTURE</span>
                                        </div>
                                    )}

                                    <div style={{...styles.stockBadge, backgroundColor: isOutOfStock ? "#666" : "#2A9D8F"}}>
                                        {isOutOfStock ? "Indisponible" : `Stock : ${item.stock}`}
                                    </div>

                                    {item.numero_promotion && item.numero_promotion !== "NO_PROMO" && !isOutOfStock && (
                                        <div style={styles.promoBadge}>{item.numero_promotion}</div>
                                    )}

                                    <div style={styles.imageContainer}>
                                        <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.img} className="catalogue-img" />
                                    </div>
                                    <div style={styles.infoContainer}>
                                        <h4 style={styles.productName}>{item.nom_produit}</h4>
                                        <p style={styles.productDesc}>{item.description}</p>
                                        <span style={styles.price}>{Number(item.prix_ttc).toFixed(2)} €</span>
                                    </div>
                                </div>

                                <div style={styles.quickAction}>
                                    {!isOutOfStock ? (
                                        <>
                                            <div style={styles.miniQtySelector}>
                                                <button style={styles.miniQtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, -1, item.stock); }}><FiMinus/></button>
                                                <input
                                                    type="text"
                                                    style={styles.miniQtyInput}
                                                    value={quantities[itemId] || 1}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => handleInputChange(itemId, e.target.value, item.stock)}
                                                    onBlur={() => { if (!quantities[itemId]) setQuantities(prev => ({ ...prev, [itemId]: 1 })); }}
                                                />
                                                <button style={styles.miniQtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, 1, item.stock); }}><FiPlus/></button>
                                            </div>
                                            <button
                                                className="add-btn-cat"
                                                style={styles.addToCartBtn}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart({ ...item, id_produit: itemId }, currentQty);
                                                }}
                                            >
                                                <FiShoppingBag size={20} />
                                            </button>
                                        </>
                                    ) : (
                                        <div style={styles.outOfStockMsg}>Victime de son succès</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* LOGIQUE VOIR PLUS RÉINTÉGRÉE */}
                {list.length > 8 && searchTerm === "" && filter === "Tous" && (
                    <div style={styles.viewMoreContainer}>
                        <button
                            className="view-more-btn"
                            style={styles.viewMoreBtn}
                            onClick={() => setExpandedSections(prev => ({...prev, [sectionKey]: !isExpanded}))}
                        >
                            {isExpanded ? (
                                <>Voir moins <FiChevronUp /></>
                            ) : (
                                <>Voir plus ({list.length - 8} de plus) <FiChevronDown /></>
                            )}
                        </button>
                    </div>
                )}
            </section>
        );
    };

    if (loading) return <div style={styles.loading}>Chargement de l'univers...</div>;

    return (
        <div style={{ backgroundColor: "#E9E3E3", minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px" }}>
            <style>
                {`
                .catalogue-card { border: 2px solid #373735; transition: all 0.4s ease; position: relative; }
                .catalogue-card:hover { transform: translateY(-10px); border-color: #C9A24D; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .card-out-of-stock { opacity: 0.6; filter: grayscale(0.9); pointer-events: none; }
                .out-of-stock-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 230px; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 10; }
                .out-of-stock-text { background-color: #E63946; color: white; padding: 8px 20px; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 20px; transform: rotate(-12deg); border: 2px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
                .filter-bubble { transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 15px; }
                .filter-bubble:hover .img-container { transform: scale(1.08); box-shadow: 0 10px 20px rgba(201, 162, 77, 0.3); }
                .bubble-active .img-container { border-color: #373735 !important; background-color: #C9A24D !important; }
                .bubble-active span { color: #C9A24D; font-weight: 800; text-decoration: underline; }
                .add-btn-cat:hover { background-color: #FFF !important; transform: scale(1.1); color: #373735 !important; }
                .view-more-btn { transition: all 0.3s ease; }
                .view-more-btn:hover { background-color: #373735 !important; color: #C9A24D !important; }
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
                        <div key={cat.label} className={`filter-bubble ${filter === cat.label ? "bubble-active" : ""}`} onClick={() => setFilter(filter === cat.label ? "Tous" : cat.label)}>
                            <div className="img-container" style={styles.bubbleImgContainer}>
                                <img src={cat.img} style={styles.bubbleImg} alt={cat.label} />
                            </div>
                            <span style={styles.bubbleLabel}>{cat.label}s</span>
                        </div>
                    ))}
                </div>
            </div>

            {renderSection("Nos offres et promotions", p => p.numero_promotion && p.numero_promotion !== "NO_PROMO", "promo")}
            {renderSection("Nos cafés", p => p.categorie === "Café", "cafe")}
            {renderSection("Nos thés", p => p.categorie === "Thé", "the")}
            {renderSection("Nos accessoires", p => p.categorie === "Accessoire", "accessoire")}
        </div>
    );
};

const styles = {
    section: { width: "100%", padding: "40px 0" },
    titleSection: { marginLeft: "5%", fontFamily: "'Playfair Display', serif", color: "#373735", fontSize: "2.25rem", marginBottom: "35px" },
    gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "45px", padding: "0 5%" },
    card: { height: "550px", backgroundColor: "#373735", borderRadius: "25px", display: "flex", flexDirection: "column", overflow: "hidden" },
    stockBadge: { position: "absolute", top: "18px", left: "18px", padding: "6px 14px", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "800", zIndex: 11, color: "#FFF" },
    promoBadge: { position: "absolute", top: "18px", right: "18px", backgroundColor: "#C9A24D", color: "#373735", padding: "6px 14px", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "900", zIndex: 11 },
    imageContainer: { height: "230px", width: "100%", overflow: "hidden", backgroundColor: "white", position: 'relative' },
    img: { width: "100%", height: "100%", objectFit: "cover" },
    infoContainer: { padding: "25px", color: "#E9E3E3", flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
    productName: { color: "#C9A24D", fontSize: "1.5rem", margin: "0", fontFamily: "'Playfair Display', serif", fontWeight: '700' },
    productDesc: { fontSize: "1.05rem", opacity: 0.85, height: "45px", overflow: "hidden", lineHeight: '1.4' },
    price: { fontSize: "1.75rem", fontWeight: "900", color: "#FFF", marginTop: "10px", display: "block" },
    quickAction: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 25px", backgroundColor: "rgba(0,0,0,0.3)", marginTop: "auto" },
    miniQtySelector: { display: "flex", alignItems: "center", backgroundColor: "#E9E3E3", borderRadius: "25px", padding: "8px 15px", gap: "12px" },
    miniQtyBtn: { border: "none", background: "none", cursor: "pointer", color: "#373735", fontSize: '1.25rem', display: "flex", fontWeight: 'bold' },
    miniQtyInput: { width: "40px", border: "none", background: "transparent", textAlign: "center", color: "#373735", fontWeight: "900", fontSize: "1rem", outline: "none", padding: "0" },
    addToCartBtn: { backgroundColor: "#C9A24D", border: "none", borderRadius: "50%", width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#373735", transition: "0.3s" },
    outOfStockMsg: { width: "100%", textAlign: "center", color: "#E63946", fontWeight: "900", fontSize: "1rem", textTransform: "uppercase" },
    viewMoreContainer: { width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" },
    viewMoreBtn: { display: "flex", alignItems: "center", gap: "10px", backgroundColor: "transparent", border: "2px solid #373735", borderRadius: "30px", padding: "12px 30px", color: "#373735", fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer" },
    filterArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: "35px", marginBottom: "60px" },
    filterTitle: { fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", color: "#373735", fontWeight: '900' },
    bubbleGroup: { display: "flex", gap: "50px", justifyContent: "center", flexWrap: "wrap" },
    bubbleImgContainer: { width: "135px", height: "135px", borderRadius: "50%", backgroundColor: "#FFF", border: "3px solid #C9A24D", display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    bubbleImg: { width: "100%", height: "100%", objectFit: "cover" },
    bubbleLabel: { fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: "bold", color: "#373735" },
    loading: { textAlign: 'center', padding: '100px', color: '#373735', fontFamily: 'Playfair Display', fontSize: '1.75rem' }
};

export default Catalogue;