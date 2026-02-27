import React from 'react';

const NotreHistoire = () => {
    return (
        <div style={styles.pageWrapper}>
            <style>
                {`
                @media (max-width: 992px) {
                    .content-row-res { 
                        flex-direction: column !important; 
                        gap: 40px !important; 
                    }
                    .content-row-reverse-res { 
                        flex-direction: column !important; 
                        gap: 40px !important; 
                    }
                    .text-block-res { 
                        width: 100% !important; 
                        text-align: center !important;
                        min-width: unset !important;
                    }
                    .image-block-res { 
                        width: 100% !important; 
                        display: flex !important;
                        justify-content: center !important;
                        min-width: unset !important;
                    }
                    .image-res {
                        width: 80% !important; /* Image plus large sur mobile pour la visibilité */
                    }
                    .quote-res {
                        text-align: left;
                        display: inline-block;
                    }
                }

                @media (max-width: 768px) {
                    .page-wrapper-res {
                        padding-top: 100px !important;
                    }
                    .main-title-res {
                        font-size: 2.2rem !important;
                    }
                    .section-dark-res {
                        padding: 60px 0 !important;
                    }
                    .section-title-res {
                        font-size: 1.8rem !important;
                    }
                    .hero-subtitle-res {
                        font-size: 1rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .main-title-res {
                        font-size: 1.8rem !important;
                    }
                    .container-res {
                        padding: 0 20px !important;
                    }
                }
                `}
            </style>

            {/* Header / Hero Section */}
            <header style={styles.heroSection}>
                <h1 style={styles.mainTitle} className="main-title-res">Notre histoire</h1>
                <p style={styles.heroSubtitle} className="hero-subtitle-res">
                    L'aventure CafThé est née d'une conviction simple : le café et le thé ne sont pas de simples commodités,
                    mais des vecteurs d'émotion et de partage. Notre marque s'est construite autour d'un idéal de pureté et d'élégance.
                </p>
            </header>

            {/* Section 1 : La rencontre */}
            <section style={styles.sectionDark} className="section-dark-res">
                <div style={styles.container} className="container-res">
                    <div style={styles.contentRow} className="content-row-res">
                        <div style={styles.textBlock} className="text-block-res">
                            <h2 style={styles.sectionTitle} className="section-title-res">La rencontre de deux mondes</h2>
                            <p style={styles.paragraph}>
                                Tout a commencé par le désir de réunir, sous une même bannière, l'exigence de la torréfaction
                                artisanale et la délicatesse des rituels de l'infusion.
                            </p>
                            <p style={styles.paragraph}>
                                Notre logo, mêlant la feuille de thé aérienne et le grain de café robuste, incarne cette union
                                parfaite entre deux univers d'exception.
                            </p>
                        </div>
                        <div style={styles.imageBlock} className="image-block-res">
                            <img src="/img2.webp" alt="Torréfaction artisanale" style={styles.image} className="image-res" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 : Quête d'excellence */}
            <section style={styles.sectionDark} className="section-dark-res">
                <div style={styles.container} className="container-res">
                    <div style={styles.contentRowReverse} className="content-row-reverse-res">
                        <div style={styles.textBlock} className="text-block-res">
                            <h2 style={styles.sectionTitle} className="section-title-res">Une quête d'excellence</h2>
                            <p style={styles.paragraph}>
                                Dès nos débuts, nous avons défini une charte rigoureuse. Qu'il s'agisse de nos thés sélectionnés
                                pour leur finesse ou de nos cafés choisis pour leur caractère, chaque produit raconte une histoire de terroir.
                            </p>
                            <blockquote style={styles.quote} className="quote-res">
                                "L'excellence en chaque infusion."
                            </blockquote>
                        </div>
                        <div style={styles.imageBlock} className="image-block-res">
                            <img src="/img1.webp" alt="Thé de qualité" style={styles.image} className="image-res" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 : Écrin digital */}
            <section style={styles.sectionDark} className="section-dark-res">
                <div style={styles.container} className="container-res">
                    <div style={styles.contentRow} className="content-row-res">
                        <div style={styles.textBlock} className="text-block-res">
                            <h2 style={styles.sectionTitle} className="section-title-res">Un écrin digital pour les passionnés</h2>
                            <p style={styles.paragraph}>
                                Nous avons imaginé CafThé comme une plateforme intuitive et haut de gamme, où chaque étape
                                a été pensée pour refléter notre identité : un mélange de noir charbon, de crème et d'or.
                            </p>
                        </div>
                        <div style={styles.imageBlock} className="image-block-res">
                            <img src="/img2.webp" alt="Accessoires CafThé" style={styles.image} className="image-res" />
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
        fontSize: "3rem",
        color: "#373735",
        marginBottom: "25px",
    },
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
    sectionTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "2.25rem",
        color: "#C9A24D",
        marginBottom: "20px",
    },
    paragraph: {
        fontSize: "1.1rem",
        lineHeight: "1.7",
        marginBottom: "15px",
        opacity: 0.8,
    },
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
    },
    image: {
        width: "50%",
        borderRadius: "10px",
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    }
};

export default NotreHistoire;