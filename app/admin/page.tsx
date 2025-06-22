"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Check,
  X,
  Edit,
  Trash2,
  Copy,
  Home,
  Users,
  DollarSign,
  Settings,
  Bell,
  Eye,
  LogOut,
  ExternalLink,
  Plus,
  Upload,
  Camera,
  Save,
} from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface PropertySubmission {
  id: number
  title: string
  description: string
  price: string
  priceType: string
  propertyType: string
  city: string
  address: string
  bedrooms: string
  bathrooms: string
  area: string
  yearBuilt: string
  floor: string
  totalFloors: string
  selectedAmenities: string[]
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  submittedAt: string
  status: string
}

interface ActiveListing {
  id: number
  title: string
  owner: string
  type: string
  price: string
  views: number
  inquiries: number
  status: string
  listedAt: string
  plan?: string
  location?: string
  beds?: number
  baths?: number
  area?: string
  image?: string
  featured?: boolean
  certified?: boolean
}

export default function AdminDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<PropertySubmission | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pendingRequests, setPendingRequests] = useState<PropertySubmission[]>([])
  const [activeListings, setActiveListings] = useState<ActiveListing[]>([])
  const [pricingSettings, setPricingSettings] = useState({
    basic: "9.99",
    featured: "24.99",
    premium: "49.99",
  })
  const router = useRouter()

  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false)
  const [newPropertyData, setNewPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    priceType: "sale",
    propertyType: "",
    city: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    yearBuilt: "",
    floor: "",
    totalFloors: "",
    selectedAmenities: [] as string[],
    images: [] as File[],
    ownerName: "Sami Spahiu",
    ownerEmail: "info@piramidagroup.com",
    ownerPhone: "+383 44 613 293",
  })

  useEffect(() => {
    // Real-time sync listener
    const handleStorageChange = () => {
      loadData()
    }

    const handlePropertiesUpdate = () => {
      loadData()
    }

    // Listen for storage changes and custom events
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("propertiesUpdated", handlePropertiesUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("propertiesUpdated", handlePropertiesUpdate)
    }
  }, [])

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
      loadData()
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const loadData = () => {
    // Load property submissions
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
    setPendingRequests(submissions.filter((s: PropertySubmission) => s.status === "pending"))

    // Load active listings
    const listings = JSON.parse(localStorage.getItem("activeListings") || "[]")
    setActiveListings(listings)

    // Load pricing settings
    const pricing = JSON.parse(localStorage.getItem("pricingSettings") || "{}")
    if (Object.keys(pricing).length > 0) {
      setPricingSettings(pricing)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminEmail")
    router.push("/admin/login")
  }

  const notifyMainPageUpdate = () => {
    // Trigger a custom event to notify main page of updates
    window.dispatchEvent(new CustomEvent("propertiesUpdated"))
  }

  const handleApproveRequest = (requestId: number) => {
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
    const updatedSubmissions = submissions.map((s: PropertySubmission) =>
      s.id === requestId ? { ...s, status: "approved" } : s,
    )
    localStorage.setItem("propertySubmissions", JSON.stringify(updatedSubmissions))

    // Add to active listings with featured plan
    const request = submissions.find((s: PropertySubmission) => s.id === requestId)
    if (request) {
      const listings = JSON.parse(localStorage.getItem("activeListings") || "[]")
      const newListing: ActiveListing = {
        id: Date.now(),
        title: request.title,
        owner: request.ownerName,
        type: request.priceType,
        price: `€${request.price}${request.priceType === "rent" ? "/month" : ""}`,
        views: Math.floor(Math.random() * 100),
        inquiries: Math.floor(Math.random() * 20),
        status: "active",
        listedAt: new Date().toISOString().split("T")[0],
        plan: "featured", // Default to featured plan
        location: request.city,
        beds: Number.parseInt(request.bedrooms) || 0,
        baths: Number.parseInt(request.bathrooms) || 0,
        area: `${request.area}m²`,
        image: "/placeholder.svg?height=200&width=300",
        featured: true,
        certified: true,
      }
      listings.push(newListing)
      localStorage.setItem("activeListings", JSON.stringify(listings))
    }

    loadData()
    notifyMainPageUpdate()
    alert(`Property request ${requestId} approved and will appear on the main page!`)
  }

  const handleRejectRequest = (requestId: number) => {
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
    const updatedSubmissions = submissions.map((s: PropertySubmission) =>
      s.id === requestId ? { ...s, status: "rejected" } : s,
    )
    localStorage.setItem("propertySubmissions", JSON.stringify(updatedSubmissions))
    loadData()
    alert(`Property request ${requestId} rejected!`)
  }

  const handleDeleteListing = (listingId: number) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      const listings = JSON.parse(localStorage.getItem("activeListings") || "[]")
      const updatedListings = listings.filter((l: ActiveListing) => l.id !== listingId)
      localStorage.setItem("activeListings", JSON.stringify(updatedListings))
      loadData()
      notifyMainPageUpdate()
      alert("Listing deleted successfully!")
    }
  }

  const handleDuplicateListing = (listingId: number) => {
    const listings = JSON.parse(localStorage.getItem("activeListings") || "[]")
    const listing = listings.find((l: ActiveListing) => l.id === listingId)
    if (listing) {
      const duplicatedListing = {
        ...listing,
        id: Date.now(),
        title: `${listing.title} (Copy)`,
        views: 0,
        inquiries: 0,
        listedAt: new Date().toISOString().split("T")[0],
      }
      listings.push(duplicatedListing)
      localStorage.setItem("activeListings", JSON.stringify(listings))
      loadData()
      notifyMainPageUpdate()
      alert("Listing duplicated successfully!")
    }
  }

  const handleUpdatePricing = () => {
    localStorage.setItem("pricingSettings", JSON.stringify(pricingSettings))
    alert("Pricing updated successfully!")
  }

  const handleNewPropertyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)

      // Validate files
      const validImages = newImages.filter((file) => {
        const isValidType = file.type.startsWith("image/")
        const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit
        return isValidType && isValidSize
      })

      if (validImages.length !== newImages.length) {
        alert("Some files were skipped. Only image files under 10MB are allowed.")
      }

      const remainingSlots = 10 - newPropertyData.images.length
      const filesToAdd = validImages.slice(0, remainingSlots)

      if (filesToAdd.length < validImages.length) {
        alert(`Only ${filesToAdd.length} images were added due to the 10 image limit.`)
      }

      setNewPropertyData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesToAdd],
      }))
    }
  }

  const removeNewPropertyImage = (index: number) => {
    setNewPropertyData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleAddNewProperty = async () => {
    if (!newPropertyData.title || !newPropertyData.price || !newPropertyData.propertyType) {
      alert("Please fill in all required fields")
      return
    }

    try {
      // Upload images to Vercel Blob
      const imageUrls: string[] = []

      if (newPropertyData.images.length > 0) {
        for (const image of newPropertyData.images) {
          const formData = new FormData()
          formData.append("file", image)

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            })

            if (response.ok) {
              const { url } = await response.json()
              imageUrls.push(url)
            } else {
              console.error("Failed to upload image:", image.name)
            }
          } catch (error) {
            console.error("Error uploading image:", error)
          }
        }
      }

      // Create new listing for activeListings
      const newListing = {
        id: Date.now(),
        title: newPropertyData.title,
        owner: newPropertyData.ownerName,
        type: newPropertyData.priceType,
        price: `€${newPropertyData.price}${newPropertyData.priceType === "rent" ? "/month" : ""}`,
        views: 0,
        inquiries: 0,
        status: "active",
        listedAt: new Date().toISOString().split("T")[0],
        plan: "featured",
        location: newPropertyData.city,
        beds: Number.parseInt(newPropertyData.bedrooms) || 0,
        baths: Number.parseInt(newPropertyData.bathrooms) || 0,
        area: `${newPropertyData.area}m²`,
        image: imageUrls[0] || "/placeholder.svg?height=200&width=300",
        featured: true,
        certified: true,
        city: newPropertyData.city,
        propertyType: newPropertyData.propertyType,
        description: newPropertyData.description,
        amenities: newPropertyData.selectedAmenities,
        yearBuilt: Number.parseInt(newPropertyData.yearBuilt) || new Date().getFullYear(),
        floor: newPropertyData.floor,
        totalFloors: newPropertyData.totalFloors,
        address: newPropertyData.address,
        images: imageUrls,
      }

      // Create complete property data for propertySubmissions
      const completePropertyData = {
        ...newPropertyData,
        id: newListing.id,
        images: imageUrls,
        status: "approved",
        submittedAt: new Date().toISOString(),
        priceType: newPropertyData.priceType,
        selectedAmenities: newPropertyData.selectedAmenities,
      }

      // Save to both storage locations
      const activeListings = JSON.parse(localStorage.getItem("activeListings") || "[]")
      const propertySubmissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")

      activeListings.push(newListing)
      propertySubmissions.push(completePropertyData)

      localStorage.setItem("activeListings", JSON.stringify(activeListings))
      localStorage.setItem("propertySubmissions", JSON.stringify(propertySubmissions))

      // Reset form
      setNewPropertyData({
        title: "",
        description: "",
        price: "",
        priceType: "sale",
        propertyType: "",
        city: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        yearBuilt: "",
        floor: "",
        totalFloors: "",
        selectedAmenities: [],
        images: [],
        ownerName: "Sami Spahiu",
        ownerEmail: "info@piramidagroup.com",
        ownerPhone: "+383 44 613 293",
      })

      setShowAddPropertyModal(false)
      loadData()
      notifyMainPageUpdate()

      alert(
        `Property "${newPropertyData.title}" added successfully with ${imageUrls.length} images uploaded to cloud storage!`,
      )
    } catch (error) {
      console.error("Error adding property:", error)
      alert("Error adding property. Please try again.")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-yellow-400">PIRAMIDA Group</h1>
                <p className="text-sm text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/workflow">
                <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Workflow
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:text-red-400">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Pending Requests",
              value: pendingRequests.length.toString(),
              icon: Bell,
              color: "text-yellow-400",
            },
            { title: "Active Listings", value: activeListings.length.toString(), icon: Home, color: "text-green-400" },
            { title: "Total Users", value: "1,234", icon: Users, color: "text-blue-400" },
            { title: "Monthly Revenue", value: "€2,450", icon: DollarSign, color: "text-purple-400" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-gray-900/50 border border-gray-700">
            <TabsTrigger value="requests" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Property Requests ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Active Listings ({activeListings.length})
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Pricing Settings
            </TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="requests">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Requests List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">Property Submission Requests</h2>
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <Card
                      key={request.id}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">{request.title}</h3>
                            <div className="space-y-1 text-sm text-gray-400">
                              <p>Owner: {request.ownerName}</p>
                              <p>Email: {request.ownerEmail}</p>
                              <p>
                                Phone:{" "}
                                {request.ownerPhone === "+383 44 613 293" ? "+383 44 613 293" : request.ownerPhone}
                              </p>
                              <p>Submitted: {new Date(request.submittedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500 text-black">
                            {request.priceType === "sale" ? "For Sale" : "For Rent"}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-semibold">€{request.price}</span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedRequest(request)
                              }}
                              className="border-gray-600 text-white hover:bg-gray-800"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApproveRequest(request.id)
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRejectRequest(request.id)
                              }}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardContent className="p-12 text-center">
                      <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No pending property requests</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Request Details */}
              <div>
                {selectedRequest ? (
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Property Details</CardTitle>
                      <CardDescription>Review the submitted property information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white font-semibold">Property Title</Label>
                          <p className="text-gray-300">{selectedRequest.title}</p>
                        </div>
                        <div>
                          <Label className="text-white font-semibold">Type</Label>
                          <p className="text-gray-300">{selectedRequest.propertyType}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white font-semibold">Price</Label>
                          <p className="text-gray-300">€{selectedRequest.price}</p>
                        </div>
                        <div>
                          <Label className="text-white font-semibold">Location</Label>
                          <p className="text-gray-300">{selectedRequest.city}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-white font-semibold">Address</Label>
                        <p className="text-gray-300">{selectedRequest.address}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-white font-semibold">Area</Label>
                          <p className="text-gray-300">{selectedRequest.area}m²</p>
                        </div>
                        <div>
                          <Label className="text-white font-semibold">Bedrooms</Label>
                          <p className="text-gray-300">{selectedRequest.bedrooms || "N/A"}</p>
                        </div>
                        <div>
                          <Label className="text-white font-semibold">Bathrooms</Label>
                          <p className="text-gray-300">{selectedRequest.bathrooms || "N/A"}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-white font-semibold">Description</Label>
                        <p className="text-gray-300">{selectedRequest.description}</p>
                      </div>

                      {selectedRequest.selectedAmenities.length > 0 && (
                        <div>
                          <Label className="text-white font-semibold">Amenities</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedRequest.selectedAmenities.map((amenity: string, index: number) => (
                              <Badge key={index} variant="outline" className="border-gray-600 text-gray-400">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-700 pt-4">
                        <Label className="text-white font-semibold">Contact Information</Label>
                        <div className="mt-2 space-y-1 text-sm text-gray-300">
                          <p>Name: {selectedRequest.ownerName}</p>
                          <p>Email: {selectedRequest.ownerEmail}</p>
                          <p>
                            Phone:{" "}
                            {selectedRequest.ownerPhone === "+383 44 613 293"
                              ? "+383 44 613 293"
                              : selectedRequest.ownerPhone}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardContent className="p-12 text-center">
                      <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Select a property request to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Active Listings */}
          <TabsContent value="listings">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Active Property Listings</h2>
                <Button
                  onClick={() => setShowAddPropertyModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Property
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {activeListings.length > 0 ? (
                  activeListings.map((listing) => (
                    <Card
                      key={listing.id}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="text-lg font-semibold text-white">{listing.title}</h3>
                                <p className="text-gray-400">Owner: {listing.owner}</p>
                                <p className="text-gray-400 text-sm">Listed: {listing.listedAt}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge className="bg-yellow-500 text-black">{listing.price}</Badge>
                                <Badge variant="outline" className="border-gray-600 text-gray-400">
                                  {listing.type === "sale" ? "For Sale" : "For Rent"}
                                </Badge>
                                {listing.plan && (
                                  <Badge className="bg-purple-500 text-white capitalize">{listing.plan}</Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <div className="text-center">
                              <p className="text-white font-semibold">{listing.views}</p>
                              <p>Views</p>
                            </div>
                            <div className="text-center">
                              <p className="text-white font-semibold">{listing.inquiries}</p>
                              <p>Inquiries</p>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Link href={`/property/${listing.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-600 text-white hover:bg-gray-800"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-white hover:bg-gray-800"
                              onClick={() => alert("Edit functionality would open edit modal")}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-white hover:bg-gray-800"
                              onClick={() => handleDuplicateListing(listing.id)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Duplicate
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteListing(listing.id)}>
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardContent className="p-12 text-center">
                      <Home className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No active listings</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Pricing Settings */}
          <TabsContent value="pricing">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Pricing Configuration</CardTitle>
                <CardDescription>Update the pricing for listing packages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="basic-price" className="text-white">
                      Basic Listing Price (€)
                    </Label>
                    <Input
                      id="basic-price"
                      type="number"
                      value={pricingSettings.basic}
                      onChange={(e) => setPricingSettings({ ...pricingSettings, basic: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="featured-price" className="text-white">
                      Featured Listing Price (€)
                    </Label>
                    <Input
                      id="featured-price"
                      type="number"
                      value={pricingSettings.featured}
                      onChange={(e) => setPricingSettings({ ...pricingSettings, featured: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="premium-price" className="text-white">
                      Premium Certified Price (€)
                    </Label>
                    <Input
                      id="premium-price"
                      type="number"
                      value={pricingSettings.premium}
                      onChange={(e) => setPricingSettings({ ...pricingSettings, premium: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleUpdatePricing} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Save className="w-4 h-4 mr-2" />
                  Update Pricing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Property</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Property Title *</Label>
                    <Input
                      value={newPropertyData.title}
                      onChange={(e) => setNewPropertyData({ ...newPropertyData, title: e.target.value })}
                      placeholder="e.g., Modern 3BR Apartment"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Property Type *</Label>
                    <Select
                      value={newPropertyData.propertyType}
                      onValueChange={(value) => setNewPropertyData({ ...newPropertyData, propertyType: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {["Apartment", "House", "Villa", "Commercial", "Office", "Land", "Warehouse", "Studio"].map(
                          (type) => (
                            <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                              {type}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={newPropertyData.description}
                    onChange={(e) => setNewPropertyData({ ...newPropertyData, description: e.target.value })}
                    placeholder="Property description..."
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Price and Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-white">Price *</Label>
                    <Input
                      type="number"
                      value={newPropertyData.price}
                      onChange={(e) => setNewPropertyData({ ...newPropertyData, price: e.target.value })}
                      placeholder="120000"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Listing Type</Label>
                    <Select
                      value={newPropertyData.priceType}
                      onValueChange={(value) => setNewPropertyData({ ...newPropertyData, priceType: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="sale" className="text-white hover:bg-gray-700">
                          For Sale
                        </SelectItem>
                        <SelectItem value="rent" className="text-white hover:bg-gray-700">
                          For Rent
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">City</Label>
                    <Select
                      value={newPropertyData.city}
                      onValueChange={(value) => setNewPropertyData({ ...newPropertyData, city: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {[
                          "Pristina",
                          "Prizren",
                          "Peja",
                          "Gjakova",
                          "Gjilan",
                          "Mitrovica",
                          "Ferizaj",
                          "Vushtrri",
                          "Suhareka",
                          "Rahovec",
                          "Lipjan",
                          "Podujeva",
                        ].map((city) => (
                          <SelectItem key={city} value={city} className="text-white hover:bg-gray-700">
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-white">Address</Label>
                  <Input
                    value={newPropertyData.address}
                    onChange={(e) => setNewPropertyData({ ...newPropertyData, address: e.target.value })}
                    placeholder="Street address"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-white">Area (m²)</Label>
                    <Input
                      type="number"
                      value={newPropertyData.area}
                      onChange={(e) => setNewPropertyData({ ...newPropertyData, area: e.target.value })}
                      placeholder="85"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Bedrooms</Label>
                    <Input
                      type="number"
                      value={newPropertyData.bedrooms}
                      onChange={(e) => setNewPropertyData({ ...newPropertyData, bedrooms: e.target.value })}
                      placeholder="3"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Bathrooms</Label>
                    <Input
                      type="number"
                      value={newPropertyData.bathrooms}
                      onChange={(e) => setNewPropertyData({ ...newPropertyData, bathrooms: e.target.value })}
                      placeholder="2"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Year Built</Label>
                    <Input
                      type="number"
                      value={newPropertyData.yearBuilt}
                      onChange={(e) => setNewPropertyData({ ...newPropertyData, yearBuilt: e.target.value })}
                      placeholder="2020"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-4">
                  <Label className="text-white font-semibold flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-yellow-400" />
                    Property Photos
                  </Label>

                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500/50 transition-colors">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">Upload property images (max 10 images)</p>
                    <p className="text-gray-500 text-sm mb-4">Supported formats: JPG, PNG, GIF, WebP (Max 10MB each)</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleNewPropertyImageUpload}
                      className="hidden"
                      id="admin-image-upload"
                      key={newPropertyData.images.length} // Force re-render to clear input
                    />
                    <label htmlFor="admin-image-upload" className="cursor-pointer">
                      <div className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Photos from Device
                      </div>
                    </label>
                  </div>

                  {newPropertyData.images.length > 0 && (
                    <div>
                      <p className="text-white font-medium mb-2">
                        Uploaded Images ({newPropertyData.images.length}/10):
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {newPropertyData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image) || "/placeholder.svg"}
                              alt={`Property ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-600"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                              onClick={() => removeNewPropertyImage(index)}
                            >
                              ×
                            </Button>
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddPropertyModal(false)}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddNewProperty} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Save className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
