import React, { createContext, useState, useEffect } from 'react'
import axios from '../utils/axiosClient'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  
    (async () => {
      try{
        const { data } = await axios.get('/users/me')
        setUser(data.user)
      }catch(err){
        setUser(null)
      }finally{
        setLoading(false)
      }
    })()
  }, [])

  const logout = async () => {
    try{
      await axios.post('/users/logout')
      setUser(null)
    }catch(e){
      console.error(e)
    }
  }

  return (
    <AuthContext.Provider value={{user, setUser, loading, logout}}>
      {children}
    </AuthContext.Provider>
  )
}