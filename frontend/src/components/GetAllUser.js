import React, { useState, useEffect } from "react";


const GetAllUser = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [error, setError] = useState(null); // State to handle errors

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/"); 
        const data = await response.json()
        setUsers(data); // Set user data
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">All Users</h2>
      {error && (
        <div className="text-red-500 my-4">
          <p>{error}</p>
        </div>
      )}
      {users.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.first_name}</td>
                <td className="border border-gray-300 p-2">{user.last_name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No users found</p>
      )}
    </div>
  );
};

export default GetAllUser;