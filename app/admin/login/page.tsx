
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Get admin list from localStorage
      const adminsList = JSON.parse(localStorage.getItem("adminsList") || "[]")
      
      // If no admins exist, create default admin
      if (adminsList.length === 0) {
        const defaultAdmin = {
          id: 1,
          email: "samispahiu1979@gmail.com",
          password: "spahiu121",
          createdAt: new Date().toISOString(),
          role: "super-admin"
        }
        adminsList.push(defaultAdmin)
        localStorage.setItem("adminsList", JSON.stringify(adminsList))
      }

      // Check credentials
      const admin = adminsList.find((admin: any) => admin.email === email && admin.password === password)
      
      if (admin) {
        localStorage.setItem("adminAuthenticated", "true")
        localStorage.setItem("adminEmail", email)
        router.push("/admin")
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-gray-900/80 backdrop-blur-md border border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/piramida-logo-new.png"
                alt="PIRAMIDA Group"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-yellow-400">Admin Login</CardTitle>
            <CardDescription className="text-gray-400">
              Access the PIRAMIDA Group admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert className="border-red-500 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@piramidagroup.com"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                ← Back to Home
              </Link>
            </div>
            
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-400 text-center">
                Default Admin: samispahiu1979@gmail.com / spahiu121
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
