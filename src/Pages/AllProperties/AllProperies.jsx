import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";

const AllProperties = () => {
  usePageTitle("All Properties");

  const { user } = useAuth();
  const instance = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const { data } = await instance.get("/all-verify-properties");
      return data;
    },
  });

  if (isLoading) return <Loading />;

  // Filter and sort logic
  const filteredProperties = properties
    .filter((property) =>
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aPrice = Number(a.minPrice);
      const bPrice = Number(b.minPrice);
      if (sortOrder === "lowToHigh") return aPrice - bPrice;
      if (sortOrder === "highToLow") return bPrice - aPrice;
      return 0;
    });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-[#F8F8F8]">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#2D2D2D]">
        All Verified Properties
      </h2>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search by Location */}
        <input
          type="text"
          placeholder="Search by location..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Sort by price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200"
          >
            <img
              src={property.image}
              alt={property.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1 line-clamp-1">
                {property.title}
              </h3>

              <p className="text-[#6B7280] text-sm flex items-center gap-1 mb-2">
                <FaMapMarkerAlt className="text-[#FF6F3C]" />
                {property.location}
              </p>

              <div className="flex items-center gap-3 my-3">
                <img
                  src={user?.photoURL || "/default-agent.jpg"}
                  alt={property.agentName}
                  className="w-9 h-9 rounded-full object-cover border"
                />
                <div>
                  <p className="text-sm font-medium text-[#2D2D2D]">
                    {property.agentName}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {property.agentEmail}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#2D2D2D] flex items-center gap-1 mb-1">
                <FaMoneyBillWave className="text-[#FF6F3C]" />
                <span className="font-semibold text-[#FF6F3C]">
                  ${property.minPrice} - ${property.maxPrice}
                </span>
              </p>

              <p className="text-[#10B981] text-xs font-semibold uppercase tracking-wide flex items-center gap-1">
                <FaCheckCircle /> {property.status}
              </p>

              <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                <FaCalendarAlt />
                {new Date(property.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <Link
                to={`/property-details/${property._id}`}
                className="mt-auto text-center bg-[#FF6F3C] hover:bg-[#FFA987] text-white text-sm font-medium py-2 px-4 rounded-md transition duration-300 mt-4 flex items-center justify-center gap-2"
              >
                View Details <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProperties;
