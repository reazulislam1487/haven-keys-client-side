import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";

const ManageProperties = () => {
  const queryClient = useQueryClient();
  const instance = useAxiosSecure();

  // ✅ Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const { data } = await instance.get("/properties");
      return data;
    },
  });

  // ✅ Mutation to verify
  const verifyMutation = useMutation({
    mutationFn: async (id) => instance.patch(`/properties/verify/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-properties"]);
      Swal.fire("Verified!", "Property has been verified.", "success");
    },
  });

  // ✅ Mutation to reject
  const rejectMutation = useMutation({
    mutationFn: async (id) => instance.patch(`/properties/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-properties"]);
      Swal.fire("Rejected!", "Property has been rejected.", "info");
    },
  });
  // check if data is loading

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#2C3E50]">
        Manage Properties
      </h2>

      <div className="overflow-x-auto rounded-xl shadow border border-gray-100 bg-white">
        <table className="table w-full text-sm text-left">
          <thead className="bg-[#F4F6F8] text-[#2C3E50] uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Agent Name</th>
              <th className="px-6 py-3">Agent Email</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4">{p.title}</td>
                <td className="px-6 py-4">{p.location}</td>
                <td className="px-6 py-4 text-[#2D3436] font-medium">
                  {p.minPrice === p.maxPrice
                    ? `$${p.minPrice}`
                    : `$${p.minPrice} - $${p.maxPrice}`}
                </td>
                <td className="px-6 py-4">{p.agentName}</td>
                <td className="px-6 py-4">{p.agentEmail}</td>

                <td className="px-6 py-4 flex flex-wrap justify-center gap-2">
                  {p.status === "verified" ? (
                    <span className="text-green-600 font-semibold">
                      Verified
                    </span>
                  ) : p.status === "rejected" ? (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  ) : (
                    <>
                      <button
                        onClick={() => verifyMutation.mutate(p._id)}
                        className="btn btn-xs bg-[#27AE60] hover:bg-green-700 text-white"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(p._id)}
                        className="btn btn-xs bg-[#E74C3C] hover:bg-red-600 text-white"
                      >
                        Reject
                      </button>
                    </>
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

export default ManageProperties;
