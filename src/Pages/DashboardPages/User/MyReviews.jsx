import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await instance.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire("Deleted!", "Your review has been removed.", "success");
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Loading your reviews...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold text-[#2C3E50] mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 bg-[#F4F6F8] rounded-md p-6 shadow-inner">
          You haven’t added any reviews yet.
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-[#E0E0E0] hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.reviewerPhoto}
                  alt={review.reviewer}
                  className="w-12 h-12 rounded-full border-2 border-[#FF6F3C]"
                />
                <div>
                  <p className="text-lg font-semibold text-[#2D3436]">
                    {review.reviewer}
                  </p>
                  <p className="text-sm text-[#636e72]">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-[#2D3436] leading-relaxed">
                {review.reviewText}
              </p>

              <div className="mt-4">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This review will be permanently deleted!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#E74C3C",
                      cancelButtonColor: "#00B894",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteMutation.mutate(review._id);
                      }
                    });
                  }}
                  className="inline-flex items-center gap-2 cursor-pointer bg-[#E74C3C] hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-all"
                >
                  <FaTrashAlt /> Delete
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
