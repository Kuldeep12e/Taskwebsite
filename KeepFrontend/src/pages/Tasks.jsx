import React, { useEffect, useState } from 'react'
import { createTask, getTasks, updateTask, deleteTask } from '../api/taskApi'
import TaskCard from '../components/TaskCard'
import Input from '../components/Input'
import Button from '../components/Button'
import Navbar from '../components/Navbar'

export default function Tasks(){
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({title:'', description:''})
  const [error, setError] = useState(null)

  const load = async ()=>{
    try{
      const { data } = await getTasks()
      setTasks(data.tasks || data)
    }catch(e){
      setError('Failed to load tasks')
    }
  }

  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      await createTask(form)
      setForm({title:'', description:''})
      load()
    }catch(e){ setError('Create failed') }
  }

  const handleToggle = async (task)=>{
    try{
      await updateTask(task._id, { status: task.status === 'pending' ? 'completed' : 'pending' })
      load()
    }catch(e){ setError('Update failed') }
  }

  const handleDelete = async (id)=>{
    try{ await deleteTask(id); load() }catch(e){ setError('Delete failed') }
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}

      <form onSubmit={submit} className="mb-6 grid grid-cols-1 gap-3">
        <Input label="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
        <Input label="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
        <div className="flex justify-end"><Button type="submit">Add Task</Button></div>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 && <div className="text-gray-500">No tasks yet.</div>}
        {tasks.map(t => (
          <TaskCard key={t._id} task={t} onUpdate={handleToggle} onDelete={handleDelete} />
        ))}
      </div>
    </div>
    </>
  )
}
