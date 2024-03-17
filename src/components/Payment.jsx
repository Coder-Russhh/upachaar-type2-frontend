import React,{useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { backendURL } from "../config/dev";

const Payment = () => {

    const [amount, setAmount] = useState("");


  const handleStripe = async (e) => {
      e.preventDefault();
      setAmount(500)
    const stripe = await loadStripe(
      "pk_test_51OiHCoSE17PdorGk6oi5afd8KspLQVpBcfHTZj5ecyLcijXQjB0Amm559tGm5u0NzrGwygmHcCq8UJQBewo2XL7w00nZbg23o3"
    );

    const response = await fetch(
      `${backendURL}/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // doctorId,
          //   selectedDate,
          //   selectedTimeSlot,
          amount: 500,
        }),
      }
    );
    const session = await response.json();

    try {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error redirecting to Checkout:", error);
    }
  };

  return (
    <>
      <div>
        <button
          type="submit"
          onClick={handleStripe}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Confirm payment
        </button>
      </div>
    </>
  );
};

export default Payment;
