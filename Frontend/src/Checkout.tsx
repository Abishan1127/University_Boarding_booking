import React, { useState } from "react";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { stripePromise } from "../stripeConfig";
import "./Checkout.css";


interface CheckoutProps {
  userId: number;
  boardingId?: number;
  roomId?: number;
  startDate?: Date;
  endDate?: Date;
  roomPrice?: number;
}

const CheckoutForm: React.FC<CheckoutProps> = ({ userId, boardingId, roomId, startDate, endDate, roomPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    if (!stripe || !elements) {
      setError("Stripe is not loaded");
      setLoading(false);
      return;
    }
  
    try {
      // ✅ Convert Dates to "YYYY-MM-DD"
      const formattedStartDate = startDate ? startDate.toISOString().split("T")[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : null;
  
      // ✅ Step 1: Create Payment Method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card details are missing");
        setLoading(false);
        return;
      }
  
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
  
      if (paymentMethodError?.message) {
        setError(paymentMethodError.message);
        console.error("❌ Payment Method Error:", paymentMethodError);
        setLoading(false);
        return;
      }
  
      console.log("✅ Created Payment Method:", paymentMethod?.id);
  
  
  
      // ✅ Step 2: Request Payment Intent from Backend
      const { data } = await axios.post("http://localhost:5000/api/payments/create-payment-intent", {
        amount: roomPrice,
        currency: "lkr",
        user_id: userId,
        board_id: boardingId,
        room_id: roomId,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        payment_method_id: paymentMethod?.id,
      });
  
      console.log("✅ Backend Response:", data);
  
      const clientSecret = data.clientSecret;
  
      if (!clientSecret) {
        setError("✅ Payment sucess full");
        setLoading(false);
        return;
      }
  
      // ✅ Step 3: Confirm Payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod?.id,
      });
  
      console.log("✅ Stripe ConfirmCardPayment Response:", result);
  
      if (result.error) {
        setError(result.error.message || "Payment failed");
        console.error("❌ Payment Confirmation Error:", result.error);
      } else if (result.paymentIntent?.status === "succeeded") {
        setSuccess("✅ Payment successful!");
        console.log("✅ Payment Success:", result.paymentIntent);
      } else {
        setError("Payment failed or requires additional action");
        console.error("❌ Unexpected Payment Status:", result);
      }
    } catch (err) {
      setError("⚠️ Payment failed. Please try again.");
      console.error("❌ Unexpected Error:", err);
    }
  
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

// Wrapper to inject Stripe Elements
const CheckoutPage: React.FC<CheckoutProps> = ({ userId, boardingId, roomId, startDate, endDate, roomPrice }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm userId={userId} boardingId={boardingId} roomId={roomId} startDate={startDate} endDate={endDate} roomPrice={roomPrice}/>
  </Elements>
);

export default CheckoutPage;
