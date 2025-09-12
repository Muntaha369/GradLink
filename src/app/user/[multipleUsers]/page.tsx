"use client";

import React,{useState, useEffect} from 'react';
import { useEmail } from '../../store/store';
import Nav from '../../components/Nav';
import { useEdit } from '../../store/store';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const PhoneIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const LinkdenSvg = () =>(
  <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" ><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
)


type ProfileCardProps = {
    children: React.JSX.Element;
    title: any;
    icon?: React.JSX.Element;
};

const ProfileCard = ({ children, title, icon }: ProfileCardProps) => (
    <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
            {icon}
            <h2 className="ml-3 text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <div>{children}</div>
    </div>
);

const InfoItem = ({ icon, text }:any) => (
    <div className="flex items-center text-sm text-gray-600 mb-2">
        {icon}
        <span className="ml-2">{text}</span>
    </div>
);


const page = () => {
  const { email, name, phone, JobDesc, Uname } = useEmail();
  const [editInfo, setEditInfo] = useState(false)

  const {zustEdit, setEdit} = useEdit() 

  useEffect(() => {

    setEditInfo(zustEdit)
    console.log("EDIT")

  }, [zustEdit])
  

    const user = {
        name: name || 'Alumni Name',
        title: 'Senior Software Engineer at TechCorp', // Placeholder
        location: 'Mumbai, Maharashtra', // Placeholder
        avatarUrl: 'https://placehold.co/200x200/6366F1/FFFFFF?text=AD',
        coverPhotoUrl: 'https://placehold.co/1200x400/E0E7FF/6366F1?text=+',
        about: JobDesc || 'No description available.',
        email: email || 'No email provided',
        phone: phone || 'No phone provided',
        Linkden: "No account provided"
    };

    return (
        <div className="bg-gray-100 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Nav></Nav>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* --- Profile Header --- */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <img className="h-48 w-full object-cover" src={user.coverPhotoUrl} alt="Cover photo" />
                    <div className="px-6 pt-4 pb-8 relative">
                        <div className="absolute top-0 left-6 -translate-y-1/2">
                            <img className="h-32 w-32 rounded-full border-4 border-white shadow-lg" 
                            src={`${Uname}.jpeg`} alt="User avatar" />
                        </div>
                        
                        <div className="flex justify-end items-center -mt-4">
                        </div>
                        
                        <div className="mt-16">
                            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-md text-gray-600 mt-1">{user.title}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                                <MapPinIcon />
                                <span className="ml-1">{user.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- Left Column (Contact & Skills) --- */}
                    <div className="lg:col-span-1 space-y-8">
                        <ProfileCard title="Contact Information">
                           <>
                               <InfoItem icon={<MailIcon />} text={user.email} />
                               <InfoItem icon={<PhoneIcon />} text={user.phone} />
                               <InfoItem icon={<LinkdenSvg/>} text={<a href={'https://linkedin.com'}>{user.Linkden}</a>} />
                           </>
                        </ProfileCard>
                    </div>

                    {/* --- Right Column (About, Experience, Education) --- */}
                    <div className="lg:col-span-2 space-y-8">
                        <ProfileCard title={<span>About</span>}>
                            <p className="text-gray-700 leading-relaxed">{user.about}</p>
                        </ProfileCard>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;