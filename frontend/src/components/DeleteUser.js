import React, { useState } from "react";

const DeleteUser = () => {
  // State to manage the user ID input
  const [userId, setUserId] = useState("");
  // State to manage errors
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setError(null); // Clear previous errors
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE", // DELETE method for deleting the user
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully!");
      setUserId(""); // Reset the user ID input field
    } catch (err) {
      setError("Failed to delete user. Please check the user ID.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Delete User</h2>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded-md w-full mb-4"
        />
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
        >
          Delete User
        </button>
      </div>
      {/* Display error message */}
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;