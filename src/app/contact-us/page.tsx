"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { broadsheetApi } from "@/lib/api"
import { Loader2 } from "lucide-react"

type Inputs = {
  name: string
  emailAddress: string
  phoneNumber?: string
  location: string // honeypot
  content: string
}

export default function ContactUsPage() {
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus("busy")
    try {
      await broadsheetApi.post("/v1/messages", data)
      reset()
      setStatus("sent")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <div className="mt-32 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
      
      {status === "sent" && (
        <div className="flex flex-col justify-center items-center p-6 mb-8 text-green-700 bg-green-50 border border-green-200 rounded-lg w-full md:w-2/3 text-center">
          <span className="text-xl font-bold">Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col justify-center items-center p-6 mb-8 text-red-700 bg-red-50 border border-red-200 rounded-lg w-full md:w-2/3 text-center">
          <span className="font-bold text-xl mb-2">Oops! Something went wrong. Please try again later.</span>
          <span>
            You are welcome to e-mail us at{" "}
            <a href="mailto:pieter@intellify.co.za" className="underline font-medium hover:text-red-900">
              pieter@intellify.co.za
            </a>
          </span>
        </div>
      )}

      {status === "busy" ? (
        <div className="flex flex-col justify-center items-center p-12 border rounded-xl w-full md:w-2/3 bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-lg font-bold mt-6 text-gray-900 dark:text-white">Sending your message...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
          {/* Honeypot field */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("location")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white outline-none transition-colors ${
                errors.name ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-300 dark:border-neutral-700 focus:border-blue-500 hover:border-gray-400 dark:hover:border-neutral-500"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white outline-none transition-colors ${
                errors.emailAddress ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-300 dark:border-neutral-700 focus:border-blue-500 hover:border-gray-400 dark:hover:border-neutral-500"
              }`}
              {...register("emailAddress", { 
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.emailAddress && <span className="text-red-500 text-sm mt-1">{errors.emailAddress.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 dark:text-white outline-none focus:border-blue-500 hover:border-gray-400 dark:hover:border-neutral-500 transition-colors"
              {...register("phoneNumber")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-neutral-900 dark:text-white outline-none transition-colors resize-y ${
                errors.content ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-gray-300 dark:border-neutral-700 focus:border-blue-500 hover:border-gray-400 dark:hover:border-neutral-500"
              }`}
              {...register("content", { required: "Message is required" })}
            />
            {errors.content && <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
