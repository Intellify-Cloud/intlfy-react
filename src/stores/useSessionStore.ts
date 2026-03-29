import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { accessApi } from '@/lib/api'
import Permissions from '@/permissions'
import type { Credentials, OAuthData, Session, SessionResponse } from '@/types/app'

export interface SessionStoreState {
  isAuthenticated: boolean
  isInitialized: boolean
  identityName?: string
  token?: string
  permissions: string[]
  status: 'not-signed-in' | 'signed-in'
  
  initialize: () => Promise<void>
  addPermission: (permission: string) => void
  register: (session: Session) => void
  signIn: (credentials: Credentials) => Promise<SessionResponse | undefined>
  oauth: (oauthData: OAuthData) => Promise<SessionResponse>
  signOut: () => void
  hasSession: () => boolean
  hasPermission: (permission: string) => boolean
}

export const useSessionStore = create<SessionStoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isInitialized: false,
      identityName: undefined,
      token: undefined,
      permissions: [],

      get status() {
        return !get().token ? 'not-signed-in' : 'signed-in'
      },

      initialize: async () => {
        if (get().isInitialized) {
          return
        }

        const identityName = get().identityName
        const token = get().token

        if (!!identityName && !!token) {
          try {
            await get().signIn({
              identityName: identityName,
              token: token,
            })
          } finally {
            set({ isInitialized: true })
          }
        } else {
          set({ isInitialized: true })
        }
      },

      addPermission: (permission: string) => {
        if (get().hasPermission(permission)) {
          return
        }
        set((state) => ({ permissions: [...state.permissions, permission] }))
      },

      register: (session: Session) => {
        if (
          !session ||
          !session.identityId ||
          !session.identityName ||
          !session.token ||
          !session.permissions
        ) {
          throw Error('Invalid session')
        }

        const newPermissions = [Permissions.Session]

        set({
          identityName: session.identityName,
          token: session.token,
          permissions: newPermissions.concat(session.permissions),
          isAuthenticated: true,
        })
      },

      signIn: async (credentials: Credentials) => {
        if (
          !credentials ||
          !credentials.identityName ||
          !(!!credentials.password || !!credentials.token)
        ) {
          throw new Error('Missing credentials')
        }

        const response = await accessApi.post<SessionResponse>('v1/sessions', {
          identityName: credentials.identityName,
          password: credentials.password,
          token: credentials.token,
          applicationName: credentials.applicationName,
        })

        if (!response?.data) {
          throw new Error("Invalid response")
        }

        const data = response.data

        switch (data.result) {
          case 'Registered': {
            if (data.sessionTokenExchangeUrl) {
              window.location.replace(data.sessionTokenExchangeUrl)
              break
            }

            get().register({
              identityId: data.identityId,
              identityName: credentials.identityName,
              token: data.token,
              permissions: data.permissions,
            })

            break
          }
          case 'UnknownIdentity': {
            break
          }
          default: {
            throw new Error('Invalid credentials')
          }
        }

        return data
      },

      oauth: async (oauthData: OAuthData) => {
        if (!oauthData || !oauthData.state || !oauthData.code) {
          throw new Error('Missing OAuth data')
        }

        const response = await accessApi.get<SessionResponse>(
          `v1/oauth/session/${oauthData.state}/${oauthData.code}`
        )

        if (!response?.data) {
          throw new Error("Invalid response")
        }

        const data = response.data

        if (data.result == 'Registered') {
          get().register({
            identityId: data.identityId,
            identityName: data.identityName,
            token: data.token,
            permissions: data.permissions,
          })
        }

        set({ isInitialized: true })

        return data
      },

      signOut: () => {
        set({
          identityName: undefined,
          token: undefined,
          permissions: [],
          isAuthenticated: false,
        })
      },

      hasSession: () => {
        return !!get().token
      },

      hasPermission: (permission: string) => {
        const requiredPermission = permission.toLowerCase()
        const permissions = get().permissions

        return permissions.some((candidate) => {
          if (candidate.includes('*')) {
            const regex = new RegExp(`^${candidate.replace('*', '.*')}$`)
            return regex.test(requiredPermission)
          } else {
            return candidate === requiredPermission
          }
        })
      },
    }),
    {
      name: 'shuttle-access-storage',
      partialize: (state) => ({
        identityName: state.identityName,
        token: state.token,
      }),
    }
  )
)
