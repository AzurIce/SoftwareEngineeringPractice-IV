import { get, post, del, put, Service } from '..'
import { Manager } from '../../store'

const service = Service.Auth

export function login(username: string, password: string) {
  return post(service, `/v1/admin/login`, { username, password })
}

// Managers
export function createManager(username: string, password: string) {
  return post(service, `/v1/admin/manager`, { username, password })
}

export function updateManager(id: number, username: string, password: string) {
  return put(service, `/v1/admin/manager/${id}`, {username, password})
}

export function getManagers(): Promise<Manager[]>{
  console.log("axios:getManagers")
  return get(service, `/v1/admin/managers`)
}

export function deleteManager(id: number): Promise<void>{
  console.log("axios:deleteManager")
  return del(service, `/v1/admin/manager/${id}`)
}