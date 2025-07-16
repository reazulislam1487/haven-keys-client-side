// MyReviews.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all reviews of this user
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/reviews?email=${user.email}`
      );
      return res.data;
    },
  });

  // Delete review
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(`http://localhost:5000/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire("Deleted!", "Your review has been removed.", "success");
    },
  });

  if (isLoading) return <p className="text-center">Loading your reviews...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You have not added any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow rounded-lg p-4 border"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={review.reviewerPhoto}
                  alt={review.reviewer}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-lg font-bold">{review.reviewer}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

           

              <p className="text-gray-700">{review.reviewText}</p>

              <div className="mt-3">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This review will be permanently deleted!",
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
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
