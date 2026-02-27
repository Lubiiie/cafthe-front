import React from 'react';
import Header from '../components/Header.jsx';
import { Helmet } from 'react-helmet-async';

const MentionsLegales = () => {
    return (
        <>
            <Helmet>
                <title>Mentions Légales | CafThé</title>
                <meta name="description" content="Consultez les mentions légales du site Cafthé. Informations sur l'éditeur, l'hébergeur et la protection des données personnelles." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div style={styles.mainWrapper}>
                <style>
                    {`
                    @media (max-width: 920px) {
                        .mentions-main {
                            padding-top: 140px !important; /* Décalage pour le Header en mobile */
                        }
                        .mentions-container {
                            width: 95% !important;
                            padding: 40px 25px !important; /* Réduction des paddings internes */
                        }
                        .mentions-title {
                            font-size: 2.2rem !important; /* Titre plus adapté */
                            margin-bottom: 30px !important;
                        }
                        .mentions-subtitle {
                            font-size: 1.3rem !important;
                        }
                        .mentions-intro {
                            font-size: 1.05rem !important;
                            padding-left: 15px !important;
                            margin-bottom: 30px !important;
                        }
                        .mentions-text, .mentions-list {
                            font-size: 1rem !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .mentions-main {
                            padding-top: 120px !important;
                        }
                        .mentions-title {
                            font-size: 1.8rem !important;
                        }
                        .mentions-container {
                            padding: 30px 15px !important;
                        }
                    }
                    `}
                </style>
                <Header />

                <main style={styles.contentArea} className="mentions-main">
                    <div style={styles.pageContainer} className="mentions-container">
                        <h1 style={styles.mainTitle} className="mentions-title">Mentions légales</h1>

                        <div style={styles.legalNotice}>
                            <p style={styles.intro} className="mentions-intro">
                                Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs du site Cafthé les présentes mentions légales.
                            </p>

                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">1. Éditeur du site</h2>
                                <p style={styles.text} className="mentions-text">Le site Cafthé est édité par :</p>
                                <ul style={styles.list} className="mentions-list">
                                    <li><strong>Nom/Raison sociale :</strong> CafThé</li>
                                    <li><strong>Forme juridique :</strong> SAS</li>
                                    <li><strong>Responsable de la publication :</strong> Agathe Courtois</li>
                                    <li><strong>Contact :</strong> contact@cafthe.fr</li>
                                </ul>
                            </section>

                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">2. Hébergeur du site</h2>
                                <p style={styles.text} className="mentions-text">Le site est hébergé par :</p>
                                <ul style={styles.list} className="mentions-list">
                                    <li><strong>Nom de l'hébergeur :</strong> </li>
                                    <li><strong>Adresse :</strong> </li>
                                </ul>
                            </section>

                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">3. Propriété intellectuelle</h2>
                                <p style={styles.text} className="mentions-text">
                                    L'ensemble des éléments constituant le site Cafthé (logo, charte graphique, photographies de produits et accessoires) sont la propriété exclusive de l'éditeur ou de ses partenaires.
                                </p>
                            </section>

                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">4. Données personnelles</h2>
                                <p style={styles.text} className="mentions-text">
                                    Le site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée, conformément à la loi n°78-17 du 6 janvier 1978.
                                </p>
                            </section>

                            <section style={styles.section}>
                                <h2 style={styles.subTitle} className="mentions-subtitle">5. Cookies</h2>
                                <p style={styles.text} className="mentions-text">
                                    L'utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer automatiquement sur son logiciel de navigation pour faciliter la gestion du panier.
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

const styles = {
    mainWrapper: {
        backgroundColor: '#373735',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    contentArea: {
        flex: 1,
        paddingTop: '120px',
        paddingBottom: '80px',
        display: 'flex',
        justifyContent: 'center'
    },
    pageContainer: {
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#E9E3E3',
        borderRadius: '15px',
        padding: '60px 80px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    mainTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '3rem',
        color: '#373735',
        textAlign: 'center',
        marginBottom: '50px',
        fontWeight: 'bold'
    },
    legalNotice: {
        color: '#373735',
        fontFamily: "'Lato', sans-serif",
        lineHeight: '1.8'
    },
    intro: {
        fontSize: '1.15rem',
        marginBottom: '40px',
        fontStyle: 'italic',
        borderLeft: '4px solid #C9A24D',
        paddingLeft: '20px'
    },
    section: {
        marginBottom: '35px'
    },
    subTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block'
    },
    text: {
        fontSize: '1.1rem',
        marginBottom: '10px'
    },
    list: {
        fontSize: '1.1rem',
        listStyleType: 'none',
        paddingLeft: '0'
    }
};

export default MentionsLegales;