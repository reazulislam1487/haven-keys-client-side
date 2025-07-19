import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AllProperties = () => {
  const { user } = useAuth();
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5000/all-verify-properties"
      );
      return data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        All Verified Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={property.image}
              alt={property.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-4 flex-1 flex flex-col">
              {/* Title & Location */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {property.title}
              </h3>
              <p className="text-gray-600 mb-1">📍 {property.location}</p>

              {/* Agent Info */}
              <div className="flex items-center gap-2 my-2">
                <img
                  src={user?.photoURL || "/default-agent.jpg"}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {property.agentName}
                  </p>
                  <p className="text-xs text-gray-500">{property.agentEmail}</p>
                </div>
              </div>

              {/* Price Range */}
              <p className="text-sm mb-2">
                💰{" "}
                <span className="font-medium">
                  ${property.minPrice} - ${property.maxPrice}
                </span>
              </p>

              {/* Status */}
              <p className="text-green-600 text-xs font-semibold uppercase">
                ✅ {property.status}
              </p>

              {/* Created Date */}
              <p className="text-gray-400 text-xs mt-1">
                🗓️{" "}
                {new Date(property.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {/* Details Link */}
              <Link
                to={`/property-details/${property._id}`}
                className="mt-auto btn btn-sm bg-blue-600 text-white hover:bg-blue-700 w-full rounded-md"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProperties;
