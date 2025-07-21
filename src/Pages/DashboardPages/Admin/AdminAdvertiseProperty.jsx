import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminAdvertiseProperty = () => {
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all verified properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await instance.get("/properties");
      return res.data;
    },
  });

  // Mutation to advertise property
  const advertiseMutation = useMutation({
    mutationFn: async (propertyId) => {
      const res = await instance.patch(`/advertise-property/${propertyId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Property advertised successfully.", "success");
      queryClient.invalidateQueries(["verifiedProperties"]);
    },
  });

  const handleAdvertise = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This property will be advertised on the homepage.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, advertise it!",
    }).then((result) => {
      if (result.isConfirmed) {
        advertiseMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Verified Properties</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price Range</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Created At</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50 text-sm">
                <td>
                  <img
                    src={property.image}
                    alt="Property"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>
                  ${property.minPrice} - ${property.maxPrice}
                </td>
                <td>{property.agentName}</td>
                <td>{property.agentEmail}</td>
                <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                <td>
                  {property.isAdvertised ? (
                    <span className="text-green-600 font-medium">
                      Advertised
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdvertise(property._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      Advertise
                    </button>
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

export default AdminAdvertiseProperty;
