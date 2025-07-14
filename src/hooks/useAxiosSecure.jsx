import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth"; //
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: "https://marathon-server-side-five.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const requestInterceptor = instance.interceptors.request.use((config) => {
  //     if (user?.accessToken) {
  //       config.headers.Authorization = `Bearer ${user.accessToken}`;
  //     }
  //     return config;
  //   });

  //   // Optional: Eject interceptor on cleanup to avoid duplication
  //   return () => {
  //     instance.interceptors.request.eject(requestInterceptor);
  //   };
  // }, [user]);
  useEffect(() => {
    if (!user?.accessToken) return;

    // Request interceptor: attach token
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: handle auth errors
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          console.warn("Unauthorized or Forbidden. Logging out...");

          // Optional: display a message to user
          await Swal.fire("Session expired. Please log in again.");
          // Call logout and redirect to login page
          await signOutUser(); // from useAuth
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
