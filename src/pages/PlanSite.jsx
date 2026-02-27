import React from 'react';
import { Link } from 'react-router-dom';

const PlanSite = () => {
    return (
        <div style={styles.mainWrapper}>
            <style>
                {`
                .plansite-link:hover { color: #C9A24D !important; border-bottom: 1px solid #C9A24D !important; }

                @media (max-width: 920px) {
                    .plansite-main {
                        padding-top: 140px !important; /* Décalage pour le Header */
                    }
                    .plansite-container {
                        width: 95% !important;
                        padding: 40px 25px !important; /* Réduction des paddings internes */
                    }
                    .plansite-title {
                        font-size: 2.2rem !important;
                        margin-bottom: 30px !important;
                    }
                    .plansite-subtitle {
                        font-size: 1.3rem !important;
                    }
                    .plansite-intro {
                        font-size: 1.05rem !important;
                        padding-left: 15px !important;
                        margin-bottom: 30px !important;
                    }
                    .plansite-link-text {
                        font-size: 1rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .plansite-main {
                        padding-top: 120px !important;
                    }
                    .plansite-title {
                        font-size: 1.8rem !important;
                    }
                    .plansite-container {
                        padding: 30px 15px !important;
                    }
                }
                `}
            </style>
            <main style={styles.contentArea} className="plansite-main">
                <div style={styles.pageContainer} className="plansite-container">
                    <h1 style={styles.mainTitle} className="plansite-title">Plan du site</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro} className="plansite-intro">
                            Retrouvez ici l'ensemble des pages de <strong>CafThé</strong>. Naviguez facilement à travers notre catalogue d'exception, votre espace client et nos informations légales.
                        </p>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="plansite-subtitle">Navigation Principale</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}><Link to="/" style={styles.link} className="plansite-link plansite-link-text">Accueil</Link></li>
                                <li style={styles.listItem}><Link to="/panier" style={styles.link} className="plansite-link plansite-link-text">Votre Panier</Link></li>
                                <li style={styles.listItem}><Link to="/login" style={styles.link} className="plansite-link plansite-link-text">Connexion / Inscription</Link></li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="plansite-subtitle">Espace Client</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}><Link to="/compte" style={styles.link} className="plansite-link plansite-link-text">Mon Compte</Link></li>
                                <li style={styles.listItem}><Link to="/compte" style={styles.link} className="plansite-link plansite-link-text">Historique des commandes</Link></li>
                                <li style={styles.listItem}><Link to="/compte" style={styles.link} className="plansite-link plansite-link-text">Gestion des informations personnelles</Link></li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="plansite-subtitle">Informations Légales</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}><Link to="/mentions-legales" style={styles.link} className="plansite-link plansite-link-text">Mentions Légales</Link></li>
                                <li style={styles.listItem}><Link to="/politique-confidentialite" style={styles.link} className="plansite-link plansite-link-text">Politique de Confidentialité</Link></li>
                                <li style={styles.listItem}><Link to="/cgv" style={styles.link} className="plansite-link plansite-link-text">Conditions Générales de Vente (CGV)</Link></li>
                                <li style={styles.listItem}><Link to="/plan-site" style={styles.link} className="plansite-link plansite-link-text">Plan du site</Link></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

const styles = {
    mainWrapper: {
        backgroundColor: '#373735',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    contentArea: {
        flex: 1,
        paddingTop: '120px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center',
    },
    pageContainer: {
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#E9E3E3',
        borderRadius: '15px',
        padding: '60px 80px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    mainTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '3rem',
        color: '#373735',
        textAlign: 'center',
        marginBottom: '50px',
        fontWeight: 'bold',
    },
    legalNotice: {
        color: '#373735',
        fontFamily: "'Lato', sans-serif",
        lineHeight: '1.8',
    },
    intro: {
        fontSize: '1.15rem',
        marginBottom: '40px',
        fontStyle: 'italic',
        borderLeft: '4px solid #C9A24D',
        paddingLeft: '20px',
    },
    section: {
        marginBottom: '35px',
    },
    subTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block',
    },
    list: {
        paddingLeft: '20px',
        listStyleType: 'none',
    },
    listItem: {
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        color: '#373735',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontSize: '1.1rem',
        fontWeight: '500',
        cursor: 'pointer',
        borderBottom: '1px solid transparent'
    }
};

export default PlanSite;