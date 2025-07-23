import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaUserTie,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import Loading from "../../Shared/Loading";

const PropertyBought = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const instance = useAxiosSecure();

  const {
    data: offersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/bought-properties?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const offers = Array.isArray(offersData) ? offersData : [];

  if (isLoading)
    return <p className="text-center text-[#2C3E50]">Loading offers...</p>;

  if (isError) return <Loading></Loading>;

  if (offers.length === 0)
    return <p className="text-center text-gray-600">No offers found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-0 mt-6 px-4">
      {offers.map((item) => (
        <div
          key={item._id}
          className="bg-[#FFF9F0]  rounded-2xl shadow-lg  hover:shadow-xl transition"
        >
          <img
            src={item.propertyImage || "https://via.placeholder.com/400x200"}
            alt={item.propertyTitle || "Property"}
            className=" h-48 w-full rounded-2xl object-cover mb-4"
          />
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-[#2C3E50]">
              {item.propertyTitle || "Untitled Property"}
            </h3>

            <p className="text-[#636e72] mt-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#00B894]" />
              {item.propertyLocation || "Location not available"}
            </p>

            <p className="text-sm text-[#636e72] mt-2 flex items-center gap-2">
              <FaUserTie className="text-[#F39C12]" />
              Agent: {item.agentName || "Unknown"}
            </p>

            <p className="text-[#27AE60] font-medium mt-2 flex items-center gap-2">
              <FaMoneyBillWave />
              Offer: ${item.offerAmount || "N/A"}
            </p>

            <p
              className={`mt-2 font-semibold ${
                item.status === "accepted"
                  ? "text-[#27AE60]"
                  : item.status === "bought"
                  ? "text-purple-600"
                  : "text-[#F39C12]"
              }`}
            >
              Status: {item.status || "pending"}
            </p>

            {item.status === "accepted" && !item.transactionId && (
              <button
                onClick={() =>
                  navigate(`/dashboard/payment/${item._id}`, {
                    state: {
                      offerId: item._id,
                      amount: item.offerAmount,
                      propertyTitle: item.propertyTitle,
                    },
                  })
                }
                className="mt-4 bg-[#00B894] hover:bg-[#019875] text-white font-medium py-2 px-5 rounded-lg transition"
              >
                Pay Now
              </button>
            )}

            {item.status === "bought" && (
              <div className="mt-3 text-sm text-[#2D3436]">
                <p className="font-semibold flex items-center gap-2">
                  TxnID:
                  <span
                    onClick={() =>
                      navigator.clipboard.writeText(
                        item?.transactionId?.transactionId
                      )
                    }
                    title="Click to copy"
                    className="text-blue-700 underline cursor-pointer"
                  >
                    {item?.transactionId?.transactionId}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
