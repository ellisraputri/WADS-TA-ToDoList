import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `todolist`; 
        navigate(path);
    }

  return (
    <>
        <h1 className='text-center mt-20 font-semibold text-xl text-blue-950'>
            Welcome to To Do List!
        </h1>
        <div className='text-center justify-center flex'>
            <button className='bg-white mt-10 rounded-2xl hover:cursor-pointer text-blue-900 p-4 font-semibold border-l-blue-900 border-b-blue-900 shadow-lg hover:bg-blue-50'
            onClick={routeChange}>
            Click here to proceed!</button>
        </div>
        
    </>
  )
}

export default LandingPage