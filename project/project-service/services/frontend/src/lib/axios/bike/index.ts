
import { get, post, del, put, Service } from '..'
import { Area, Bike } from '../../store'

const service = Service.Bike

export function getAllAreas(): Promise<Area[]>{
  console.log("axios:getAreas")
  return get(service, `/v1/areas`)
}

export function getAreaById(id: number): Promise<Area>{
  console.log(`axios:getAreaById(${id})`)
  return get(service, `/v1/area/${id}`)
}

export function areaAddBike(areaId: number, uid: number, lng: number, lat: number): Promise<any>{
  console.log(`axios:areaAddBike(${areaId}, <${uid}, ${lng}, ${lat}>)`)
  return post(service, `/v1/area/${areaId}/bike`, { uid, lng, lat })
}

export function getAreaBikes(id: number): Promise<Bike> {
  console.log(`axios:getAreaBikes(${id})`)
  return get(service, `/v1/area/${id}/bikes`)
}