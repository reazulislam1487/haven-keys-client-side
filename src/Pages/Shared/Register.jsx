import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { AuthContext } from "../../Contexts/AuthContext";
import usePageTitle from "../../hooks/usePageTitle";

const Register = () => {
  usePageTitle("Register");
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
        formData
      );
      const url = data?.data?.url;
      setPhoto(url);
      console.log("Uploaded ⇒", url);
    } catch (err) {
      Swal.fire("Image upload failed", err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async ({ name, email, password }) => {
    if (!photo) {
      return Swal.fire(
        "Hold on!",
        "Please wait until your profile photo is uploaded.",
        "info"
      );
    }

    try {
      const { user } = await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      Swal.fire("Good job!", "Registration Successful", "success");
      reset();
      navigate(from);
    } catch (err) {
      Swal.fire(
        "Registration Failed",
        err.message || "An error occurred",
        "error"
      );
    }
  };

  return (
    <div className="hero bg-[#FFF9F0] min-h-screen overflow-x-hidden flex items-center justify-center px-4">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <Lottie
          animationData={RegisterAnimation}
          className="max-w-[400px] w-full"
          loop
        />

        <div className="card bg-white w-full max-w-md shadow-xl rounded-2xl">
          <div className="card-body px-4 md:px-6 py-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#2C3E50] to-[#00B894] bg-clip-text text-transparent text-center mb-4">
                Register Now
              </h1>

              {/* Name & Email */}
              <div className="flex flex-col md:flex-row gap-3">
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

              {/* Photo Upload */}
              <div>
                <label className="label font-semibold text-[#2D3436]">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImgUpload}
                  className="file-input file-input-bordered w-full rounded-md border-[#00B894]"
                />
              </div>

              {/* Password */}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-[#2C3E50]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || uploading || !photo}
                className="btn bg-[#2C3E50] hover:bg-[#00B894] text-white w-full rounded-md"
              >
                {uploading
                  ? "Uploading..."
                  : isSubmitting
                  ? "Registering..."
                  : "Register"}
              </button>

              {/* Already have an account? */}
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
