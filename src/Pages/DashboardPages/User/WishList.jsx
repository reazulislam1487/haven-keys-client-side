import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlistItem", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/wishlist-item/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const offerMutation = useMutation({
    mutationFn: async (offerData) => {
      const res = await axios.post("http://localhost:5000/offers", offerData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Your offer has been submitted!", "success");
      queryClient.invalidateQueries(["propertyBought", user?.email]);
      navigate("/dashboard/property-bought");
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to send offer", "error");
    },
  });

  const onSubmit = (data) => {
    const [minPrice, maxPrice] = property.price
      .split("-")
      .map((p) => parseInt(p.trim()));

    const offer = parseInt(data.offerAmount);

    if (offer < minPrice || offer > maxPrice) {
      return Swal.fire(
        "Invalid Offer",
        `Offer must be between ${minPrice} and ${maxPrice}`,
        "warning"
      );
    }

    const offerData = {
      propertyId: id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agentName,
      offerAmount: offer,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: data.buyingDate,
      status: "pending",
    };

    offerMutation.mutate(offerData);
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading property...</p>;
  if (isError || !property)
    return <p className="text-red-500 text-center">Property not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Make an Offer</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="font-semibold">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Offer Amount (৳)</label>
          <input
            type="number"
            {...register("offerAmount", {
              required: "Offer amount is required",
            })}
            placeholder={`Between ${property.price}`}
            className="input input-bordered w-full"
          />
          {errors.offerAmount && (
            <p className="text-red-500">{errors.offerAmount.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Your Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Buying Date</label>
          <input
            type="date"
            {...register("buyingDate", { required: "Buying date is required" })}
            className="input input-bordered w-full"
          />
          {errors.buyingDate && (
            <p className="text-red-500">{errors.buyingDate.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={offerMutation.isLoading}
          className="btn bg-blue-600 text-white hover:bg-blue-700 w-full"
        >
          {offerMutation.isLoading ? "Submitting..." : "Send Offer"}
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
