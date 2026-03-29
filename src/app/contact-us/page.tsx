"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { broadsheetApi } from "@/lib/api"
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react"

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
    <div className="w-full">
      {/* Page header */}
      <div className="relative w-full flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white dark:from-orange-900/20 dark:via-black dark:to-black" />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-orange-600 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400 rounded-full ring-1 ring-inset ring-orange-600/20">
            Get in touch
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Us</span>
          </h1>
          <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a question or ready to get started? Send us a message and we'll get back to you.
          </p>
        </div>
      </div>

      {/* Form area */}
      <div className="w-full bg-gray-50 dark:bg-neutral-900/30 border-t border-gray-100 dark:border-neutral-900 py-16 px-6">
        <div className="max-w-xl mx-auto">

          {status === "sent" && (
            <div className="flex flex-col items-center gap-3 p-8 mb-8 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl text-center shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Message sent!</span>
              <span className="text-gray-600 dark:text-gray-400">Thank you — we'll be in touch soon.</span>
            </div>
          )}

          {status === "error" && (
            <div className="p-6 mb-8 bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-900/50 rounded-2xl text-center shadow-sm">
              <p className="font-bold text-gray-900 dark:text-white mb-1">Something went wrong.</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please try again or email us at{" "}
                <a href="mailto:pieter@intellify.co.za" className="text-orange-600 hover:underline font-medium">
                  pieter@intellify.co.za
                </a>
              </p>
            </div>
          )}

          {status === "busy" ? (
            <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              <p className="text-lg font-semibold mt-5 text-gray-900 dark:text-white">Sending your message…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm space-y-6">

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label htmlFor="location">Location</label>
                <input id="location" type="text" tabIndex={-1} autoComplete="off" {...register("location")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-neutral-800 dark:text-white outline-none transition-colors ${
                    errors.name
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 dark:border-neutral-700 focus:border-orange-400 hover:border-gray-300 dark:hover:border-neutral-600"
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-neutral-800 dark:text-white outline-none transition-colors ${
                    errors.emailAddress
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 dark:border-neutral-700 focus:border-orange-400 hover:border-gray-300 dark:hover:border-neutral-600"
                  }`}
                  {...register("emailAddress", {
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
                  })}
                />
                {errors.emailAddress && <span className="text-red-500 text-sm mt-1 block">{errors.emailAddress.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 dark:text-white outline-none focus:border-orange-400 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors"
                  {...register("phoneNumber")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-neutral-800 dark:text-white outline-none transition-colors resize-y ${
                    errors.content
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 dark:border-neutral-700 focus:border-orange-400 hover:border-gray-300 dark:hover:border-neutral-600"
                  }`}
                  {...register("content", { required: "Message is required" })}
                />
                {errors.content && <span className="text-red-500 text-sm mt-1 block">{errors.content.message}</span>}
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
