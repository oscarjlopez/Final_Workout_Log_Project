import React from "react";
import Header from "../components/Header";

const AdminPage = () => {
  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
        <iframe
          title="Workout Log Admin"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="clipboard-write; camera; geolocation; fullscreen"
          src="https://oscarlopez.budibase.app/embed/workoutlog"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </>
  );
};

export default AdminPage;
