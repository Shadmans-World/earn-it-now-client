import React, { useState } from "react";
import useDbUser from "../../../Hooks/useDbUser";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageAdmin = () => {
  const [dbUsers, , refetch] = useDbUser();
  const axiosSecure = useAxiosSecure();
  const [modalContent, setModalContent] = useState(null); // For modal content
  const [isModalOpen, setModalOpen] = useState(false); // To control modal visibility

  const truncateLink = (link, charLimit = 10) => {
    return link.length > charLimit ? `${link.slice(0, charLimit)}...` : link;
  };

  const openModal = (link) => {
    setModalContent(link); // Set the link to display in the modal
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setModalContent(null); // Clear modal content
  };

  // Handle deleting a user with confirmation
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${userId}`);
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
        });
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error",
        });
      }
    }
  };

  // Handle updating the user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}`, { role: newRole });
      if (response.status === 200) {
        alert("User role updated");
        refetch();
      } else {
        alert("Failed to update user role");
      }
    } catch (error) {
      alert("Error updating role");
    }
  };

  return (
    <div className="p-3">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Photo</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Coin</th>
              <th className="border px-4 py-2">Delete User</th>
              <th className="border px-4 py-2">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {dbUsers.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">{idx + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {truncateLink(user.profilePhoto)}{" "}
                  {user.profilePhoto.length > 10 && (
                    <button
                      className="text-blue-500 underline"
                      onClick={() => openModal(user.profilePhoto)}
                    >
                      See More
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2 uppercase">{user.role}</td>
                <td className="border px-4 py-2">{user?.coins || 0}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="text-red-500 btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <select
                    className="border p-1 rounded"
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="worker">Worker</option>
                    <option value="buyer">Buyer</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Full Profile Photo URL</h2>
            <p className="text-gray-700 break-words">{modalContent}</p>
            <div className="mt-5 flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmin;
