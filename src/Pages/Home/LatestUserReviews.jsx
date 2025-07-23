import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const LatestUserReviews = () => {
  const axiosInstance = useAxios();

  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-reviews");
      return res.data;
    },
  });
  console.log(reviews);

  if (isLoading)
    return (
      <div className="min-h-[200px] flex justify-center items-center text-[#2F855A] font-semibold">
        Loading latest reviews...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[200px] flex justify-center items-center text-red-600 font-semibold">
        Failed to load reviews.
      </div>
    );

  // Sort by newest and take first 3
  const latestReviews = reviews
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-[#FFF9F0] rounded-3xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-[#2D2D2D]">
        Latest User Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {latestReviews.map((review, i) => (
          <motion.div
            key={review._id || i}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <div className="flex items-center gap-5 mb-6">
              <img
                src={review.reviewerPhoto || review.reviewerImage}
                alt={review.reviewerName}
                className="w-16 h-16 rounded-full object-cover border-4 border-[#FF6F3C]"
              />
              <div>
                <h4 className="text-xl font-semibold text-[#2D2D2D]">
                  {review.reviewer}
                </h4>
                <p className="text-sm text-[#718096] italic">
                  {review.propertTitle}
                </p>
              </div>
            </div>

            <p className="text-[#4A5568] text-base leading-relaxed flex-grow tracking-wide">
              “{review.reviewText}”
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestUserReviews;
