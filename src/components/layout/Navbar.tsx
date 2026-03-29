"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Sun, Moon, LogOut } from "lucide-react"
import { useSessionStore } from "@/stores/useSessionStore"
import Permissions from "@/permissions"

export const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, hasPermission, signOut, identityName } = useSessionStore()
  
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme") || "light"
    setIsDarkTheme(storedTheme === "dark")
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme)
    localStorage.setItem("app-theme", newTheme ? "dark" : "light")
    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  const anonymousNav = [
    { title: "Services", to: "/#services" },
    { title: "Portfolio", to: "/portfolio" },
    { title: "Contact", to: "/contact-us" },
  ]

  const authenticatedNav = [
    { title: "Dashboard", to: "/dashboard", permission: Permissions.Session },
    { title: "Tenants", to: "/tenants", permission: Permissions.Tenants.View },
  ]

  const navItems = isAuthenticated
    ? authenticatedNav.filter((item) => hasPermission(item.permission))
    : anonymousNav

  return (
    <>
      {/* Floating Pill Navbar following the Bob Go aesthetic */}
      <nav
        className={`fixed top-4 inset-x-0 mx-auto w-[calc(100%-2rem)] max-w-6xl z-50 rounded-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg border border-gray-200/50 dark:border-neutral-800/80 py-2.5"
            : "bg-white dark:bg-neutral-900 shadow-sm border border-gray-200 dark:border-neutral-800 py-3"
        }`}
      >
        <div className="px-5 md:px-6 flex flex-row items-center justify-between">
          
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex flex-col cursor-pointer group flex-shrink-0">
            <div className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
              <span className="bg-orange-600 w-3 h-3 rounded-full inline-block shadow-sm transform group-hover:scale-110 transition-transform"></span>
              intellify
            </div>
          </Link>

          {/* Desktop Links (Centered) */}
          <div className="hidden md:flex flex-row items-center justify-center gap-8 ml-4 mr-auto">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.to}
                className={`text-[15px] font-semibold transition-colors duration-200 ${
                  pathname === item.to 
                    ? "text-orange-600 dark:text-orange-500" 
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Actions (Right) */}
          <div className="flex flex-row items-center justify-end gap-3 flex-shrink-0">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {isDarkTheme ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {!isAuthenticated ? (
              <Link
                href="/sign-in"
                className="hidden md:flex items-center justify-center h-[38px] px-5 bg-orange-600 text-white text-[15px] font-semibold rounded-full shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-orange-500 transition-all duration-200"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                title={`Sign out ${identityName}`}
                className="hidden md:flex items-center justify-center h-[38px] px-4 gap-2 text-[15px] font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center ml-2 border-l border-gray-200 dark:border-neutral-700 pl-3">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)} 
                className="p-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (renders below the floating pill securely) */}
      {showMobileMenu && (
        <div className="md:hidden fixed top-[80px] inset-x-4 z-40 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="flex flex-col p-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.to}
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center px-4 py-3 text-[15px] font-semibold text-gray-800 dark:text-gray-200 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <div className="h-px w-full bg-gray-100 dark:bg-neutral-800 my-2"></div>
            {!isAuthenticated && (
              <Link
                href="/sign-in"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center justify-center w-full px-4 py-3 text-[15px] font-semibold text-white bg-orange-600 rounded-xl shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
