"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useVary } from '../store/store';
import { useRouter } from 'next/navigation';

interface UserData {
  _id: string;
  email: string;
  name: string;
  phone:string
  GY: string;
  Uname: string;
  JobDesc: string;
}

const Display = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const {setEmail} = useVary();


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

  const ToProfile = ({ name, email, phone, JobDesc, Uname }: {name: string, email: string, phone: string, JobDesc: string, Uname: string})=>{
    setEmail(email, name, phone, JobDesc, Uname)
    console.log(email,name, Uname, JobDesc)
    router.push(`user/${Uname}`)
  }

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 text-center mb-10">
        Our <span className="text-indigo-600">Graduates</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 hover:cursor-pointer ">
        {users.map((user) => (
          <div 
            onClick={() => ToProfile({
            name: user.name,
            email: user.email,
            phone: user.phone,
            JobDesc: user.JobDesc,
            Uname: user.Uname
          }
        )
      }
            key={user._id} 
            className="relative bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden group
                       transform transition-all duration-300 hover:scale-105group-hover:after:scale-[0.98]"
          >
            {/* The shine effect on hover */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute w-20 h-full bg-white transform -skew-x-12 opacity-0 -translate-x-full
                              transition-transform duration-500 ease-in-out
                              group-hover:opacity-50 group-hover:translate-x-full"></div>
            </div>

            <div className="relative z-20 p-6 flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="flex justify-center mb-4 transform transition-all duration-300 group-hover:scale-105">
                <img
                  src={`${user.Uname}.jpeg`}
                  alt={`${user.name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-black shadow-lg"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 truncate mb-1">{user.name}</h3>
              <p className="text-md text-gray-500 font-semibold mb-4">Class of {user.GY}</p>
              
              <div className="space-y-2 text-sm text-gray-700 w-full text-left">
                <p className="flex items-center">
                  <span className="font-semibold text-gray-600 w-24">Username:</span>
                  <span className="ml-2 font-medium">{user.Uname}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-600 w-24">Email:</span>
                  <span className="ml-2 truncate font-medium">{user.email}</span>
                </p>
              </div>

              <div className="mt-4 w-full text-left">
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