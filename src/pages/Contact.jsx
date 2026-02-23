import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Contact = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const location = useLocation();

    const faqData = [
        { q: "Quels sont les délais de livraison ?", a: "Vos commandes sont préparées sous 24h. Comptez 2 à 4 jours ouvrés." },
        { q: "Comment suivre ma commande ?", a: "Un numéro de suivi vous est envoyé par mail dès l'expédition." },
        { q: "Puis-je modifier ma commande ?", a: "Tant qu'elle n'est pas expédiée, contactez-nous au plus vite." }
    ];

    // Détection de la section demandée via l'URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get("section");

        if (section) {
            const element = document.getElementById(section);
            if (element) {
                // Petit délai pour laisser le temps à la page de charger
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
        }
    }, [location]);

    return (
        <div style={styles.pageWrapper}>
            <style>
                {`
                .submit-btn:hover { background-color: #E9E3E3 !important; color: #373735 !important; transform: translateY(-3px); }
                .faq-header:hover .question-text { color: #C9A24D; }
                `}
            </style>

            <header style={styles.heroSection}>
                <h1 style={styles.mainTitle}>Besoin d'aide ?</h1>
                <p style={styles.heroSubtitle}>Consultez notre FAQ ou contactez-nous directement.</p>
            </header>

            {/* Ajout d'un ID pour l'ancre : faq */}
            <section id="faq" style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRow}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Foire aux questions</h2>
                            <div style={{ marginTop: "30px" }}>
                                {faqData.map((item, index) => (
                                    <div key={index} style={styles.faqItem}>
                                        <div className="faq-header" style={styles.faqHeader} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                            <span className="question-text" style={styles.questionText}>{item.q}</span>
                                            {openIndex === index ? <FiChevronUp color="#C9A24D" /> : <FiChevronDown color="#C9A24D" />}
                                        </div>
                                        {openIndex === index && <div style={styles.faqAnswer}>{item.a}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={styles.imageBlock}>
                            <img src="/logo2.webp" alt="Support" style={styles.image} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Ajout d'un ID pour l'ancre : message */}
            <section id="message" style={styles.sectionDark}>
                <div style={styles.container}>
                    <div style={styles.contentRowReverse}>
                        <div style={styles.textBlock}>
                            <h2 style={styles.sectionTitle}>Nous écrire</h2>
                            <form style={styles.form}>
                                <input type="text" placeholder="Votre nom" style={styles.input} />
                                <input type="email" placeholder="Votre email" style={styles.input} />
                                <textarea placeholder="Votre message" style={styles.textarea}></textarea>
                                <button type="submit" className="submit-btn" style={styles.submitButton}>Envoyer le message</button>
                            </form>
                        </div>
                        <div style={styles.imageBlock}>
                            <div style={styles.contactInfo}>
                                <h3 style={{ color: "#C9A24D", fontFamily: "Playfair Display", marginBottom: "15px" }}>CafThé Boutique</h3>
                                <p style={styles.paragraph}>15 Rue de l'Excellence, 75001 Paris</p>
                                <p style={styles.paragraph}>contact@cafthe.fr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    pageWrapper: { backgroundColor: "#E9E3E3", minHeight: "100vh", paddingTop: "120px" },
    heroSection: { maxWidth: "900px", margin: "0 auto 80px auto", textAlign: "center", padding: "0 20px" },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "#373735", marginBottom: "25px" },
    heroSubtitle: { fontSize: "18px", lineHeight: "1.6", color: "#373735", opacity: 0.9 },
    sectionDark: { backgroundColor: "#373735", padding: "80px 0", marginBottom: "40px" },
    container: { maxWidth: "1200px", margin: "0 auto", padding: "0 40px" },
    contentRow: { display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" },
    contentRowReverse: { display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "60px", flexWrap: "wrap" },
    textBlock: { flex: "1", minWidth: "300px", color: "#E9E3E3" },
    sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#C9A24D", marginBottom: "20px" },
    paragraph: { fontSize: "16px", lineHeight: "1.7", marginBottom: "15px", opacity: 0.8 },
    quote: { fontStyle: "italic", fontSize: "18px", borderLeft: "3px solid #C9A24D", paddingLeft: "20px", margin: "30px 0", color: "#C9A24D" },
    imageBlock: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center" },
    image: { width: "80%", maxWidth: "500px", borderRadius: "10px", transition: "all 0.4s ease", cursor: "pointer" },
    faqItem: { borderBottom: "1px solid rgba(201, 162, 77, 0.3)", padding: "15px 0" },
    faqHeader: { display: "flex", justifyContent: "space-between", cursor: "pointer", alignItems: "center", transition: "0.3s" },
    questionText: { fontSize: "17px", fontWeight: "500", transition: "0.3s" },
    faqAnswer: { marginTop: "15px", opacity: 0.7, lineHeight: "1.6", fontSize: "15px", paddingBottom: "10px" },
    form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" },
    input: { backgroundColor: "#E9E3E3", border: "none", padding: "12px", borderRadius: "5px", outline: "none" },
    textarea: { backgroundColor: "#E9E3E3", border: "none", padding: "12px", borderRadius: "5px", minHeight: "120px", outline: "none", fontFamily: "inherit" },
    submitButton: {
        backgroundColor: "#C9A24D", color: "#373735", border: "none", padding: "12px",
        borderRadius: "30px", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease",
        fontFamily: "Playfair Display"
    },
    contactInfo: { textAlign: "left", width: "100%", color: "#E9E3E3" }
};

export default Contact;