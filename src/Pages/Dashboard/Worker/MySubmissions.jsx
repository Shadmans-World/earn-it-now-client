import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'; // Custom Axios hook
import useDbUser from '../../../Hooks/useDbUser';

const MySubmissions = () => {
    const [, currentUser] = useDbUser()
    const axiosSecure = useAxiosSecure(); // Secure Axios instance
    const [submissions, setSubmissions] = useState([]); // State to store submissions
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const workerEmail = currentUser.email; // This should come from your authentication context or a logged-in user (use context to access current user)

    // Fetch the worker's submissions
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axiosSecure.get(`/submissions?worker_email=${workerEmail}`); // Send the workerEmail as query parameter
                setSubmissions(response.data); // Update state with submissions
                setLoading(false); // Set loading to false after fetching
            } catch (err) {
                console.error('Error fetching submissions:', err);
                setError('Failed to load submissions'); // Set error message if request fails
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchSubmissions();
    }, [workerEmail, axiosSecure]);

    // Render loading state or error message
    if (loading) {
        return <p>Loading submissions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Render submissions table
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
            {submissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Task Title</th>
                            <th className="border px-4 py-2">Payable Amount</th>
                            <th className="border px-4 py-2">Submission Details</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Submission Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (
                            <tr key={submission._id}>
                                <td className="border px-4 py-2">{submission.task_title}</td>
                                <td className="border px-4 py-2">${submission.payable_amount}</td>
                                <td className="border px-4 py-2">{submission.submission_details}</td>
                                <td
                                    className={`border px-4 py-2 ${
                                        submission.status === 'pending'
                                            ? 'bg-yellow-200'
                                            : submission.status === 'approved'
                                            ? 'bg-green-200'
                                            : 'bg-red-200'
                                    }`}
                                >
                                    {submission.status}
                                </td>
                                <td className="border px-4 py-2">{new Date(submission.current_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MySubmissions;
