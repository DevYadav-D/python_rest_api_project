import React, { useState } from "react";

const GetSingleUser = () => {
  const [userId, setUserId] = useState(""); 
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);

  const handleFetchUser = async () => {
    try {
      setError(null); 
      const response = await fetch(`http://localhost:8000/users/${userId}`);
      const data = await response.json() 
      setUser(data); 
    } catch (err) {
      setError("User not found or error fetching data");
      setUser(null); 
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Get Single User</h2>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded-md w-full mb-4"
        />
        <button
          onClick={handleFetchUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
        >
          Fetch User
        </button>
      </div>
      {/* Display user data or error */}
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
      {user && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-bold">User Details</h3>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
        </div>
      )}
    </div>
  );
};

export default GetSingleUser;