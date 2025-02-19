import React, { useState } from "react";
import useDbUser from "../../../Hooks/useDbUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Withdrawal = () => {
  const [coinsToWithdraw, setCoinsToWithdraw] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [,currentUser, dbRefetch] = useDbUser(); // Get user data with loading state
  const axiosSecure = useAxiosSecure(); // Axios instance for secure requests



  // **Check if the currentUser exists and has the role of 'worker'**
  if (!currentUser || currentUser.role !== 'worker') {
    return <p className="text-red-500 text-lg font-semibold">Not authorized or worker data not found.</p>;
  }

  const { worker_email, worker_name, coins: currentCoins } = currentUser;
  const dollarEquivalent = currentCoins / 20; // Convert coins to dollars

  // Validate withdrawal request
  const isValidWithdrawal = coinsToWithdraw && coinsToWithdraw <= currentCoins;

  // Handle withdrawal request
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
      setLoading(true);
      const response = await axiosSecure.post("/worker/withdrawals", withdrawalData);
      if (response.status === 200) {
        alert("Withdrawal request submitted successfully.");
        setCoinsToWithdraw("");
        setPaymentSystem("");
        setAccountNumber("");
        dbRefetch(); // Refresh user data
      } else {
        alert("Failed to submit withdrawal request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Withdrawal</h2>

      {/* User Balance */}
      <div className="mb-5">
        <p className="text-xl">Current Coins: {currentCoins}</p>
        <p className="text-xl">Equivalent Dollar Amount: ${dollarEquivalent.toFixed(2)}</p>
      </div>

      {currentCoins >= 200 ? (
        <form className="space-y-4">
          {/* Coins to Withdraw */}
          <div>
            <label className="block mb-2">Coins to Withdraw</label>
            <input
              type="number"
              value={coinsToWithdraw}
              onChange={(e) =>
                setCoinsToWithdraw(Math.min(Number(e.target.value), currentCoins) || "")
              }
              max={currentCoins}
              className="w-full p-2 border rounded"
              placeholder="Enter coins to withdraw"
            />
          </div>

          {/* Withdrawal Amount (Read-only) */}
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
              <option value="" disabled>Choose a payment method</option>
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
            className={`px-4 py-2 rounded ${isValidWithdrawal && !loading ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}
          >
            {loading ? "Submitting..." : "Withdraw"}
          </button>
        </form>
      ) : (
        <p className="text-red-500 text-lg font-semibold">
          Insufficient coins to withdraw. Minimum 200 coins are required.
        </p>
      )}
    </div>
  );
};

export default Withdrawal;
