import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/properties");
      return data;
    },
  });

  // ✅ Mutation to verify
  const verifyMutation = useMutation({
    mutationFn: async (id) =>
      axios.patch(`http://localhost:5000/properties/verify/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-properties"]);
      Swal.fire("Verified!", "Property has been verified.", "success");
    },
  });

  // ✅ Mutation to reject
  const rejectMutation = useMutation({
    mutationFn: async (id) =>
      axios.patch(`http://localhost:5000/properties/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-properties"]);
      Swal.fire("Rejected!", "Property has been rejected.", "info");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.location}</td>
                <td>{p.price || p.priceRange}</td>
                <td>{p.agentName}</td>
                <td>{p.agentEmail}</td>
                <td className="capitalize font-semibold">
                  {p.status || "pending"}
                </td>
                <td className="space-x-2 text-center">
                  {p.status === "verified" ? (
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : p.status === "rejected" ? (
                    <span className="text-red-500 font-medium">Rejected</span>
                  ) : (
                    <>
                      <button
                        onClick={() => verifyMutation.mutate(p._id)}
                        className="btn btn-xs bg-green-600 hover:bg-green-700 text-white"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(p._id)}
                        className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
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
