import { cache } from "@solidjs/router";
import { AlertColor } from "@suid/material/Alert";
import { createStore } from "solid-js/store";
import { getManagers as apiGetAdmins } from "./axios/auth";
import { getAreas as apiGetAreas} from "./axios/bike";

interface User {
  id: number,
  username: string,
}

const loginInfoStore = createStore<{ jwt?: string, user?: User }>()
const loginInfoStoreInit = () => {
  const [_, _setLoginInfo] = loginInfoStore;

  console.log("[LoginInfoStore/init]")
  const jwt = localStorage.getItem('jwt')
  const userString = localStorage.getItem('user')
  if (!jwt || !userString) return

  console.log('[LoginInfoStore/init]: loading from localStorage')
  const user = JSON.parse(userString) as unknown as User
  _setLoginInfo(() => {
    return { jwt, user }
  })
}
loginInfoStoreInit()

export const LoginInfoStore = () => {
  const [loginInfo, _setLoginInfo] = loginInfoStore;

  const setLoginInfo = (jwt: string, user: User) => {
    console.log('[LoginInfoStore/setLoginInfo]: ', loginInfo)
    _setLoginInfo(() => {
      return { jwt, user }
    })
    localStorage.setItem('jwt', jwt)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const user = () => {
    return loginInfo.user
  }

  const jwt = () => {
    return loginInfo.jwt
  }

  return { loginInfo, setLoginInfo, user, jwt }
}

export type Alert = {
  type: AlertColor,
  msg: string
}

const alertsStore = createStore<Alert[]>([])
export const AlertsStore = () => {
  const [alerts, setAlerts] = alertsStore;

  const addAlert = (alert: Alert) => {
    setAlerts([...alerts, alert])
  }
  const delAlert = (index: number) => {
    setAlerts(alerts.filter((alert, i) => i != index))
  }

  const newErrorAlert = (msg: string) => {
    addAlert({ type: 'error', msg })
  }
  const newWarningAlert = (msg: string) => {
    addAlert({ type: 'warning', msg })
  }
  const newInfoAlert = (msg: string) => {
    addAlert({ type: 'info', msg })
  }
  const newSuccessAlert = (msg: string) => {
    addAlert({ type: 'success', msg })
  }
  return { alerts, addAlert, delAlert, newErrorAlert, newWarningAlert, newInfoAlert, newSuccessAlert }
}

// Manager
export type Manager = {
  id: number,
  username: string,
}

export const getManagers = cache(async () => {
  return await apiGetAdmins()
}, "managers");

// Areas
export type LngLat = {
  lng: number,
  lat: number
}

export type Area = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  points: LngLat[]
};

export const getAreas = cache(async () => {
  return await apiGetAreas()
}, "areas");