import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/api/clients/me`,
                    { credentials: "include" }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.client);
                } else {
                    // CORRECTIF : Restauration de session via localStorage si le cookie échoue
                    const savedId = localStorage.getItem('userId');
                    const savedPrenom = localStorage.getItem('userPrenom');
                    if (savedId && savedPrenom) {
                        setUser({ numero_client: savedId, prenom_client: savedPrenom });
                    }
                }
            } catch (error) {
                console.error("Erreur vérification session:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [baseUrl]);

    const login = (token, userData) => {
        if (token) localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await fetch(`${baseUrl}/api/clients/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
        // CORRECTIF : Nettoyage complet pour assurer une reconnexion sans erreur
        localStorage.clear();
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};