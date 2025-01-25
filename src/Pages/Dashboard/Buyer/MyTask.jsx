import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import useTasksQueries from "../../../Hooks/useTasksQueries";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDbUser from "../../../Hooks/useDbUser";

const MyTask = () => {
  const [, , dbUserRefetch] = useDbUser();
  const [tasks, refetch] = useTasksQueries();
  const axiosSecure = useAxiosSecure();
  const [editingTask, setEditingTask] = useState(null);  // State for editing task

  // Handle Edit Task - Show modal and set task data for editing
  const handleEditTask = (task) => {
    setEditingTask(task);
    document.getElementById("my_modal_5").showModal();  // Open modal
  };

  // Handle Save Task - Save the updated task
  const handleSaveTask = async () => {
    try {
      const res = await axiosSecure.patch(`/tasks/${editingTask._id}`, {
        task_title: editingTask.task_title,
        task_detail: editingTask.task_detail,
        submission_info: editingTask.submission_info,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Task updated successfully", "success");
        refetch();
        dbUserRefetch();
        setEditingTask(null);  // Close modal
        document.getElementById("my_modal_5").close();  // Close modal
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire("Error", "Failed to update task", "error");
    }
  };

  // Handle Delete Task
  const handleDeleteTask = async (taskId, isCompleted, refillAmount) => {
    try {
      const res = await axiosSecure.delete(`/tasks/${taskId}`);
      if (res.data.deletedCount > 0) {
        if (!isCompleted) {
          await axiosSecure.patch(`/users/refill`, { refillAmount });
        }
        Swal.fire("Deleted!", "Task has been deleted.", "success");
        refetch();
        dbUserRefetch();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire("Error", "Failed to delete task", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Details</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Completion Time</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {tasks
              ?.sort(
                (a, b) =>
                  new Date(b.completion_date) - new Date(a.completion_date)
              )
              .map((task, idx) => {
                const refillAmount =
                  task.required_workers * task.payable_amount;
                return (
                  <tr key={task._id}>
                    <th>{idx + 1}</th>
                    <td>{task.task_title}</td>
                    <td>{task.task_detail}</td>
                    <td>{task.required_workers}</td>
                    <td>${task.payable_amount}</td>
                    <td>{task.completion_date}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditTask(task)}  // Open modal on edit
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDeleteTask(
                                task._id,
                                task.is_completed,
                                refillAmount
                              );
                            }
                          })
                        }
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box p-6 rounded-lg shadow-lg bg-white">
    <h2 className="text-xl font-semibold mb-6 text-center">Update Task</h2>
    <div className="flex flex-col space-y-4">
      {/* Task Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
        <input
          type="text"
          value={editingTask?.task_title || ""}
          onChange={(e) =>
            setEditingTask((prev) => ({
              ...prev,
              task_title: e.target.value,
            }))
          }
          className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter task title"
        />
      </div>

      {/* Task Detail */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Task Detail</label>
        <textarea
          value={editingTask?.task_detail || ""}
          onChange={(e) =>
            setEditingTask((prev) => ({
              ...prev,
              task_detail: e.target.value,
            }))
          }
          className="textarea textarea-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Describe the task in detail"
        />
      </div>

      {/* Task Submission Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Submission Info</label>
        <textarea
          value={editingTask?.submission_info || ""}
          onChange={(e) =>
            setEditingTask((prev) => ({
              ...prev,
              submission_info: e.target.value,
            }))
          }
          className="textarea textarea-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Provide any additional submission instructions"
        />
      </div>
    </div>

    <div className="modal-action flex justify-between items-center mt-6">
      {/* Save Button */}
      <button
        className="btn btn-primary px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition"
        onClick={handleSaveTask}
      >
        Save
      </button>

      {/* Cancel Button */}
      <button
        className="btn px-6 py-2 rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none transition"
        onClick={() => {
          setEditingTask(null);  // Reset editing task
          document.getElementById("my_modal_5").close();  // Close modal
        }}
      >
        Cancel
      </button>
    </div>
  </div>
</dialog>

    </div>
  );
};

export default MyTask;
