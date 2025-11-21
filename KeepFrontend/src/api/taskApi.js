import axios from '../utils/axiosClient'

export const createTask = (payload) => axios.post('/tasks', payload)
export const getTasks = () => axios.get('/tasks/me')
export const updateTask = (id, payload) => axios.put(`/tasks/${id}`, payload)
export const deleteTask = (id) => axios.delete(`/tasks/${id}`)