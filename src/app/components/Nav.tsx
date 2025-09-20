"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useEmail } from '../store/store';
import { useRouter } from 'next/navigation';
import { useRole } from '../store/store';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);



export default function App() {
    
    const router = useRouter()

    const{ role }=useRole()
    const {email, name, phone, JobDesc, Uname, setEmail}=useEmail()
    const [oneChar, setOneChar] = useState(email.charAt(0).toUpperCase() || "!")
    const [userRole, setUserRole] = useState<string | null>('')

    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const ClearStore = ()=>{
        localStorage.clear()
        router.push('/login')
    }
    
    useEffect(()=>{

        const storageRole = localStorage.getItem('role')
        if(!storageRole){
        localStorage.setItem('role',`${role}`)
        }

        setUserRole(storageRole)


        const storageEmail = localStorage.getItem('email') ;
        const storageName = localStorage.getItem('name') ;
        const storagePhone = localStorage.getItem('phone') ;
        const storageJobDesc = localStorage.getItem('JobDesc') ;
        const storageUname = localStorage.getItem('Uname')

        setOneChar(storageEmail?.charAt(0).toUpperCase() || "!")

        setEmail(storageEmail, storageName, storagePhone, storageJobDesc, storageUname)

        if(!storageEmail || !storageName || !storagePhone || !storageJobDesc || !storageUname){
            localStorage.setItem('email',`${email}`) ;
            localStorage.setItem('name',`${name}`) ;
            localStorage.setItem('phone',`${phone}`) ;
            localStorage.setItem('JobDesc',`${JobDesc}`) ;
            localStorage.setItem('Uname',`${Uname}`) ;
        }
    },[email, name, phone, JobDesc, Uname])

    return (
        <div className="bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md sticky top-0 z-50"
                 onMouseLeave={()=>setIsProfileMenuOpen(false)}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        <div className="flex items-center">
                            
                                <h1 
                                onClick={()=>router.push('/')}
                                className=" flex-shrink-0 text-2xl hover:cursor-pointer font-bold text-indigo-600">GradLink</h1>
                            
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Events</a>
                                    <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Careers</a>
                                    <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Mentorship</a>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4"
                        >
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon />
                                </span>
                                <input type="text" placeholder="Search" className="bg-gray-100 flex focus:bg-white focus:ring-2 focus:ring-indigo-500 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm  md:w-56 lg:w-96 transition-all duration-300" />
                            </div>
                            <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <BellIcon />
                            </button>
                            
                            <div className="relative"
                                ref={profileMenuRef}
                            >
                                {oneChar !="!" &&(
                                <button
                                    onMouseOver={()=>setIsProfileMenuOpen(true)}
                                    className="flex items-center space-x-2 focus:outline-none bg-gray-red rounded-full bg-blue-500 w-10 h-10 justify-center">
                                    
                                        <p className='text-white '>{oneChar}</p>
                            
                                </button>)
                                }

                                {oneChar =="!" &&(
                                <button
                                    onClick={()=> router.push('/login')}
                                    className="flex items-center space-x-2 focus:outline-none bg-gray-red rounded-full bg-blue-500 w-20 h-10 transition-all hover:bg-blue-500/80 hover:cursor-pointer justify-center">
                                    
                                        <p className='text-white font-bold'>Login</p>
                            
                                </button>)
                                }

                                {isProfileMenuOpen && (
                                    <div 
                                    onMouseLeave={()=>setIsProfileMenuOpen(false)}
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                        {userRole==="alumni" && (
                                        <p 
                                        onClick={()=>router.push('/profile')}
                                        className="block px-4 hover:cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</p>)}
                                        {userRole==="admin" &&(
                                        <p 
                                        onClick={()=>router.push('/profile')}
                                        className="block px-4 py-2 text-sm
                                         text-gray-700 hover:cursor-pointer hover:bg-gray-100">Add User</p>)}
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                        <p 
                                        onClick={ClearStore}
                                        className="block hover:cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Directory</a>
                            <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Events</a>
                            <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Careers</a>
                            <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Mentorship</a>
                            <a href="#" className="text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Give Back</a>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 focus:outline-none bg-gray-red rounded-full bg-blue-500 w-10 h-10 justify-center">
                                    
                                        <p className='text-white font-bold'>{oneChar}</p>
                            
                                </button>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{name}</div>
                                    <div className="text-sm font-medium text-gray-500">{email}</div>
                                </div>
                                <button className="ml-auto flex-shrink-0 p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">
                                    <BellIcon />
                                </button>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">Your Profile</a>
                                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">Settings</a>
                                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50">Sign out</a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
