"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useEmail } from '../store/store';
import { useRouter } from 'next/navigation';

interface UserData {
  _id: string;
  name: string;
  email: string;
  GY: string;
  Uname: string;
  JobDesc: string;
}

const Display = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const {setEmail} = useEmail();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/RenderUser');
        // Assuming your API returns an object like { data: [ { ... }, { ... } ] }
        setUsers(response.data.data || []);
        setError(null);
      } catch (e: any) {
        console.error("Failed to fetch users:", e);
        setError("Failed to load users. Please check the server connection.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  }, []); // Empty dependency array means this runs only once on component mount

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="text-center py-8 text-gray-500">No users found.</div>;
  }

  const ToProfile = ({name, email, Uname, JobDesc}:any)=>{
    setEmail(name, email, Uname, JobDesc)
    console.log(name, email, Uname, JobDesc)
    router.push(`user/${Uname}`)
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 hover:cursor-pointer">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 text-center mb-10">
        Our <span className="text-indigo-600">Graduates</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div 
            onClick={() => {
              ToProfile({ name: user.name, email: user.email, Uname: user.Uname, JobDesc: user.JobDesc })
              
            }}
            key={user._id} 
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              {/* Profile Image */}
              <div className="flex justify-center mb-4">
                <img
                  // src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=EBF4FF&color=7F9CF5&size=128`}
                  src={`${user.Uname}.jpeg`}
                  alt={`${user.name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 truncate">{user.name}</h3>
              <p className="text-md text-gray-500 font-semibold mb-4">Class of {user.GY}</p>
              
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center">
                  <span className="font-semibold text-gray-600 w-24">Username:</span>
                  <span className="ml-2 font-medium">{user.Uname}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-600 w-24">Email:</span>
                  <span className="ml-2 truncate font-medium">{user.email}</span>
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-600">Job Description:</h4>
                <p className="mt-1 text-sm text-gray-700 line-clamp-3">
                  {user.JobDesc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Display