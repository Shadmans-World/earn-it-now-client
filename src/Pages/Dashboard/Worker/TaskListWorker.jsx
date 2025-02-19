import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTasks from "../../../Hooks/useTasks";

const TaskListWorker = () => {
  const [tasks] = useTasks();
  const [sortOrder, setSortOrder] = useState("desc"); // Default: Highest first

  // Filter tasks that have required workers
  const availableTasks = tasks.filter((task) => task.required_workers > 0);

  // Sorting logic
  const sortedTasks = [...availableTasks].sort((a, b) =>
    sortOrder === "asc"
      ? a.payable_amount - b.payable_amount
      : b.payable_amount - a.payable_amount
  );

  return (
    <div className="p-6">
      {/* Sort Button */}
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Payable Amount ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          sortedTasks.map((task) => (
            <div key={task._id} className="card p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-xl font-semibold">{task.task_title}</h3>
              <p>
                <strong>Buyer:</strong> {task.buyerName}
              </p>
              <p>
                <strong>Completion Date:</strong> {task.completion_date}
              </p>
              <p>
                <strong>Payable Amount:</strong> ${task.payable_amount}
              </p>
              <p>
                <strong>Required Workers:</strong> {task.required_workers}
              </p>

              <Link to={`/dashboard/taskDetails/${task._id}`}>
                <button className="btn btn-primary">See More Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListWorker;
