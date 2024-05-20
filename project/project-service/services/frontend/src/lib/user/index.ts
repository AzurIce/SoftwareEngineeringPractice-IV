import { get, post } from '../axios'

export function login(username: string, password: string) {
  return post(`/v1/admin/login`, {
    username: username,
    password: password
  })
}