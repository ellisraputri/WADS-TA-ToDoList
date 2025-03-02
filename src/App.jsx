// import { useState } from 'react'
import { TodoWrapper } from './components/TodoWrapper'
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import ProfilePage from './components/ProfilePage';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App w-full h-full">
      <Router>
            <Navbar></Navbar>
            
                <Routes>
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/todolist' element={<TodoWrapper />}></Route>
                    <Route path='/profile' element={<ProfilePage />}></Route>
                </Routes>
            </Router>
        </div>
  )
}

export default App