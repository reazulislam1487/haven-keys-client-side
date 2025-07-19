import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51RkBshPtv3ql5bIEeslOEPquho0yZxCMiOjcwLAQTolYQK1zqfaNNXGjYMyPNFBcfMv7rcALC7spxFAc5ZFeULcT00keXKcPui"
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
