"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  Star,
  ArrowLeft,
  Car,
  Wifi,
  Shield,
  TreePine,
  Dumbbell,
  Waves,
  Home,
  Printer,
  Map,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function PropertyDetailsPage() {
  const params = useParams()
  const [property, setProperty] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const handlePrint = () => {
    window.print()
  }
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  useEffect(() => {
    // Load property details from both localStorage sources
    const activeListings = JSON.parse(localStorage.getItem("activeListings") || "[]")
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")

    // Find property in active listings first
    let foundProperty = activeListings.find((p: any) => p.id.toString() === params.id)

    if (!foundProperty) {
      // Then check in submissions
      foundProperty = submissions.find((p: any) => p.id.toString() === params.id)
    }

    if (foundProperty) {
      // Enhance property data with additional details
      const enhancedProperty = {
        ...foundProperty,
        images: foundProperty.images || [
          foundProperty.image || "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        amenities: foundProperty.selectedAmenities ||
          foundProperty.amenities || ["Parking", "Balcony", "Central Heating"],
        features: ["Modern Kitchen", "Hardwood Floors", "Large Windows", "Storage Space"],
        nearbyPlaces: [
          { name: "Shopping Mall", distance: "0.5 km" },
          { name: "School", distance: "0.8 km" },
          { name: "Hospital", distance: "1.2 km" },
          { name: "Bus Stop", distance: "0.2 km" },
        ],
        // Ensure all required fields are present
        ownerName: foundProperty.ownerName || foundProperty.owner || "Sami Spahiu",
        ownerEmail: foundProperty.ownerEmail || "info@piramidagroup.com",
        ownerPhone: foundProperty.ownerPhone || "+383 44 613 293",
        address: foundProperty.address || foundProperty.location,
        city: foundProperty.city || foundProperty.location,
        description:
          foundProperty.description || `Beautiful property in ${foundProperty.city || foundProperty.location}`,
      }
      setProperty(enhancedProperty)
    }
  }, [params.id])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store inquiry
    const inquiries = JSON.parse(localStorage.getItem("propertyInquiries") || "[]")
    const newInquiry = {
      id: Date.now(),
      propertyId: params.id,
      propertyTitle: property.title,
      ...contactForm,
      submittedAt: new Date().toISOString(),
    }
    inquiries.push(newInquiry)
    localStorage.setItem("propertyInquiries", JSON.stringify(inquiries))

    setContactSubmitted(true)
    setContactForm({ name: "", email: "", phone: "", message: "" })
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-yellow-400">PIRAMIDA Group</span>
            </Link>
            <Link href="/properties" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                <span>{property.address || property.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
                  €{property.price}
                  {property.priceType === "rent" ? "/month" : ""}
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  {property.priceType === "sale" ? "For Sale" : "For Rent"}
                </Badge>
                {property.featured && <Badge className="bg-blue-500 text-white">Featured</Badge>}
                {property.certified && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Certified
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className="border-gray-600 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 btn-white-to-yellow"
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 btn-white-to-yellow">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 btn-white-to-yellow" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>

          {/* Property Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {property.area && (
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Square className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{property.area}m²</p>
                <p className="text-gray-400 text-sm">Area</p>
              </div>
            )}
            {property.bedrooms && (
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Bed className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{property.bedrooms}</p>
                <p className="text-gray-400 text-sm">Bedrooms</p>
              </div>
            )}
            {property.bathrooms && (
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Bath className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{property.bathrooms}</p>
                <p className="text-gray-400 text-sm">Bathrooms</p>
              </div>
            )}
            {property.yearBuilt && (
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{property.yearBuilt}</p>
                <p className="text-gray-400 text-sm">Year Built</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-gray-900/50 border border-gray-700">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Image Gallery */}
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                        <div className="md:col-span-2">
                          <Image
                            src={property.images[0] || "/placeholder.svg?height=400&width=800"}
                            alt={property.title}
                            width={800}
                            height={400}
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                          />
                        </div>
                        {property.images.slice(1, 3).map((image: string, index: number) => (
                          <Image
                            key={index}
                            src={image || "/placeholder.svg?height=200&width=400"}
                            alt={`${property.title} ${index + 2}`}
                            width={400}
                            height={200}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">{property.description}</p>
                    </CardContent>
                  </Card>

                  {/* Amenities */}
                  {property.amenities && property.amenities.length > 0 && (
                    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Amenities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {property.amenities.map((amenity: string, index: number) => (
                            <div key={index} className="flex items-center text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details">
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400">Property Type</p>
                          <p className="text-white font-semibold">{property.propertyType || property.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">City</p>
                          <p className="text-white font-semibold">{property.city}</p>
                        </div>
                        {property.floor && (
                          <div>
                            <p className="text-gray-400">Floor</p>
                            <p className="text-white font-semibold">{property.floor}</p>
                          </div>
                        )}
                        {property.totalFloors && (
                          <div>
                            <p className="text-gray-400">Total Floors</p>
                            <p className="text-white font-semibold">{property.totalFloors}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        {property.yearBuilt && (
                          <div>
                            <p className="text-gray-400">Year Built</p>
                            <p className="text-white font-semibold">{property.yearBuilt}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-400">Listing Type</p>
                          <p className="text-white font-semibold">
                            {property.priceType === "sale" ? "For Sale" : "For Rent"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status</p>
                          <Badge className="bg-green-500 text-white">Available</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location">
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Location & Nearby</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-400 mb-2">Address</p>
                        <p className="text-white">{property.address || property.location}</p>
                      </div>

                      {property.nearbyPlaces && (
                        <div>
                          <p className="text-gray-400 mb-4">Nearby Places</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {property.nearbyPlaces.map((place: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3"
                              >
                                <span className="text-white">{place.name}</span>
                                <span className="text-yellow-400">{place.distance}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Owner */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-yellow-400" />
                  Contact Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-white font-semibold">{property.ownerName || property.owner}</p>
                  <p className="text-gray-400">Property Owner</p>
                </div>

                {property.ownerPhone && (
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    +383 44 613 293
                  </Button>
                )}

                {property.ownerEmail && (
                  <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Owner
                  </Button>
                )}

                <Button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form Modal */}
            {showContactForm && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Send Message</CardTitle>
                  <CardDescription>Contact the property owner directly</CardDescription>
                </CardHeader>
                <CardContent>
                  {contactSubmitted ? (
                    <div className="text-center py-6">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-white font-semibold mb-2">Message Sent!</p>
                      <p className="text-gray-400 text-sm">The owner will contact you soon.</p>
                      <Button
                        onClick={() => {
                          setContactSubmitted(false)
                          setShowContactForm(false)
                        }}
                        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black"
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                      <Input
                        placeholder="Your Phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Textarea
                        placeholder="Your message..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                        required
                      />
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                          Send Message
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowContactForm(false)}
                          className="border-gray-600 text-white hover:bg-gray-800"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 btn-white-to-yellow">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 btn-white-to-yellow">
                  Request Info
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 btn-white-to-yellow">
                  Calculate Mortgage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}