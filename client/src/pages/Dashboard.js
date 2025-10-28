import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Your Task Dashboard</h2>
        <TaskForm onTaskCreated={() => setRefresh(!refresh)} />
        <TaskList key={refresh} />
      </div>
    </div>
  );
}

export default Dashboard;