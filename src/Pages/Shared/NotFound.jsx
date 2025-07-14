import React from "react";
import { Link } from "react-router";
import usePageTitle from "../../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 via-white to-gray-200 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        404
      </h1>
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-base md:text-lg text-gray-600 mb-6 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition"
      >
        ⟵ Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
