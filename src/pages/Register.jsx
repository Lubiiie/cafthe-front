import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom_client: "",
        prenom_client: "",
        adresse_livraison: "",
        code_postal_livraison: "",
        ville_livraison: "",
        email_client: "",
        telephone: "",
        mdp_client: ""
    });

    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <>
            <Helmet>
                <title>Créer un compte | CafThé</title>
                <meta name="description" content="Rejoignez la communauté CafThé. Créez votre compte pour commander vos cafés et thés préférés et bénéficier d'un suivi personnalisé." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div style={styles.overlay} className="register-overlay-res">
                <style>
                    {`
                    /* Correction Desktop : On descend le modal sous le header */
                    @media (min-width: 921px) {
                        .register-overlay-res {
                            padding-top: 140px !important;
                            align-items: flex-start !important;
                        }
                    }

                    @media (max-width: 920px) {
                        .register-overlay-res {
                            padding-top: 100px !important; 
                            align-items: flex-start !important;
                        }
                        .register-modal {
                            width: 95% !important;
                            margin-bottom: 40px !important;
                        }
                        .register-dark-section {
                            padding: 40px 30px !important;
                        }
                        .register-footer {
                            padding: 30px 20px !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .register-logo {
                            width: 180px !important;
                        }
                        .register-submit-btn {
                            width: 100% !important;
                            padding: 14px 20px !important;
                        }
                        .register-footer-action {
                            justify-content: center !important;
                        }
                    }
                    `}
                </style>

                <div style={styles.modal} className="register-modal">
                    <div style={styles.header}>
                        <img src="/logo2.webp" alt="CafThé" style={styles.logo} className="register-logo" />
                    </div>

                    <div style={styles.darkSection} className="register-dark-section">
                        <form onSubmit={handleSubmit} style={styles.form}>

                            <div style={styles.inputGroup}>
                                <input name="prenom_client" placeholder="Prénom" style={styles.input} onChange={handleChange} aria-label="Prénom" />
                                <input name="nom_client" placeholder="Nom" style={styles.input} onChange={handleChange} required aria-label="Nom de famille" />
                                <input name="email_client" type="email" placeholder="Email" style={styles.input} onChange={handleChange} required aria-label="Adresse email" />
                                <input name="mdp_client" type="password" placeholder="Mot de passe" style={styles.input} onChange={handleChange} required aria-label="Mot de passe" />
                            </div>

                            <hr style={styles.divider} />

                            <div style={styles.inputGroup}>
                                <input name="adresse_livraison" placeholder="Adresse de livraison" style={styles.input} onChange={handleChange} aria-label="Adresse de livraison" />
                                <input name="ville_livraison" placeholder="Ville" style={styles.input} onChange={handleChange} aria-label="Ville" />
                                <input name="code_postal_livraison" placeholder="Code postal" style={styles.input} onChange={handleChange} maxLength="5" aria-label="Code postal" />
                                <input name="telephone" placeholder="Numéro de téléphone" style={styles.input} onChange={handleChange} maxLength="10" aria-label="Numéro de téléphone" />
                            </div>

                            <hr style={styles.divider} />

                            <div style={styles.footerAction} className="register-footer-action">
                                <button
                                    type="submit"
                                    className="register-submit-btn"
                                    aria-label="Créer mon compte et continuer"
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

                    <div style={styles.footer} className="register-footer">
                        <p style={styles.legalText}>
                            Vos données personnelles sont destinées à CafThé*. Elles sont recueillies exclusivement pour assurer la gestion de votre compte et le suivi de vos commandes d’exception. Elles ne seront pas utilisées à d’autres fins sans votre consentement préalable.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    overlay: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E9E3E3",
        display: "flex",
        justifyContent: "center",
        padding: "40px 0"
    },
    modal: {
        width: "750px",
        backgroundColor: "#E9E3E3",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
    },
    header: {
        height: "120px",
        paddingTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9E3E3",
        padding: "0",
        overflow: "visible"
    },
    logo: {
        width: "250px",
        height: "auto",
    },
    darkSection: {
        backgroundColor: "#373735",
        padding: "50px 100px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
    },
    input: {
        width: "100%",
        padding: "15px 20px",
        backgroundColor: "#E9E3E3",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        color: "#373735",
        outline: "none",
        boxSizing: "border-box"
    },
    divider: {
        width: "100%",
        border: "0.5px solid #E9E3E3",
        margin: "25px 0",
        opacity: 0.2
    },
    footerAction: {
        display: "flex",
        justifyContent: "flex-end"
    },
    submitBtn: {
        padding: "14px 60px",
        borderRadius: "30px",
        border: "none",
        fontSize: "1.1rem",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    footer: {
        padding: "40px 80px",
        textAlign: "center"
    },
    legalText: {
        fontSize: "0.9rem",
        color: "#373735",
        lineHeight: "1.6",
        margin: 0
    }
};

export default Register;