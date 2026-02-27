import React from 'react';
import Header from '../components/Header.jsx';

const MentionsLegales = () => {
    return (
        <div style={styles.mainWrapper}>
            <Header />

            <main style={styles.contentArea}>
                <div style={styles.pageContainer}>
                    <h1 style={styles.mainTitle}>Mentions légales</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro}>
                            Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs du site Cafthé les présentes mentions légales.
                        </p>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>1. Éditeur du site</h2>
                            <p style={styles.text}>Le site Cafthé est édité par :</p>
                            <ul style={styles.list}>
                                <li><strong>Nom/Raison sociale :</strong> CafThé</li>
                                <li><strong>Forme juridique :</strong> SAS</li>
                                <li><strong>Responsable de la publication :</strong> Agathe Courtois</li>
                                <li><strong>Contact :</strong> contact@cafthe.fr</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>2. Hébergeur du site</h2>
                            <p style={styles.text}>Le site est hébergé par :</p>
                            <ul style={styles.list}>
                                <li><strong>Nom de l'hébergeur :</strong> </li>
                                <li><strong>Adresse :</strong> </li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>3. Propriété intellectuelle</h2>
                            <p style={styles.text}>
                                L'ensemble des éléments constituant le site Cafthé (logo, charte graphique, photographies de produits et accessoires) sont la propriété exclusive de l'éditeur ou de ses partenaires.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>4. Données personnelles</h2>
                            <p style={styles.text}>
                                Le site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée, conformément à la loi n°78-17 du 6 janvier 1978.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>5. Cookies</h2>
                            <p style={styles.text}>
                                L'utilisateur est informé que lors de ses visites sur le site, un cookie peut s'installer automatiquement sur son logiciel de navigation pour faciliter la gestion du panier.
                            </p>
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
        // Ajustement : passage à 3rem (~48px) pour la cohérence avec les CGV
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
        // Ajustement : passage à 1.15rem (~18.5px)
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
        // Ajustement : passage à 1.5rem (~24px) pour les têtes de section
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block'
    },
    text: {
        // Ajustement : corps de texte à 1.1rem (~17.5px)
        fontSize: '1.1rem',
        marginBottom: '10px'
    },
    list: {
        // Ajustement : éléments de liste à 1.1rem
        fontSize: '1.1rem',
        listStyleType: 'none',
        paddingLeft: '0'
    }
};

export default MentionsLegales;