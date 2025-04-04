import React, { useState } from "react";

const Login = () => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage errors or messages
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
      setMessage(null); // Clear previous messages
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Invalid credentials");
      }
  
      const data = await response.json(); // Backend response
      console.log("Backend Response:", data); // Log response to inspect structure
  
      // Access first_name safely
      const firstName = data?.user?.first_name || "User";
      alert("Login successful!");
      setMessage(`Welcome back, ${firstName}!`);
  
      setFormData({
        email: "",
        password: "",
      }); // Reset form
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error(err);
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
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
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Password Field */}
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
            placeholder="Enter your password"
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
        >
          Login
        </button>
      </form>
      {/* Display error or success message */}
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
      {message && (
        <div className="text-green-500 mt-4">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Login;