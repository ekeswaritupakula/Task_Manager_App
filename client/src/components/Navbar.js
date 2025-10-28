// components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;