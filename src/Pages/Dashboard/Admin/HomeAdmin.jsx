import React from "react";
import useDbUser from "../../../Hooks/useDbUser";
import usePayments from "../../../Hooks/usePayments";
import useWithDrawals from "../../../Hooks/useWithDrawals";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const HomeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [dbUsers] = useDbUser();
  const [payments, refetch] = usePayments();
  const workers = dbUsers.filter((worker) => worker.role === "worker").length;
  const buyers = dbUsers.filter((buyer) => buyer.role === "buyer").length;

  const totalPayment = payments.length;
  const [withdrawals, withdrawalsRefetch] = useWithDrawals();

  const pendingWithdrawals = withdrawals.filter(
    (withdraw) => withdraw.status === "pending"
  );

  const handleSuccess = async (id) => {
    const withdrawal = pendingWithdrawals.find((withdraw) => withdraw._id === id);

    if (!withdrawal) {
      alert("Withdrawal not found!");
      return;
    }

    const { worker_email, withdrawal_coin } = withdrawal;

    try {
      const response = await axiosSecure.patch("/admin/home/action", {
        id,
        workerEmail: worker_email,
        withdrawalCoin: withdrawal_coin,
      });

      if (response.status === 200) {
        alert("Withdrawal approved successfully!");
        refetch(); // Refetch payments
        withdrawalsRefetch(); // Refetch withdrawals
      } else {
        alert("Failed to approve withdrawal. Please try again.");
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      alert("An error occurred while approving the withdrawal.");
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-center my-10 gap-2 flex-wrap">
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Workers</h2>
          <p className="text-[20px]">{workers}</p>
        </div>
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Buyers</h2>
          <p className="text-[20px]">{buyers}</p>
        </div>
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Payment</h2>
          <p className="text-[20px]">{totalPayment}</p>
        </div>
      </div>
      {/* Pending Withdrawals Section */}
      <div>
        {pendingWithdrawals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Worker Name</th>
                  <th className="border px-4 py-2">Worker Email</th>
                  <th className="border px-4 py-2">Withdrawal Coin</th>
                  <th className="border px-4 py-2">Withdrawal Amount</th>
                  <th className="border px-4 py-2">Account Number</th>
                  <th className="border px-4 py-2">Payment System</th>
                  <th className="border px-4 py-2">Withdrawal Status</th>
                  <th className="border px-4 py-2">Withdrawal Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((withdraw, idx) => (
                  <tr key={withdraw._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{idx + 1}</td>
                    <td className="border px-4 py-2">{withdraw.worker_name}</td>
                    <td className="border px-4 py-2">{withdraw.worker_email}</td>
                    <td className="border px-4 py-2">{withdraw.withdrawal_coin}</td>
                    <td className="border px-4 py-2">{withdraw.withdrawal_amount}</td>
                    <td className="border px-4 py-2">{withdraw.account_number}</td>
                    <td className="border px-4 py-2">{withdraw.payment_system}</td>
                    <td className="border px-4 py-2 capitalize">{withdraw.status}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleSuccess(withdraw._id)}
                      >
                        Payment Success
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-10">
            <h2 className="text-xl font-semibold text-gray-600">
              No Withdrawal Request
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeAdmin;
