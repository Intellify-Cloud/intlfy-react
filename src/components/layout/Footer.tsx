"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export const Footer = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer className="bg-white dark:bg-black py-12 w-full mt-auto border-t border-gray-100 dark:border-neutral-900">
        <div className="container md:w-5/6 lg:w-3/4 max-w-6xl mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
            <span className="bg-orange-600 w-2.5 h-2.5 rounded-full inline-block shadow-sm"></span>
            intellify
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Intellify. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <Link href="/privacy-policy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
          
        </div>
      </footer>
      
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-50 shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  )
}
