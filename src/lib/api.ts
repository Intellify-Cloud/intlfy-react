import axios, { type AxiosInstance } from 'axios'
import { useAlertStore } from '@/stores/useAlertStore'
import { useSessionStore } from '@/stores/useSessionStore'

const configure = (api: AxiosInstance): AxiosInstance => {
  api.interceptors.request.use(function (config) {
    const token = useSessionStore.getState().token

    if (token) {
      config.headers['Authorization'] = `Shuttle.Access token=${token}`
    }

    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const alertStore = useAlertStore.getState()

      if (error.response?.status === 401) {
        alertStore.add({
          message: 'Unauthorized',
          name: 'api-error',
        })

        return error
      }

      alertStore.add({
        message:
          error.response?.data ||
          error.response?.statusText ||
          '(unknown communication/network error)',
        name: 'api-error',
      })

      return Promise.reject(error)
    },
  )

  return api
}

export const accessApi = configure(axios.create({ baseURL: process.env.NEXT_PUBLIC_ACCESS_API_URL }))
export const broadsheetApi = configure(axios.create({ baseURL: process.env.NEXT_PUBLIC_BROADSHEET_API_URL }))
