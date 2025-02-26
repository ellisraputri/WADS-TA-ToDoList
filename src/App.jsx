// import { useState } from 'react'
import { TodoWrapper } from './components/TodoWrapper'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
            <h1 className='text-3xl font-bold text-neutral-950 m-3 underline'>To Do List</h1>
            <Router>
                <Routes>
                    <Route path='/' element={<TodoWrapper />}></Route>
                </Routes>
            </Router>
        </div>
  )
}

export default App