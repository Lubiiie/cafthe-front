import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiX, FiShoppingBag, FiMapPin, FiPlus, FiMinus } from "react-icons/fi";
import { useCard } from "../context/CardContext.jsx";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const { addToCart } = useCard();

    const [produit, setProduit] = useState(null);
    const [similaires, setSimilaires] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantite, setQuantite] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [quantitesSimilaires, setQuantitesSimilaires] = useState({});

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/produits/${id}`);
                const data = await response.json();
                const currentProd = data.produit || data;
                setProduit(currentProd);

                const resSim = await fetch(`${apiUrl}/api/produits`);
                const dataSim = await resSim.json();
                const list = Array.isArray(dataSim) ? dataSim : (dataSim.produits || []);

                const filtered = list.filter(p =>
                    p.categorie === currentProd.categorie &&
                    p.numero_produit !== currentProd.numero_produit
                ).slice(0, 3);

                setSimilaires(filtered);

                const qtys = {};
                filtered.forEach(p => qtys[p.numero_produit] = 1);
                setQuantitesSimilaires(qtys);

            } catch (err) {
                console.error("Erreur BDD:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduit();
    }, [id, apiUrl]);

    const handleMainQtyChange = (delta) => {
        const next = (parseInt(quantite, 10) || 1) + delta;
        if (next >= 1 && next <= produit.stock) setQuantite(next);
    };

    const handleMainInputChange = (value) => {
        if (value === "") { setQuantite(""); return; }
        const val = parseInt(value, 10);
        if (!isNaN(val)) {
            setQuantite(Math.max(1, Math.min(val, produit.stock)));
        }
    };

    const handleQtySim = (prodId, delta, stockMax) => {
        setQuantitesSimilaires(prev => {
            const current = parseInt(prev[prodId], 10) || 1;
            const next = current + delta;
            if (next >= 1 && next <= stockMax) {
                return { ...prev, [prodId]: next };
            }
            return prev;
        });
    };

    const handleInputSim = (prodId, value, stockMax) => {
        if (value === "") {
            setQuantitesSimilaires(prev => ({ ...prev, [prodId]: "" }));
            return;
        }
        const val = parseInt(value, 10);
        if (!isNaN(val)) {
            const safeVal = Math.max(1, Math.min(val, stockMax));
            setQuantitesSimilaires(prev => ({ ...prev, [prodId]: safeVal }));
        }
    };

    if (isLoading) return <div style={{textAlign: 'center', padding: '100px', color: '#FFF', fontFamily: 'Playfair Display', fontSize: '24px'}}>Chargement de l'univers...</div>;
    if (!produit) return null;

    const isOutOfStock = produit.stock <= 0;

    return (
        <div style={styles.overlay}>
            <style>
                {`
                .close-btn:hover { color: #C9A24D !important; transform: rotate(90deg); transition: 0.3s; }
                .sim-card { transition: all 0.4s ease; border: 2px solid transparent; }
                .sim-card:hover { transform: translateY(-8px); border-color: #C9A24D; box-shadow: 0 15px 30px rgba(0,0,0,0.4); }
                .sim-card-out { opacity: 0.5; filter: grayscale(1); pointer-events: none; }
                
                .qty-input-main { width: 50px; border: none; text-align: center; font-weight: 900; font-size: 20px; color: #373735; outline: none; background: transparent; }
                .qty-input-sim { width: 30px; border: none; background: transparent; text-align: center; font-weight: 800; font-size: 14px; color: #FFF; outline: none; }
                
                .cart-btn-premium { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; white-space: nowrap; flex-shrink: 0; }
                .cart-btn-premium:disabled { background-color: #666 !important; cursor: not-allowed; opacity: 0.7; }
                .plus-circle:hover { background-color: #C9A24D; color: #373735 !important; transition: 0.3s; }
                `}
            </style>

            <div style={styles.container}>
                <FiX style={styles.closeBtn} className="close-btn" onClick={() => navigate(-1)} />

                <div style={styles.imageWrapper}>
                    {isOutOfStock && <div style={styles.ruptureBadge}>RUPTURE DE STOCK</div>}
                    <img src={`${apiUrl}/images/${produit.image}`} alt={produit.nom_produit} style={{...styles.mainImage, opacity: isOutOfStock ? 0.5 : 1}} />
                </div>

                <div style={styles.content}>
                    <h1 style={styles.title}>{produit.nom_produit}</h1>
                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <span style={{
                            padding: '5px 15px',
                            borderRadius: '20px',
                            backgroundColor: isOutOfStock ? '#E63946' : '#2A9D8F',
                            color: '#FFF',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                            {isOutOfStock ? "Indisponible actuellement" : `En stock : ${produit.stock} unités`}
                        </span>
                    </div>

                    <hr style={styles.divider} />
                    <p style={styles.description}>{produit.description}</p>

                    <div style={styles.infoSection}>
                        <h3 style={styles.subTitle}>Origines</h3>
                        <div style={styles.originBox}>
                            <FiMapPin size={24} color="#C9A24D" />
                            <span style={styles.originText}>{produit.origine || "Sélection Cafthé"}</span>
                        </div>
                    </div>

                    <hr style={styles.divider} />

                    <h3 style={styles.subTitle}>Produits similaires</h3>
                    <div style={styles.similarGrid}>
                        {similaires.map((sim) => {
                            const simOut = sim.stock <= 0;
                            return (
                                <div key={sim.numero_produit} style={styles.similarCard} className={`sim-card ${simOut ? "sim-card-out" : ""}`}>
                                    <div style={styles.similarImgBg} onClick={() => { navigate(`/produit/${sim.numero_produit}`); window.scrollTo(0,0); }}>
                                        <img src={`${apiUrl}/images/${sim.image}`} alt={sim.nom_produit} style={styles.similarImg} />
                                    </div>
                                    <div style={styles.similarInfo}>
                                        <p style={styles.similarName}>{sim.nom_produit}</p>
                                        <div style={styles.simActionRow}>
                                            <span style={{color: '#C9A24D', fontWeight: 'bold'}}>{Number(sim.prix_ttc).toFixed(2)} €</span>
                                            {!simOut && (
                                                <>
                                                    <div style={styles.simQtyBox}>
                                                        <button style={styles.simMiniBtn} onClick={() => handleQtySim(sim.numero_produit, -1, sim.stock)}><FiMinus size={12}/></button>
                                                        <input
                                                            type="text"
                                                            className="qty-input-sim"
                                                            value={quantitesSimilaires[sim.numero_produit] || 1}
                                                            onChange={(e) => handleInputSim(sim.numero_produit, e.target.value, sim.stock)}
                                                            onBlur={() => { if(!quantitesSimilaires[sim.numero_produit]) setQuantitesSimilaires(p => ({...p, [sim.numero_produit]: 1})) }}
                                                        />
                                                        <button style={styles.simMiniBtn} onClick={() => handleQtySim(sim.numero_produit, 1, sim.stock)}><FiPlus size={12}/></button>
                                                    </div>
                                                    <div style={styles.plusCircle} className="plus-circle" onClick={() => addToCart({ ...sim, id_produit: sim.numero_produit }, quantitesSimilaires[sim.numero_produit])}>
                                                        <FiShoppingBag size={16} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FOOTER CORRIGÉ ICI */}
                <div style={styles.stickyFooter}>
                    <div style={styles.priceContainer}>
                        <p style={{color: '#E9E3E3', fontSize: '12px', margin: 0, opacity: 0.6}}>Prix TTC</p>
                        <span style={styles.priceValue}>{Number(produit.prix_ttc).toFixed(2)} €</span>
                    </div>
                    <div style={styles.actions}>
                        {!isOutOfStock ? (
                            <>
                                <div style={styles.qtySelector}>
                                    <button style={styles.qtyBtn} onClick={() => handleMainQtyChange(-1)}><FiMinus /></button>
                                    <input
                                        type="text"
                                        className="qty-input-main"
                                        value={quantite}
                                        onChange={(e) => handleMainInputChange(e.target.value)}
                                        onBlur={() => { if(!quantite) setQuantite(1) }}
                                    />
                                    <button style={styles.qtyBtn} onClick={() => handleMainQtyChange(1)}><FiPlus /></button>
                                </div>
                                <button
                                    className="cart-btn-premium"
                                    style={{ ...styles.cartBtn, backgroundColor: isHovered ? "#C9A24D" : "#E9E3E3" }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    onClick={() => addToCart({ ...produit, id_produit: produit.numero_produit }, quantite)}
                                >
                                    <FiShoppingBag size={20} />
                                    <span style={{marginLeft: '10px'}}>AJOUTER AU PANIER</span>
                                </button>
                            </>
                        ) : (
                            <button disabled style={styles.cartBtn}>VICTIME DE SON SUCCÈS</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { width: "100%", backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "120px 0", display: "flex", justifyContent: "center" },
    container: { width: "950px", backgroundColor: "#E9E3E3", borderRadius: "25px", padding: "60px 80px 180px", position: "relative", overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' },
    closeBtn: { position: "absolute", right: "30px", top: "30px", fontSize: "35px", cursor: "pointer", color: "#373735", zIndex: 10 },
    imageWrapper: { width: "100%", display: "flex", justifyContent: "center", marginBottom: "40px", position: 'relative' },
    ruptureBadge: { position: 'absolute', top: '50%', background: '#E63946', color: '#FFF', padding: '10px 30px', fontWeight: '900', transform: 'rotate(-10deg)', zIndex: 5, border: '2px solid white' },
    mainImage: { width: "100%", maxWidth: "380px", objectFit: "contain", transition: '0.3s' },
    content: { width: "100%" },
    // Ajustement : passage à 3rem (~48px) pour le nom du produit
    title: { fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "#373735", textAlign: "center", marginBottom: '10px' },
    divider: { border: "none", borderTop: "1.5px solid #373735", opacity: 0.15, margin: "30px 0" },
    // Ajustement : description à 1.15rem (~18.5px) pour un confort de lecture premium
    description: { fontSize: "1.15rem", color: "#373735", textAlign: "justify", lineHeight: '1.7', opacity: 0.9 },
    // Ajustement : sous-titres à 1.5rem (~24px)
    subTitle: { fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#373735", marginBottom: "25px", fontWeight: 'bold' },
    infoSection: { marginBottom: "35px" },
    originBox: { display: "flex", alignItems: "center", gap: "12px", background: 'rgba(55,55,53,0.05)', padding: '15px', borderRadius: '15px', width: 'fit-content' },
    // Ajustement : texte d'origine à 1.25rem
    originText: { fontSize: "1.25rem", color: "#373735", fontWeight: '500' },
    similarGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
    similarCard: { backgroundColor: "#373735", borderRadius: "20px", overflow: "hidden", color: "#FFF", display: "flex", flexDirection: "column" },
    similarImgBg: { backgroundColor: "#FFF", display: "flex", justifyContent: "center", height: "180px" },
    similarImg: { width: "100%", height: "100%", objectFit: "cover" },
    similarInfo: { padding: "15px", flexGrow: 1, display: 'flex', flexDirection: 'column' },
    // Ajustement : noms similaires à 1.1rem
    similarName: { fontSize: "1.1rem", fontWeight: "bold", margin: "0 0 10px 0", color: '#C9A24D' },
    simActionRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" },
    simQtyBox: { display: "flex", alignItems: "center", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "20px", padding: "4px 8px" },
    simMiniBtn: { background: "none", border: "none", color: "#FFF", cursor: "pointer" },
    plusCircle: { width: "38px", height: "38px", border: "1.5px solid #C9A24D", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A24D", cursor: 'pointer' },

    stickyFooter: { position: "absolute", bottom: 0, left: 0, width: "100%", height: "120px", backgroundColor: "#373735", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px", boxSizing: "border-box" },
    priceContainer: { display: 'flex', flexDirection: 'column' },
    // Ajustement : prix principal à 2.5rem pour un impact maximal
    priceValue: { color: "#C9A24D", fontSize: "2.5rem", fontWeight: "900" },
    actions: { display: "flex", gap: "15px", alignItems: "center" },
    qtySelector: { backgroundColor: "#FFF", borderRadius: "30px", height: "55px", display: "flex", alignItems: "center", padding: "0 15px" },
    qtyBtn: { background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: '#373735', fontWeight: 'bold' },
    // Ajustement : texte du bouton panier à 1.1rem
    cartBtn: { border: "none", borderRadius: "30px", height: "55px", padding: "0 25px", fontWeight: "900", display: "flex", alignItems: "center", cursor: "pointer", color: '#373735', fontSize: '1.1rem', letterSpacing: '0.5px' }
};

export default ProductDetails;