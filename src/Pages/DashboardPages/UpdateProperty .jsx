import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [previewImg, setPreviewImg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //  Fetch property data
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/properties/${id}`
      );
      return data;
    },
  });

  // 🧩 Prefill form
  useEffect(() => {
    if (property) {
      setValue("title", property.title);
      setValue("location", property.location);
      setValue("priceRange", property.price);
      setValue("agentName", property.agentName);
      setValue("agentEmail", property.agentEmail);
      setPreviewImg(property.image);
    }
  }, [property, setValue]);

  // 📷 Upload image to imgbb
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
      formData
    );
    return data?.data?.url;
  };

  // 🔄 Update property
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.put(
        `http://localhost:5000/properties/${id}`,
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
        priceRange: data.priceRange,
        status: "pending", // Reset status after update
      };

      updateMutation.mutate(updatedData);
    } catch (err) {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading property...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-semibold">Property Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Price Range (e.g., 5000-8000)</label>
          <input
            {...register("priceRange", { required: "Price range is required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.priceRange && (
            <p className="text-red-500">{errors.priceRange.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Agent Name</label>
          <input
            {...register("agentName")}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Agent Email</label>
          <input
            {...register("agentEmail")}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">New Property Image (optional)</label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full mt-1"
          />
          {previewImg && (
            <img
              src={previewImg}
              alt="Current"
              className="w-32 h-32 rounded object-cover mt-3"
            />
          )}
        </div>

        <button
          type="submit"
          className="btn bg-blue-600 text-white hover:bg-blue-700 w-full mt-4"
        >
          {updateMutation.isLoading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
