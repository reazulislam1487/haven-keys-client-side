import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [previewImg, setPreviewImg] = useState("");
  const instance = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await instance.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (property) {
      setValue("title", property.title);
      setValue("location", property.location);
      setValue("minPrice", Number(property.minPrice));
      setValue("maxPrice", Number(property.maxPrice));
      setValue("agentName", property.agentName);
      setValue("agentEmail", property.agentEmail);
      setPreviewImg(property.image);
    }
  }, [property, setValue]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
      formData
    );
    return data?.data?.url;
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await instance.put(
        `/properties/${id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
      Swal.fire("Updated!", "Property updated successfully.", "success");
      navigate("/dashboard/my-properties");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update property.", "error");
    },
  });

  const onSubmit = async (data) => {
    if (data.minPrice > data.maxPrice) {
      return Swal.fire(
        "Invalid Price",
        "Min price cannot exceed max price",
        "error"
      );
    }

    try {
      let imageUrl = previewImg;
      if (data.image && data.image[0]) {
        imageUrl = await handleImageUpload(data.image[0]);
      }

      const updatedData = {
        title: data.title,
        location: data.location,
        image: imageUrl,
        agentName: data.agentName,
        agentEmail: data.agentEmail,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        status: "pending",
      };

      updateMutation.mutate(updatedData);
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  if (isLoading) {
    return (
      <p className="text-center text-[#636e72] mt-20 text-lg font-medium animate-pulse">
        Loading property...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">
        Update Property
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-semibold text-[#2D3436]">
            Property Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full rounded-md mt-1 border-[#00B894]"
          />
          {errors.title && (
            <p className="text-sm text-[#E74C3C] mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold text-[#2D3436]">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full rounded-md mt-1 border-[#00B894]"
          />
          {errors.location && (
            <p className="text-sm text-[#E74C3C] mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-semibold text-[#2D3436] mb-2">
            Price Range
          </label>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {/* Min Price */}
            <div className="w-full">
              <input
                type="number"
                step="any"
                placeholder="Min Price"
                className={`input input-bordered w-full rounded-md ${
                  errors.minPrice ? "border-[#E74C3C]" : "border-[#00B894]"
                }`}
                {...register("minPrice", {
                  required: "Min price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be positive" },
                })}
              />
              {errors.minPrice && (
                <p className="text-sm text-[#E74C3C] mt-1">
                  {errors.minPrice.message}
                </p>
              )}
            </div>

            {/* Max Price */}
            <div className="w-full">
              <input
                type="number"
                step="any"
                placeholder="Max Price"
                className={`input input-bordered w-full rounded-md ${
                  errors.maxPrice ? "border-[#E74C3C]" : "border-[#00B894]"
                }`}
                {...register("maxPrice", {
                  required: "Max price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be positive" },
                })}
              />
              {errors.maxPrice && (
                <p className="text-sm text-[#E74C3C] mt-1">
                  {errors.maxPrice.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div>
          <label className="block font-semibold text-[#2D3436]">
            Agent Name
          </label>
          <input
            {...register("agentName")}
            readOnly
            className="input input-bordered w-full mt-1 bg-[#F4F6F8]"
          />
        </div>

        <div>
          <label className="block font-semibold text-[#2D3436]">
            Agent Email
          </label>
          <input
            {...register("agentEmail")}
            readOnly
            className="input input-bordered w-full mt-1 bg-[#F4F6F8]"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold text-[#2D3436]">
            New Property Image (optional)
          </label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full mt-1 border-[#00B894]"
          />
          {previewImg && (
            <img
              src={previewImg}
              alt="Current"
              className="w-36 h-36 rounded-lg object-cover mt-3 border border-[#F4F6F8]"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-[#2C3E50] hover:bg-[#263544f1] text-white w-full rounded-md mt-6"
        >
          {updateMutation.isLoading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
