import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

import usePageTitle from "../../hooks/usePageTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProperty = () => {
  usePageTitle("Add Property");

  const instance = useAxiosSecure();

  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=8d037ace4968014a12f45e0c0cde4bd4",
        formData
      );

      const url = res.data?.data?.url;
      setImageURL(url);
    } catch (err) {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async ({ title, location, minPrice, maxPrice }) => {
    if (minPrice > maxPrice) {
      return Swal.fire(
        "Validation Error",
        "Min price cannot exceed max price",
        "error"
      );
    }

    if (!imageURL) {
      return Swal.fire(
        "Hold on!",
        "Please wait for the image to upload.",
        "info"
      );
    }

    const propertyData = {
      title,
      location,
      minPrice,
      maxPrice,
      image: imageURL,
      agentName: user.displayName,
      agentPhoto: user.photoURL,
      agentEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const response = await instance.post("/properties", propertyData);
      if (response.data?.insertedId) {
        Swal.fire("Success!", "Property added successfully", "success");
        reset();
        setImageURL("");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add property", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#FFF9F0] shadow-xl rounded-2xl p-10 border border-[#F4F6F8]">
      <h2 className="text-4xl font-bold text-center mb-8 text-[#2C3E50]">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-1">
            Property Title
          </label>
          <input
            type="text"
            placeholder="Enter property title"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-[#E74C3C] focus:ring-[#E74C3C]"
                : "border-[#00B894] focus:ring-[#00B894]"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-[#E74C3C] text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Property Location */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.location
                ? "border-[#E74C3C] focus:ring-[#E74C3C]"
                : "border-[#00B894] focus:ring-[#00B894]"
            }`}
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-[#E74C3C] text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-1">
            Price Range ($)
          </label>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="number"
              placeholder="Min"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.minPrice
                  ? "border-[#E74C3C] focus:ring-[#E74C3C]"
                  : "border-[#00B894] focus:ring-[#00B894]"
              }`}
              {...register("minPrice", {
                required: "Min price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Min price must be positive" },
                validate: (value) =>
                  !maxPrice || value <= maxPrice || "Min cannot exceed Max",
              })}
            />
            <input
              type="number"
              placeholder="Max"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.maxPrice
                  ? "border-[#E74C3C] focus:ring-[#E74C3C]"
                  : "border-[#00B894] focus:ring-[#00B894]"
              }`}
              {...register("maxPrice", {
                required: "Max price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Max price must be positive" },
                validate: (value) =>
                  !minPrice || value >= minPrice || "Max must be ≥ Min",
              })}
            />
          </div>
          {(errors.minPrice || errors.maxPrice) && (
            <p className="text-[#E74C3C] text-sm mt-1">
              {errors.minPrice?.message || errors.maxPrice?.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-1">
            Property Image
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full rounded-md border-[#00B894]"
          />
        </div>

        {/* Agent Name */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-1">
            Agent Name
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-2 bg-[#F4F6F8] rounded-lg border border-[#DDD] text-[#2D3436]"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-1">
            Agent Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 bg-[#F4F6F8] rounded-lg border border-[#DDD] text-[#2D3436]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || uploading || !imageURL}
          className="w-full bg-[#2C3E50] cursor-pointer hover:bg-[#263544f1] text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          {uploading
            ? "Uploading Image..."
            : isSubmitting
            ? "Adding..."
            : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
