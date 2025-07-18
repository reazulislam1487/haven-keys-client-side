import React, { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { AuthContext } from "../../Contexts/AuthContext";
import usePageTitle from "../../hooks/usePageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL; // e.g.  http://localhost:5000
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
    <div className="hero bg-[#FFF9F0] min-h-screen flex items-center justify-center px-4">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        {/* 🎞️ animation */}
        <Lottie
          animationData={RegisterAnimation}
          className="w-full max-w-[400px]"
          loop
        />

        {/* 📄 form card */}
        <div className="card bg-white w-full max-w-md shadow-xl rounded-2xl">
          <div className="card-body px-4 md:px-6 py-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* heading */}
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#2C3E50] to-[#00B894] bg-clip-text text-transparent text-center mb-4">
                Register&nbsp;Now
              </h1>

              {/* name & email */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* name */}
                <div className="w-full">
                  <label className="label font-semibold text-[#2D3436]">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`input input-bordered w-full rounded-md ${
                      errors.name ? "border-[#E74C3C]" : "border-[#00B894]"
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-[#E74C3C] text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* email */}
                <div className="w-full">
                  <label className="label font-semibold text-[#2D3436]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`input input-bordered w-full rounded-md ${
                      errors.email ? "border-[#E74C3C]" : "border-[#00B894]"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-[#E74C3C] text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* photo upload */}
              <div>
                <label className="label font-semibold text-[#2D3436]">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgUpload}
                  className="file-input file-input-bordered w-full rounded-md border-[#00B894]"
                  required
                />
              </div>

              {/* password */}
              <div className="relative">
                <label className="label font-semibold text-[#2D3436]">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`input input-bordered w-full pr-10 rounded-md ${
                    errors.password ? "border-[#E74C3C]" : "border-[#00B894]"
                  }`}
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
                  <p className="text-[#E74C3C] text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}

                {/* toggle visibility */}
                <button
                  type="button"
                  onClick={() => setShowPW(!showPassword)}
                  className="absolute top-9 right-3 text-[#2C3E50]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={isSubmitting || uploading || !photo}
                className="btn bg-[#2C3E50] hover:bg-[#00B894] text-white w-full rounded-md disabled:opacity-60"
              >
                {uploading
                  ? "Uploading..."
                  : isSubmitting
                  ? "Registering..."
                  : "Register"}
              </button>

              {/* sign‑in link */}
              <p className="text-sm text-center text-[#636e72]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#00B894] underline hover:text-[#2C3E50]"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
