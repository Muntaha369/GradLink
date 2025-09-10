"use client";

import React, { useState } from 'react';

import { useEdit } from '../store/store';

/**
 * @param {object} props - The component props.
 * @param {object} props.user - The user object containing current data (e.g., { phone, JobDesc }).
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {function} props.onSave - Function to call with the updated data when the user saves.
 */
const EditProfile = ({ user, onClose, onSave }:any) => {
    // Initialize state with the current user's data passed in as props
    const [phone, setPhone] = useState(user?.phone || '');
    const [description, setDescription] = useState(user?.about || '');

    const handleSave = (e:any) => {
        e.preventDefault();
        onSave({
            phone,
            about: description, // Assuming the 'about' field corresponds to 'JobDesc'
        });
        onClose(); // Close the modal after saving
    };

    // Prevent modal from closing when clicking inside the content area
    const handleModalContentClick = (e:any) => {
        e.stopPropagation();
    };

    const {setEditInfo} = useEdit()

    return (
        // Modal Backdrop: Covers the entire screen with a semi-transparent overlay.
        // The `onClick={onClose}` allows closing the modal by clicking outside the form.
        <div 
            className=""
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className=""
                onClick={handleModalContentClick}
                style={{'--animation-duration': '0.3s'} as React.CSSProperties}
            >

                <form onSubmit={handleSave}>
                    {/* Phone Number Input */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone No
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="mb-8">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description (About)
                        </label>
                        <textarea
                            id="description"
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Tell us a little about yourself"
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            
            {/* We can add simple keyframe animations directly in a style tag */}
            <style jsx global>{`
                @keyframes fade-in-scale {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale var(--animation-duration, 0.3s) forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
            `}</style>
        </div>
    );
};

export default EditProfile;