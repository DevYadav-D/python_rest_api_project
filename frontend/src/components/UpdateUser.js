import React, { useState } from "react";

const UpdateUser = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    id: "", // ID of the user to update
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  // State for error handling
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchUserDetails = async () => {
    try {
      setError(null); // Reset errors
      const response = await fetch(`http://localhost:8000/users/${formData.id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json(); // Existing user details
      setFormData({
        id: formData.id, // Keep the existing ID
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        age: data.age.toString(), // Convert age to string for the input field
        password: "", // Keep password empty for security reasons
      });
    } catch (err) {
      setError("User not found or error fetching details.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      setError(null); // Reset errors
      const response = await fetch(`http://localhost:8000/users/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          age: parseInt(formData.age, 10),
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json(); // Response from the backend
      alert("User updated successfully!");
      console.log(data); // Log response
      setFormData({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        password: "",
      }); // Reset form
    } catch (err) {
      setError("Failed to update user. Please check the user ID and data.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Update User</h2>
      {/* Fetch user details */}
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="Enter User ID"
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          onClick={fetchUserDetails}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
        >
          Fetch User Details
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
      {/* Update user details form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter Age"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;