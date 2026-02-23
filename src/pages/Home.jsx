import React from 'react';
import Hero from '../components/hero';
import Promotions from "../components/Promotions";
import AvisClients from "../components/AvisClients";
import HistoireEngagements from "../components/HistoireEngagements";
import Assistance from "../components/Assistance";

const Home = () => {
    return (
        <div style={styles.pageContainer}>

            <Hero />

            <Promotions />

            <AvisClients />

            <HistoireEngagements />

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