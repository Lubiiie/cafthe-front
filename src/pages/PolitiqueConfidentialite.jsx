import React from 'react';
import Header from '../components/Header.jsx';

const PolitiqueConfidentialite = () => {
    return (
        <div style={styles.mainWrapper}>
            <Header />

            <main style={styles.contentArea}>
                <div style={styles.pageContainer}>
                    <h1 style={styles.mainTitle}>Politique de confidentialité</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro}>
                            La présente Politique de confidentialité a pour but d'informer les utilisateurs du site Cafthé sur la manière dont leurs données personnelles sont collectées, utilisées et protégées.
                        </p>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>1. Collecte des données personnelles</h2>
                            <p style={styles.text}>Dans le cadre de l'exploitation du site, nous collectons les données suivantes :</p>
                            <ul style={styles.list}>
                                <li><strong>Création de compte client :</strong> Nom, prénom, adresse e-mail, mot de passe.</li>
                                <li><strong>Processus de commande :</strong> Adresse de livraison, adresse de facturation et numéro de téléphone pour le suivi de livraison.</li>
                                <li><strong>Gestion des paiements :</strong> Les informations de paiement sont traitées par nos prestataires de paiement sécurisés ; nous ne stockons pas vos coordonnées bancaires.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>2. Utilisation des données</h2>
                            <p style={styles.text}>Vos données sont traitées pour les finalités suivantes :</p>
                            <ul style={styles.list}>
                                <li>Gestion et expédition de vos commandes de thés, cafés et accessoires.</li>
                                <li>Accès à votre historique de commandes et suivi des colis en cours.</li>
                                <li>Amélioration de l'expérience utilisateur sur le catalogue et le panier.</li>
                                <li>Envoi de newsletters ou d'offres promotionnelles (uniquement avec votre consentement préalable).</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>3. Conservation des données</h2>
                            <ul style={styles.list}>
                                <li><strong>Données de compte :</strong> Conservées tant que votre compte est actif.</li>
                                <li><strong>Données de commande :</strong> Conservées pendant la durée nécessaire à la gestion commerciale et aux obligations comptables (généralement 10 ans en France).</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>4. Partage des données avec des tiers</h2>
                            <p style={styles.text}>Pour assurer le bon fonctionnement de Cafthé, nous partageons certaines données avec des partenaires de confiance :</p>
                            <ul style={styles.list}>
                                <li><strong>Transporteurs :</strong> Pour la livraison de vos produits.</li>
                                <li><strong>Hébergeur du site :</strong> Pour assurer la disponibilité technique de la plateforme.</li>
                                <li><strong>Prestataires de paiement :</strong> Pour sécuriser vos transactions lors de l'étape de paiement.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>5. Vos droits (RGPD)</h2>
                            <p style={styles.text}>Conformément à la réglementation, vous disposez des droits suivants concernant vos informations personnelles :</p>
                            <ul style={styles.list}>
                                <li><strong>Droit d'accès et de rectification :</strong> Vous pouvez modifier vos informations directement dans l'onglet "Gestion informations personnelles" de votre compte.</li>
                                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de votre compte client.</li>
                                <li><strong>Droit d'opposition :</strong> Vous pouvez vous désinscrire de nos communications marketing à tout moment.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>6. Sécurité</h2>
                            <p style={styles.text}>
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
        // Ajustement : passage à 1.5rem (~24px) pour les têtes de section
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block',
    },
    text: {
        // Ajustement : corps de texte à 1.1rem (~17.5px)
        fontSize: '1.1rem',
        marginBottom: '10px',
    },
    list: {
        // Ajustement : les puces suivent le standard à 1.1rem
        fontSize: '1.1rem',
        paddingLeft: '20px',
        marginBottom: '10px',
    },
};

export default PolitiqueConfidentialite;