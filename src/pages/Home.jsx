import React from 'react';
import Hero from '../components/hero';
import Promotions from "../components/Promotions";
import AvisClients from "../components/AvisClients";
import HistoireEngagements from "../components/HistoireEngagements";
import Assistance from "../components/Assistance";

const Home = () => {
    return (
        <div style={styles.pageContainer} className="home-responsive-wrapper">
            <style>
                {`
                /* Optimisation globale pour le scroll et l'affichage mobile */
                .home-responsive-wrapper {
                    overflow-x: hidden; /* Empêche tout scroll horizontal parasite */
                    width: 100%;
                }

                @media (max-width: 768px) {
                    /* On peut ajuster ici l'espacement entre les sections si besoin */
                    .home-responsive-wrapper > div {
                        width: 100% !important;
                    }
                }

                @media (max-width: 480px) {
                    /* Ajustements spécifiques pour très petits écrans */
                    .home-responsive-wrapper {
                        padding: 0;
                    }
                }
                `}
            </style>

            {/* Le Hero avec ses titres à 1.85rem */}
            <Hero />

            {/* La section Promo avec son titre à 2.25rem */}
            <Promotions />

            {/* Les Avis Clients avec leurs commentaires à 1.1rem */}
            <AvisClients />

            {/* Histoire & Engagements avec ses textes à 1.15rem */}
            <HistoireEngagements />

            {/* La section Assistance avec ses liens à 1.75rem */}
            <Assistance />
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: '#E9E3E3',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
};

export default Home;