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
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Worker Name</th>
                  <th>Worker Email</th>
                  <th>Withdrawal Coin</th>
                  <th>Withdrawal Amount</th>
                  <th>Account Number</th>
                  <th>Payment System</th>
                  <th>Withdrawal Status</th>
                  <th>Withdrawal Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((withdraw, idx) => (
                  <tr key={withdraw._id}>
                    <th>{idx + 1}</th>
                    <td>{withdraw.worker_name}</td>
                    <td>{withdraw.worker_email}</td>
                    <td>{withdraw.withdrawal_coin}</td>
                    <td>{withdraw.withdrawal_amount}</td>
                    <td>{withdraw.account_number}</td>
                    <td>{withdraw.payment_system}</td>
                    <td>{withdraw.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
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
