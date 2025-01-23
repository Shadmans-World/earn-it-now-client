import React from "react";
import { useNavigate } from "react-router-dom"; // For React Router

const ErrorPage = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
      }}
    >
      <h1 style={{ fontSize: "5rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        Oops! Page not found
      </h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
