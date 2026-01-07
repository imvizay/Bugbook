import { createContext, useContext, useMemo, useState } from "react"
import axios from "axios"

const AuthContext = createContext(null)
const API_URL = "http://127.0.0.1:8000"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  /* ---------------- SIGNUP VALIDATION ---------------- */

  const signUp = (userData) => {
    const { username, email, password, confirm_password } = userData

    if (!username?.trim()) return alert("Username is required")
    if (username.length < 3) return alert("Username must be at least 3 characters")

    if (!email?.trim()) return alert("Email is required")

    const allowedDomains = ["gmail.com", "hotmail.com"]
    if (
      !email.includes("@") ||
      !allowedDomains.some(domain => email.endsWith(domain))
    ) {
      return alert("Invalid email domain")
    }

    if (!password?.trim()) return alert("Password is required")

    if (
      password.length < 4 || password.length > 8 ||
      confirm_password.length < 4 || confirm_password.length > 8
    ) {
      return alert("Password must be 4–8 characters")
    }

    if (password !== confirm_password) {
      return alert("Passwords do not match")
    }

    return true
  }

  /* ---------------- LOGIN VALIDATION ---------------- */

  const login = (userData) => {
    const { username, password } = userData

    if (!username?.trim()) return alert("Username required")
    if (username.length < 3) return alert("Username too short")
    if (!/[A-Za-z]/.test(username))
      return alert("Username must contain letters")

    if (!password?.trim()) return alert("Password required")
    if (password.length < 4 || password.length > 8)
      return alert("Password must be 4–8 characters")

    return true
  }

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout/`, {}, {
        withCredentials: true
      })
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setUser(null)  
    }
  }

  /* ---------------- DERIVED STATE ---------------- */

  const isAuthenticated = !!user

  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated,
    loading,
    signUp,
    login,
    handleLogout,
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/* ---------------- HOOK ---------------- */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
