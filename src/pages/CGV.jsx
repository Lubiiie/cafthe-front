import React from 'react';

const CGV = () => {
    return (
        <div style={styles.mainWrapper}>
            <main style={styles.contentArea}>
                <div style={styles.pageContainer}>
                    <h1 style={styles.mainTitle}>Conditions Générales de Vente</h1>

                    <div style={styles.legalNotice}>
                        <p style={styles.intro}>
                            Les présentes Conditions Générales de Vente régissent l'ensemble des transactions effectuées sur le site e-commerce <strong>CafThé</strong>. Toute commande passée sur le site implique l'adhésion entière et sans réserve du client aux présentes CGV.
                        </p>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>1. Objet</h2>
                            <p style={styles.text}>
                                Les présentes CGV visent à définir les obligations réciproques entre Cafthé et l'utilisateur dans le cadre de la vente de thés, cafés de spécialité et accessoires de dégustation.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>2. Produits et Catalogue</h2>
                            <ul style={styles.list}>
                                <li>Les produits proposés sont ceux figurant dans le Catalogue du site au moment de la consultation par l'utilisateur.</li>
                                <li>Chaque article fait l'objet d'une Fiche produit détaillée présentant ses caractéristiques essentielles et son origine.</li>
                                <li>Les visuels sont fournis à titre illustratif et restent la propriété exclusive de CafThé.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>3. Processus de Commande</h2>
                            <p style={styles.text}>Pour valider une commande, l'utilisateur doit suivre le parcours suivant :</p>
                            <ul style={styles.list}>
                                <li>Sélection des produits et ajout au Panier.</li>
                                <li>Connexion au compte client ou création de compte.</li>
                                <li>Validation du mode de livraison.</li>
                                <li>Paiement sécurisé de la commande.</li>
                                <li>Réception d'un mail récapitulatif de commande.</li>
                            </ul>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>4. Prix et Paiement</h2>
                            <p style={styles.text}>
                                Les prix sont indiqués en Euros TTC. Le règlement s'effectue lors de l'étape Paiement via les moyens sécurisés mis à disposition. Cafthé se réserve le droit de modifier ses prix à tout moment.
                            </p>
                        </section>

                        <section style={styles.section}>
                            <h2 style={styles.subTitle}>5. Droit de Rétractation</h2>
                            <p style={styles.text}>
                                Conformément à la loi, le client dispose d'un délai de 14 jours pour exercer son droit de rétractation. <strong>Note :</strong> les produits alimentaires (café/thé) ouverts ne peuvent être retournés pour des raisons d'hygiène.
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
        // Ajustement : passage à 3rem (~48px) pour un titre majeur bien ancré
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
        // Ajustement : passage à 1.15rem (~18.5px) pour l'introduction en italique
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
        // Ajustement : passage à 1.5rem (~24px) pour les têtes de chapitres
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#373735',
        borderBottom: '1px solid rgba(55, 55, 53, 0.1)',
        paddingBottom: '10px',
        display: 'inline-block',
    },
    text: {
        // Ajustement : standardisation à 1.1rem (~17.5px) comme pour les avis clients
        fontSize: '1.1rem',
        marginBottom: '10px',
    },
    list: {
        // Ajustement : les éléments de liste suivent le corps de texte à 1.1rem
        fontSize: '1.1rem',
        paddingLeft: '20px',
        listStyleType: 'disc',
    },
};

export default CGV;