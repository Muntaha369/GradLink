"use client"

import { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

export default function GradlinkLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    if (formData.email && formData.password) {
      console.log('Form submitted successfully!');
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
      console.log('Remember me:', formData.rememberMe);
      
      // Here you would add your API call
      
      fetch('http://localhost:3000/api/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          pass: formData.password
        })
      }).then(response => response.json())
        .then(data => console.log('Login successful!', data))
        .catch(error => console.error('Login failed!', error));
      
    } else {
      console.log('Please fill out all fields.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row border border-gray-200">
        
        {/* Left Column: Branding and Description */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center bg-gray-900 text-white md:rounded-l-2xl md:rounded-tr-none rounded-t-2xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white">Gradlink</h1>
          <p className="mt-4 text-xl lg:text-2xl font-light text-gray-300">
            Connect. Engage. Thrive.
          </p>
          <p className="mt-2 text-sm text-gray-400 max-w-sm">
            Your alumni management and engagement platform.
          </p>
          <div className="mt-8 flex justify-center items-center">
            <ClipboardCheck 
              size={100} 
              className="text-yellow-400" 
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center">Sign In</h2>
          <p className="mt-2 text-center text-gray-600">to continue to your network</p>

          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full text-black px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full text-black px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out hover:cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}