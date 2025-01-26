import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useTasksQueries from "../../../Hooks/useTasksQueries";
import useSubmission from "../../../Hooks/useSubmission";

const HomeBuyer = () => {
  const axiosSecure = useAxiosSecure(); // Hook for making secure Axios requests
  const [tasks, refetch] = useTasksQueries(); // Fetch tasks
  const [submission, submissionRefetch] = useSubmission(); // Fetch submissions
  const [selectedSubmission, setSelectedSubmission] = useState(null); // State to store selected submission

  const pendingTask = tasks.reduce((sum, task) => {
    const requiredWorkers = parseInt(task.required_workers) || 0; // Convert to integer, fallback to 0 if invalid
    return sum + requiredWorkers;
  }, 0);

  const totalPayment = tasks.reduce(
    (sum, task) => sum + parseInt(task.payable_amount || 0),
    0
  );

  // View Submission
  const handleView = (id) => {
    const selected = submission.find((sub) => sub._id === id); // Find the selected submission
    setSelectedSubmission(selected);
    document.getElementById("my_modal_5").showModal(); // Open modal
  };

  // Approve Submission
  const handleApprove = async (id, worker_email) => {
    try {
      const response = await axiosSecure.patch("/worker/submission", {
        submission_id: id,
        worker_email,
      });
      if (response.status === 200) {
        alert("Submission approved and worker coins updated successfully!");
        submissionRefetch(); // Refetch submissions to update the table
      }
    } catch (error) {
      console.error("Error approving submission:", error);
      alert("Failed to approve submission. Please try again.");
    }
  };

  // Reject Submission
  const handleReject = async (id) => {
    try {
      const response = await axiosSecure.patch("/worker/rejection", {
        submission_id: id,
      });
      if (response.status === 200) {
        alert("Submission rejected and required workers updated successfully.");
        submissionRefetch(); // Refetch submissions
        refetch(); // Refetch tasks
      }
    } catch (error) {
      console.error("Error rejecting submission:", error);
      alert("Failed to reject the submission.");
    }
  };

  return (
    <div className="p-3">
      {/* Details */}
      <div className="flex justify-center my-10 gap-2 flex-wrap">
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Task</h2>
          <p className="text-[20px]">{tasks.length}</p>
        </div>
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Pending Task</h2>
          <p className="text-[20px]">Required Workers: {pendingTask}</p>
        </div>
        <div className="flex justify-start items-center flex-col space-y-2 p-2 border-2">
          <h2 className="text-2xl">Total Payment</h2>
          <p className="text-[20px]">${totalPayment}</p>
        </div>
      </div>

      {/* Table */}
      <div>
        <h2 className="text-2xl mb-3 underline">Tasks to review</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* Table Head */}
            <thead>
              <tr>
                <th></th>
                <th>Worker Name</th>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>View Submission</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {submission.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No task to review
                  </td>
                </tr>
              ) : (
                submission.map((submit, idx) => (
                  <tr key={submit._id}>
                    <th>{idx + 1}</th>
                    <td>{submit.worker_name}</td>
                    <td>{submit.task_title}</td>
                    <td>${submit.payable_amount}</td>
                    <td>
                      <button
                        onClick={() => handleView(submit._id)}
                        className="btn btn-primary"
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleApprove(submit._id, submit.worker_email)
                        }
                        className="btn btn-primary"
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleReject(submit._id)}
                        className="btn btn-primary"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        {selectedSubmission && (
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectedSubmission.task_title}
            </h3>
            <p className="py-4">
              Worker: {selectedSubmission.worker_name} <br />
              Payable Amount: ${selectedSubmission.payable_amount}
              <br />
              Submission Detail: {selectedSubmission.submission_details}
              <br />
              Submission Date: {selectedSubmission.current_date.split("T")[0]}
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* Button to close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default HomeBuyer;
