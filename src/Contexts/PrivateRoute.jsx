import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F1F5F9]">
        <div
          className="w-16 h-16 rounded-full animate-spin shadow-xl"
          style={{
            borderWidth: "5px",
            borderStyle: "dashed",
            borderColor: "#3B82F6", // Primary Blue
            borderTopColor: "#FACC15", // Accent Yellow
            borderRightColor: "#3B82F6",
            borderBottomColor: "#3B82F6",
            borderLeftColor: "#3B82F6",
          }}
        ></div>
        <p className="mt-4 text-[#1E293B] text-lg font-semibold tracking-wide animate-pulse">
          Securing access...
        </p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
