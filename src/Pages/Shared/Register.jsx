import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

import usePageTitle from "../../hooks/usePageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../Home/SocialLogin";

const IMG_KEY = import.meta.env.VITE_IMG_KEY; // imgbb key

const Register = () => {
  usePageTitle("Register");
  const instance = useAxiosSecure();
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPW] = useState(false);

  const { createUser, updateUser, setUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const redirect = location.state || "/";

  /* -------------------- react‑hook‑form -------------------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  /* ---------------------------------------------------------
     1️⃣  Upload profile picture to imgbb
  --------------------------------------------------------- */
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("image", file);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMG_KEY}`,
        fd
      );

      const url = data?.data?.url;
      if (!url) throw new Error("Image upload failed");
      setPhoto(url);
      console.log("✓ Photo uploaded:", url);
    } catch (err) {
      Swal.fire("Image Upload Failed", err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------------------------------------------------
     2️⃣  Form submit handler
  --------------------------------------------------------- */
  const onSubmit = async ({ name, email, password }) => {
    if (!photo) {
      return Swal.fire(
        "Hold on!",
        "Please wait for your profile picture to finish uploading.",
        "info"
      );
    }

    try {
      /* 2‑A  Firebase authentication */
      const { user } = await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });

      /* 2‑B  Persist user in your own DB */
      await instance.post(`/users`, {
        name,
        email,
        photoURL: photo,
        role: "user",
        fraud: false,
      });

      /* 2‑C  Save user in global context & toast */
      setUser({ ...user, displayName: name, photoURL: photo });
      Swal.fire("All set!", "Registration successful.", "success");
      setLoading(false);

      reset();
      navigate(redirect);
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Registration Failed",
        err?.response?.data?.message || err.message || "Something went wrong",
        "error"
      );
    }
  };

  /* ---------------------------------------------------------
     3️⃣  Component UI
  --------------------------------------------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-50 to-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left Side – Welcome Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-b from-orange-50 to-orange-100 p-10 flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Welcome to <span className="text-orange-500">HavenKeys</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Join thousands in securing your place in the digital space.
            </p>
          </div>

          <ul className="mt-6 space-y-4">
            {[
              ["🔐", "Secure Digital Identity"],
              ["⚡", "Fast Access Anywhere"],
              ["🌐", "Connect Globally"],
            ].map(([icon, text], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-orange-100 text-orange-500 p-2 rounded-full shadow-sm text-xl">
                  {icon}
                </span>
                <span className="text-gray-700 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side – Register Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-6">
              Register Now
            </h1>

            {/* Name & Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full px-4 py-3 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className="font-semibold text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImgUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="font-semibold text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-3 border pr-10 rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-400`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) ||
                      "Include at least one uppercase letter",
                    hasLower: (v) =>
                      /[a-z]/.test(v) ||
                      "Include at least one lowercase letter",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowPW(!showPassword)}
                className="absolute top-10 right-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || uploading || !photo}
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : isSubmitting
                ? "Registering..."
                : "Register"}
            </button>
            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">
                or continue with
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Login */}
            <div className="flex justify-center space-x-4">
              <SocialLogin from={from} />
            </div>

            {/* Login Redirect */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
