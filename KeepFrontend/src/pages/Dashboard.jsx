import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Dashboard(){
  const { user, logout } = useContext(AuthContext)
  return (
    <>
    
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <div className="flex gap-3">
          <Link to="/tasks" className="px-4 py-2 border rounded">Tasks</Link>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow">This is your dashboard.</div>
    </div>
    </>
  )
}