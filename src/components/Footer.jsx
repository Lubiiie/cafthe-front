import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filterTo = (cat) => {
        navigate(`/catalogue?filter=${cat}`);
        // Petit délai pour laisser le catalogue charger les produits
        setTimeout(() => window.scrollTo(0, 0), 100);
    };

    const goToContact = (section) => {
        navigate(`/contact?section=${section}`);
    };

    // VERSION CORRIGÉE : Le délai assure que le scroll s'applique à la nouvelle page
    const goToPage = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
    };

    return (
        <footer style={styles.footer}>
            <style>
                {`
                .footer-link { transition: all 0.3s ease; }
                .footer-link:hover { color: #C9A24D !important; transform: translateX(5px); }
                
                .legal-link { transition: opacity 0.3s ease; }
                .legal-link:hover { opacity: 0.7; }

                .scroll-btn { transition: transform 0.3s ease; }
                .scroll-btn:hover { transform: translateY(-3px); color: #E9E3E3 !important; }

                @media (max-width: 992px) {
                    .footer-content { flex-wrap: wrap !important; gap: 40px !important; }
                    .footer-column { flex: 1 1 40% !important; }
                }

                @media (max-width: 600px) {
                    .footer-content { flex-direction: column !important; align-items: center !important; text-align: center !important; }
                    .footer-column { width: 100% !important; }
                    .footer-link:hover { transform: translateY(-2px) !important; }
                    .legal-wrapper { grid-template-columns: 1fr !important; gap: 20px !important; text-align: center !important; }
                    .legal-left, .legal-right { justify-content: center !important; }
                    .legal-right { flex-direction: column !important; gap: 15px !important; }
                    .logo-big { width: 180px !important; margin-top: 20px; }
                }
                `}
            </style>

            <div style={styles.navSection}>
                <div style={styles.contentWrapper} className="footer-content">
                    <div style={styles.column} className="footer-column">
                        <h4 style={styles.title}>Nos produits</h4>
                        <span onClick={() => filterTo("Café")} style={styles.link} className="footer-link">Cafés</span>
                        <span onClick={() => filterTo("Thé")} style={styles.link} className="footer-link">Thé</span>
                        <span onClick={() => filterTo("Accessoire")} style={styles.link} className="footer-link">Accessoires</span>
                        <span onClick={() => filterTo("Tous")} style={styles.link} className="footer-link">Nos offres</span>
                    </div>

                    <div style={styles.column} className="footer-column">
                        <h4 style={styles.title}>À propos</h4>
                        <span onClick={() => goToPage("/nos-engagements")} style={styles.link} className="footer-link">Nos engagements</span>
                        <span onClick={() => goToPage("/notre-histoire")} style={styles.link} className="footer-link">Notre histoire</span>
                    </div>

                    <div style={styles.column} className="footer-column">
                        <h4 style={styles.title}>Contact</h4>
                        <span onClick={() => goToContact("faq")} style={styles.link} className="footer-link">FAQ</span>
                        <span onClick={() => goToContact("message")} style={styles.link} className="footer-link">Besoin d’aide</span>
                    </div>

                    <div style={styles.logoContainer} className="footer-column">
                        <img src="/logo2.webp" alt="CafThé Logo" style={styles.logoBig} className="logo-big" />
                    </div>
                </div>
            </div>

            <div style={styles.legalBar}>
                <div style={styles.legalWrapper} className="legal-wrapper">
                    <div style={styles.legalLeft} className="legal-left">
                        <img src="/logo1.webp" alt="Icon" style={styles.logoSmall} />
                    </div>
                    <div style={styles.legalCenter}>
                        <span onClick={scrollToTop} style={styles.scrollTop} className="scroll-btn">Haut de page ↑</span>
                    </div>
                    <div style={styles.legalRight} className="legal-right">
                        <span onClick={() => goToPage("/mentions-legales")} style={styles.legalLink} className="legal-link">Mentions légales</span>
                        <span onClick={() => goToPage("/cgv")} style={styles.legalLink} className="legal-link">CGV</span>
                        <span onClick={() => goToPage("/politique-confidentialite")} style={styles.legalLink} className="legal-link">Politique de confidentialité</span>
                        <span onClick={() => goToPage("/plan-site")} style={styles.legalLink} className="legal-link">Plan du site</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: { width: "100%", display: "flex", flexDirection: "column", margin: 0, padding: 0, boxSizing: "border-box" },
    navSection: { backgroundColor: "#E9E3E3", width: "100%", padding: "60px 0" },
    contentWrapper: { maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", padding: "0 5%", boxSizing: "border-box" },
    column: { display: "flex", flexDirection: "column", gap: "12px", boxSizing: "border-box" },
    title: { fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#373735", marginBottom: "20px", fontWeight: "bold" },
    link: { fontSize: "1.1rem", color: "#373735", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px", display: "inline-block" },
    logoContainer: { display: "flex", alignItems: "center", justifyContent: "center" },
    logoBig: { width: "220px", height: "auto", transition: "width 0.3s ease" },
    legalBar: { backgroundColor: "#373735", width: "100%", padding: "20px 0" },
    legalWrapper: { maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0 5%", color: "#C9A24D", boxSizing: "border-box" },
    legalLeft: { display: "flex", justifyContent: "flex-start" },
    legalCenter: { textAlign: "center" },
    legalRight: { display: "flex", justifyContent: "flex-end", gap: "30px" },
    logoSmall: { width: "45px", height: "auto" },
    scrollTop: { cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", display: "inline-block" },
    legalLink: { fontSize: "1rem", cursor: "pointer" }
};

export default Footer;