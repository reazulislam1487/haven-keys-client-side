import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div
          className="w-16 h-16 rounded-full animate-spin"
          style={{
            borderWidth: "4px",
            borderStyle: "dashed",
            borderColor: "#2F855A", // primary color
            borderTopColor: "#F6C26B", // accent color for spinning highlight
            borderRightColor: "#2F855A",
            borderBottomColor: "#2F855A",
            borderLeftColor: "#2F855A",
          }}
        ></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
