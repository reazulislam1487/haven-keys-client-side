// MyProperties.jsx
import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/properties?agentEmail=${user.email}`
      );
      return data;
    },
    enabled: !!user?.email, // run only after email available
  });

  // ──────────────────────────────
  // ❌ Delete mutation (with optimistic update)
  // ──────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/properties/${id}`);
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["properties", user.email] });
      const previous = queryClient.getQueryData(["properties", user.email]);
      queryClient.setQueryData(["properties", user.email], (old = []) =>
        old.filter((p) => p._id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["properties", user.email], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["properties", user.email] });
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the property.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      deleteMutation.mutate(id, {
        onSuccess: () =>
          Swal.fire("Deleted!", "Property has been removed.", "success"),
      });
    }
  };

  // ──────────────────────────────
  // 🖋️ Render states
  // ──────────────────────────────
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-600">Error loading properties.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Added Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="card bg-white shadow-xl rounded-lg p-4"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-[#2C3E50]">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600">📍 {property.location}</p>

              <div className="flex items-center gap-3 my-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/0j3MZg1/avatar.png"}
                  alt="Agent"
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm">👤 {property.agentName}</p>
              </div>

              <p className="text-sm">
                ✅ <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    property.status === "verified"
                      ? "text-green-600"
                      : property.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {property.status || "pending"}
                </span>
              </p>

              <p className="text-sm text-[#2D3436] my-1">
                💰 <strong>Price:</strong> {property.price}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                {property.status !== "rejected" && (
                  <Link
                    to={`/dashboard/update-property/${property._id}`}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Update
                  </Link>
                )}
                <button
                  disabled={deleteMutation.isLoading}
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
