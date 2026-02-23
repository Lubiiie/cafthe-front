import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const navigate = useNavigate();

    const categories = [
        { id: "cafe", titre: "Café", image: "/cafe_icon.webp", path: "/catalogue" },
        { id: "the", titre: "Thé", image: "/the_icon.webp", path: "/catalogue" },
        { id: "accessoires", titre: "Accessoires", image: "/accessoires_icon.webp", path: "/catalogue" }
    ];

    return (
        <section style={styles.heroContainer}>
            <div style={styles.overlay}>
                <div style={styles.content}>
                    {categories.map((cat) => {
                        const isHovered = hoveredId === cat.id;
                        return (
                            <div
                                key={cat.id}
                                style={styles.categoryBlock}
                                onMouseEnter={() => setHoveredId(cat.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => navigate(cat.path)}
                            >
                                <div style={{
                                    ...styles.circle,
                                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                                    boxShadow: isHovered ? "0 15px 30px rgba(201, 162, 77, 0.4)" : "0 8px 20px rgba(0,0,0,0.3)"
                                }}>
                                    <img
                                        src={cat.image}
                                        alt={cat.titre}
                                        style={{
                                            ...styles.icon,
                                            transform: isHovered ? "scale(1.15)" : "scale(1)"
                                        }}
                                    />
                                </div>
                                <h3 style={{
                                    ...styles.categoryTitle,
                                    color: isHovered ? "#C9A24D" : "#FFF"
                                }}>
                                    {cat.titre}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const styles = {
    heroContainer: {
        width: "100%",
        height: "500px",
        backgroundImage: "url('/hero.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
    },
    overlay: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        display: "flex",
        gap: "60px",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    circle: {
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        backgroundColor: "#F9F7F2",
        border: "3px solid #C9A24D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
    icon: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.5s ease",
    },
    categoryTitle: {
        marginTop: "20px",
        fontFamily: "'Playfair Display', serif",
        fontSize: "24px",
        fontWeight: "bold",
        letterSpacing: "1px",
        transition: "color 0.3s ease",
    }
};

export default Hero;