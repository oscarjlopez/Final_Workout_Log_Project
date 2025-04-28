import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Workouts from './pages/Workouts';
import Exercises from './pages/Exercises';
import Home from './pages/Home';
import Callback from './pages/Callback';
import Admin from './pages/Admin'; // Import the Admin page
import Blog2 from './pages/Blog'; // Import the Blog page
import { useAuthContext } from '@asgardeo/auth-react';

const App = () => {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
};

const RoutesWrapper = () => {
  const { state } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated based on localStorage
    const storedAuthStatus = localStorage.getItem("isAuthenticated");

    if (storedAuthStatus === "true") {
      setIsAuthenticated(true);
    } else if (state.isAuthenticated) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Persist authentication state
    } else {
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", "false"); // Clear persisted state if not authenticated
    }
  }, [state]);

  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Default Home page */}
      <Route path="/callback" element={<Callback />} /> {/* Handle login redirect */}
      {/* Conditional Rendering: Show Workouts if authenticated */}
      <Route path="/workouts" element={isAuthenticated ? <Workouts /> : <Home />} />
      <Route path="/exercises/:workoutId" element={<Exercises />} />
      <Route path="/admin" element={isAuthenticated ? <Admin /> : <Home />} />
      <Route path="/blog" element={<Blog2 />} /> {/* Add the Blog route */}
    </Routes>
  );
};

export default App;
