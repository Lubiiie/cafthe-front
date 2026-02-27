import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Assistance = () => {
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();

    const liens = [
        {
            id: "aide",
            titre: "Besoin d’aide",
            image: "/besoin.webp",
            // On envoie vers la section "message" de la page contact
            path: "/contact?section=message"
        },
        {
            id: "faq",
            titre: "FAQ",
            image: "/faq.webp",
            // On envoie vers la section "faq" de la page contact
            path: "/contact?section=faq"
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        // On force le scroll en haut au cas où, la page Contact gérera l'ancrage ensuite
        window.scrollTo(0, 0);
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {liens.map((item) => {
                    const isHovered = hovered === item.id;
                    return (
                        <div
                            key={item.id}
                            style={styles.itemWrapper}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <div style={{
                                ...styles.circle,
                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                                boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.2)" : "0 4px 10px rgba(0,0,0,0.1)"
                            }}>
                                <img src={item.image} alt={item.titre} style={styles.icon} />
                            </div>
                            <span style={{
                                ...styles.text,
                                textDecoration: isHovered ? "underline" : "none",
                                color: isHovered ? "#C9A24D" : "#373735"
                            }}>
                                {item.titre}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const styles = {
    section: {
        width: "100%",
        backgroundColor: "#E9E3E3",
        padding: "60px 0",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        gap: "100px",
    },
    itemWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    circle: {
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        backgroundColor: "#F9F7F2",
        border: "1.5px solid #373735",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        marginBottom: "15px",
        overflow: "visible"
    },
    icon: {
        width: "250px",
        height: "250px",
        objectFit: "contain"
    },
    text: {
        // Ajustement : passage de 24px à 1.75rem (~28px) pour une meilleure lisibilité
        fontSize: "1.75rem",
        lineHeight: "1.2",
        fontFamily: "'Playfair Display', serif",
        transition: "all 0.3s ease"
    }
};

export default Assistance;