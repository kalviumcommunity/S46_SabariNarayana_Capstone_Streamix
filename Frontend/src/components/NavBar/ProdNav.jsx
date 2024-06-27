import React, { useState } from 'react';
import axios from 'axios';
import { useSignals } from '@preact/signals-react/runtime';
import { checkUser } from '../../signals/user';

export const StartedForm = () => {
  useSignals();

  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    youtubeChannel: '',
    youtubeApiKey: '',
    inviteKey: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (role === 'admin' && !formData.youtubeChannel) {
      newErrors.youtubeChannel = 'YouTube Channel Name is required';
    }
    if (role === 'admin' && !formData.youtubeApiKey) {
      newErrors.youtubeApiKey = 'YouTube API Key is required';
    }
    if (role === 'editor' && !formData.inviteKey) {
      newErrors.inviteKey = 'Invite Key is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setFormData({
      username: '',
      youtubeChannel: '',
      youtubeApiKey: '',
      inviteKey: '',
      role: selectedRole
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_HOST}/api/auth/emrollment`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      checkUser();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='w-full h-full flex justify-center '>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8  justify-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Started</h2>

      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={handleRoleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${errors.username ? 'border-red-500' : 'focus:ring-blue-500'}`}
        />
        {errors.username && <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>}
      </div>

      {role === 'admin' && (
        <>
          <div className="mb-4">
            <label htmlFor="youtubeChannel" className="block text-gray-700 text-sm font-bold mb-2">YouTube Channel Name</label>
            <input
              id="youtubeChannel"
              type="text"
              name="youtubeChannel"
              placeholder="YouTube Channel Name"
              value={formData.youtubeChannel}
              onChange={handleChange}
              className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${errors.youtubeChannel ? 'border-red-500' : 'focus:ring-blue-500'}`}
            />
            {errors.youtubeChannel && <p className="text-red-500 text-xs italic mt-1">{errors.youtubeChannel}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="youtubeApiKey" className="block text-gray-700 text-sm font-bold mb-2">YouTube API Key</label>
            <input
              id="youtubeApiKey"
              type="text"
              name="youtubeApiKey"
              placeholder="YouTube API Key"
              value={formData.youtubeApiKey}
              onChange={handleChange}
              className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${errors.youtubeApiKey ? 'border-red-500' : 'focus:ring-blue-500'}`}
            />
            {errors.youtubeApiKey && <p className="text-red-500 text-xs italic mt-1">{errors.youtubeApiKey}</p>}
          </div>
        </>
      )}

      {role === 'editor' && (
        <div className="mb-6">
          <label htmlFor="inviteKey" className="block text-gray-700 text-sm font-bold mb-2">Invite Key</label>
          <input
            id="inviteKey"
            type="text"
            name="inviteKey"
            placeholder="Invite Key"
            value={formData.inviteKey}
            onChange={handleChange}
            className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${errors.inviteKey ? 'border-red-500' : 'focus:ring-blue-500'}`}
          />
          {errors.inviteKey && <p className="text-red-500 text-xs italic mt-1">{errors.inviteKey}</p>}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500">
          Submit
        </button>
      </div>
    </form>
  </div></div>
    
  );
};