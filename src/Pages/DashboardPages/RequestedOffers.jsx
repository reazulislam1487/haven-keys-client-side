import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";

const RequestedOffers = () => {
  const { user } = useAuth();
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requestedOffers", user?.email],
    queryFn: async () => {
      const res = await instance.get(
        `/offers-by-agent?agentEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ offerId, status }) => {
      return await instance.patch(`/offers/${offerId}`, {
        status,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["requestedOffers", user?.email]);
      Swal.fire("Success", `Offer has been ${variables.status}.`, "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update offer status.", "error");
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <p className="text-center text-[#E74C3C] mt-10">Failed to load offers.</p>
    );
  }

  if (offers.length === 0) {
    return <p className="text-center text-[#2D3436] mt-10">No offers found.</p>;
  }

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto px-4 mb-10 min-h-screen">
      <h2 className="text-3xl font-bold text-[#2C3E50] mb-6 text-center">
        Requested Offers
      </h2>
      <div className="rounded-xl overflow-hidden shadow-lg border border-[#F4F6F8] bg-[#FFF9F0]">
        <table className="w-full text-sm text-left text-[#2D3436]">
          <thead className="bg-[#2C3E50] text-white">
            <tr>
              <th className="px-5 py-3">Property Title</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Buyer Email</th>
              <th className="px-5 py-3">Buyer Name</th>
              <th className="px-5 py-3">Offered Price</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer._id}
                className="border-t border-[#F4F6F8] hover:bg-[#F9F9F6]"
              >
                <td className="px-5 py-4">{offer.propertyTitle}</td>
                <td className="px-5 py-4">{offer.propertyLocation}</td>
                <td className="px-5 py-4">{offer.buyerEmail}</td>
                <td className="px-5 py-4">{offer.buyerName}</td>
                <td className="px-5 py-4">${offer.offerAmount}</td>
                {/* <td className="px-5 py-4 capitalize font-medium">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      offer.status === "accepted"
                        ? "bg-[#27AE60]/10 text-[#27AE60] border border-[#27AE60]"
                        : offer.status === "rejected"
                        ? "bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]"
                        : "bg-[#FDCB6E]/10 text-[#F39C12] border border-[#FDCB6E]"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td> */}
                <td className="px-5 py-4">
                  {offer.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            offerId: offer._id,
                            status: "accepted",
                          })
                        }
                        disabled={updateStatusMutation.isLoading}
                        className="px-3 py-1 cursor-pointer rounded-md bg-[#27AE60] text-white text-xs hover:bg-[#239d55] transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            offerId: offer._id,
                            status: "rejected",
                          })
                        }
                        disabled={updateStatusMutation.isLoading}
                        className="px-3 py-1 cursor-pointer rounded-md bg-[#E74C3C] text-white text-xs hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-[#2D3436]">
                      {offer.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedOffers;
