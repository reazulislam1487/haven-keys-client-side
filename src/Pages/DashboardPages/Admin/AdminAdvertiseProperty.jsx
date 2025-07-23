import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";

const AdminAdvertiseProperty = () => {
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await instance.get("/properties");
      return res.data;
    },
  });

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

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-8">
        Admin Verified Properties
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-100 bg-white">
        <table className="table w-full text-sm">
          <thead className="bg-[#F4F6F8] text-[#2C3E50] uppercase font-semibold text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Price Range</th>
              <th className="px-4 py-3">Agent Name</th>
              <th className="px-4 py-3">Agent Email</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-center">Advertise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((property) => (
              <tr
                key={property._id}
                className="hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-2">
                  <img
                    src={property.image}
                    alt="Property"
                    className="w-14 h-14 object-cover rounded-md ring-1 ring-[#E5E7EB]"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-[#2D3436]">
                  {property.title}
                </td>
                <td className="px-4 py-2 text-[#636e72]">
                  {property.location}
                </td>
                <td className="px-4 py-2 text-[#2D3436]">
                  ${property.minPrice} - ${property.maxPrice}
                </td>
                <td className="px-4 py-2">{property.agentName}</td>
                <td className="px-4 py-2 text-xs text-[#636e72]">
                  {property.agentEmail}
                </td>
                <td className="px-4 py-2 text-sm text-[#636e72]">
                  {new Date(property.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  {property.isAdvertised ? (
                    <span className="text-green-600 font-medium">
                      Advertised
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAdvertise(property._id)}
                      className="bg-[#2C3E50] cursor-pointer hover:bg-[#1A242F] text-white px-4 py-1.5 rounded text-xs font-medium"
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
