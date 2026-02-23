import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiX, FiShoppingBag, FiMapPin, FiHeart, FiStar, FiPlus, FiMinus } from "react-icons/fi";
import { useCard } from "../context/CardContext.jsx";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
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

    const handleQtySim = (prodId, delta) => {
        setQuantitesSimilaires(prev => ({
            ...prev,
            [prodId]: Math.max(1, (prev[prodId] || 1) + delta)
        }));
    };

    if (isLoading) return <div style={{textAlign: 'center', padding: '100px', color: '#FFF'}}>Chargement...</div>;
    if (!produit) return null;

    return (
        <div style={styles.overlay}>
            <style>
                {`
                .close-btn:hover { color: #C9A24D !important; transform: rotate(90deg); transition: 0.3s; }
                .avis-card:hover { transform: translateY(-5px); border: 1px solid #C9A24D; transition: 0.4s; }
                .sim-card { transition: all 0.4s ease; cursor: pointer; }
                .sim-card:hover { transform: translateY(-8px); transition: 0.4s; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
                
                /* HOVERS BARRE PANIER */
                .qty-hover:hover { color: #C9A24D !important; transform: scale(1.2); transition: 0.2s; }
                
                .cart-btn-premium { 
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; 
                }
                .cart-btn-premium:hover { 
                    transform: scale(1.05); 
                    background-color: #C9A24D !important; 
                    box-shadow: 0 8px 25px rgba(201, 162, 77, 0.4);
                }
                .cart-btn-premium:hover svg {
                    transform: rotate(-12deg) scale(1.2);
                    transition: 0.3s;
                }

                .sim-qty-box:hover { background-color: rgba(255, 255, 255, 0.2) !important; transition: 0.3s; }
                .plus-circle:hover { background-color: #C9A24D; color: #373735 !important; transition: 0.3s; }
                `}
            </style>

            <div style={styles.container}>
                <FiX style={styles.closeBtn} className="close-btn" onClick={() => navigate(-1)} />

                <div style={styles.imageWrapper}>
                    <img src={`${apiUrl}/images/${produit.image}`} alt={produit.nom_produit} style={styles.mainImage} />
                </div>

                <div style={styles.content}>
                    <h1 style={styles.title}>{produit.nom_produit}</h1>
                    <hr style={styles.divider} />
                    <p style={styles.description}>{produit.description}</p>

                    <div style={styles.infoSection}>
                        <h3 style={styles.subTitle}>Note aromatique</h3>
                        <div style={styles.iconRow}>
                            <img src="/nature.webp" alt="Notes" style={styles.detailIcon} />
                            <img src="/aromatique.webp" alt="Arome" style={styles.detailIcon} />
                        </div>
                    </div>

                    <div style={styles.infoSection}>
                        <h3 style={styles.subTitle}>Origines</h3>
                        <div style={styles.originBox}>
                            <FiMapPin size={24} color="#373735" />
                            <span style={styles.originText}>{produit.origine}</span>
                        </div>
                    </div>

                    <hr style={styles.divider} />

                    <h3 style={styles.subTitle}>Avis client</h3>
                    <div style={styles.avisGrid}>
                        <div style={styles.avisCard} className="avis-card">
                            <div style={styles.stars}><FiStar fill="#C9A24D" color="#C9A24D" /><FiStar fill="#C9A24D" color="#C9A24D" /><FiStar fill="#C9A24D" color="#C9A24D" /></div>
                            <p style={styles.avisAuthor}>Marc-Antoine Vallet</p>
                            <p style={styles.avisText}>"Un plaisir simple mais touchant."</p>
                        </div>
                        <div style={styles.avisCard} className="avis-card">
                            <div style={styles.stars}><FiStar fill="#C9A24D" color="#C9A24D" /><FiStar fill="#C9A24D" color="#C9A24D" /></div>
                            <p style={styles.avisAuthor}>Jean-Baptiste Huet</p>
                            <p style={styles.avisText}>"Un voyage sensoriel exceptionnel."</p>
                        </div>
                    </div>

                    <hr style={styles.divider} />

                    <h3 style={styles.subTitle}>Produits similaires</h3>
                    <div style={styles.similarGrid}>
                        {similaires.map((sim) => (
                            <div key={sim.numero_produit} style={styles.similarCard} className="sim-card">
                                <div style={styles.similarImgBg} onClick={() => { navigate(`/produit/${sim.numero_produit}`); window.scrollTo(0,0); }}>
                                    <img src={`${apiUrl}/images/${sim.image}`} alt={sim.nom_produit} style={styles.similarImg} />
                                </div>
                                <div style={styles.similarInfo}>
                                    <p style={styles.similarName} onClick={() => navigate(`/produit/${sim.numero_produit}`)}>{sim.nom_produit}</p>
                                    <div style={styles.simActionRow}>
                                        <span style={{color: '#C9A24D', fontWeight: 'bold'}}>{sim.prix_ttc} €</span>

                                        <div style={styles.simQtyBox} className="sim-qty-box">
                                            <button style={styles.simMiniBtn} onClick={() => handleQtySim(sim.numero_produit, -1)}><FiMinus size={12}/></button>
                                            <span style={styles.simQtyVal}>{quantitesSimilaires[sim.numero_produit] || 1}</span>
                                            <button style={styles.simMiniBtn} onClick={() => handleQtySim(sim.numero_produit, 1)}><FiPlus size={12}/></button>
                                        </div>

                                        <div style={styles.plusCircle} className="plus-circle" onClick={() => addToCart({ ...sim, id_produit: sim.numero_produit }, quantitesSimilaires[sim.numero_produit])}>
                                            <FiPlus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.stickyFooter}>
                    <div style={styles.priceContainer}>
                        <p style={{color: '#E9E3E3', fontSize: '12px', margin: 0, opacity: 0.6}}>Prix TTC</p>
                        <span style={styles.priceValue}>{produit.prix_ttc} €</span>
                    </div>
                    <div style={styles.actions}>
                        <div style={styles.qtySelector}>
                            <button style={styles.qtyBtn} className="qty-hover" onClick={() => setQuantite(Math.max(1, quantite - 1))}>-</button>
                            <span style={styles.qtyVal}>{quantite}</span>
                            <button style={styles.qtyBtn} className="qty-hover" onClick={() => setQuantite(quantite + 1)}>+</button>
                        </div>
                        <button
                            className="cart-btn-premium"
                            style={{ ...styles.cartBtn, backgroundColor: isHovered ? "#C9A24D" : "#E9E3E3" }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => addToCart({ ...produit, id_produit: produit.numero_produit }, quantite)}
                        >
                            <FiShoppingBag size={22} />
                            <span style={{marginLeft: '10px'}}>AJOUTER AU PANIER</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { width: "100%", backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "120px 0", display: "flex", justifyContent: "center" },
    container: { width: "950px", backgroundColor: "#E9E3E3", borderRadius: "15px", padding: "60px 80px 180px", position: "relative", overflow: 'hidden' },
    closeBtn: { position: "absolute", right: "30px", top: "30px", fontSize: "35px", cursor: "pointer", color: "#373735", zIndex: 10 },
    imageWrapper: { width: "100%", display: "flex", justifyContent: "center", marginBottom: "40px" },
    mainImage: { width: "100%", maxWidth: "350px", objectFit: "contain" },
    content: { width: "100%" },
    title: { fontFamily: "'Playfair Display', serif", fontSize: "42px", color: "#373735", textAlign: "center" },
    divider: { border: "none", borderTop: "1.5px solid #373735", opacity: 0.15, margin: "30px 0" },
    description: { fontSize: "16px", color: "#373735", textAlign: "justify", lineHeight: '1.6' },
    subTitle: { fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#373735", marginBottom: "20px" },
    infoSection: { marginBottom: "30px" },
    iconRow: { display: "flex", gap: "20px" },
    detailIcon: { width: "45px", height: "45px" },
    originBox: { display: "flex", alignItems: "center", gap: "10px" },
    originText: { fontSize: "18px", color: "#373735" },
    avisGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
    avisCard: { backgroundColor: "#373735", borderRadius: "20px", padding: "20px", color: "#FFF" },
    stars: { display: "flex", gap: "5px", marginBottom: "10px" },
    avisAuthor: { fontWeight: "bold", color: "#C9A24D", fontSize: "14px" },
    avisText: { fontStyle: "italic", fontSize: "13px" },

    similarGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" },
    similarCard: { backgroundColor: "#373735", borderRadius: "20px", overflow: "hidden", color: "#FFF", width: "100%", height: "400px", display: "flex", flexDirection: "column" },
    similarImgBg: { backgroundColor: "#FFF", padding: "0px", display: "flex", justifyContent: "center", height: "220px", width: "100%" },
    similarImg: { width: "100%", height: "100%", objectFit: "cover" },
    similarInfo: { padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 },
    similarName: { fontSize: "16px", fontWeight: "bold", margin: "0", minHeight: '40px' },
    simActionRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" },
    simQtyBox: { display: "flex", alignItems: "center", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "20px", padding: "4px 10px", gap: "8px" },
    simMiniBtn: { background: "none", border: "none", color: "#FFF", cursor: "pointer", padding: "2px" },
    simQtyVal: { fontSize: "14px", fontWeight: "bold", minWidth: "15px", textAlign: "center" },
    plusCircle: { width: "35px", height: "35px", border: "1px solid #C9A24D", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A24D", cursor: 'pointer' },

    stickyFooter: { position: "absolute", bottom: 0, left: 0, width: "100%", height: "130px", backgroundColor: "#373735", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 60px", boxSizing: "border-box" },
    priceContainer: { display: 'flex', flexDirection: 'column' },
    priceValue: { color: "#C9A24D", fontSize: "42px", fontWeight: "bold" },
    actions: { display: "flex", gap: "25px" },
    qtySelector: { backgroundColor: "#FFF", borderRadius: "30px", height: "55px", display: "flex", alignItems: "center", padding: "0 10px" },
    qtyBtn: { background: "none", border: "none", fontSize: "24px", cursor: "pointer" },
    qtyVal: { fontSize: "20px", fontWeight: "bold", minWidth: "30px", textAlign: "center", color: '#373735' },
    cartBtn: { border: "none", borderRadius: "30px", height: "55px", padding: "0 35px", fontWeight: "bold", display: "flex", alignItems: "center", cursor: "pointer", color: '#373735' }
};

export default ProductDetails;