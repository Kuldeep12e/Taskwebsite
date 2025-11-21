import React from 'react'

export default function TaskCard({task, onUpdate, onDelete}){
  return (
    <div className="p-4 border rounded bg-white shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-600">{task.status}</p>
        <p className="text-sm text-gray-600">{task.createdAt}</p>
      </div>
         <div className="flex items-center gap-2">
           {task.status !== 'completed' && (
             <button onClick={() => onUpdate(task)} className="text-sm px-3 py-1 border rounded">Mark completed</button>
           )}
           <button onClick={() => onDelete(task._id)} className="text-sm px-3 py-1 text-red-600">Delete</button>
         </div>
    </div>
  )
}