// RequestedOffers.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const RequestedOffers = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch offers made to this agent's properties
  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requestedOffers", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/offers-by-agent?agentEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to update offer status (accept or reject)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ offerId, status }) => {
      return await axios.patch(`http://localhost:5000/offers/${offerId}`, {
        status,
      });
    },
    onSuccess: (_, variables) => {
      // If accepted, reject other offers for the same property automatically on backend
      queryClient.invalidateQueries(["requestedOffers", user?.email]);
      Swal.fire("Success", `Offer has been ${variables.status}.`, "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update offer status.", "error");
    },
  });

  if (isLoading) return <p className="text-center">Loading offers...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load offers.</p>;

  if (offers.length === 0)
    return <p className="text-center">No offers found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Property Title
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Property Location
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Buyer Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Buyer Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Offered Price
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {offer.propertyTitle}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {offer.propertyLocation}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {offer.buyerEmail}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {offer.buyerName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${offer.offerAmount}
              </td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {offer.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                {offer.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          offerId: offer._id,
                          status: "accepted",
                        })
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      disabled={updateStatusMutation.isLoading}
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
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      disabled={updateStatusMutation.isLoading}
                    >
                      Reject
                    </button>
                  </>
                )}
                {offer.status !== "pending" && (
                  <span className="font-semibold">{offer.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedOffers;
