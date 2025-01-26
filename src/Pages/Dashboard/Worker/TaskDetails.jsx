import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import useAxiosSecure from '../../../Hooks/useAxiosSecure'; // Custom Axios hook
import useDbUser from '../../../Hooks/useDbUser';

const TaskDetails = () => {
  const { id } = useParams(); // Get taskId from the route
  const axiosSecure = useAxiosSecure(); // Secure Axios instance
  const [task, setTask] = useState(null); // State to store task details
  const [submissionDetails, setSubmissionDetails] = useState(''); // State to store submission details (textarea)
  const [loading, setLoading] = useState(true); // Loading state
  const [success, setSuccess] = useState(null); // State to store success or error messages
    const [, currentUser, refetch] = useDbUser()
  // Fetch task details on component mount
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosSecure.get(`/tasks/${id}`); // Fetch task by ID
        setTask(response.data); // Update task state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTaskDetails();
  }, [id, axiosSecure]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: currentUser.email, // Replace with worker's email (this could come from a logged-in user)
      submission_details: submissionDetails,
      worker_name: currentUser.name, // Replace with worker's name
      buyer_name: task.buyerName,
      buyer_email: task.email, // Replace with buyer's email (this can come from task data)
      current_date: new Date().toISOString(),
      status: 'pending',
    };

    try {
      // Send the submission data to the backend
      await axiosSecure.post('/submissions', submissionData);
      setSuccess('Submission successful!');
      setSubmissionDetails(''); // Clear textarea after submission
    } catch (error) {
      console.error('Error submitting task:', error);
      setSuccess('Submission failed!');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  if (!task) {
    return <p>Task not found</p>; // Show error message if task is not found
  }

  return (
    <div className="p-6">
      <div className="card p-6 shadow-lg rounded-lg bg-white">
        {/* Task Image */}
        {task.image && (
          <img
            src={task.image}
            alt={task.task_title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* Task Details */}
        <h1 className="text-2xl font-bold mb-4">{task.task_title}</h1>
        <p className="mb-2">
          <strong>Buyer:</strong> {task.buyerName}
        </p>
        <p className="mb-2">
          <strong>Completion Date:</strong> {task.completion_date}
        </p>
        <p className="mb-2">
          <strong>Payable Amount:</strong> ${task.payable_amount}
        </p>
        <p className="mb-2">
          <strong>Required Workers:</strong> {task.required_workers}
        </p>
        <p className="mb-2">
          <strong>Description:</strong> {task.task_detail}
        </p>
        <p className="mb-2">
          <strong>Submission Info:</strong> {task.submission_info}
        </p>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            name="submission_details"
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your submission details..."
            required
          />
          <button type="submit" className="btn btn-primary mt-4">Submit Task</button>
        </form>

        {/* Success/Error Message */}
        {success && <p className="mt-4 text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default TaskDetails;
