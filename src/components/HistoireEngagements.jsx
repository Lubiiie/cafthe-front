import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import pour la navigation

const HistoireEngagements = () => {
    const [hoveredSection, setHoveredSection] = useState(null);
    const navigate = useNavigate();

    const sections = [
        {
            id: "histoire",
            titre: "Notre histoire",
            image: "/histoire.webp",
            lien: "/notre-histoire",
            texte: "Depuis nos débuts, nous parcourons le monde pour dénicher les grains les plus rares."
        },
        {
            id: "engagements",
            titre: "Nos engagements",
            image: "/engagements.webp",
            lien: "/nos-engagements",
            texte: "Nous nous engageons pour une culture durable, éthique et respectueuse de la terre."
        }
    ];

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                {sections.map((sec) => {
                    const isHovered = hoveredSection === sec.id;
                    return (
                        <div
                            key={sec.id}
                            style={{
                                ...styles.block,
                                transform: isHovered ? "translateY(-10px)" : "translateY(0)"
                            }}
                            onMouseEnter={() => setHoveredSection(sec.id)}
                            onMouseLeave={() => setHoveredSection(null)}
                            // Redirection au clic sur tout le bloc
                            onClick={() => navigate(sec.lien)}
                        >
                            <h2 style={styles.title}>{sec.titre}</h2>

                            <div style={{
                                ...styles.imageWrapper,
                                border: isHovered ? "2px solid #C9A24D" : "2px solid transparent"
                            }}>
                                <img
                                    src={sec.image}
                                    alt={sec.titre}
                                    style={{
                                        ...styles.img,
                                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                                        filter: isHovered ? "brightness(1.1)" : "brightness(0.9)"
                                    }}
                                />
                                {isHovered && (
                                    <div style={styles.overlay}>
                                        <span style={styles.overlayText}>DÉCOUVRIR</span>
                                    </div>
                                )}
                            </div>

                            <p style={{
                                ...styles.description,
                                color: isHovered ? "#C9A24D" : "#E9E3E3"
                            }}>
                                {sec.texte}
                            </p>
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
        backgroundColor: "#373735",
        padding: "100px 0",
        color: "#E9E3E3"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "60px",
        padding: "0 20px"
    },
    block: {
        flex: 1,
        textAlign: "center",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer"
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        color: "#C9A24D",
        // Ajustement : passage de 28px à 2rem (~32px) pour la cohérence avec le Hero
        fontSize: "2rem",
        marginBottom: "30px",
        letterSpacing: "2px"
    },
    imageWrapper: {
        width: "100%",
        height: "400px",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
        transition: "all 0.3s ease"
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "all 0.6s ease"
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease"
    },
    overlayText: {
        border: "1px solid #C9A24D",
        padding: "10px 20px",
        color: "#C9A24D",
        fontWeight: "bold",
        backgroundColor: "rgba(55, 55, 53, 0.8)",
        // Ajustement : passage à 1.1rem pour être raccord avec les boutons/liens
        fontSize: "1.1rem"
    },
    description: {
        marginTop: "25px",
        // Ajustement : passage de 16px à 1.15rem (~18.5px) pour le confort de lecture sur fond sombre
        fontSize: "1.15rem",
        lineHeight: "1.6",
        fontStyle: "italic",
        transition: "color 0.3s ease"
    }
};

export default HistoireEngagements;