// src/Pages/DashboardPages/User/MakeOffer.jsx
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"; // adjust path as needed
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import useUserRole from "../../../hooks/useUserRole";

const MakeOffer = () => {
  const { id } = useParams(); // wishlist item ID (or property ID, adjust backend accordingly)
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useUserRole(); // Get user role from context
  /* ─────────────────────────────────────────────
     1️⃣  Block agents & admins immediately
  ───────────────────────────────────────────── */
  useEffect(() => {
    if (role && role !== "user") {
      Swal.fire("Access Denied", "Only users can make offers.", "error");
      navigate("/dashboard"); // redirect away
    }
  }, [role, navigate]);

  /* ─────────────────────────────────────────────
     2️⃣  Fetch wishlist item (incl. property data)
  ───────────────────────────────────────────── */
  const { data: property, isLoading } = useQuery({
    queryKey: ["wishlist-item", id],
    queryFn: async () => {
      // ‼️ Adjust endpoint to return full property details
      const { data } = await axios.get(
        `http://localhost:5000/wishlist-item/${id}`
      );
      return data; // { title, location, agentName, price, ... }
    },
  });

  /* ─────────────────────────────────────────────
     3️⃣  Offer Mutation
  ───────────────────────────────────────────── */
  const offerMutation = useMutation({
    mutationFn: async (offerData) => {
      const { data } = await axios.post(
        "http://localhost:5000/offers",
        offerData
      );
      return data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Offer placed successfully.", "success");
      navigate("/dashboard/property-bought");
    },
    onError: (err) => {
      Swal.fire(
        "Failed",
        err?.response?.data?.message || "Could not place offer.",
        "error"
      );
    },
  });

  /* ─────────────────────────────────────────────
     4️⃣  Handle Submit
  ───────────────────────────────────────────── */
  const handleOffer = (e) => {
    e.preventDefault();
    if (!property) return;

    const form = e.target;
    const offerAmount = parseFloat(form.offerAmount.value);

    /* Parse "min - max" format (e.g. "5000 - 8000") */
    const [min, max] = property.price
      .split("-")
      .map((p) => parseFloat(p.trim()));

    if (offerAmount < min || offerAmount > max) {
      return Swal.fire(
        "Invalid Amount",
        `Your offer must be between ${min} and ${max}.`,
        "warning"
      );
    }

    const offerData = {
      propertyId: property.propertyId || property._id, // backend expects this
      title: property.title,
      location: property.location,
      agentName: property.agentName,
      buyerName: user.displayName,
      buyerEmail: user.email,
      offerAmount,
      buyingDate: form.buyingDate.value,
      status: "pending",
    };

    offerMutation.mutate(offerData);
  };

  /* ─────────────────────────────────────────────
     5️⃣  UI
  ───────────────────────────────────────────── */
  if (isLoading)
    return <p className="text-center mt-10">Loading property...</p>;

  if (!property) {
    return (
      <p className="text-center mt-10 text-red-600">Property not found.</p>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Make an Offer</h2>

      <form onSubmit={handleOffer} className="space-y-4">
        {/* Read‑only fields */}
        <input
          type="text"
          readOnly
          value={property?.title || ""}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          readOnly
          value={property?.location || ""}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          readOnly
          value={property?.agentName || ""}
          className="input input-bordered w-full"
        />

        {/* Offer amount */}
        <input
          type="number"
          step="0.01"
          name="offerAmount"
          placeholder={`Offer Amount (${property.price})`}
          className="input input-bordered w-full"
          required
        />

        {/* Read‑only buyer info */}
        <input
          type="text"
          readOnly
          value={user.displayName || ""}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          readOnly
          value={user.email || ""}
          className="input input-bordered w-full"
        />

        {/* Date */}
        <input
          type="date"
          name="buyingDate"
          className="input input-bordered w-full"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={offerMutation.isLoading}
          className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          {offerMutation.isLoading ? "Offering..." : "Offer"}
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
