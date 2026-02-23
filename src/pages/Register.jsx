import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    // 1. État synchronisé avec les colonnes de ta BDD (image_846fa2.png)
    const [formData, setFormData] = useState({
        nom_client: "",           // Null: Non (image_846fa2.png)
        prenom_client: "",        // Null: Oui
        adresse_livraison: "",    // Null: Oui
        code_postal_livraison: "",// Null: Oui
        ville_livraison: "",      // Null: Oui
        email_client: "",         // Null: Non (image_846fa2.png)
        telephone: "",            // Null: Oui
        mdp_client: ""            // Null: Non (image_846fa2.png)
    });

    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 2. Préparation des données pour inclure la facturation (image_846fa2.png)
        const dataToSend = {
            ...formData,
            adresse_facturation: formData.adresse_livraison,
            code_postal_facturation: formData.code_postal_livraison,
            ville_facturation: formData.ville_livraison
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                alert("Erreur lors de la création du compte.");
            }
        } catch (error) {
            console.error("Erreur serveur:", error);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Header affiné avec logo agrandi (image_846800.png) */}
                <div style={styles.header}>
                    <img src="/logo2.webp" alt="CafThé" style={styles.logo} />
                </div>

                <div style={styles.darkSection}>
                    <form onSubmit={handleSubmit} style={styles.form}>

                        {/* Section Identité */}
                        <div style={styles.inputGroup}>
                            <input name="prenom_client" placeholder="Prénom" style={styles.input} onChange={handleChange} />
                            <input name="nom_client" placeholder="Nom" style={styles.input} onChange={handleChange} required />
                            <input name="email_client" type="email" placeholder="Email" style={styles.input} onChange={handleChange} required />
                            <input name="mdp_client" type="password" placeholder="Mot de passe" style={styles.input} onChange={handleChange} required />
                        </div>

                        <hr style={styles.divider} />

                        {/* Section Livraison (image_846fa2.png) */}
                        <div style={styles.inputGroup}>
                            <input name="adresse_livraison" placeholder="Adresse de livraison" style={styles.input} onChange={handleChange} />
                            <input name="ville_livraison" placeholder="Ville" style={styles.input} onChange={handleChange} />
                            <input name="code_postal_livraison" placeholder="Code postal" style={styles.input} onChange={handleChange} maxLength="5" />
                            <input name="telephone" placeholder="Numéro de téléphone" style={styles.input} onChange={handleChange} maxLength="10" />
                        </div>

                        <hr style={styles.divider} />

                        <div style={styles.footerAction}>
                            <button
                                type="submit"
                                style={{
                                    ...styles.submitBtn,
                                    backgroundColor: isHovered ? "#C9A24D" : "#E9E3E3",
                                    color: isHovered ? "#FFF" : "#C9A24D",
                                    transform: isHovered ? "scale(1.05)" : "scale(1)"
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                Continuer
                            </button>
                        </div>
                    </form>
                </div>

                <div style={styles.footer}>
                    <p style={styles.legalText}>
                        Vos données personnelles sont destinées à CafThé*. Elles sont recueillies exclusivement pour assurer la gestion de votre compte et le suivi de vos commandes d’exception. Elles ne seront pas utilisées à d’autres fins sans votre consentement préalable.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E9E3E3",
        display: "flex",
        justifyContent: "center",
        padding: "40px 0" },
    modal: {
        width: "750px",
        backgroundColor: "#E9E3E3",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"},
    header: {
        height: "120px", // On impose une hauteur fixe et courte
        paddingTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Centre le logo verticalement même s'il dépasse
        backgroundColor: "#E9E3E3",
        padding: "0", // On supprime complètement le padding interne
        overflow: "visible" // Permet au logo de respirer sans pousser les bords
    },
    logo: {
        width: "250px",
        height: "auto",
        // Plus besoin de marges ici, c'est le header qui commande
    },
    darkSection: {
        backgroundColor: "#373735",
        padding: "50px 100px" }, // Gris anthracite de la maquette
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px" },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "18px" },
    input: {
        width: "100%",
        padding: "15px 20px",
        backgroundColor: "#E9E3E3", // Inputs clairs sur fond sombre
        border: "none",
        borderRadius: "4px",
        fontSize: "15px",
        color: "#373735",
        outline: "none",
        boxSizing: "border-box"
    },
    divider: {
        width: "100%",
        border: "0.5px solid #E9E3E3",
        margin: "25px 0",
        opacity: 0.2 }, // Ligne de séparation
    footerAction: {
        display: "flex",
        justifyContent: "flex-end" },
    submitBtn: {
        padding: "14px 60px",
        borderRadius: "30px",
        border: "none",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    footer: {
        padding: "40px 80px",
        textAlign: "center" },
    legalText: {
        fontSize: "12px",
        color: "#373735",
        lineHeight: "1.6",
        margin: 0 }
};

export default Register;