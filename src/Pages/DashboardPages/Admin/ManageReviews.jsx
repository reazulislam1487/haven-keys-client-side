// ManageReviews.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";

const ManageReviews = () => {
  const { role: user, roleLoading } = useUserRole();
  const queryClient = useQueryClient();

  // Check if user is admin
  if (roleLoading) return <p className="text-center">Checking permission...</p>;
  if (user !== "admin")
    return <p className="text-red-500 text-center">Access Denied</p>;

  // Fetch all reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-reviews");
      return res.data;
    },
  });

  // Delete review mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(`http://localhost:5000/all-reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allReviews"]);
      Swal.fire("Deleted!", "The review has been removed.", "success");
    },
  });

  if (isLoading) return <p className="text-center">Loading reviews...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage User Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews found.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 border rounded-lg shadow-sm flex items-start gap-4"
            >
              <img
                src={review.reviewerPhoto}
                alt={review.reviewer}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{review.reviewer}</h3>
                <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
                {review.propertyTitle && (
                  <p className="text-sm text-gray-500 italic">
                    Property: {review.propertyTitle}
                  </p>
                )}
                <p className="mt-2 text-gray-700">{review.reviewText}</p>
                {review.createdAt && (
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Delete this review?",
                    text: "This action cannot be undone.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteMutation.mutate(review._id);
                    }
                  });
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 h-fit"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
