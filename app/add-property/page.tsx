"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Home, Upload, ArrowLeft, Camera, Send, Euro, Bed, Bath, Square, Calendar, CheckCircle } from "lucide-react"
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

const propertyTypes = ["Apartment", "House", "Villa", "Commercial", "Office", "Land", "Warehouse", "Studio"]

const amenities = [
  "Parking",
  "Balcony",
  "Garden",
  "Elevator",
  "Central Heating",
  "Air Conditioning",
  "Swimming Pool",
  "Gym",
  "Security",
  "Furnished",
  "Fireplace",
  "Basement",
  "Attic",
  "Garage",
  "Terrace",
  "Storage Room",
]

export default function AddPropertyPage() {
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    priceType: "sale", // sale or rent
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
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePropertyDataChange = (field: string, value: any) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleAmenityToggle = (amenity: string) => {
    setPropertyData((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((a) => a !== amenity)
        : [...prev.selectedAmenities, amenity],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setPropertyData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 10), // Limit to 10 images
      }))
    }
  }

  const removeImage = (index: number) => {
    setPropertyData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!propertyData.title.trim()) newErrors.title = "Property title is required"
    if (!propertyData.description.trim()) newErrors.description = "Description is required"
    if (!propertyData.price.trim()) newErrors.price = "Price is required"
    if (!propertyData.propertyType) newErrors.propertyType = "Property type is required"
    if (!propertyData.city) newErrors.city = "City is required"
    if (!propertyData.address.trim()) newErrors.address = "Address is required"
    if (!propertyData.area.trim()) newErrors.area = "Area is required"
    if (!propertyData.ownerName.trim()) newErrors.ownerName = "Owner name is required"
    if (!propertyData.ownerEmail.trim()) newErrors.ownerEmail = "Email is required"
    if (!propertyData.ownerPhone.trim()) newErrors.ownerPhone = "Phone number is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (propertyData.ownerEmail && !emailRegex.test(propertyData.ownerEmail)) {
      newErrors.ownerEmail = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store submission in localStorage (in real app, this would be sent to backend)
      const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
      const newSubmission = {
        id: Date.now(),
        ...propertyData,
        submittedAt: new Date().toISOString(),
        status: "pending",
      }
      submissions.push(newSubmission)
      localStorage.setItem("propertySubmissions", JSON.stringify(submissions))

      setSubmitted(true)
    } catch (error) {
      alert("Error submitting property. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setPropertyData({
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
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
    })
    setErrors({})
  }

  if (submitted) {
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
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Property Submitted Successfully!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for submitting your property! Our team will review your listing and contact you within 24-48
              hours with next steps.
            </p>
            <div className="space-y-4">
              <Button onClick={resetForm} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full">
                Add Another Property
              </Button>
              <Link href="/" className="block">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
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
              Add Your Property
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              List your property with Kosovo's premier real estate platform and reach thousands of potential buyers and
              renters
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Home className="w-6 h-6 mr-2 text-yellow-400" />
                  Property Details
                </CardTitle>
                <CardDescription>Please provide detailed information about your property</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                      Basic Information
                    </h3>

                    <div>
                      <label className="block text-white font-medium mb-2">Property Title *</label>
                      <Input
                        id="title"
                        value={propertyData.title}
                        onChange={(e) => handlePropertyDataChange("title", e.target.value)}
                        placeholder="e.g., Modern 3BR Apartment in Pristina Center"
                        className={`bg-gray-800 border-gray-600 text-white ${errors.title ? "border-red-500" : ""}`}
                      />
                      {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Description *</label>
                      <Textarea
                        id="description"
                        value={propertyData.description}
                        onChange={(e) => handlePropertyDataChange("description", e.target.value)}
                        placeholder="Describe your property in detail - location, features, condition, nearby amenities..."
                        className={`bg-gray-800 border-gray-600 text-white min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                      />
                      {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Property Type *</label>
                        <Select
                          value={propertyData.propertyType}
                          onValueChange={(value) => handlePropertyDataChange("propertyType", value)}
                        >
                          <SelectTrigger
                            className={`bg-gray-800 border-gray-600 text-white ${errors.propertyType ? "border-red-500" : ""}`}
                          >
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
                        {errors.propertyType && <p className="text-red-400 text-sm mt-1">{errors.propertyType}</p>}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">City *</label>
                        <Select
                          value={propertyData.city}
                          onValueChange={(value) => handlePropertyDataChange("city", value)}
                        >
                          <SelectTrigger
                            className={`bg-gray-800 border-gray-600 text-white ${errors.city ? "border-red-500" : ""}`}
                          >
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
                        {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Full Address *</label>
                      <Input
                        id="address"
                        value={propertyData.address}
                        onChange={(e) => handlePropertyDataChange("address", e.target.value)}
                        placeholder="Street name, number, neighborhood"
                        className={`bg-gray-800 border-gray-600 text-white ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                    </div>
                  </div>

                  {/* Price Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 flex items-center">
                      <Euro className="w-5 h-5 mr-2 text-yellow-400" />
                      Price Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Listing Type *</label>
                        <div className="flex bg-gray-800 border border-gray-600 rounded-md">
                          <Button
                            type="button"
                            variant={propertyData.priceType === "sale" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePropertyDataChange("priceType", "sale")}
                            className={
                              propertyData.priceType === "sale"
                                ? "bg-yellow-500 text-black hover:bg-yellow-600 flex-1 rounded-r-none"
                                : "text-white hover:bg-gray-700 flex-1 rounded-r-none"
                            }
                          >
                            For Sale
                          </Button>
                          <Button
                            type="button"
                            variant={propertyData.priceType === "rent" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePropertyDataChange("priceType", "rent")}
                            className={
                              propertyData.priceType === "rent"
                                ? "bg-yellow-500 text-black hover:bg-yellow-600 flex-1 rounded-l-none"
                                : "text-white hover:bg-gray-700 flex-1 rounded-l-none"
                            }
                          >
                            For Rent
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Price * {propertyData.priceType === "rent" ? "(per month)" : ""}
                        </label>
                        <div className="relative">
                          <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="price"
                            type="number"
                            value={propertyData.price}
                            onChange={(e) => handlePropertyDataChange("price", e.target.value)}
                            placeholder={propertyData.priceType === "sale" ? "120000" : "800"}
                            className={`bg-gray-800 border-gray-600 text-white pl-10 ${errors.price ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 flex items-center">
                      <Square className="w-5 h-5 mr-2 text-yellow-400" />
                      Property Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2 flex items-center">
                          <Square className="w-4 h-4 mr-2 text-yellow-400" />
                          Area (m²) *
                        </label>
                        <Input
                          id="area"
                          type="number"
                          value={propertyData.area}
                          onChange={(e) => handlePropertyDataChange("area", e.target.value)}
                          placeholder="85"
                          className={`bg-gray-800 border-gray-600 text-white ${errors.area ? "border-red-500" : ""}`}
                        />
                        {errors.area && <p className="text-red-400 text-sm mt-1">{errors.area}</p>}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 flex items-center">
                          <Bed className="w-4 h-4 mr-2 text-yellow-400" />
                          Bedrooms
                        </label>
                        <Input
                          type="number"
                          value={propertyData.bedrooms}
                          onChange={(e) => handlePropertyDataChange("bedrooms", e.target.value)}
                          placeholder="3"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 flex items-center">
                          <Bath className="w-4 h-4 mr-2 text-yellow-400" />
                          Bathrooms
                        </label>
                        <Input
                          type="number"
                          value={propertyData.bathrooms}
                          onChange={(e) => handlePropertyDataChange("bathrooms", e.target.value)}
                          placeholder="2"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                          Year Built
                        </label>
                        <Input
                          type="number"
                          value={propertyData.yearBuilt}
                          onChange={(e) => handlePropertyDataChange("yearBuilt", e.target.value)}
                          placeholder="2020"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Floor</label>
                        <Input
                          value={propertyData.floor}
                          onChange={(e) => handlePropertyDataChange("floor", e.target.value)}
                          placeholder="3"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Total Floors</label>
                        <Input
                          value={propertyData.totalFloors}
                          onChange={(e) => handlePropertyDataChange("totalFloors", e.target.value)}
                          placeholder="5"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                      Property Amenities
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={propertyData.selectedAmenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityToggle(amenity)}
                            className="border-gray-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                          />
                          <label htmlFor={amenity} className="text-sm text-gray-300 cursor-pointer">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>

                    {propertyData.selectedAmenities.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Selected Amenities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {propertyData.selectedAmenities.map((amenity) => (
                            <Badge key={amenity} className="bg-yellow-500 text-black">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Images */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-yellow-400" />
                      Property Images
                    </h3>

                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-500/50 transition-colors">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">Upload property images (max 10 images)</p>
                      <p className="text-gray-500 text-sm mb-4">
                        High-quality images help attract more potential buyers/renters
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Images
                        </Button>
                      </label>
                    </div>

                    {propertyData.images.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium mb-2">
                          Uploaded Images ({propertyData.images.length}/10):
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {propertyData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                alt={`Property ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                      Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Your Name *</label>
                        <Input
                          id="ownerName"
                          value={propertyData.ownerName}
                          onChange={(e) => handlePropertyDataChange("ownerName", e.target.value)}
                          placeholder="Your full name"
                          className={`bg-gray-800 border-gray-600 text-white ${errors.ownerName ? "border-red-500" : ""}`}
                        />
                        {errors.ownerName && <p className="text-red-400 text-sm mt-1">{errors.ownerName}</p>}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Email Address *</label>
                        <Input
                          id="ownerEmail"
                          type="email"
                          value={propertyData.ownerEmail}
                          onChange={(e) => handlePropertyDataChange("ownerEmail", e.target.value)}
                          placeholder="your@email.com"
                          className={`bg-gray-800 border-gray-600 text-white ${errors.ownerEmail ? "border-red-500" : ""}`}
                        />
                        {errors.ownerEmail && <p className="text-red-400 text-sm mt-1">{errors.ownerEmail}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Phone Number *</label>
                      <Input
                        id="ownerPhone"
                        type="tel"
                        value={propertyData.ownerPhone}
                        onChange={(e) => handlePropertyDataChange("ownerPhone", e.target.value)}
                        placeholder="+383 XX XXX XXX"
                        className={`bg-gray-800 border-gray-600 text-white ${errors.ownerPhone ? "border-red-500" : ""}`}
                      />
                      {errors.ownerPhone && <p className="text-red-400 text-sm mt-1">{errors.ownerPhone}</p>}
                      <p className="text-sm text-gray-400 mt-1">
                        This number will be displayed on your property listing for interested buyers/renters to contact
                        you
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                            Submitting Property...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="w-5 h-5 mr-2" />
                            Submit Property for Review
                          </div>
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-center text-sm text-gray-400 mt-4">
                      By submitting, you agree that our team will review your property and contact you within 24-48
                      hours. Your contact information will be displayed on the listing once approved.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
