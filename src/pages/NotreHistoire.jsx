import React from 'react';

const NotreHistoire = () => {
    return (
        <div style={styles.pageWrapper}>
            {/* Header / Hero Section */}
            <header style={styles.heroSection}>
                <h1 style={styles.mainTitle}>Notre histoire</h1>
                <p style={styles.heroSubtitle}>
                    L'aventure CafThé est née d'une conviction simple : le café et le thé ne sont pas de simples commodités,
                    mais des vecteurs d'émotion et de partage. Notre marque s'est construite autour d'un idéal de pureté et d'élégance.
                </p>
            </header>

            {/* Section 1 : La rencontre (Texte à gauche, Image à droite) */}
            <section style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRow}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>La rencontre de deux mondes</h2>
                            <p style={styles.paragraph}>
                                Tout a commencé par le désir de réunir, sous une même bannière, l'exigence de la torréfaction
                                artisanale et la délicatesse des rituels de l'infusion.
                            </p>
                            <p style={styles.paragraph}>
                                Notre logo, mêlant la feuille de thé aérienne et le grain de café robuste, incarne cette union
                                parfaite entre deux univers d'exception.
                            </p>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/img2.webp" alt="Torréfaction artisanale" style={styles.image} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 : Quête d'excellence (Image à gauche, Texte à droite) */}
            <section style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRowReverse}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Une quête d'excellence</h2>
                            <p style={styles.paragraph}>
                                Dès nos débuts, nous avons défini une charte rigoureuse. Qu'il s'agisse de nos thés sélectionnés
                                pour leur finesse ou de nos cafés choisis pour leur caractère, chaque produit raconte une histoire de terroir.
                            </p>
                            <blockquote style={styles.quote}>
                                "L'excellence en chaque infusion."
                            </blockquote>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/img1.webp" alt="Thé de qualité" style={styles.image} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 : Écrin digital */}
            <section style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRow}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Un écrin digital pour les passionnés</h2>
                            <p style={styles.paragraph}>
                                Nous avons imaginé CafThé comme une plateforme intuitive et haut de gamme, où chaque étape
                                a été pensée pour refléter notre identité : un mélange de noir charbon, de crème et d'or.
                            </p>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/img2.webp" alt="Accessoires CafThé" style={styles.image} />
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
    mainTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "48px",
        color: "#373735",
        marginBottom: "25px",
    },
    heroSubtitle: {
        fontSize: "18px",
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
    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "32px",
        color: "#C9A24D", // Accent doré
        marginBottom: "20px",
    },
    paragraph: {
        fontSize: "16px",
        lineHeight: "1.7",
        marginBottom: "15px",
        opacity: 0.8,
    },
    quote: {
        fontStyle: "italic",
        fontSize: "20px",
        borderLeft: "3px solid #C9A24D",
        paddingLeft: "20px",
        margin: "30px 0",
        color: "#C9A24D",
    },
    imageBlock: {
        flex: "1",
        minWidth: "300px",
    },
    image: {
        width: "50%",
        borderRadius: "10px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    }
};

export default NotreHistoire;