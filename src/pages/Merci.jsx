import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiMail, FiArrowRight } from 'react-icons/fi';
import { useCard } from "../context/CardContext";

const Merci = () => {
    const { clearCart } = useCard();
    const [isHovered, setIsHovered] = useState(null); // État pour gérer les hovers

    useEffect(() => {
        clearCart();
        // On ne met RIEN dans le tableau ci-dessous []
        // Cela garantit que la fonction ne s'exécute qu'une seule fois à l'arrivée sur la page
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.iconWrapper}>
                        <FiCheckCircle style={styles.successIcon} />
                    </div>

                    <h1 style={styles.title}>Commande confirmée !</h1>
                    <p style={styles.subtitle}>
                        Merci pour votre confiance. Votre commande a été enregistrée avec succès.
                    </p>

                    <div style={styles.divider} />

                    <div style={styles.infoGrid}>
                        <div
                            style={{
                                ...styles.infoItem,
                                backgroundColor: isHovered === 'mail' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                                transform: isHovered === 'mail' ? 'translateX(5px)' : 'translateX(0)'
                            }}
                            onMouseEnter={() => setIsHovered('mail')}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <FiMail style={styles.infoIcon} />
                            <p style={styles.infoText}>Un mail de confirmation vient de vous être envoyé.</p>
                        </div>

                        <div
                            style={{
                                ...styles.infoItem,
                                backgroundColor: isHovered === 'pkg' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                                transform: isHovered === 'pkg' ? 'translateX(5px)' : 'translateX(0)'
                            }}
                            onMouseEnter={() => setIsHovered('pkg')}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <FiPackage style={styles.infoIcon} />
                            <p style={styles.infoText}>Nous préparons votre colis avec le plus grand soin.</p>
                        </div>
                    </div>

                    <div style={styles.actionBox}>
                        <Link
                            to="/catalogue"
                            style={{
                                ...styles.primaryBtn,
                                backgroundColor: isHovered === 'btn' ? '#d9b35a' : '#C9A24D',
                                transform: isHovered === 'btn' ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: isHovered === 'btn' ? '0 15px 30px rgba(201, 162, 77, 0.3)' : '0 10px 20px rgba(201, 162, 77, 0.2)'
                            }}
                            onMouseEnter={() => setIsHovered('btn')}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            Retour à la boutique <FiArrowRight style={{
                            transform: isHovered === 'btn' ? 'translateX(5px)' : 'translateX(0)',
                            transition: '0.3s'
                        }} />
                        </Link>
                    </div>
                </div>
            </div>
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

export default Merci;