import React from "react";
import useTasks from "../../../Hooks/useTasks";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageTasks = () => {
  const [tasks, refetch] = useTasks();
  const axiosSecure = useAxiosSecure();

  const handleDeleteTask = async (id) => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms the deletion
    if (result.isConfirmed) {
      try {
        // Make API call to delete the task
        const response = await axiosSecure.delete(`/tasks/${id}`);

        if (response.status === 200) {
          // Show success alert
          Swal.fire({
            title: "Deleted!",
            text: "The task has been deleted.",
            icon: "success",
          });
          refetch(); // Re-fetch tasks to update the list
        }
      } catch (error) {
        // Show error alert
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the task.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="p-3">
      {tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Task Detail</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Required Workers</th>
                <th>Payable Amount</th>
                <th>Submission Info</th>
                <th>Completion Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id}>
                  <th>{idx + 1}</th>
                  <td>{task.task_title}</td>
                  <td>{task.task_detail}</td>
                  <td>{task.buyerName}</td>
                  <td>{task.email}</td>
                  <td>{task.required_workers}</td>
                  <td>{task.payable_amount}</td>
                  <td>{task.submission_info}</td>
                  <td>{task.completion_date}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Show "No tasks found" if there are no tasks
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl font-bold">No tasks found</h2>
          <p className="mt-2">You don't have any tasks to manage at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
