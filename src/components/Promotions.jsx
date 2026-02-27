import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useCard } from "../context/CardContext.jsx";

const Promotions = () => {
    const [promos, setPromos] = useState([]);
    const [quantities, setQuantities] = useState({});
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const { addToCart } = useCard();
    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/produits`);
                const data = await response.json();
                const list = Array.isArray(data) ? data : (data.produits || []);

                // FILTRE : On affiche uniquement si ce n'est PAS "NO_PROMO"
                const filtered = list.filter(p =>
                    p.numero_promotion &&
                    p.numero_promotion !== "NO_PROMO"
                );

                setPromos(filtered);
            } catch (err) {
                console.error("Erreur chargement promos:", err);
            }
        };
        fetchPromos();
    }, []);

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

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 350;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    if (promos.length === 0) return null;

    return (
        <section style={styles.container}>
            <style>{`
                .promo-card { transition: all 0.4s ease; border: 2px solid #373735; flex: 0 0 auto; position: relative; }
                .promo-card:hover { border-color: #C9A24D; transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                
                /* STYLE RUPTURE */
                .promo-out-of-stock { opacity: 0.6; filter: grayscale(0.9); pointer-events: none; }
                .promo-overlay {
                    position: absolute; top: 0; left: 0; width: 100%; height: 200px; 
                    background: rgba(0,0,0,0.4); display: flex; align-items: center; 
                    justify-content: center; z-index: 10;
                }
                .promo-overlay-text {
                    background-color: #E63946; color: white; padding: 6px 15px;
                    font-family: 'Playfair Display', serif; font-weight: 900;
                    font-size: 16px; transform: rotate(-12deg); border: 2px solid white;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
                }

                .add-btn-promo:hover { background-color: #FFF !important; transform: scale(1.1); color: #373735 !important; }
                .arrow-btn:hover { color: #C9A24D !important; transform: scale(1.2); }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <h2 style={styles.mainTitle}>Nos offres et promotions</h2>

            <div style={styles.sliderWrapper}>
                <FiChevronLeft className="arrow-btn" style={styles.arrow} onClick={() => scroll('left')} />

                <div style={styles.carouselContainer} ref={scrollRef} className="hide-scrollbar">
                    {promos.map((item) => {
                        const itemId = item.numero_produit;
                        const currentQty = quantities[itemId] || 1;
                        const isOutOfStock = item.stock <= 0;

                        return (
                            <div key={itemId} style={styles.card} className={`promo-card ${isOutOfStock ? "promo-out-of-stock" : ""}`}>
                                {/* Zone cliquable */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }} onClick={() => !isOutOfStock && navigate(`/produit/${itemId}`)}>

                                    {/* VISUEL RUPTURE */}
                                    {isOutOfStock && (
                                        <div className="promo-overlay">
                                            <span className="promo-overlay-text">RUPTURE</span>
                                        </div>
                                    )}

                                    <div style={styles.imageArea}>
                                        {/* BADGE STOCK */}
                                        <div style={{
                                            ...styles.stockBadge,
                                            backgroundColor: isOutOfStock ? "#666" : "#2A9D8F"
                                        }}>
                                            {isOutOfStock ? "Indisponible" : `Stock : ${item.stock}`}
                                        </div>

                                        {/* BADGE PROMO (Contraste foncé) */}
                                        {!isOutOfStock && <div style={styles.badge}>{item.numero_promotion}</div>}

                                        <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.img} />
                                    </div>

                                    <div style={styles.infoArea}>
                                        <h4 style={styles.prodName}>{item.nom_produit}</h4>
                                        <p style={styles.prodDesc}>{item.description}</p>
                                        <span style={styles.price}>{Number(item.prix_ttc).toFixed(2)} €</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={styles.quickAction}>
                                    {!isOutOfStock ? (
                                        <>
                                            <div style={styles.qtySelector}>
                                                <button style={styles.qtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, -1, item.stock); }}><FiMinus/></button>
                                                <input
                                                    type="text"
                                                    style={styles.qtyInput}
                                                    value={quantities[itemId] || 1}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => handleInputChange(itemId, e.target.value, item.stock)}
                                                    onBlur={() => {
                                                        if (!quantities[itemId]) setQuantities(prev => ({ ...prev, [itemId]: 1 }));
                                                    }}
                                                />
                                                <button style={styles.qtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, 1, item.stock); }}><FiPlus/></button>
                                            </div>
                                            <button
                                                className="add-btn-promo"
                                                style={styles.addToCart}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart({ ...item, id_produit: itemId }, currentQty);
                                                }}
                                            >
                                                <FiShoppingBag size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <div style={{ color: "#E63946", fontWeight: "900", fontSize: "13px", width: "100%", textAlign: "center" }}>
                                            VICTIME DE SON SUCCÈS
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <FiChevronRight className="arrow-btn" style={styles.arrow} onClick={() => scroll('right')} />
            </div>
        </section>
    );
};

const styles = {
    container: { padding: "60px 0", backgroundColor: "#E9E3E3", overflow: "hidden" },
    // Titre harmonisé avec les autres sections (2.25rem ~ 36px)
    mainTitle: { marginLeft: "5%", fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", color: "#373735", marginBottom: "40px", fontWeight: "900" },
    sliderWrapper: { display: "flex", alignItems: "center", position: "relative", padding: "0 5%", gap: "20px" },
    carouselContainer: { display: "flex", gap: "30px", overflowX: "auto", scrollBehavior: "smooth", padding: "20px 5px", width: "100%" },
    arrow: { fontSize: "45px", color: "#373735", cursor: "pointer", transition: "0.3s", flexShrink: 0 },
    card: { width: "320px", height: "500px", backgroundColor: "#373735", borderRadius: "25px", overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer" },
    imageArea: { height: "200px", backgroundColor: "#FFF", position: "relative", overflow: "hidden" },

    // BADGES : Légèrement agrandis pour être lisibles au premier coup d'œil
    badge: { position: "absolute", top: "15px", right: "15px", backgroundColor: "#C9A24D", color: "#373735", padding: "5px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "900", zIndex: 5, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" },
    stockBadge: { position: "absolute", top: "15px", left: "15px", color: "white", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "bold", zIndex: 5, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" },

    img: { width: "100%", height: "100%", objectFit: "cover" },
    infoArea: { padding: "25px", color: "#E9E3E3", flexGrow: 1, display: "flex", flexDirection: "column", gap: "10px" },
    prodName: { color: "#C9A24D", fontSize: "1.5rem", fontFamily: "'Playfair Display', serif", margin: "0", fontWeight: "700" },
    // Description : Passage de 14px à 1rem (16px) pour le confort
    prodDesc: { fontSize: "1rem", opacity: 0.85, height: "45px", overflow: "hidden", lineHeight: "1.4" },
    price: { fontSize: "1.75rem", fontWeight: "900", color: "#FFF", marginTop: "auto" },

    quickAction: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "rgba(0,0,0,0.3)", marginTop: "auto" },
    qtySelector: { display: "flex", alignItems: "center", backgroundColor: "#E9E3E3", borderRadius: "20px", padding: "5px 12px", gap: "10px" },
    qtyBtn: { border: "none", background: "none", cursor: "pointer", color: "#373735", display: "flex", fontWeight: "bold" },
    qtyInput: { width: "35px", border: "none", background: "transparent", textAlign: "center", color: "#373735", fontWeight: "900", fontSize: "1rem", outline: "none", padding: "0" },
    addToCart: { backgroundColor: "#C9A24D", border: "none", borderRadius: "50%", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#373735", transition: "0.3s" }
};

export default Promotions;