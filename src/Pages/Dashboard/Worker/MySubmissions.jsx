import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // Custom Axios hook
import useDbUser from "../../../Hooks/useDbUser";

const MySubmissions = () => {
    const [, currentUser] = useDbUser();
    const axiosSecure = useAxiosSecure(); // Secure Axios instance
    const [submissions, setSubmissions] = useState([]); // State to store submissions
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [itemsPerPage] = useState(5); // Number of items per page
    const workerEmail = currentUser.email;

    // Fetch the worker's submissions
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axiosSecure.get(
                    `/submissions?worker_email=${workerEmail}`
                );
                setSubmissions(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching submissions:", err);
                setError("Failed to load submissions");
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [workerEmail, axiosSecure]);

    // Calculate pagination
    const totalItems = submissions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubmissions = submissions.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Render loading state or error message
    if (loading) {
        return <p>Loading submissions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Render submissions table with pagination
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
            {submissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <div>
                    {/* Responsive Table Wrapper */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 text-left">Task Title</th>
                                    <th className="border px-4 py-2 text-left">Payable Amount</th>
                                    <th className="border px-4 py-2 text-left">
                                        Submission Details
                                    </th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">
                                        Submission Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSubmissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">
                                            {submission.task_title}
                                        </td>
                                        <td className="border px-4 py-2">
                                            ${submission.payable_amount}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {submission.submission_details}
                                        </td>
                                        <td
                                            className={`border px-4 py-2 capitalize ${
                                                submission.status === "pending"
                                                    ? "bg-yellow-200"
                                                    : submission.status === "approved"
                                                    ? "bg-green-200"
                                                    : "bg-red-200"
                                            }`}
                                        >
                                            {submission.status}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {new Date(
                                                submission.current_date
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`px-3 py-1 border rounded ${
                                    currentPage === index + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySubmissions;
