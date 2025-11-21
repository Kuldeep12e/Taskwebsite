import React, { useState, useContext } from 'react'
import { login as apiLogin } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function Login(){
  const [form, setForm] = useState({email:'', password:''})
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const submit = async (e) =>{
    e.preventDefault()
    setError(null)
    try{
      const { data } = await apiLogin(form)
    
      setUser(data.user)
      navigate('/dashboard')
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
        <Input label="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
        <div className="flex justify-end">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
    </>
  )
}