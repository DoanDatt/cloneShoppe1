import { AuthResponse } from '~/types/auth.type'
import http from '~/utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
export const Login = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)
