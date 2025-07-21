import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const AdvertisedProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertised = [], isLoading } = useQuery({
    queryKey: ["advertised-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertised-properties");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10">Loading Advertised Properties...</div>
    );

  if (advertised.length === 0) return null; // no advertised properties

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Properties
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {advertised.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {property.location}
                </p>
                <p className="text-gray-700 font-medium">
                  ${property.minPrice} - ${property.maxPrice}
                </p>

                <Link
                  to={`/property/${property._id}`}
                  className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisedProperties;
