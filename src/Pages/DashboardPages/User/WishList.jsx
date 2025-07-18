// Wishlist.jsx
import React from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Wishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/wishlist?email=${user?.email}`
      );
      console.log("Wishlist Response:", res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const wishlist = Array.isArray(wishlistData) ? wishlistData : [];

  const removeMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(`http://localhost:5000/wishlist/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      Swal.fire("Removed!", "Property removed from wishlist.", "success");
    },
  });

  if (isLoading) return <p className="text-center">Loading wishlist...</p>;
  if (!Array.isArray(wishlist))
    return <p className="text-center text-red-500">Failed to load wishlist.</p>;
  if (wishlist.length === 0)
    return <p className="text-center">No wishlist items found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {wishlist.map((item) => (
    <div key={item._id} className="bg-white p-4 rounded-xl shadow-lg">
      
      {/* Property Image */}
      <img
        src={item.image || item.propertyImage || "/default-property.jpg"}
        alt="Property"
        className="rounded-lg h-40 w-full object-cover"
      />

      {/* Property Title */}
      <h3 className="text-lg font-semibold mt-3">
        {item.title || item.propertyTitle || "Untitled Property"}
      </h3>

      {/* Property Location */}
      <p className="text-gray-700 mt-1">
        📍 {item.propertyLocation || "Location not available"}
      </p>

      {/* Agent Name + Agent Image */}
      <div className="flex items-center gap-2 mt-2">
        {item.agentImage && (
          <img
            src={item.agentImage}
            alt="Agent"
            className="w-9 h-9 rounded-full object-cover"
          />
        )}
        <p className="text-sm text-gray-600">
          🧑 Agent: {item.agentName || "Unknown"}
        </p>
      </div>

      {/* Verification Status */}
      {item.verified !== undefined && (
        <p className="mt-2 text-sm">
          Verification Status:{" "}
          <span className={item.verified ? "text-green-600" : "text-red-600"}>
            {item.verified ? "✅ Verified" : "❌ Not Verified"}
          </span>
        </p>
      )}

      {/* Price Range */}
      <p className="text-blue-600 font-medium mt-2">
        💰 Price Range:{" "}
        {item.minPrice && item.maxPrice
          ? `$${item.minPrice} - $${item.maxPrice}`
          : item.price
          ? `$${item.price}`
          : "Not Available"}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Link to={`/dashboard/make-offer/${item.propertyId}`}>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            💼 Make Offer
          </button>
        </Link>

        <button
          onClick={() => removeMutation.mutate(item._id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  ))}
</div>

  );
};

export default Wishlist;
