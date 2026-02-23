import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // 1. On initialise l'utilisateur DIRECTEMENT depuis le stockage local
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');

            // S'il n'y a pas de token, on ne fait pas l'appel pour éviter la 401
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseUrl}/api/clients/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // CRUCIAL pour éviter la 401
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client);
                } else {
                    // Si le serveur répond 401
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error("Erreur session:", error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, [baseUrl]);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userPrenom", userData.prenom_client || userData.prenom);
        setUser(userData);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    const value = { user, login, logout, loading, isAuthenticated: !!user };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);