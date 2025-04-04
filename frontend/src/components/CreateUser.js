import React, { useState } from "react";

const CreateUser = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    first_name: "", // Updated field name
    last_name: "", // Updated field name
    email: "",
    age: "",
    password: "",
  });

  // State to manage errors
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      setError(null); // Clear previous errors
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age, 10), // Ensure age is a number
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json(); // Parse response data
      alert("User created successfully!");
      console.log(data); // Log response from backend

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        password: "",
      }); // Reset form
    } catch (err) {
      setError("Failed to create user. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name" // Updated field name
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name" // Updated field name
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Email */}
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
            required
          />
        </div>
        {/* Age */}
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
            required
          />
        </div>
        {/* Password */}
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
        >
          Submit
        </button>
      </form>
      {/* Display error message */}
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateUser;