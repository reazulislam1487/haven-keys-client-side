import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaUserTie,
  FaEnvelope,
  FaCalendarAlt,
  FaHeart,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import Loading from "../Shared/Loading";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const instance = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await instance.get(`/properties/${id}`);
      return data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await instance.get(`/reviews/${id}`);
      return data;
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      await instance.post("/wishlist", {
        propertyId: id,
        userEmail: user?.email,
        title: property.title,
        location: property.location,
        agentName: property.agentName,
        image: property.image,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      });
    },
    onSuccess: () =>
      Swal.fire("Added!", "Property added to wishlist", "success"),
    onError: () => Swal.fire("Error", "Already in wishlist", "warning"),
  });

  const addReviewMutation = useMutation({
    mutationFn: async () => {
      await instance.post("/reviews", {
        propertyId: id,
        propertTitle: property.title,
        reviewer: user?.displayName,
        reviewerEmail: user?.email,
        reviewText,
        reviewerPhoto: user?.photoURL,
      });
    },
    onSuccess: () => {
      Swal.fire("Thank you!", "Review submitted", "success");
      setShowModal(false);
      setReviewText("");
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: () => Swal.fire("Error", "Could not submit review", "error"),
  });

  const handleAddToWishlist = () => {
    if (!user) return;
    wishlistMutation.mutate();
  };

  const handleAddReview = () => {
    if (!reviewText.trim()) return;
    addReviewMutation.mutate();
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-[#F8F8F8] text-[#2D2D2D]">
      {/* Image */}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-99 bg-cover object-cover rounded-xl mb-6 shadow"
      />

      {/* Title & Location */}
      <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
      <p className="flex items-center gap-2 text-[#6B7280] mb-2">
        <FaMapMarkerAlt className="text-[#FF6F3C]" /> {property.location}
      </p>

      {/* Price */}
      <p className="flex items-center gap-2 text-[#FF6F3C] text-lg font-semibold mb-4">
        <FaMoneyBillAlt /> ${property.minPrice} - ${property.maxPrice}
      </p>

      {/* Description */}
      <p className="text-gray-700 mb-6 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        vel...
      </p>

      {/* Agent Info */}
      <div className="space-y-1 mb-4 text-sm text-[#444]">
        <p className="flex items-center gap-2">
          <FaUserTie className="text-[#FFA987]" />
          <span className="font-medium">{property.agentName}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-[#FFA987]" />
          <span className="font-medium">{property.agentEmail}</span>
        </p>
      </div>

      {/* Posted Date */}
      <p className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <FaCalendarAlt />{" "}
        {new Date(property.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Wishlist Button */}
      <button
        onClick={handleAddToWishlist}
        className="flex items-center gap-2 cursor-pointer bg-[#FF6F3C] hover:bg-[#FFA987] text-white px-4 py-2 rounded-md font-medium transition mb-10"
      >
        <FaHeart /> Add to Wishlist
      </button>

      <hr className="mb-10" />

      {/* Reviews */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Reviews</h3>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 cursor-pointer bg-[#FF6F3C] hover:bg-[#FFA987] text-white px-4 py-2 rounded-md"
          >
            <FaPlus /> Add Review
          </button>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="border border-gray-200 p-4 rounded-md bg-white shadow-sm"
            >
              <div className="flex gap-3 items-center mb-2">
                <img
                  src={rev.reviewerPhoto || "/default-user.png"}
                  alt={rev.reviewer}
                  className="w-9 h-9 rounded-full object-cover border"
                />
                <span className="font-medium text-sm">{rev.reviewer}</span>
              </div>
              <p className="text-sm text-gray-800">{rev.reviewText}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h4 className="text-lg font-bold mb-3">Write a Review</h4>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Write something..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
