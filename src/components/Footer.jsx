import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filterTo = (cat) => {
        navigate(`/catalogue?filter=${cat}`);
        window.scrollTo(0, 0);
    };

    const goToContact = (section) => {
        navigate(`/contact?section=${section}`);
        window.scrollTo(0, 0);
    };

    return (
        <footer style={styles.footer}>
            {/* INJECTION DES HOVERS VIA UNE BALISE STYLE */}
            <style>
                {`
                .footer-link { transition: all 0.3s ease; }
                .footer-link:hover { color: #C9A24D !important; transform: translateX(5px); }
                
                .legal-link { transition: opacity 0.3s ease; }
                .legal-link:hover { opacity: 0.7; }

                .scroll-btn { transition: transform 0.3s ease; }
                .scroll-btn:hover { transform: translateY(-3px); color: #E9E3E3 !important; }
                `}
            </style>

            <div style={styles.navSection}>
                <div style={styles.contentWrapper}>
                    <div style={styles.column}>
                        <h4 style={styles.title}>Nos produits</h4>
                        <span onClick={() => filterTo("Café")} style={styles.link} className="footer-link">Cafés</span>
                        <span onClick={() => filterTo("Thé")} style={styles.link} className="footer-link">Thé</span>
                        <span onClick={() => filterTo("Accessoire")} style={styles.link} className="footer-link">Accessoires</span>
                        <span onClick={() => filterTo("Tous")} style={styles.link} className="footer-link">Nos offres</span>
                    </div>

                    <div style={styles.column}>
                        <h4 style={styles.title}>À propos</h4>
                        <span onClick={() => navigate("/nos-engagements")} style={styles.link} className="footer-link">Nos engagements</span>
                        <span onClick={() => navigate("/notre-histoire")} style={styles.link} className="footer-link">Notre histoire</span>
                    </div>

                    <div style={styles.column}>
                        <h4 style={styles.title}>Contact</h4>
                        <span onClick={() => goToContact("faq")} style={styles.link} className="footer-link">FAQ</span>
                        <span onClick={() => goToContact("message")} style={styles.link} className="footer-link">Besoin d’aide</span>
                    </div>

                    <div style={styles.logoContainer}>
                        <img src="/logo2.webp" alt="CafThé Logo" style={styles.logoBig} />
                    </div>
                </div>
            </div>

            <div style={styles.legalBar}>
                <div style={styles.legalWrapper}>
                    <div style={styles.legalLeft}>
                        <img src="/logo1.webp" alt="Icon" style={styles.logoSmall} />
                    </div>
                    <div style={styles.legalCenter}>
                        <span onClick={scrollToTop} style={styles.scrollTop} className="scroll-btn">Haut de page ↑</span>
                    </div>
                    <div style={styles.legalRight}>
                        <span onClick={() => navigate("/mentions-legales")} style={styles.legalLink} className="legal-link">Mentions légales</span>
                        <span onClick={() => navigate("/cgv")} style={styles.legalLink} className="legal-link">CGV</span>
                        <span onClick={() => navigate("/politique-confidentialite")} style={styles.legalLink} className="legal-link">Politique de confidentialité</span>
                        <span onClick={() => navigate("/plan-site")} style={styles.legalLink} className="legal-link">Plan du site</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: { width: "100%", display: "flex", flexDirection: "column", margin: 0, padding: 0 },
    navSection: { backgroundColor: "#E9E3E3", width: "100%", padding: "60px 0" },
    contentWrapper: { maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", padding: "0 5%" },
    column: { display: "flex", flexDirection: "column", gap: "12px" },
    title: {
        fontFamily: "'Playfair Display', serif",
        // Ajustement : passage de 20px à 1.5rem (~24px)
        fontSize: "1.5rem",
        color: "#373735",
        marginBottom: "20px",
        fontWeight: "bold"
    },
    link: {
        // Ajustement : passage de 15px à 1.1rem (~17.5px) pour s'aligner sur les commentaires clients
        fontSize: "1.1rem",
        color: "#373735",
        cursor: "pointer",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        display: "inline-block"
    },
    logoContainer: { display: "flex", alignItems: "center" },
    logoBig: { width: "220px", height: "auto" },
    legalBar: { backgroundColor: "#373735", width: "100%", padding: "20px 0" },
    legalWrapper: { maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0 5%", color: "#C9A24D" },
    legalLeft: { display: "flex", justifyContent: "flex-start" },
    legalCenter: { textAlign: "center" },
    legalRight: { display: "flex", justifyContent: "flex-end", gap: "30px" },
    logoSmall: { width: "45px", height: "auto" },
    scrollTop: {
        cursor: "pointer",
        // Ajustement : aligné sur les liens principaux (1.1rem)
        fontSize: "1.1rem",
        fontWeight: "bold",
        display: "inline-block"
    },
    legalLink: {
        // Ajustement : passage de 14px à 1rem (16px standards) pour l'accessibilité
        fontSize: "1rem",
        cursor: "pointer"
    }
};

export default Footer;