import React, { useEffect, useState } from "react";
import useDbUser from "../../../Hooks/useDbUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PurchaseHistory = () => {
  const [payments, setPayments] = useState([]);
  const [, currentUser, refetch] = useDbUser(); // Extract `currentUser`
  const axiosSecure = useAxiosSecure(); // Custom Axios instance with secure settings

  // Fetch payments data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (!currentUser?.email) return; // Wait until currentUser is available

        // Make API call to fetch payments by email
        const response = await axiosSecure.get(
          `/payments?email=${currentUser.email}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [currentUser, axiosSecure]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Purchase History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Amount (USD)</th>
              <th className="border px-4 py-2">Coins Purchased</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{payment.transactionId}</td>
                  <td className="border px-4 py-2">${payment.amount}</td>
                  <td className="border px-4 py-2">{payment.coins}</td>
                  <td className="border px-4 py-2">
                    {new Date(payment.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border px-4 py-2 text-center"
                  colSpan="4"
                >
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
