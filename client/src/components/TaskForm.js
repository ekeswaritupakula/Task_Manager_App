import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      toast.success('Task created!');
      setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
      onTaskCreated();
    } catch (err) {
      toast.error('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid gap-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;