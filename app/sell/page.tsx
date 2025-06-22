"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Home, Upload, Camera, CheckCircle, ArrowLeft, X } from "lucide-react"
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

const amenitiesList = [
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
  "Pet Friendly",
  "Fireplace",
]

export default function SellPropertyPage() {
  const [formData, setFormData] = useState({
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
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  })

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      const validImages = newImages.filter((file) => {
        const isValidType = file.type.startsWith("image/")
        const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit
        return isValidType && isValidSize
      })

      if (validImages.length !== newImages.length) {
        alert("Some files were skipped. Only image files under 10MB are allowed.")
      }

      const remainingSlots = 10 - images.length
      const filesToAdd = validImages.slice(0, remainingSlots)

      if (filesToAdd.length < validImages.length) {
        alert(`Only ${filesToAdd.length} images were added due to the 10 image limit.`)
      }

      setImages((prev) => [...prev, ...filesToAdd])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload images to Vercel Blob
      const imageUrls: string[] = []

      if (images.length > 0) {
        for (const image of images) {
          const formDataUpload = new FormData()
          formDataUpload.append("file", image)

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formDataUpload,
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

      // Create submission object
      const submission = {
        id: Date.now(),
        ...formData,
        selectedAmenities,
        images: imageUrls,
        submittedAt: new Date().toISOString(),
        status: "pending",
      }

      // Save to localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
      existingSubmissions.push(submission)
      localStorage.setItem("propertySubmissions", JSON.stringify(existingSubmissions))

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting property:", error)
      alert("Error submitting property. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Property Submitted!</h1>
          <p className="text-gray-300 mb-6">
            Your property has been submitted for review. Our team will contact you within 24 hours.
          </p>
          <Link href="/">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Return to Home</Button>
          </Link>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              List Your Property
            </h1>
            <p className="text-xl text-gray-300">Get your property in front of thousands of potential buyers</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
                <CardDescription>Tell us about your property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-white">
                      Property Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Modern 3BR Apartment in City Center"
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType" className="text-white">
                      Property Type *
                    </Label>
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
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your property in detail..."
                    className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Price and Location */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Price & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="price" className="text-white">
                      Price (€) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="120000"
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceType" className="text-white">
                      Listing Type *
                    </Label>
                    <Select value={formData.priceType} onValueChange={(value) => handleInputChange("priceType", value)}>
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
                    <Label htmlFor="city" className="text-white">
                      City *
                    </Label>
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
                  <Label htmlFor="address" className="text-white">
                    Full Address *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Street name, number, neighborhood"
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="area" className="text-white">
                      Area (m²) *
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      placeholder="85"
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms" className="text-white">
                      Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                      placeholder="3"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms" className="text-white">
                      Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                      placeholder="2"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearBuilt" className="text-white">
                      Year Built
                    </Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                      placeholder="2020"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="floor" className="text-white">
                      Floor
                    </Label>
                    <Input
                      id="floor"
                      value={formData.floor}
                      onChange={(e) => handleInputChange("floor", e.target.value)}
                      placeholder="2nd floor"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalFloors" className="text-white">
                      Total Floors in Building
                    </Label>
                    <Input
                      id="totalFloors"
                      type="number"
                      value={formData.totalFloors}
                      onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                      placeholder="5"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Amenities</CardTitle>
                <CardDescription>Select all amenities that apply to your property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                        className="border-gray-600"
                      />
                      <Label htmlFor={amenity} className="text-white text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedAmenities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-white font-medium mb-2">Selected amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAmenities.map((amenity) => (
                        <Badge key={amenity} variant="outline" className="border-yellow-500 text-yellow-400">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-yellow-400" />
                  Property Photos
                </CardTitle>
                <CardDescription>Upload high-quality photos of your property (max 10 images)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-500/50 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Upload property images (max 10 images)</p>
                  <p className="text-gray-500 text-sm mb-4">Supported formats: JPG, PNG, GIF, WebP (Max 10MB each)</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    key={images.length} // Force re-render to clear input
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors">
                      <Upload className="w-5 h-5 mr-2" />
                      Choose Photos from Device
                    </div>
                  </label>
                </div>

                {images.length > 0 && (
                  <div>
                    <p className="text-white font-medium mb-4">Uploaded Images ({images.length}/10):</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`Property ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-600"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription>How can potential buyers reach you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerName" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      placeholder="Your full name"
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                      placeholder="+383 44 123 456"
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ownerEmail" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-12 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Uploading Images & Submitting...
                  </>
                ) : (
                  "Submit Property for Review"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
