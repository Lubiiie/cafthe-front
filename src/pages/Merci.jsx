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
    page: {
        backgroundColor: '#E9E3E3',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Inter', sans-serif"
    },
    container: {
        maxWidth: '600px',
        width: '100%',
    },
    card: {
        backgroundColor: '#373735',
        borderRadius: '24px',
        padding: '50px 40px',
        textAlign: 'center',
        color: '#E9E3E3',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    },
    iconWrapper: {
        marginBottom: '20px',
    },
    successIcon: {
        fontSize: '80px',
        color: '#C9A24D',
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '36px',
        marginBottom: '15px',
        color: '#C9A24D',
    },
    subtitle: {
        fontSize: '16px',
        opacity: 0.8,
        lineHeight: '1.6',
        marginBottom: '30px',
    },
    divider: {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        margin: '30px 0',
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '40px',
        textAlign: 'left',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
    },
    infoIcon: {
        fontSize: '20px',
        color: '#C9A24D',
    },
    infoText: {
        fontSize: '14px',
        margin: 0,
    },
    primaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        color: '#373735',
        padding: '15px 35px',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
};

export default Merci;