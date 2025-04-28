import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import '../Header.css';  // Import your custom CSS file

const Header = () => {
  const { signOut, getDecodedIDToken } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const idToken = await getDecodedIDToken(); // Get decoded token
        console.log(idToken);  // Log the decoded token to inspect its structure

        if (idToken) {
          // Check if the user's email matches admin1@gmail.com
          if (idToken.username === "admin1@gmail.com") {
            setIsAdmin(true); // User is admin
          } else {
            setIsAdmin(false); // User is not admin
          }
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    checkAdminRole();
  }, [getDecodedIDToken]);

  return (
    <header className="header">
      <div className="logo">Workout Tracker</div>
      <nav className="nav">
        <Link to="/workouts" className="nav-link">Workouts</Link>
        <Link to="/blog" className="nav-link">Blog</Link> {/* Added Blog link */}
        {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>} {/* Show admin tab only if user is admin */}
        <button 
          onClick={signOut}
          className="sign-out-btn"
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
