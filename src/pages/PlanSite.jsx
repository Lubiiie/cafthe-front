import React from 'react';
import { Link } from 'react-router-dom';

const PlanSite = () => {
    return (
        <div style={styles.mainWrapper}>
            <main style={styles.contentArea}>
                <div style={styles.pageContainer}>
                    <h1 style={styles.mainTitle}>Plan du site</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro}>
                            Retrouvez ici l'ensemble des pages de <strong>CafThé</strong>. Naviguez facilement à travers notre catalogue d'exception, votre espace client et nos informations légales.
                        </p>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>Navigation Principale</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}><Link to="/" style={styles.link}>Accueil</Link></li>
                                <li style={styles.listItem}><Link to="/panier" style={styles.link}>Votre Panier</Link></li>
                                <li style={styles.listItem}><Link to="/login" style={styles.link}>Connexion / Inscription</Link></li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>Espace Client</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}><Link to="/compte" style={styles.link}>Mon Compte</Link></li>
                                <li style={styles.listItem}><Link to="/compte" style={styles.link}>Historique des commandes</Link></li>
                                <li style={styles.listItem}><Link to="/compte" style={styles.link}>Gestion des informations personnelles</Link></li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>Informations Légales</h2>
                            <ul style={styles.list}>
                                <li style={styles.listItem}><Link to="/mentions-legales" style={styles.link}>Mentions Légales</Link></li>
                                <li style={styles.listItem}><Link to="/politique-confidentialite" style={styles.link}>Politique de Confidentialité</Link></li>
                                <li style={styles.listItem}><Link to="/cgv" style={styles.link}>Conditions Générales de Vente (CGV)</Link></li>
                                <li style={styles.listItem}><Link to="/plan-site" style={styles.link}>Plan du site</Link></li>
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
        // Ajustement : passage à 3rem (~48px) pour la cohérence
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
        // Ajustement : passage à 1.15rem (~18.5px)
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
        // Ajustement : passage à 1.5rem (~24px)
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
        transition: 'color 0.3s ease',
        // Ajustement : passage à 1.1rem (~17.5px) pour les liens de navigation
        fontSize: '1.1rem',
        fontWeight: '500',
        cursor: 'pointer',
        borderBottom: '1px solid transparent'
    }
};

export default PlanSite;