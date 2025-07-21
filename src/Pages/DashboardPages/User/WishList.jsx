import React from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

import {
  HiLocationMarker,
  HiUser,
  HiCurrencyDollar,
  HiBriefcase,
  HiXCircle,
} from "react-icons/hi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist = () => {
  const { user } = useAuth();
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/wishlist?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const wishlist = Array.isArray(wishlistData) ? wishlistData : [];

  const removeMutation = useMutation({
    mutationFn: async (id) => await instance.delete(`/wishlist/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      Swal.fire("Removed!", "Property removed from wishlist.", "success");
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-[#636e72] text-lg mt-10 animate-pulse">
        Loading wishlist...
      </p>
    );
  if (!Array.isArray(wishlist))
    return (
      <p className="text-center text-[#E74C3C] text-lg mt-10 font-semibold">
        Failed to load wishlist.
      </p>
    );
  if (wishlist.length === 0)
    return (
      <p className="text-center text-[#718096] text-lg mt-10 font-medium">
        No wishlist items found.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0 mt-8">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="bg-[#FFF9F0] rounded-2xl shadow-lg overflow-hidden flex flex-col border border-[#F4F6F8] hover:shadow-xl transition-shadow duration-300"
        >
          {/* Property Image */}
          <img
            src={item.image || item.propertyImage || "/default-property.jpg"}
            alt="Property"
            className="w-full h-48 object-cover"
          />

          <div className="p-5 flex flex-col flex-grow">
            {/* Property Title */}
            <h3 className="text-xl font-semibold text-[#2C3E50]">
              {item.title || item.propertyTitle || "Untitled Property"}
            </h3>

            {/* Property Location */}
            <p className="text-[#636e72] mt-1 flex items-center gap-1 text-sm">
              <HiLocationMarker className="text-[#00B894]" />
              {item.propertyLocation || "Location not available"}
            </p>

            {/* Agent Info */}
            <div className="flex items-center gap-3 mt-3">
              {item.agentImage && (
                <img
                  src={item.agentImage}
                  alt="Agent"
                  className="w-10 h-10 rounded-full object-cover border border-[#F4F6F8]"
                />
              )}
              <p className="text-[#718096] text-sm flex items-center gap-1">
                <HiUser className="text-[#F6C26B]" />
                Agent: {item.agentName || "Unknown"}
              </p>
            </div>

            {/* Verification Status */}
            {item.verified !== undefined && (
              <p className="mt-3 text-sm">
                Verification Status:{" "}
                <span
                  className={
                    item.verified
                      ? "text-[#27AE60] font-semibold"
                      : "text-[#E74C3C] font-semibold"
                  }
                >
                  {item.verified ? "✅ Verified" : "❌ Not Verified"}
                </span>
              </p>
            )}

            {/* Price Range */}
            <p className="text-[#00B894] font-semibold mt-3 text-lg flex items-center gap-1">
              <HiCurrencyDollar />
              Price Range:{" "}
              {item.minPrice && item.maxPrice
                ? `$${item.minPrice.toLocaleString()} - $${item.maxPrice.toLocaleString()}`
                : item.price
                ? `$${item.price.toLocaleString()}`
                : "Not Available"}
            </p>

            {/* Buttons */}
            <div className="mt-auto flex justify-between gap-3 items-center pt-5">
              <Link to={`/dashboard/make-offer/${item.propertyId}`}>
                <button className="flex items-center cursor-pointer gap-2 bg-[#27AE60] hover:bg-[#00B894] transition px-5 py-2 text-sm rounded-lg text-white font-semibold shadow-md w-36 justify-center">
                  Make Offer
                </button>
              </Link>

              <button
                onClick={() => removeMutation.mutate(item._id)}
                className="flex items-center cursor-pointer gap-2 bg-[#E74C3C] hover:bg-[#C53030] transition px-5 py-2 rounded-lg text-sm text-white font-semibold shadow-md w-36 justify-center"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
