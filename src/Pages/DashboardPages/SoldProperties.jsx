import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";

const SoldProperties = () => {
  const { user } = useAuth();
  const instance = useAxiosSecure();

  const {
    data: soldData = { totalPaid: 0 },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["soldProperties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get(`/agent-paid-properties/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <p className="text-center text-[#E74C3C] mt-20 text-lg font-semibold">
        Error loading sold properties: {error.message}
      </p>
    );
  }

  const { totalPaid } = soldData;

  return (
    <section className="max-w-xl mx-auto bg-[#FFF9F0] rounded-3xl shadow-xl p-10 mt-16 border border-[#F4F6F8]">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C3E50] mb-10 text-center tracking-wide">
        Sold Properties Summary
      </h2>

      <div className="bg-gradient-to-r from-[#38A169] to-[#27AE60] text-white rounded-3xl p-10 flex flex-col items-center shadow-inner">
        <p className="text-lg font-semibold uppercase tracking-widest mb-2">
          Total Amount Paid
        </p>
        <p className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          ${totalPaid.toFixed(2)}
        </p>
      </div>

      {totalPaid === 0 && (
        <p className="mt-8 text-center text-[#636e72] italic text-sm">
          You haven't received any payments yet.
        </p>
      )}
    </section>
  );
};

export default SoldProperties;
