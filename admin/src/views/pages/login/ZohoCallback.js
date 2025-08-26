import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ZohoCallback = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/"); // Redirect to the dashboard or home page
    } else {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate, setIsAuthenticated]);

  return <div>Processing login...</div>;
};

export default ZohoCallback;