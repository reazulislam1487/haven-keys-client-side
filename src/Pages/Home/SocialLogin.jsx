import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const instance = useAxiosSecure();
  const { setLoading } = useAuth();

  const navigate = useNavigate();
  const from = location.state || "/";
  // const from = location.state?.from?.pathname || "/";
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedInUser = result.user;
        if (!loggedInUser?.email) {
          throw new Error("No user information found");
        }

        await instance.post(`/users`, {
          name: loggedInUser.displayName || "Anonymous",
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "user",
          fraud: false,
        });

        Swal.fire({
          title: "Good job!",
          text: "Login successful",
          icon: "success",
          timer: 1500,
        });

        navigate(from);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed!",
          text: error.message || "An error occurred",
          icon: "error",
          timer: 1500,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
