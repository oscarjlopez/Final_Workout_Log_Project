import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App.jsx";
import "./index.css";

const authConfig = {
    signInRedirectURL: "http://localhost:5173/callback",  // Set to the page where user should return after login
    signOutRedirectURL: "http://localhost:5173/callback", // You can set this to redirect to the homepage on sign out
    clientID: "lNtUTcUTQywdWtn_V104UQ7v0zUa",
    baseUrl: "https://api.asgardeo.io/t/mis372t",
    scope: ["openid", "profile"]
};



createRoot(document.getElementById("root")).render(
    <AuthProvider config={authConfig}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthProvider>
);
