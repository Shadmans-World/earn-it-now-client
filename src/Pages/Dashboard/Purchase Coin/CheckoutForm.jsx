import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useDbUser from "../../../Hooks/useDbUser";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, coins } = location.state;

  const axiosPublic = useAxiosPublic();
  const [dbUsers, currentUser, refetch] = useDbUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    try {
      const { data } = await axiosPublic.post("/create-payment-intent", {
        amount: amount * 100, // Stripe uses cents
      });

      const { clientSecret } = data;

      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmPayment.error) {
        console.error(confirmPayment.error.message);
        return;
      }

      // Payment succeeded
      const paymentInfo = {
        transactionId: confirmPayment.paymentIntent.id,
        amount,
        coins,
        userId: currentUser._id, // Replace with actual userId (can be from context or state)
        email: currentUser.email, // Include the user's email
      };

      // Save payment info and update user's coin balance
      await axiosPublic.post("/save-payment", paymentInfo);
      refetch();
      alert("Payment successful!");
      
      navigate("/dashboard/purchaseHistory");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 shadow rounded">
      <h2 className="text-2xl font-bold mb-5">Pay ${amount} for {coins} coins</h2>
      <CardElement className="p-3 border rounded" />
      <button
        type="submit"
        className="btn btn-primary mt-5"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
