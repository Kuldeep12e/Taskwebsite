import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar(){
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">Keep</span>
            </div>
            
           
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button onClick={() => navigate('/dashboard')} className="px-4 py-2 text-blue-600 hover:text-indigo-400 transition-colors font-medium">Dashboard</button>
                  <button onClick={() => navigate('/tasks')} className="px-4 py-2 text-blue-600 hover:text-indigo-400 transition-colors font-medium">Tasks</button>
                  <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors font-medium">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="px-4 py-2 text-blue-600 hover:text-indigo-400 transition-colors font-medium">Login</button>
                  <button onClick={() => navigate('/register')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium">Sign Up</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
  )
}
