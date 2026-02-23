import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FiX } from "react-icons/fi";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isForgotHovered, setIsForgotHovered] = useState(false);
    const [isCreateHovered, setIsCreateHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

        try {
            const response = await fetch(`${cleanBaseUrl}/api/clients/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email_client: email,
                    mdp_client: motDePasse,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Identifiants incorrects");
                return;
            }

            const { token, client } = data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", client.numero_client);
            localStorage.setItem('userPrenom', client.prenom_client);

            login(token, client);
            navigate("/compte");
        } catch (error) {
            console.error("Erreur login:", error);
            setErrorMsg("Le serveur ne répond pas.");
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h1 style={styles.mainTitle}>Se connecter</h1>
                    <FiX style={styles.closeIcon} onClick={() => navigate("/")} />
                </div>
                <div style={styles.darkSection}>
                    {errorMsg && <p style={styles.error}>{errorMsg}</p>}
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input type="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
                        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} style={styles.input} required />
                        <div style={styles.forgotRow}>
                            <span style={{...styles.forgotLink, color: isForgotHovered ? "#C9A24D" : "#E9E3E3"}} onMouseEnter={() => setIsForgotHovered(true)} onMouseLeave={() => setIsForgotHovered(false)} onClick={() => navigate("/forgot-password")}>Mot de passe oublié ?</span>
                            <button type="submit" style={{...styles.loginBtn, backgroundColor: isLoginHovered ? "#C9A24D" : "#E9E3E3", color: isLoginHovered ? "#FFF" : "#C9A24D"}} onMouseEnter={() => setIsLoginHovered(true)} onMouseLeave={() => setIsLoginHovered(false)}>Se connecter</button>
                        </div>
                    </form>
                </div>
                <div style={styles.footer}>
                    <p style={styles.footerText}>Vous n’avez pas de compte ? <span style={{...styles.createAccount, color: isCreateHovered ? "#C9A24D" : "#373735"}} onMouseEnter={() => setIsCreateHovered(true)} onMouseLeave={() => setIsCreateHovered(false)} onClick={() => navigate("/register")}>Créer un compte</span></p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { width: "100%", backgroundColor: "#E9E3E3", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
    modal: { width: "900px", backgroundColor: "#E9E3E3", borderRadius: "8px", overflow: "hidden", position: "relative", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
    header: { padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    mainTitle: { fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "#373735", margin: 0 },
    closeIcon: { fontSize: "32px", cursor: "pointer", color: "#373735" },
    darkSection: { backgroundColor: "#373735", padding: "60px 100px", display: "flex", flexDirection: "column", gap: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "25px" },
    input: { width: "100%", maxWidth: "400px", padding: "15px 20px", backgroundColor: "#E9E3E3", border: "none", fontSize: "16px", color: "#373735" },
    forgotRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" },
    forgotLink: { fontSize: "14px", cursor: "pointer", textDecoration: "underline" },
    loginBtn: { padding: "12px 40px", borderRadius: "25px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer" },
    footer: { padding: "40px 0", textAlign: "center" },
    footerText: { color: "#373735", fontSize: "16px" },
    createAccount: { fontWeight: "bold", textDecoration: "underline", cursor: "pointer" },
    error: { color: "#ff4d4d", fontSize: "14px", textAlign: "center" }
};

export default Login;