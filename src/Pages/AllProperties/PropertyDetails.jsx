import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/properties/${id}`
      );
      return data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/reviews/${id}`);
      return data;
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      await axios.post("http://localhost:5000/wishlist", {
        propertyId: id,
        userEmail: user?.email,
        title: property.title,
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
      await axios.post("http://localhost:5000/reviews", {
        propertyId: id,
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

  if (isLoading)
    return <p className="text-center mt-10">Loading property...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Property Image */}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      {/* Title and Location */}
      <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
      <p className="text-gray-600 mb-2">📍 {property.location}</p>

      {/* Price Range */}
      <p className="text-lg text-green-600 font-semibold mb-4">
        💰 ${property.minPrice} - ${property.maxPrice}
      </p>

      {/* Description */}
      <p className="mb-6 text-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        vel...
      </p>

      {/* Agent Info */}
      <p className="text-sm text-gray-600 mb-1">
        🧑 Agent: <span className="font-medium">{property.agentName}</span>
      </p>
      <p className="text-sm text-gray-600 mb-4">
        ✉️ Email: <span className="font-medium">{property.agentEmail}</span>
      </p>

      {/* Created Date */}
      <p className="text-sm text-gray-500 mb-6">
        🗓️ Posted on:{" "}
        {new Date(property.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Add to Wishlist Button */}
      <button
        onClick={handleAddToWishlist}
        className="btn bg-pink-600 text-white hover:bg-pink-700"
      >
        Add to Wishlist
      </button>

      <hr className="my-10" />

      {/* Reviews Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Reviews</h3>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
          >
            Add a Review
          </button>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((rev, i) => (
            <div key={i} className="border p-4 rounded-md bg-white">
              <div className="flex gap-3 items-center mb-2">
                <img
                  src={rev.reviewerPhoto || "/default-user.png"}
                  alt={rev.reviewer}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{rev.reviewer}</span>
              </div>
              <p className="text-sm text-gray-800">{rev.reviewText}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h4 className="text-lg font-bold mb-2">Write a Review</h4>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-2"
              placeholder="Write something..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="btn btn-sm bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-blue-600 text-white"
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
