import React from 'react'
import profilePic from '../assets/Picture1.png';

function ProfilePage() {
  return (
    <>
        <p className='text-center mt-10 font-semibold text-4xl text-blue-950'>
            Profile Page
        </p>

        <div className='flex justify-center mt-5 mb-5'>
            <img src={profilePic} alt="Profile" className="w-40 h-40 rounded-full object-cover"/>
        </div>
        <div className='mb-4'>
            <p className='text-center text-xl text-blue-900'><b>Name:</b></p>
            <p className='text-center text-xl text-blue-900'>Ellis Raputri</p>
        </div>
        <div>
            <p className='text-center text-xl text-blue-900'><b>Bio:</b></p>
            <p className='text-center text-xl text-blue-900'>Lorem ipsum dolor sit amet</p>
        </div>
        
        
        
    </>
    
  )
}

export default ProfilePage