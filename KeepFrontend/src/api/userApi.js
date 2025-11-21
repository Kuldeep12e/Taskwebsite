import axios from '../utils/axiosClient'

export const register = (payload) => axios.post('/users/signup', payload)
export const login = (payload) => axios.post('/users/signin', payload)
export const me = () => axios.get('/auth/me')
export const logout = () => axios.post('/users/logout')