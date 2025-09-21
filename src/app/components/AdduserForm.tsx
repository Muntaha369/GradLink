'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define an interface for the form data's shape for type safety
interface FormDataState {
  name: string;
  uname: string;
  email: string;
  pass: string;
  phone: string;
  gy: string;
  jobdesc: string;
}

// A default placeholder SVG for the user image
const placeholderSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-user-round text-gray-400"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.685A3.09 3.09 0 0 1 10 17h4a3.09 3.09 0 0 1 3 2.685" />
  </svg>
);

// Define the component as a React Functional Component
const AddUserForm: React.FC = () => {
  const initialFormData: FormDataState = {
    name: '',
    uname: '',
    email: '',
    pass: '',
    phone: '',
    gy: '',
    jobdesc: '',
  };

  // State for all form fields, typed with our interface
  const [formData, setFormData] = useState<FormDataState>(initialFormData);

  // State for the uploaded image file and its preview URL
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State to show a success message
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Generic handler for text-based inputs, with typed event
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for the image file input, with typed event
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining for safety
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result is a string, so we cast it
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for form submission, with typed event
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create a FormData object to send to an API
    const submissionData = new FormData();
    // Loop over formData keys in a type-safe way
    Object.keys(formData).forEach(key => {
        submissionData.append(key, formData[key as keyof FormDataState]);
    });

    if (imageFile) {
      submissionData.append('profileImage', imageFile);
    }
    
    // For demo purposes, we'll just log the data.
    console.log('Form Submitted!');
    for (let [key, value] of submissionData.entries()) {
        console.log(`${key}:`, value);
    }

    // Show success message and reset the form
    setIsSuccess(true);
    setTimeout(() => {
      setFormData(initialFormData);
      setImageFile(null);
      setImagePreview(null);
      setIsSuccess(false);
    }, 3000); // Reset after 3 seconds
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
          <p className="mt-2 text-sm text-gray-600">Fill out the form to create a new user account.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Image Upload and Preview Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-center">Profile Picture</label>
            <div className="mt-2 flex justify-center">
              <label htmlFor="imageUpload" className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                    {placeholderSVG}
                  </div>
                )}
              </label>
              <input type="file" id="imageUpload" name="profileImage" accept="image/*" onChange={handleImageChange} className="sr-only" />
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">Click image to upload a new one</p>
          </div>

          {/* Text Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="uname" className="text-sm font-medium text-gray-700">Username</label>
              <input id="uname" name="uname" type="text" value={formData.uname} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="johndoe88" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="pass" className="text-sm font-medium text-gray-700">Password</label>
              <input id="pass" name="pass" type="password" value={formData.pass} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="+91 12345 67890" />
            </div>
            <div>
              <label htmlFor="gy" className="text-sm font-medium text-gray-700">Graduation Year</label>
              <input id="gy" name="gy" type="number" value={formData.gy} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="2025" min="1950" max="2050" />
            </div>
          </div>
          
          <div>
            <label htmlFor="jobdesc" className="text-sm font-medium text-gray-700">Job Description</label>
            <textarea id="jobdesc" name="jobdesc" rows={3} value={formData.jobdesc} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Software Engineer..."></textarea>
          </div>
          
          <div>
            <button type="submit" className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create User Account
            </button>
          </div>
        </form>

        {/* Success Message */}
        {isSuccess && (
          <div className="mt-4 text-center p-4 text-sm text-green-800 rounded-lg bg-green-100" role="alert">
            <span className="font-medium">Success!</span> User account has been created.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserForm;