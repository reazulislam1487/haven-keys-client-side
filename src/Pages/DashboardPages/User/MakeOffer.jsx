import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role: userRole, roleLoading } = useUserRole();
  const instance = useAxiosSecure();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await instance.get(`/property/${id}`);
        setProperty(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load property details.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id, instance]);

  const onSubmit = async (data) => {
    if (!property) return;

    const offerAmount = Number(data.offerAmount);
    if (offerAmount < property.minPrice || offerAmount > property.maxPrice) {
      Swal.fire(
        "Invalid Offer",
        `Offer must be between $${property.minPrice} and $${property.maxPrice}.`,
        "error"
      );
      return;
    }

    if (userRole !== "user") {
      Swal.fire("Unauthorized", "Only users can make offers.", "error");
      return;
    }

    const offerPayload = {
      propertyId: property._id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      offerAmount: offerAmount,
      propertyImage: property.image || property.propertyImage,
      buyerEmail: user.email,
      buyerName: user.displayName || user.name,
      buyingDate: data.buyingDate,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await instance.post("/offers", offerPayload);
      Swal.fire(
        "Success",
        "Your offer has been submitted and is pending review.",
        "success"
      );
      navigate("/dashboard/property-bought");
    } catch (err) {
      Swal.fire("Error", "Failed to submit your offer.", "error");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading property details...
      </p>
    );
  if (!property)
    return (
      <p className="text-center mt-10 text-red-500">Property not found.</p>
    );
  if (roleLoading)
    return <p className="text-center mt-10 text-gray-500">Loading role...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">
        Make an Offer
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Property Location
          </label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Agent Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Offer Amount */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Offer Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("offerAmount", {
              required: "Offer amount is required",
              min: {
                value: property.minPrice,
                message: `Offer must be at least $${property.minPrice}`,
              },
              max: {
                value: property.maxPrice,
                message: `Offer must be at most $${property.maxPrice}`,
              },
            })}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.offerAmount && (
            <p className="text-red-600 text-sm mt-1">
              {errors.offerAmount.message}
            </p>
          )}
        </div>

        {/* Buyer Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Buyer Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Buyer Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Buyer Name
          </label>
          <input
            type="text"
            value={user.displayName || user.name}
            readOnly
            className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
          />
        </div>

        {/* Buying Date */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Buying Date
          </label>
          <input
            type="date"
            {...register("buyingDate", { required: "Buying date is required" })}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.buyingDate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.buyingDate.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition duration-200 shadow-md"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
