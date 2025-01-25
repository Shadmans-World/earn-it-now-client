import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import useTasks from '../../../Hooks/useTasks'; 

const TaskListWorker = () => {
    const [tasks, refetch] = useTasks(); 
    const navigate = useNavigate();

    const availableTasks = tasks.filter(task => task.required_workers > 0);

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTasks.length === 0 ? (
                <p>No tasks available</p> // Display message if no tasks are found
            ) : (
                availableTasks.map((task) => (
                    <div key={task._id} className="card p-4 shadow-lg rounded-lg bg-white">
                        <h3 className="text-xl font-semibold">{task.task_title}</h3>
                        <p><strong>Buyer:</strong> {task.buyerName}</p>
                        <p><strong>Completion Date:</strong> {task.completion_date}</p>
                        <p><strong>Payable Amount:</strong> ${task.payable_amount}</p>
                        <p><strong>Required Workers:</strong> {task.required_workers}</p>

                        <Link to={`/dashboard/taskDetails/${task._id}`}>
                            <button className="btn btn-primary">See More Details</button>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskListWorker;
