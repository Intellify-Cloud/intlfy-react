"use client"

import { useEffect, useState } from "react"
import { accessApi } from "@/lib/api"
import { useAlertStore } from "@/stores/useAlertStore"
import { Loader2, AlertCircle } from "lucide-react"

type OAuthProvider = {
  name: string
  svg: string
}

export default function SignInPage() {
  const [fetching, setFetching] = useState(true)
  const [busy, setBusy] = useState(false)
  const [providers, setProviders] = useState<OAuthProvider[]>([])
  const [error, setError] = useState(false)
  
  const alertStore = useAlertStore()

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await accessApi.get("v1/oauth/providers")
        const data = response.data || []
        setProviders(data)
        if (data.length === 0) setError(true)
      } catch (err) {
        alertStore.add({
          message: "Failed to load OAuth providers.",
          name: "oauth-provider-error",
        })
        setError(true)
      } finally {
        setFetching(false)
      }
    }

    // In a real app we might check if config is Ok before fetching
    fetchProviders()
  }, [alertStore])

  const oauthAuthenticate = async (name: string) => {
    setBusy(true)
    try {
      const redirectUri = encodeURIComponent(
        `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/oauth`
      )
      const response = await accessApi.get(`v1/oauth/authenticate/${name}?redirectUri=${redirectUri}`)
      window.location.replace(response?.data?.authorizationUrl)
    } catch (err) {
      console.error(err)
      alertStore.add({
        message: "Authentication failed. Please try again.",
        name: "auth-fail"
      })
      setBusy(false)
    }
  }

  return (
    <div className="mt-32 w-full max-w-md mx-auto px-4 py-8">
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-neutral-800">
          Sign In
        </h1>

        {fetching ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Fetching providers...</p>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Unable to load authentication providers.</p>
          </div>
        ) : busy ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Redirecting...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {providers.map((p) => (
              <button
                key={p.name}
                onClick={() => oauthAuthenticate(p.name)}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors group"
              >
                {p.svg && (
                  <div
                    className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: p.svg }}
                  />
                )}
                <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                  Continue with {p.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
