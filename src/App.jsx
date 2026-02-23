import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CardProvider } from "./context/CardContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Ajout de l'import PayPal
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


const initialOptions = {
    "client-id": "AbCVK0duNM-UOxASrhif8cAHtIr5NPbdpNq8VQldvcsIbNPSrfQCCY6AGRufZRvj8L8GJqtlPFSIMLpj",
    currency: "EUR",
    intent: "capture",
};

function App() {
    return (
        <AuthProvider>
            <CardProvider>
                {/* On entoure le tout avec le Provider PayPal */}
                <PayPalScriptProvider options={initialOptions}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                {/* Page d'accueil */}
                                <Route index element={<Home />} />

                                {/* Page de détails produit */}
                                <Route path="produit/:id" element={<ProductDetails />} />

                                {/* Page de connexion & Inscription */}
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />

                                {/* Page du Panier */}
                                <Route path="panier" element={<Panier />} />

                                {/* Page des Mentions Légales */}
                                <Route path="mentions-legales" element={<MentionsLegales />} />

                                {/* Page des Politique de Confidentialité */}
                                <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />} />

                                {/* Page des CGV */}
                                <Route path="cgv" element={<CGV />} />

                                {/* Page du Plan de site */}
                                <Route path="plan-site" element={<PlanSite />} />

                                {/* Page du Catalogue */}
                                <Route path="catalogue" element={<Catalogue />} />

                                {/* Page Notre histoire */}
                                <Route path="/notre-histoire" element={<NotreHistoire />} />

                                {/* Page Notre engagement */}
                                <Route path="/nos-engagements" element={<NosEngagements />} />

                                {/* Page Contact */}
                                <Route path="/contact" element={<Contact />} />

                                {/* Page Compte Client */}
                                <Route path="/compte" element={<CompteClient />} />

                                {/* Page Commande */}
                                <Route path="/commande" element={<Commande />} />

                                <Route path="/merci" element={<Merci />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </PayPalScriptProvider>
            </CardProvider>
        </AuthProvider>
    );
}

export default App;