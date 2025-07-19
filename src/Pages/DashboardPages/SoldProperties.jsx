import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const SoldProperties = () => {
  const { user } = useAuth();

  const {
    data: soldData = { totalPaid: 0 },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["soldProperties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/agent-paid-properties/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-600 mt-20 text-lg font-semibold animate-pulse">
        Loading sold properties...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 mt-20 text-lg font-semibold">
        Error loading sold properties: {error.message}
      </p>
    );
  }

  const { totalPaid } = soldData;

  return (
    <section className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-10 mt-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
        Sold Properties Summary
      </h2>

      <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-3xl shadow-xl p-10 flex flex-col items-center">
        <p className="text-lg font-semibold uppercase tracking-wide mb-3">
          Total Amount Paid
        </p>
        <p className="text-6xl font-extrabold">${totalPaid.toFixed(2)}</p>
      </div>

      {totalPaid === 0 && (
        <p className="mt-8 text-center text-gray-500 italic text-sm">
          You haven't received any payments yet.
        </p>
      )}
    </section>
  );
};

export default SoldProperties;
