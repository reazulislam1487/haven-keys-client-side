// MakeOffer.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role: userRole, roleLoading } = useUserRole();
  console.log(userRole);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch property details by propertyId
  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await axios.get(`http://localhost:5000/property/${id}`);
        setProperty(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load property details.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  // Validate that offerAmount is within minPrice and maxPrice
  const onSubmit = async (data) => {
    if (!property) return;

    const offerAmount = Number(data.offerAmount);
    if (offerAmount < property.minPrice || offerAmount > property.maxPrice) {
      Swal.fire(
        "Invalid Offer",
        `Offer amount must be between $${property.minPrice} and $${property.maxPrice}.`,
        "error"
      );
      return;
    }

    if (userRole !== "user") {
      Swal.fire("Unauthorized", "Only users can make offers.", "error");
      return;
    }

    // Prepare offer object
    const offerPayload = {
      propertyId: property._id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      offerAmount: offerAmount,
      buyerEmail: user.email,
      buyerName: user.displayName || user.name,
      buyingDate: data.buyingDate,
      status: "pending", // optional, server will add it anyway
      createdAt: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/offers", offerPayload);
      Swal.fire(
        "Success",
        "Your offer has been submitted and is pending review.",
        "success"
      );
      navigate("/property-bought");
    } catch (err) {
      Swal.fire("Error", "Failed to submit your offer.", "error");
    }
  };

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;
  if (roleLoading) return <p>Loading role...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make an Offer</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Readonly property fields */}
        <div>
          <label className="block font-semibold">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Property Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Offer amount input */}
        <div>
          <label className="block font-semibold">Offer Amount ($)</label>
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
            className="input input-bordered w-full"
          />
          {errors.offerAmount && (
            <p className="text-red-600 text-sm mt-1">
              {errors.offerAmount.message}
            </p>
          )}
        </div>

        {/* Readonly buyer info */}
        <div>
          <label className="block font-semibold">Buyer Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Buyer Name</label>
          <input
            type="text"
            value={user.displayName || user.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Buying date input */}
        <div>
          <label className="block font-semibold">Buying Date</label>
          <input
            type="date"
            {...register("buyingDate", {
              required: "Buying date is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.buyingDate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.buyingDate.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
