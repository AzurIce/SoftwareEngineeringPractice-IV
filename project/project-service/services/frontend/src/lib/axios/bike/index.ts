
import { get, post, del, put, Service } from '..'
import { Area } from '../../store'

const service = Service.Bike

export function getAreas(): Promise<Area[]>{
  console.log("axios:getAreas")
  return get(service, `/v1/areas`)
}

export function getAreaById(id: number): Promise<Area[]>{
  console.log(`axios:getAreaById(${id})`)
  return get(service, `/v1/area/${id}`)
}