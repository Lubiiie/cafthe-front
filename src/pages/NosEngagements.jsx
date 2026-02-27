import React from 'react';

const NosEngagements = () => {
    return (
        <div style={styles.pageWrapper}>
            {/* Header / Hero Section */}
            <header style={styles.heroSection}>
                <h1 style={styles.mainTitle}>Nos engagements</h1>
                <p style={styles.heroSubtitle}>
                    Parce que l'excellence ne s'arrête pas à la qualité du grain ou de la feuille,
                    nous plaçons l'éthique et la transparence au cœur de chaque décision.
                </p>
            </header>

            {/* Engagement 1 : Sélection (Texte à gauche, Image à droite) */}
            <section style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRow}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Une sélection sans compromis</h2>
                            <p style={styles.paragraph}>
                                Nous parcourons le monde pour dénicher des terroirs confidentiels. Chaque produit de notre catalogue
                                répond à un cahier des charges strict garantissant une pureté et une fraîcheur absolue.
                            </p>
                            <p style={styles.paragraph}>
                                Nos torréfacteurs et experts en thé travaillent main dans la main pour sublimer les arômes originels.
                            </p>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/img2.webp" alt="Qualité sélection" style={styles.image} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Engagement 2 : Éthique (Image à gauche, Texte à droite) */}
            <section style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRowReverse}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Sourcing éthique & durable</h2>
                            <p style={styles.paragraph}>
                                Nous privilégions le commerce direct avec les petits producteurs. En supprimant les intermédiaires inutiles,
                                nous assurons une juste rémunération à ceux qui font la noblesse de nos produits.
                            </p>
                            <blockquote style={styles.quote}>
                                "Respecter la terre et ceux qui la travaillent."
                            </blockquote>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/img1.webp" alt="Sourcing éthique" style={styles.image} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Engagement 3 : Accompagnement (Texte à gauche, Image à droite) */}
            <section style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRow}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Un service d'exception</h2>
                            <p style={styles.paragraph}>
                                Votre expérience CafThé ne s'arrête pas à la commande. Notre équipe est là pour vous conseiller
                                sur les méthodes de préparation et l'entretien de vos accessoires pour une dégustation optimale.
                            </p>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/img2.webp" alt="Service client" style={styles.image} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    pageWrapper: {
        backgroundColor: "#E9E3E3",
        minHeight: "100vh",
        paddingTop: "120px",
    },
    heroSection: {
        maxWidth: "900px",
        margin: "0 auto 80px auto",
        textAlign: "center",
        padding: "0 20px",
    },
    // Titre principal harmonisé à 3rem (~48px)
    mainTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "3rem",
        color: "#373735",
        marginBottom: "25px",
    },
    // Sous-titre monté à 1.15rem (~18.5px) pour le confort
    heroSubtitle: {
        fontSize: "1.15rem",
        lineHeight: "1.6",
        color: "#373735",
        opacity: 0.9,
    },
    sectionDark: {
        backgroundColor: "#373735",
        padding: "80px 0",
        marginBottom: "40px",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 40px",
    },
    contentRow: {
        display: "flex",
        alignItems: "center",
        gap: "60px",
        flexWrap: "wrap",
    },
    contentRowReverse: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: "60px",
        flexWrap: "wrap",
    },
    textBlock: {
        flex: "1",
        minWidth: "300px",
        color: "#E9E3E3",
    },
    // Titres de section à 2.25rem (~36px) pour la cohérence
    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "2.25rem",
        color: "#C9A24D",
        marginBottom: "20px",
    },
    // Corps de texte à 1.1rem (~17.5px)
    paragraph: {
        fontSize: "1.1rem",
        lineHeight: "1.7",
        marginBottom: "15px",
        opacity: 0.8,
    },
    // Citation mise en valeur à 1.4rem (~22px)
    quote: {
        fontStyle: "italic",
        fontSize: "1.4rem",
        borderLeft: "3px solid #C9A24D",
        paddingLeft: "20px",
        margin: "30px 0",
        color: "#C9A24D",
    },
    imageBlock: {
        flex: "1",
        minWidth: "300px",
        display: "flex",
        justifyContent: "center",
    },
    image: {
        width: "50%",
        maxWidth: "500px",
        borderRadius: "10px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    }
};

export default NosEngagements;