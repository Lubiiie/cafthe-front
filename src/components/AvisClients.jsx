import React, { useState } from "react";
import { FiStar, FiHeart } from "react-icons/fi";

const AvisClients = () => {
    const [hoveredId, setHoveredId] = useState(null);

    const avis = [
        {
            id: 1,
            nom: "Jean-Baptiste Morel",
            commentaire: "Un voyage sensoriel exceptionnel. La livraison est aussi soignée que l'écrin du produit.",
            rating: 5
        },
        {
            id: 2,
            nom: "Clémence d'Aboville",
            commentaire: "Le site est d'une élégance rare et la gestion de mon espace personnel est un vrai modèle de fluidité.",
            rating: 5
        },
        {
            id: 3,
            nom: "Marc-Antoine Vallet",
            commentaire: "Plus qu'une simple boutique, c'est un véritable accompagnement pour les passionnés.",
            rating: 5
        }
    ];

    return (
        <section style={styles.section}>
            <h2 style={styles.titleSection}>Avis récents</h2>
            <div style={styles.container}>
                {avis.map((item) => {
                    const isHovered = hoveredId === item.id;
                    return (
                        <div
                            key={item.id}
                            style={{
                                ...styles.card,
                                transform: isHovered ? "translateY(-12px)" : "translateY(0)",
                                boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 20px rgba(0,0,0,0.3)",
                                border: isHovered ? "1px solid #C9A24D" : "1px solid transparent"
                            }}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div style={styles.starsContainer}>
                                {[...Array(3)].map((_, i) => (
                                    <FiHeart key={i} style={styles.icon} />
                                ))}
                            </div>
                            <h3 style={styles.userName}>{item.nom}</h3>
                            <p style={styles.comment}>"{item.commentaire}"</p>
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
        overflow: "hidden"
    },
    titleSection: {
        marginLeft: "5%",
        fontFamily: "'Playfair Display', serif",
        color: "#373735",
        // Ajustement : passage de 30px à 2.25rem (~36px) pour affirmer le titre
        fontSize: "2.25rem",
        marginBottom: "30px"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        padding: "0 5%",
        flexWrap: "wrap"
    },
    card: {
        width: "350px",
        backgroundColor: "#373735",
        borderRadius: "25px",
        padding: "30px",
        color: "#E9E3E3",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "default"
    },
    starsContainer: {
        display: "flex",
        gap: "8px",
        marginBottom: "20px"
    },
    icon: {
        color: "#C9A24D",
        fontSize: "1.2rem" // Légèrement agrandi pour suivre le reste
    },
    userName: {
        color: "#C9A24D",
        // Ajustement : passage de 18px à 1.4rem (~22px) pour le nom du client
        fontSize: "1.4rem",
        margin: "0 0 15px 0",
        fontFamily: "'Playfair Display', serif"
    },
    comment: {
        // Ajustement : passage de 14px à 1.1rem (~17.5px) pour le confort de lecture
        fontSize: "1.1rem",
        fontStyle: "italic",
        lineHeight: "1.6",
        opacity: 0.9
    }
};

export default AvisClients;