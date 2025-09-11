"use client";

import React, { useState } from 'react';
import { useEmail } from '../store/store';
import axios from 'axios';


function EditProfile() {
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const { email, name, Uname, setEmail } = useEmail();

    const handleSave = (e: any) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/Edit', {
            email,
            phone,
            JobDesc: description
        });

        setEmail(email, name, phone, description, Uname);

        console.log(email, name, phone, description, Uname);

    };


    return (
        <div
            className=""
        >
            <div
                className=""
                style={{ '--animation-duration': '0.3s' } as React.CSSProperties}
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
                            placeholder="Enter your phone number" />
                    </div>

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

                    <div className="flex justify-end space-x-4">

                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

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
}

export default EditProfile;