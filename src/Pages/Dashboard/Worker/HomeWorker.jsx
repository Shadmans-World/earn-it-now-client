import React from "react";
import useWorkerPending from "../../../Hooks/useWorkerPending";

const HomeWorker = () => {
  const [workerPending, refetch] = useWorkerPending();

  // Filter pending tasks and approved submissions
  const pendingSubmission = workerPending.filter(pending => pending.status === 'pending');
  const approvedSubmissions = workerPending.filter(approved => approved.status === 'approved');

  // Calculate total earnings
  const totalEarning = approvedSubmissions.reduce(
    (sum, earning) => sum + parseInt(earning.payable_amount),
    0
  );

  return (
    <div className="p-3">
      {/* Statistics Section */}
      <div className="flex justify-center my-10 gap-2 flex-wrap">
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Submissions</h2>
          <p className="text-[20px]">{workerPending.length}</p>
        </div>
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Pending Task</h2>
          <p className="text-[20px]">{pendingSubmission.length}</p>
        </div>
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Earning</h2>
          <p className="text-[20px]">${totalEarning}</p>
        </div>
      </div>

      {/* Approved Submissions Section */}
      <div className="my-10">
        <h2 className="text-2xl text-center font-bold mb-5">Approved Submissions</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Task Title</th>
              <th className="border border-gray-300 p-2">Payable Amount</th>
              <th className="border border-gray-300 p-2">Buyer Name</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((submission, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{submission.task_title}</td>
                <td className="border border-gray-300 p-2">${submission.payable_amount}</td>
                <td className="border border-gray-300 p-2">{submission.buyer_name}</td>
                <td className="border border-gray-300 p-2">{submission.status}</td>
              </tr>
            ))}
            {approvedSubmissions.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-3">
                  No approved submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeWorker;
