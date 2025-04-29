import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const Callback = () => {
  const { state, signIn } = useAuthContext();
  const navigate = useNavigate();

  // Trigger sign-in only after auth context has loaded and if not authenticated
  useEffect(() => {
    if (!state?.isLoading && !state?.isAuthenticated) {
      signIn().catch((err) => {
        console.error("Error during sign-in:", err);
        navigate("/"); // Redirect to home on error
      });
    }
  }, [state?.isLoading, state?.isAuthenticated, signIn, navigate]);

  // Once authenticated, redirect to workouts
  useEffect(() => {
    if (state?.isAuthenticated) {
      navigate("/workouts");
    }
  }, [state?.isAuthenticated, navigate]);

  return <div>Signing you in...</div>;
};

export default Callback;
