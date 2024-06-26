import { AuthResponse } from '~/types/auth.type'
import http from '~/utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  logout: () => http.post('/logout')
}

// export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
// export const login = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
// export const logout = () => http.post('/logout')
export default authApi
