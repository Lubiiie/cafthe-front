import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CardProvider } from "./context/CardContext.jsx";
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
import Comptes from "./pages/CompteClient.jsx";
import CompteClient from "./pages/CompteClient.jsx";
import Commande from "./pages/Commande";

function App() {
    return (
        <AuthProvider>
            <CardProvider>
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
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CardProvider>
        </AuthProvider>
    );
}

export default App;