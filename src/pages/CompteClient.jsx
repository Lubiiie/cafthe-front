import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Compte = () => {
    const navigate = useNavigate();
    const { logout, user: authUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserId = localStorage.getItem('userId');
            const storedToken = localStorage.getItem('token');

            if (!storedUserId || !storedToken) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/api/clients/${storedUserId}`, {
                    headers: { 'Authorization': `Bearer ${storedToken}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client || data);
                }
            } catch (err) {
                console.error("Erreur récupération profil:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, apiUrl]);

    const handleLogout = () => {
        localStorage.clear();
        logout();
        navigate('/login');
    };

    if (loading) return <div style={{textAlign: 'center', padding: '100px'}}>Chargement...</div>;

    return (
        <div style={{backgroundColor: '#E9E3E3', minHeight: '100vh', paddingTop: '140px'}}>
            <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px', backgroundColor: '#373735', color: '#E9E3E3', borderRadius: '8px'}}>
                <h1 style={{fontFamily: 'Playfair Display', fontSize: '32px'}}>Mon Profil</h1>
                <p>Bienvenue, {user?.prenom_client || "Cher client"}</p>
                <div style={{marginTop: '20px', lineHeight: '2'}}>
                    <p><strong>Nom :</strong> {user?.nom_client}</p>
                    <p><strong>Email :</strong> {user?.email_client}</p>
                    <p><strong>Adresse :</strong> {user?.adresse_client || "Non renseignée"}</p>
                </div>
                <button onClick={handleLogout} style={{marginTop: '30px', padding: '10px 20px', backgroundColor: '#C9A24D', border: 'none', color: '#FFF', cursor: 'pointer', borderRadius: '20px'}}>
                    Se déconnecter
                </button>
            </div>
        </div>
    );
};

export default Compte;