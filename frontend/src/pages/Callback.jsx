// src/pages/Callback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const Callback = () => {
  const { state, signIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the sign-in only if user is not authenticated
    if (!state?.isAuthenticated) {
      signIn().catch((err) => {
        console.error("Error during sign-in:", err);
        navigate("/"); // Redirect to home on error
      });
    }
  }, [signIn, state?.isAuthenticated, navigate]);

  useEffect(() => {
    // Once authenticated, redirect to /workouts
    if (state?.isAuthenticated) {
      navigate("/workouts");
    }
  }, [state?.isAuthenticated, navigate]);

  return <div>Signing you in...</div>;
};

export default Callback;
