import React, { useContext } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { AuthContext } from "../../Contexts/AuthContext";
import SocialLogin from "../Home/SocialLogin";
import usePageTitle from "../../hooks/usePageTitle";
import Swal from "sweetalert2";

const Login = () => {
  usePageTitle("Login");

  const { signInUser } = useContext(AuthContext);
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
    <div className="hero bg-[#FFF9F0] min-h-screen overflow-x-hidden flex items-center justify-center px-4">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        {/* Animation */}
        <Lottie
          animationData={RegisterAnimation}
          className="max-w-[400px] w-full"
          loop
        />

        {/* Login Card */}
        <div className="card bg-white w-full max-w-md shadow-xl rounded-2xl">
          <div className="card-body px-4 md:px-6 py-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#2C3E50] to-[#00B894] bg-clip-text text-transparent text-center mb-4">
                Login Now
              </h1>

              {/* Email */}
              <div>
                <label className="label font-semibold text-[#2D3436]">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className={`input input-bordered w-full rounded-md ${
                    errors.email ? "border-[#E74C3C]" : "border-[#00B894]"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-[#E74C3C] text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label font-semibold text-[#2D3436]">Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  className={`input input-bordered w-full rounded-md ${
                    errors.password ? "border-[#E74C3C]" : "border-[#00B894]"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-[#E74C3C] text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link to="" className="text-sm text-[#00B894] hover:text-[#2C3E50]">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                className="btn bg-[#2C3E50] hover:bg-[#00B894] text-white w-full rounded-md transition-all"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </motion.button>

              {/* Register Link */}
              <p className="text-sm text-center text-[#636e72]">
                Don’t have an account?{" "}
                <Link to="/register" className="text-[#00B894] underline hover:text-[#2C3E50]">
                  Register
                </Link>
              </p>
            </form>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Login */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
            >
              <SocialLogin from={from} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
