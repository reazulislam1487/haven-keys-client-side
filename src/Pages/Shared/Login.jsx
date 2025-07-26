import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

import SocialLogin from "../Home/SocialLogin";
import usePageTitle from "../../hooks/usePageTitle";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  usePageTitle("Login");

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await signInUser(email, password);
      reset();
      navigate(from);
      Swal.fire("Good job!", "Login successful", "success");
    } catch (err) {
      Swal.fire(
        "Login Failed",
        err.code === "auth/wrong-password"
          ? "Wrong password"
          : err.code === "auth/user-not-found"
          ? "No account found with this email"
          : "Something went wrong",
        "error"
      );
    }
  };

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

        {/* Right Side – Login Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-center text-orange-600 mb-4">
            Sign In
          </h3>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Access your HavenKeys dashboard and manage your digital credentials.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {isSubmitting ? "Logging in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            <SocialLogin from={from} />
          </div>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 cursor-pointer font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
