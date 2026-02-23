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

    const handleQtyChange = (id, delta) => {
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
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
                .promo-card { transition: all 0.4s ease; border: 2px solid #373735; flex: 0 0 auto; }
                .promo-card:hover { border-color: #C9A24D; transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
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

                        return (
                            <div key={itemId} style={styles.card} className="promo-card">
                                {/* Zone cliquable (Image + Infos) */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/produit/${itemId}`)}>
                                    <div style={styles.imageArea}>
                                        <div style={styles.badge}>{item.numero_promotion}</div>
                                        <img src={`${apiUrl}/images/${item.image}`} alt={item.nom_produit} style={styles.img} />
                                    </div>

                                    <div style={styles.infoArea}>
                                        <h4 style={styles.prodName}>{item.nom_produit}</h4>
                                        <p style={styles.prodDesc}>{item.description}</p>
                                        <span style={styles.price}>{item.prix_ttc} €</span>
                                    </div>
                                </div>

                                {/* Actions (Quantité + Panier) */}
                                <div style={styles.quickAction}>
                                    <div style={styles.qtySelector}>
                                        <button style={styles.qtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, -1); }}><FiMinus/></button>
                                        <span style={styles.qtyVal}>{currentQty}</span>
                                        <button style={styles.qtyBtn} onClick={(e) => { e.stopPropagation(); handleQtyChange(itemId, 1); }}><FiPlus/></button>
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
    mainTitle: { marginLeft: "5%", fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#373735", marginBottom: "40px" },
    sliderWrapper: { display: "flex", alignItems: "center", position: "relative", padding: "0 5%", gap: "20px" },
    carouselContainer: { display: "flex", gap: "30px", overflowX: "auto", scrollBehavior: "smooth", padding: "20px 5px", width: "100%" },
    arrow: { fontSize: "45px", color: "#373735", cursor: "pointer", transition: "0.3s", flexShrink: 0 },
    card: { width: "320px", backgroundColor: "#373735", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer" },
    imageArea: { height: "200px", backgroundColor: "#FFF", position: "relative" },
    badge: { position: "absolute", top: "15px", right: "15px", backgroundColor: "#C9A24D", color: "#FFF", padding: "5px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: "bold", zIndex: 2 },
    img: { width: "100%", height: "100%", objectFit: "cover" },
    infoArea: { padding: "20px", color: "#E9E3E3" },
    prodName: { color: "#C9A24D", fontSize: "18px", fontFamily: "'Playfair Display', serif", margin: "0 0 10px 0" },
    prodDesc: { fontSize: "12px", opacity: 0.8, height: "35px", overflow: "hidden", marginBottom: "15px" },
    price: { fontSize: "20px", fontWeight: "bold", display: "block" },
    quickAction: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", backgroundColor: "rgba(0,0,0,0.2)", marginTop: "auto" },
    qtySelector: { display: "flex", alignItems: "center", backgroundColor: "#E9E3E3", borderRadius: "20px", padding: "4px 10px", gap: "12px" },
    qtyBtn: { border: "none", background: "none", cursor: "pointer", color: "#373735", display: "flex" },
    qtyVal: { color: "#373735", fontWeight: "bold", fontSize: "14px", minWidth: "20px", textAlign: "center" },
    addToCart: { backgroundColor: "#C9A24D", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#373735" }
};

export default Promotions;