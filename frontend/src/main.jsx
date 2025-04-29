import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App.jsx";
import "./index.css";

const authConfig = {
    signInRedirectURL: "https://final-workout-log-project.vercel.app/workouts",  // Set to the page where user should return after login
    signOutRedirectURL: "https://final-workout-log-project.vercel.app/", // You can set this to redirect to the homepage on sign out
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
