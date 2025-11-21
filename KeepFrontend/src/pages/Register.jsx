import React, { useState, useContext } from 'react'
import { register as apiRegister } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function Register(){
  const [form, setForm] = useState({name:'', email:'', password:''})
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  const submit = async (e) =>{
    e.preventDefault()
    setError(null)
    try{
      const { data } = await apiRegister(form)
      setUser(data.user)
      navigate('/')
    }catch(err){
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <Input label="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
        <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required />
        <Input label="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} required />
        <div className="flex justify-end">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
    </>
  )
}