import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

import { AuthContext } from "../../Contexts/AuthContext";
import usePageTitle from "../../hooks/usePageTitle";

const AddProperty = () => {
  usePageTitle("Add Property");

  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

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

  const onSubmit = async ({ title, location, price }) => {
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
      price,
      image: imageURL,
      agentName: user.displayName,
      agentEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/properties",
        propertyData
      );
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
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 my-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#2C3E50]">
        Add Property
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="label font-semibold text-[#2D3436]">
            Property Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className={`input input-bordered w-full rounded-md ${
              errors.title ? "border-[#E74C3C]" : "border-[#00B894]"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-[#E74C3C] text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Property Location */}
        <div>
          <label className="label font-semibold text-[#2D3436]">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className={`input input-bordered w-full rounded-md ${
              errors.location ? "border-[#E74C3C]" : "border-[#00B894]"
            }`}
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-[#E74C3C] text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="label font-semibold text-[#2D3436]">
            Price Range
          </label>
          <input
            type="text"
            placeholder="Ex: $100,000 - $200,000"
            className={`input input-bordered w-full rounded-md ${
              errors.price ? "border-[#E74C3C]" : "border-[#00B894]"
            }`}
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-[#E74C3C] text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label font-semibold text-[#2D3436]">
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

        {/* Agent Name (Read-only) */}
        <div>
          <label className="label font-semibold text-[#2D3436]">
            Agent Name
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full rounded-md bg-gray-100"
          />
        </div>

        {/* Agent Email (Read-only) */}
        <div>
          <label className="label font-semibold text-[#2D3436]">
            Agent Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full rounded-md bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || uploading || !imageURL}
          className="btn bg-[#2C3E50] hover:bg-[#263544f1] text-white w-full rounded-md"
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
