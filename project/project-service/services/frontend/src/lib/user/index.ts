import { get, post, del } from '../axios'
import { Admin as Manager } from '../store'

export function login(username: string, password: string) {
  return post(`/v1/admin/login`, { username, password })
}

// Managers
export function createManager(username: string, password: string) {
  return post(`/v1/admin/manager`, { username, password })
}

export function getManagers(): Promise<Manager[]>{
  console.log("axios:getManagers")
  return get(`/v1/admin/managers`)
}

export function deleteManager(id: number): Promise<Manager[]>{
  console.log("axios:deleteManager")
  return del(`/v1/admin/manager/${id}`)
}