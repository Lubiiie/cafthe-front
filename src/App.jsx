import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CardProvider } from "./context/CardContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Panier from "./pages/Panier.jsx";
import MentionsLegales from './pages/MentionsLegales.jsx';
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite.jsx";
import CGV from "./pages/CGV.jsx";
import PlanSite from "./pages/PlanSite.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import NotreHistoire from "./pages/NotreHistoire.jsx";
import NosEngagements from "./pages/NosEngagements.jsx";
import Contact from "./pages/Contact.jsx";
import CompteClient from "./pages/CompteClient.jsx";
import Commande from "./pages/Commande";
import Merci from "./pages/Merci";
import CookieConsent from "react-cookie-consent";

const initialOptions = {
    "client-id": "AbCVK0duNM-UOxASrhif8cAHtIr5NPbdpNq8VQldvcsIbNPSrfQCCY6AGRufZRvj8L8GJqtlPFSIMLpj",
    currency: "EUR",
    intent: "capture",
};

function App() {
    return (
        <AuthProvider>
            <CardProvider>
                <PayPalScriptProvider options={initialOptions}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="produit/:id" element={<ProductDetails />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route path="panier" element={<Panier />} />
                                <Route path="mentions-legales" element={<MentionsLegales />} />
                                <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />
                                <Route path="cgv" element={<CGV />} />
                                <Route path="plan-site" element={<PlanSite />} />
                                <Route path="catalogue" element={<Catalogue />} />
                                <Route path="/notre-histoire" element={<NotreHistoire />} />
                                <Route path="/nos-engagements" element={<NosEngagements />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/compte" element={<CompteClient />} />
                                <Route path="/commande" element={<Commande />} />
                                <Route path="/merci" element={<Merci />} />
                            </Route>
                        </Routes>

                        <CookieConsent
                            location="bottom"
                            buttonText="Accepter"
                            declineButtonText="Refuser"
                            enableDeclineButton
                            cookieName="CafTheCookieConsent"
                            style={{
                                backgroundColor: "#373735",
                                color: "#E9E3E3",
                                fontFamily: "'Lato', sans-serif",
                                fontSize: "15px",
                                padding: "10px 50px",
                                alignItems: "center"
                            }}
                            buttonStyle={{
                                backgroundColor: "#C9A24D",
                                color: "#373735",
                                fontSize: "14px",
                                fontWeight: "bold",
                                borderRadius: "25px",
                                padding: "10px 30px"
                            }}
                            declineButtonStyle={{
                                backgroundColor: "transparent",
                                color: "#E9E3E3",
                                fontSize: "14px",
                                textDecoration: "underline",
                                marginRight: "20px"
                            }}
                            expires={150}
                        >
                            Ce site utilise des cookies pour vous garantir la meilleure expérience de dégustation. ☕
                        </CookieConsent>
                    </BrowserRouter>
                </PayPalScriptProvider>
            </CardProvider>
        </AuthProvider>
    );
}

export default App;