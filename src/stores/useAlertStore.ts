import { create } from 'zustand'

export interface Alert {
  message: string
  name: string
  expire?: boolean
  expirySeconds?: number
  dismissable?: boolean
  key?: string
}

export interface AlertStoreState {
  alerts: Alert[]
  add: (alert: Alert) => void
  remove: (name: string) => boolean
  clear: () => void
  requestSent: () => void
  working: () => void
}

export const messages = {
  requestSent: 'The request has been submitted. It may take a moment to process.',
  working: 'Please wait until the current operation completes and then try again.',
}

let keyCounter = 0

export const useAlertStore = create<AlertStoreState>((set, get) => ({
  alerts: [],

  add: (alert: Alert) => {
    if (!alert || !alert.message) {
      return
    }

    get().remove(alert.name)

    const expire = alert.expire ?? true
    const expirySeconds = alert.expirySeconds ?? 10
    const dismissable = alert.dismissable || !!alert.name

    const key = `${alert.name}-${keyCounter++}`

    const newAlert = { ...alert, expire, expirySeconds, dismissable, key }

    set((state) => ({ alerts: [...state.alerts, newAlert] }))

    if (expire) {
      setTimeout(() => {
        get().remove(alert.name)
      }, expirySeconds * 1000)
    }
  },

  remove: (name: string) => {
    if (!name) {
      return false
    }

    const { alerts } = get()
    const index = alerts.findIndex((item) => item.name === name)

    if (index < 0) {
      return false
    }

    set((state) => ({
      alerts: state.alerts.filter((item) => item.name !== name),
    }))

    return true
  },

  clear: () => {
    set({ alerts: [] })
  },

  requestSent: () => {
    get().add({
      message: messages.requestSent,
      name: 'request-sent',
    })
  },

  working: () => {
    get().add({
      message: messages.working,
      name: 'working-message',
    })
  },
}))
