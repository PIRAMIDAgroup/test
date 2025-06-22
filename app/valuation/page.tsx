"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Home, ArrowLeft, Calculator, TrendingUp, MapPin, Send, CheckCircle, Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const kosovoCities = [
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
]

const propertyTypes = ["Apartment", "House", "Villa", "Commercial", "Office", "Land", "Warehouse"]

const propertyConditions = ["Excellent", "Very Good", "Good", "Fair", "Needs Renovation"]

const valuationFeatures = [
  {
    title: "Comprehensive Market Analysis",
    description: "Detailed analysis of comparable properties in your area",
    icon: TrendingUp,
  },
  {
    title: "Professional Assessment",
    description: "Expert evaluation by certified real estate professionals",
    icon: Star,
  },
  {
    title: "Current Market Value",
    description: "Up-to-date valuation based on current market conditions",
    icon: Calculator,
  },
  {
    title: "Location Analysis",
    description: "Detailed neighborhood and location factor assessment",
    icon: MapPin,
  },
]

export default function ValuationPage() {
  const [formData, setFormData] = useState({
    propertyType: "",
    city: "",
    address: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    yearBuilt: "",
    condition: "",
    floor: "",
    totalFloors: "",
    parking: "",
    balcony: "",
    garden: "",
    description: "",
    ownerName: "",
    email: "",
    phone: "",
    preferredContact: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Valuation Request Submitted!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for your valuation request. Our expert team will analyze your property and send you a
            comprehensive valuation report within 24-48 hours.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  propertyType: "",
                  city: "",
                  address: "",
                  area: "",
                  bedrooms: "",
                  bathrooms: "",
                  yearBuilt: "",
                  condition: "",
                  floor: "",
                  totalFloors: "",
                  parking: "",
                  balcony: "",
                  garden: "",
                  description: "",
                  ownerName: "",
                  email: "",
                  phone: "",
                  preferredContact: "",
                })
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full"
            >
              Submit Another Request
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
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
            <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Free Property Valuation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get an accurate, professional valuation of your property from Kosovo's leading real estate experts.
              Completely free with no obligations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg">100% Free</Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">No Obligation</Badge>
              <Badge className="bg-purple-500 text-white px-4 py-2 text-lg">24-48h Delivery</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Valuation Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calculator className="w-6 h-6 mr-2 text-yellow-400" />
                    Property Valuation Request
                  </CardTitle>
                  <CardDescription>
                    Please provide detailed information about your property for an accurate valuation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Property Basic Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                        Property Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Property Type *</label>
                          <Select
                            value={formData.propertyType}
                            onValueChange={(value) => handleInputChange("propertyType", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              {propertyTypes.map((type) => (
                                <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">City *</label>
                          <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              {kosovoCities.map((city) => (
                                <SelectItem key={city} value={city} className="text-white hover:bg-gray-700">
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Full Address *</label>
                        <Input
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Street name, number, neighborhood"
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Area (m²) *</label>
                          <Input
                            type="number"
                            value={formData.area}
                            onChange={(e) => handleInputChange("area", e.target.value)}
                            placeholder="85"
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Bedrooms</label>
                          <Input
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                            placeholder="3"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Bathrooms</label>
                          <Input
                            type="number"
                            value={formData.bathrooms}
                            onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                            placeholder="2"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Year Built</label>
                          <Input
                            type="number"
                            value={formData.yearBuilt}
                            onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                            placeholder="2020"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Floor</label>
                          <Input
                            value={formData.floor}
                            onChange={(e) => handleInputChange("floor", e.target.value)}
                            placeholder="3"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Total Floors</label>
                          <Input
                            value={formData.totalFloors}
                            onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                            placeholder="5"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Property Condition *</label>
                        <Select
                          value={formData.condition}
                          onValueChange={(value) => handleInputChange("condition", value)}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {propertyConditions.map((condition) => (
                              <SelectItem key={condition} value={condition} className="text-white hover:bg-gray-700">
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Parking</label>
                          <Select
                            value={formData.parking}
                            onValueChange={(value) => handleInputChange("parking", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="yes" className="text-white hover:bg-gray-700">
                                Yes
                              </SelectItem>
                              <SelectItem value="no" className="text-white hover:bg-gray-700">
                                No
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Balcony</label>
                          <Select
                            value={formData.balcony}
                            onValueChange={(value) => handleInputChange("balcony", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="yes" className="text-white hover:bg-gray-700">
                                Yes
                              </SelectItem>
                              <SelectItem value="no" className="text-white hover:bg-gray-700">
                                No
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Garden</label>
                          <Select value={formData.garden} onValueChange={(value) => handleInputChange("garden", value)}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="yes" className="text-white hover:bg-gray-700">
                                Yes
                              </SelectItem>
                              <SelectItem value="no" className="text-white hover:bg-gray-700">
                                No
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Additional Details</label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Any additional information about your property (renovations, special features, etc.)"
                          className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                        Contact Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                          <Input
                            value={formData.ownerName}
                            onChange={(e) => handleInputChange("ownerName", e.target.value)}
                            placeholder="Your full name"
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your@email.com"
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Phone Number *</label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+383 XX XXX XXX"
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Preferred Contact Method</label>
                          <Select
                            value={formData.preferredContact}
                            onValueChange={(value) => handleInputChange("preferredContact", value)}
                          >
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="email" className="text-white hover:bg-gray-700">
                                Email
                              </SelectItem>
                              <SelectItem value="phone" className="text-white hover:bg-gray-700">
                                Phone
                              </SelectItem>
                              <SelectItem value="both" className="text-white hover:bg-gray-700">
                                Both
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                            Processing Request...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="w-4 h-4 mr-2" />
                            Get Free Valuation
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What You Get */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">What You'll Receive</CardTitle>
                  <CardDescription>Comprehensive valuation report includes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {valuationFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                        <p className="text-gray-400 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Process Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Valuation Process</CardTitle>
                  <CardDescription>How it works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: 1, title: "Submit Request", time: "2 minutes" },
                    { step: 2, title: "Property Analysis", time: "24 hours" },
                    { step: 3, title: "Market Research", time: "12 hours" },
                    { step: 4, title: "Report Delivery", time: "Email sent" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{item.title}</p>
                        <p className="text-gray-400 text-xs">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Need Help?</CardTitle>
                  <CardDescription>Our experts are here to assist you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-300 text-sm">
                    Have questions about the valuation process? Our team is ready to help.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-white">📞 +383 38 123 456</p>
                    <p className="text-white">✉️ valuation@piramidagroup.net</p>
                    <p className="text-white">🕒 Mon-Fri: 9:00-18:00</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
