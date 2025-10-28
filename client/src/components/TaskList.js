import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    try {
      await API.put(`/tasks/${id}`, { isCompleted: !task.isCompleted });
      toast.success('Task updated');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'incomplete') return !task.isCompleted;
    return true;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <button onClick={() => setFilter('all')} className="px-3 py-1 bg-gray-300 rounded">All</button>
        <button onClick={() => setFilter('completed')} className="px-3 py-1 bg-green-300 rounded">Completed</button>
        <button onClick={() => setFilter('incomplete')} className="px-3 py-1 bg-red-300 rounded">Incomplete</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">Priority: {task.priority}</p>
            <p className="text-sm text-gray-600">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}</p>
            <button
              onClick={() => toggleComplete(task._id)}
              className={`mt-2 px-3 py-1 rounded ${task.isCompleted ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
            >
              {task.isCompleted ? 'Mark Incomplete' : 'Mark Completed'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;