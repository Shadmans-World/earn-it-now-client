import React, { useState } from "react";
import useWorkerPending from "../../../Hooks/useWorkerPending";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDbUser from "../../../Hooks/useDbUser";

const Withdrawal = () => {
  const [workerPending] = useWorkerPending(); // Access worker data
  const worker = workerPending[0]; // Assuming the first item contains the worker's information

  const [coinsToWithdraw, setCoinsToWithdraw] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [, currentUser, dbRefetch] = useDbUser(); // Get the current user data
  const axiosSecure = useAxiosSecure(); // Axios instance for secure requests

  if (!worker || !currentUser) {
    return <p>Loading...</p>;
  }

  // Calculate the user's current balance from currentUser
  const currentCoins = currentUser.coins;

  const { worker_email, worker_name } = worker; // Extract worker details
  const dollarEquivalent = currentCoins / 20; // Calculate the dollar equivalent of current coins

  // Form validation
  const isValidWithdrawal =
    coinsToWithdraw && coinsToWithdraw <= currentCoins;

  // Handle submission
  const handleWithdraw = async () => {
    if (!isValidWithdrawal || !paymentSystem || !accountNumber) {
      alert("Please fill out the form correctly.");
      return;
    }

    const withdrawalData = {
      worker_email,
      worker_name,
      withdrawal_coin: coinsToWithdraw,
      withdrawal_amount: coinsToWithdraw / 20,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      setLoading(true); // Show a loading state while submitting

      // Use axiosSecure to send the request
      const response = await axiosSecure.post("/worker/withdrawals", withdrawalData);

      if (response.status === 200) {
        alert("Withdrawal request submitted successfully.");
        setCoinsToWithdraw("");
        setPaymentSystem("");
        setAccountNumber("");
        dbRefetch(); // Refetch the user data to update balance
      } else {
        alert("Failed to submit withdrawal request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Withdrawal</h2>

      {/* User Balance */}
      <div className="mb-5">
        <p className="text-xl">Current Coins: {currentCoins}</p>
        <p className="text-xl">
          Equivalent Dollar Amount: ${dollarEquivalent.toFixed(2)}
        </p>
      </div>

      {currentCoins >= 200 ? (
        // Withdrawal Form
        <form className="space-y-4">
          {/* Coins to Withdraw */}
          <div>
            <label className="block mb-2">Coins to Withdraw</label>
            <input
              type="number"
              value={coinsToWithdraw}
              onChange={(e) =>
                setCoinsToWithdraw(
                  Math.min(Number(e.target.value), currentCoins) || ""
                )
              }
              max={currentCoins}
              className="w-full p-2 border rounded"
              placeholder="Enter coins to withdraw"
            />
          </div>

          {/* Withdrawal Amount (Non-editable) */}
          <div>
            <label className="block mb-2">Withdrawal Amount ($)</label>
            <input
              type="number"
              value={coinsToWithdraw ? (coinsToWithdraw / 20).toFixed(2) : ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Payment System */}
          <div>
            <label className="block mb-2">Select Payment System</label>
            <select
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Choose a payment method
              </option>
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Upay">Upay</option>
            </select>
          </div>

          {/* Account Number */}
          <div>
            <label className="block mb-2">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter account number"
            />
          </div>

          {/* Withdraw Button */}
          <button
            type="button"
            onClick={handleWithdraw}
            disabled={!isValidWithdrawal || loading}
            className={`px-4 py-2 rounded ${
              isValidWithdrawal && !loading
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {loading ? "Submitting..." : "Withdraw"}
          </button>
        </form>
      ) : (
        // Insufficient Coins Message
        <p className="text-red-500 text-lg font-semibold">
          Insufficient coins to withdraw. Minimum 200 coins are required.
        </p>
      )}
    </div>
  );
};

export default Withdrawal;
