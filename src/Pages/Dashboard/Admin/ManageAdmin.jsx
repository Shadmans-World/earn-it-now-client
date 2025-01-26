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
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
  
    // If the user confirms deletion
    if (result.isConfirmed) {
      try {
        // Make API call to delete the user
        await axiosSecure.delete(`/users/${userId}`);
        
        // Show success alert
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success"
        });
        
        refetch(); // Re-fetch users after deletion
      } catch (error) {
        // Show failure alert if deletion fails
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error"
        });
      }
    }
  };
  

  // Handle updating the user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}`, { role: newRole }); // API call to update role
      if (response.status === 200) {
        alert('User role updated');
        refetch(); // Re-fetch users after role update
      } else {
        alert('Failed to update user role');
      }
    } catch (error) {
      alert('Error updating role');
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Role</th>
              <th>Coin</th>
              <th>Delete User</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {dbUsers.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
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
                <td className="uppercase">{user.role}</td>
                <td>{user?.coins || 0}</td>
                <td>
                  <button
                    className="text-red-500 btn"
                    onClick={() => handleDelete(user._id)} // Delete user
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>
                  <select
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)} // Update role
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
          <div className="bg-white p-5 rounded-md w-1/3">
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
