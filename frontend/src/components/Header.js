import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold ">User CRUD Application</h1>
      <div className="flex items-center">
      <nav className="flex gap-4">
        {/* Navigation Links */}
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/create-user" className="hover:underline">
          Create User
        </Link>
        <Link to="/get-all-users" className="hover:underline">
          Get All Users
        </Link>
        <Link to="/get-single-user" className="hover:underline">
          Get Single User
        </Link>
        <Link to="/update-user" className="hover:underline">
          Update User
        </Link>
        <Link to="/delete-user" className="hover:underline">
          Delete User
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </nav>

      </div>

      {/* <nav className="flex gap-4">
        <Link to="/create-user" className="hover:underline">
          Create User
        </Link>
        <Link to="/update-user" className="hover:underline">
          Update User
        </Link>
        <Link to="/delete-user" className="hover:underline">
          Delete User
        </Link>
        <Link to="/get-users" className="hover:underline">
          Get All Users
        </Link>
      </nav> */}
    </header>
  );
};

export default Header;