import React from 'react'

export default function Input({label, ...props}){
  return (
    <label className="block">
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" {...props} />
    </label>
  )
}
