import React from "react";
import useTasks from "../../../Hooks/useTasks";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageTasks = () => {
  const [tasks, refetch] = useTasks();
  const axiosSecure = useAxiosSecure();

  // Handle task deletion with confirmation
  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/tasks/${id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "The task has been deleted.",
            icon: "success",
          });
          refetch();
        }
      } catch (error) {
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
          <table className="table-auto w-full border-collapse border border-gray-300">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Task Title</th>
                <th className="border px-4 py-2">Task Detail</th>
                <th className="border px-4 py-2">Buyer Name</th>
                <th className="border px-4 py-2">Buyer Email</th>
                <th className="border px-4 py-2">Required Workers</th>
                <th className="border px-4 py-2">Payable Amount</th>
                <th className="border px-4 py-2">Submission Info</th>
                <th className="border px-4 py-2">Completion Date</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{idx + 1}</td>
                  <td className="border px-4 py-2">{task.task_title}</td>
                  <td className="border px-4 py-2">{task.task_detail}</td>
                  <td className="border px-4 py-2">{task.buyerName}</td>
                  <td className="border px-4 py-2">{task.email}</td>
                  <td className="border px-4 py-2">{task.required_workers}</td>
                  <td className="border px-4 py-2">{task.payable_amount}</td>
                  <td className="border px-4 py-2">{task.submission_info}</td>
                  <td className="border px-4 py-2">{task.completion_date}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-500 bg-gray-200 rounded p-2 hover:bg-red-500 hover:text-white transition"
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
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl font-bold">No tasks found</h2>
          <p className="mt-2">You don't have any tasks to manage at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
