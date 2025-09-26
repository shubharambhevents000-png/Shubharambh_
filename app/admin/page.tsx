"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, LogOut, ArrowUpRight, Activity, FileText } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({ totalProducts: 0 })
  const [isLoading, setIsLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats(data)
    } catch (error: any) {
      console.error("Error fetching stats:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user?.isAdmin) {
      router.replace("/admin/login")
      return
    }
    fetchStats()
  }, [status, session, router, fetchStats])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-teal-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-300 border-t-teal-500 rounded-full animate-spin"></div>
          <p className="text-teal-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session?.user?.isAdmin) return null

  const StatCard = ({ title, value, icon: Icon, link }: any) => (
    <Link href={link || "#"}>
      <Card className="group relative overflow-hidden border border-gray-200 bg-white/90 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
              <Icon className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  const QuickActionButton = ({ href, children, icon: Icon }: any) => (
    <Button
      asChild
      variant="ghost"
      className="w-full justify-start h-14 text-left hover:bg-gray-100 hover:translate-x-1 transition-all duration-200 group px-4"
    >
      <Link href={href} className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors duration-200">
          <Icon className="h-5 w-5 text-teal-600" />
        </div>
        <span className="font-medium text-gray-800">{children}</span>
        <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-teal-500" />
      </Link>
    </Button>
  )

  return (
    <div className="min-h-screen text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-teal-100/40 to-blue-100/40"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-pink-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-teal-700 font-medium">Welcome back, Admin 👋</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="h-4 w-4 mr-2 text-gray-600" />
              <span>Logout</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <StatCard
              title="Total Products"
              value={isLoading ? "..." : stats.totalProducts}
              icon={Package}
              link="/admin/products"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Activity className="h-5 w-5 text-teal-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Manage your store quickly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <QuickActionButton href="/admin/products" icon={Package}>
                  Manage Products
                </QuickActionButton>
                <QuickActionButton href="/admin/sections" icon={FileText}>
                  Manage Sections
                </QuickActionButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
