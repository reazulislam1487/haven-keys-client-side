import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// React Icons
import {
  FaMapMarkerAlt,
  FaUser,
  FaCheckCircle,
  FaDollarSign,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Loading from "../Shared/Loading";

const MyProperties = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const instance = useAxiosSecure();

  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties", user?.email],
    queryFn: async () => {
      const { data } = await instance.get(
        `/properties?agentEmail=${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await instance.delete(`/properties/${id}`);
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-[#E74C3C]">Error loading properties.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#2C3E50]">
        My Added Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-[#636e72]">No properties found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-[#FFF9F0] shadow-md rounded-xl overflow-hidden border border-[#F4F6F8] transition-transform hover:scale-[1.01] duration-200"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-[#2C3E50]">
                  {property.title}
                </h3>

                <p className="text-sm text-[#636e72] flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[#00B894]" />
                  {property.location}
                </p>

                <div className="flex items-center gap-3 my-2">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/0j3MZg1/avatar.png"
                    }
                    alt="Agent"
                    className="w-10 h-10 rounded-full border"
                  />
                  <p className="text-sm text-[#2D3436] font-medium flex items-center gap-1">
                    <FaUser className="text-[#2C3E50]" />
                    {property.agentName}
                  </p>
                </div>

                <p className="text-sm flex items-center gap-1">
                  <FaCheckCircle className="text-[#2C3E50]" />
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      property.status === "verified"
                        ? "text-[#27AE60]"
                        : property.status === "rejected"
                        ? "text-[#E74C3C]"
                        : "text-[#F39C12]"
                    }`}
                  >
                    {property.status || "pending"}
                  </span>
                </p>

                <p className="text-sm flex items-center gap-1 text-[#2D3436]">
                  <FaDollarSign className="text-[#00B894]" />$
                  {property.minPrice} - ${property.maxPrice}
                </p>

                <div className="flex justify-between mt-4">
                  {property.status !== "rejected" && (
                    <Link
                      to={`/dashboard/update-property/${property._id}`}
                      className="flex items-center gap-1 px-4 py-1 text-sm bg-[#2C3E50] hover:bg-[#263544f1] text-white rounded-md"
                    >
                      <FaEdit />
                      Update
                    </Link>
                  )}
                  <button
                    disabled={deleteMutation.isLoading}
                    onClick={() => handleDelete(property._id)}
                    className="flex items-center gap-1 px-4 py-1 text-sm bg-[#E74C3C] hover:bg-red-700 text-white rounded-md"
                  >
                    <FaTrash />
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
