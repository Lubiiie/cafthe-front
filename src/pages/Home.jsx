import React from 'react';
import Hero from '../components/hero';
import Promotions from "../components/Promotions";
import AvisClients from "../components/AvisClients";
import HistoireEngagements from "../components/HistoireEngagements";
import Assistance from "../components/Assistance";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>CafThé | Cafés d'Exception & Thés Bio en Ligne</title>
                <meta name="description" content="Découvrez CafThé, votre boutique spécialisée en cafés de spécialité et thés bio. Livraison offerte dès 45€ d'achats. Torréfaction artisanale." />
            </Helmet>

            <div style={styles.pageContainer} className="home-responsive-wrapper">
                <style>
                    {`
                    /* Optimisation globale pour le scroll et l'affichage mobile */
                    .home-responsive-wrapper {
                        overflow-x: hidden; 
                        width: 100%;
                    }

                    @media (max-width: 768px) {
                        .home-responsive-wrapper > div {
                            width: 100% !important;
                        }
                    }

                    @media (max-width: 480px) {
                        .home-responsive-wrapper {
                            padding: 0;
                        }
                    }
                    `}
                </style>

                <Hero />
                <Promotions />
                <AvisClients />
                <HistoireEngagements />
                <Assistance />
            </div>
        </>
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