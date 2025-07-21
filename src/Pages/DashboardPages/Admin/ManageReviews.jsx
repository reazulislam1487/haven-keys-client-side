import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const instance = useAxiosSecure();
  const { role: user, roleLoading } = useUserRole();
  const queryClient = useQueryClient();

  if (roleLoading)
    return (
      <p className="text-center text-[#636e72] mt-10">Checking permission...</p>
    );
  if (user !== "admin")
    return (
      <p className="text-[#E74C3C] text-center mt-10 text-lg">Access Denied</p>
    );

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await instance.get("/all-reviews");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await instance.delete(`/all-reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allReviews"]);
      Swal.fire("Deleted!", "The review has been removed.", "success");
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-[#636e72] mt-10 text-lg animate-pulse">
        Loading reviews...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#2C3E50]">
        Manage User Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-[#636e72] text-center italic">No reviews found.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#FFF9F0] p-6 rounded-xl border border-[#F4F6F8] shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-6"
            >
              <img
                src={review.reviewerPhoto}
                alt={review.reviewer}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00B894]"
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-semibold text-[#2D3436]">
                    {review.reviewer}
                  </h3>
                  <p className="text-sm text-[#636e72]">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-[#636e72] mb-1">
                  {review.reviewerEmail}
                </p>
                {review.propertyTitle && (
                  <p className="text-sm text-[#636e72] italic mb-2">
                    Property: {review.propertyTitle}
                  </p>
                )}
                <p className="text-[#2D3436] leading-relaxed">
                  {review.reviewText}
                </p>
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Delete this review?",
                    text: "This action cannot be undone.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#E74C3C",
                    cancelButtonColor: "#2C3E50",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteMutation.mutate(review._id);
                    }
                  });
                }}
                className="bg-[#E74C3C] cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium h-fit"
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
