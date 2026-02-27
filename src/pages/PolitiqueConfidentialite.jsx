import React from 'react';
import Header from '../components/Header.jsx';

const PolitiqueConfidentialite = () => {
    return (
        <div style={styles.mainWrapper}>
            <style>
                {`
                @media (max-width: 920px) {
                    .politique-main {
                        padding-top: 140px !important; /* Sécurité pour le Header */
                    }
                    .politique-container {
                        width: 95% !important;
                        padding: 40px 25px !important; /* Réduction des paddings internes */
                    }
                    .politique-title {
                        font-size: 2.2rem !important;
                        margin-bottom: 30px !important;
                    }
                    .politique-subtitle {
                        font-size: 1.3rem !important;
                    }
                    .politique-intro {
                        font-size: 1.05rem !important;
                        padding-left: 15px !important;
                        margin-bottom: 30px !important;
                    }
                    .politique-text, .politique-list {
                        font-size: 1rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .politique-main {
                        padding-top: 120px !important;
                    }
                    .politique-title {
                        font-size: 1.8rem !important;
                    }
                    .politique-container {
                        padding: 30px 15px !important;
                    }
                }
                `}
            </style>
            <Header />

            <main style={styles.contentArea} className="politique-main">
                <div style={styles.pageContainer} className="politique-container">
                    <h1 style={styles.mainTitle} className="politique-title">Politique de confidentialité</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro} className="politique-intro">
                            La présente Politique de confidentialité a pour but d'informer les utilisateurs du site Cafthé sur la manière dont leurs données personnelles sont collectées, utilisées et protégées.
                        </p>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">1. Collecte des données personnelles</h2>
                            <p style={styles.text} className="politique-text">Dans le cadre de l'exploitation du site, nous collectons les données suivantes :</p>
                            <ul style={styles.list} className="politique-list">
                                <li><strong>Création de compte client :</strong> Nom, prénom, adresse e-mail, mot de passe.</li>
                                <li><strong>Processus de commande :</strong> Adresse de livraison, adresse de facturation et numéro de téléphone pour le suivi de livraison.</li>
                                <li><strong>Gestion des paiements :</strong> Les informations de paiement sont traitées par nos prestataires de paiement sécurisés ; nous ne stockons pas vos coordonnées bancaires.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">2. Utilisation des données</h2>
                            <p style={styles.text} className="politique-text">Vos données sont traitées pour les finalités suivantes :</p>
                            <ul style={styles.list} className="politique-list">
                                <li>Gestion et expédition de vos commandes de thés, cafés et accessoires.</li>
                                <li>Accès à votre historique de commandes et suivi des colis en cours.</li>
                                <li>Amélioration de l'expérience utilisateur sur le catalogue et le panier.</li>
                                <li>Envoi de newsletters ou d'offres promotionnelles (uniquement avec votre consentement préalable).</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">3. Conservation des données</h2>
                            <ul style={styles.list} className="politique-list">
                                <li><strong>Données de compte :</strong> Conservées tant que votre compte est actif.</li>
                                <li><strong>Données de commande :</strong> Conservées pendant la durée nécessaire à la gestion commerciale et aux obligations comptables (généralement 10 ans en France).</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">4. Partage des données avec des tiers</h2>
                            <p style={styles.text} className="politique-text">Pour assurer le bon fonctionnement de Cafthé, nous partageons certaines données avec des partenaires de confiance :</p>
                            <ul style={styles.list} className="politique-list">
                                <li><strong>Transporteurs :</strong> Pour la livraison de vos produits.</li>
                                <li><strong>Hébergeur du site :</strong> Pour assurer la disponibilité technique de la plateforme.</li>
                                <li><strong>Prestataires de paiement :</strong> Pour sécuriser vos transactions lors de l'étape de paiement.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">5. Vos droits (RGPD)</h2>
                            <p style={styles.text} className="politique-text">Conformément à la réglementation, vous disposez des droits suivants concernant vos informations personnelles :</p>
                            <ul style={styles.list} className="politique-list">
                                <li><strong>Droit d'accès et de rectification :</strong> Vous pouvez modifier vos informations directement dans l'onglet "Gestion informations personnelles" de votre compte.</li>
                                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de votre compte client.</li>
                                <li><strong>Droit d'opposition :</strong> Vous pouvez vous désinscrire de nos communications marketing à tout moment.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle} className="politique-subtitle">6. Sécurité</h2>
                            <p style={styles.text} className="politique-text">
                                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, altération ou divulgation.
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
    text: {
        fontSize: '1.1rem',
        marginBottom: '10px',
    },
    list: {
        fontSize: '1.1rem',
        paddingLeft: '20px',
        marginBottom: '10px',
    },
};

export default PolitiqueConfidentialite;