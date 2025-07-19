// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth";

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { id } = useParams();
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const [error, setError] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Fetch project offer info
//   const { isLoading, data: projectInfo = {} } = useQuery({
//     queryKey: ["project-offer", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/project-offer/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   const amount = projectInfo.offerAmount || 0;
//   const amountInCents = Math.round(amount * 100);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setError("");

//     const card = elements.getElement(CardElement);
//     if (!card) {
//       setError("Card details not found.");
//       setIsProcessing(false);
//       return;
//     }

//     // Step 1: Create payment method
//     const { error: paymentMethodError, paymentMethod } =
//       await stripe.createPaymentMethod({
//         type: "card",
//         card,
//         billing_details: {
//           name: user.displayName || "Anonymous",
//           email: user.email,
//         },
//       });

//     if (paymentMethodError) {
//       setError(paymentMethodError.message);
//       setIsProcessing(false);
//       return;
//     }

//     try {
//       // Step 2: Create payment intent on server
//       const res = await axiosSecure.post("/create-payment-intent", {
//         amountInCents,
//         id,
//       });

//       const clientSecret = res.data.clientSecret;

//       // Step 3: Confirm payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//       if (result.error) {
//         setError(result.error.message);
//         setIsProcessing(false);
//         return;
//       }

//       if (result.paymentIntent.status === "succeeded") {
//         const transactionId = result.paymentIntent.id;

//         // Step 4: Save payment info in backend
//         const paymentData = {
//           id,
//           email: user.email,
//           amount,
//           transactionId,
//           paymentMethod: result.paymentIntent.payment_method_types[0],
//         };

//         const paymentRes = await axiosSecure.post("/payments", paymentData);

//         if (paymentRes.data.insertedId) {
//           await Swal.fire({
//             icon: "success",
//             title: "Payment Successful!",
//             html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
//             confirmButtonText: "Go to My Properties",
//           });

//           navigate("/dashboard/property-bought");
//         } else {
//           setError("Failed to save payment info.");
//         }
//       }
//     } catch (err) {
//       setError(err.message || "Payment failed.");
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
//       >
//         <CardElement className="p-2 border rounded" />
//         <button
//           type="submit"
//           disabled={!stripe || isProcessing || amount === 0}
//           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
//         >
//           {isProcessing ? "Processing..." : `Pay $${amount}`}
//         </button>
//         {error && <p className="text-red-500">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch project offer info
  const { isLoading, data: projectInfo = {} } = useQuery({
    queryKey: ["project-offer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/project-offer/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  const amount = projectInfo.offerAmount || 0;
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card details not found.");
      setIsProcessing(false);
      return;
    }

    // Step 1: Create payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: user.displayName || "Anonymous",
          email: user.email,
        },
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setIsProcessing(false);
      return;
    }

    try {
      // Step 2: Create payment intent on server
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 4: Save payment info in backend
        const paymentData = {
          id,
          email: user.email,
          amount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types[0],
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          // ✅ Step 5: Update project status to "bought"
          await axiosSecure.patch(`/project-status/${id}`, { transactionId });

          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Go to My bought Properties",
          });

          navigate("/dashboard/property-bought");
        } else {
          setError("Failed to save payment info.");
        }
      }
    } catch (err) {
      setError(err.message || "Payment failed.");
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          disabled={!stripe || isProcessing || amount === 0}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          {isProcessing ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
