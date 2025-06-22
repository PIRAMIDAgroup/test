"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Home, Bed, Bath, Square, Star, Heart, Filter, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const kosovoCities = [
  "All Cities",
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

const propertyTypes = ["All Types", "Apartment", "House", "Villa", "Commercial", "Land"]

const propertiesForSale = [
  {
    id: 1,
    title: "Modern Apartment in Pristina Center",
    price: "€120,000",
    location: "Pristina Center",
    beds: 3,
    baths: 2,
    area: "85m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    certified: true,
    description: "Beautiful modern apartment with city views, fully furnished, parking included.",
    propertyType: "Apartment",
    city: "Pristina",
    yearBuilt: 2020,
  },
  {
    id: 2,
    title: "Luxury Villa with Garden",
    price: "€350,000",
    location: "Prizren Hills",
    beds: 5,
    baths: 3,
    area: "220m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    certified: false,
    description: "Spacious villa with beautiful garden and mountain views, perfect for families.",
    propertyType: "Villa",
    city: "Prizren",
    yearBuilt: 2018,
  },
  {
    id: 3,
    title: "Investment Opportunity - Commercial Building",
    price: "€280,000",
    location: "Peja Center",
    beds: 0,
    baths: 4,
    area: "300m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    certified: true,
    description: "Prime commercial location perfect for retail or office space with high foot traffic.",
    propertyType: "Commercial",
    city: "Peja",
    yearBuilt: 2015,
  },
  {
    id: 4,
    title: "Family House with Large Yard",
    price: "€180,000",
    location: "Gjakova Suburbs",
    beds: 4,
    baths: 2,
    area: "150m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    certified: true,
    description: "Traditional house with modern amenities and large yard, quiet neighborhood.",
    propertyType: "House",
    city: "Gjakova",
    yearBuilt: 2010,
  },
  {
    id: 5,
    title: "New Construction Apartment",
    price: "€95,000",
    location: "Gjilan New District",
    beds: 2,
    baths: 1,
    area: "65m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    certified: false,
    description: "Brand new apartment in developing area with great investment potential.",
    propertyType: "Apartment",
    city: "Gjilan",
    yearBuilt: 2024,
  },
  {
    id: 6,
    title: "Building Land with Permits",
    price: "€45,000",
    location: "Mitrovica Outskirts",
    beds: 0,
    baths: 0,
    area: "800m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    certified: true,
    description: "Ready-to-build land with all permits and utilities, great for development.",
    propertyType: "Land",
    city: "Mitrovica",
    yearBuilt: 0,
  },
]

export default function BuyPage() {
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedType, setSelectedType] = useState("All Types")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProperties = propertiesForSale.filter((property) => {
    const matchesCity = selectedCity === "All Cities" || property.city === selectedCity
    const matchesType = selectedType === "All Types" || property.propertyType === selectedType
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    const price = Number.parseInt(property.price.replace(/[€,]/g, ""))
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

    return matchesCity && matchesType && matchesSearch && matchesPrice
  })

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
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
              Buy Property in Kosovo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover your dream property from our extensive collection of homes, apartments, and commercial spaces
              across Kosovo
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search properties for sale..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              {/* City Selector */}
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full lg:w-48 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {kosovoCities.map((city) => (
                    <SelectItem key={city} value={city} className="text-white hover:bg-gray-700">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Property Type */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-48 bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <Filter className="w-4 h-4 mr-2" />
                Price Filter
              </Button>
            </div>

            {/* Price Range Filter */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-700 pt-4"
              >
                <div className="max-w-md">
                  <label className="text-white font-medium mb-2 block">
                    Price Range: €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{filteredProperties.length} Properties for Sale</h2>
            <p className="text-gray-400">
              {selectedCity !== "All Cities" && `in ${selectedCity}`}
              {selectedType !== "All Types" && ` • ${selectedType}`}
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && <Badge className="bg-yellow-500 text-black">Featured</Badge>}
                    {property.certified && (
                      <Badge className="bg-blue-500 text-white flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Certified
                      </Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-yellow-400 font-bold">{property.price}</span>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors mb-2">
                    {property.title}
                  </h3>

                  <p className="text-gray-400 mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    {property.location}
                  </p>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{property.description}</p>

                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    {property.beds > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.beds}
                      </div>
                    )}
                    {property.baths > 0 && (
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.baths}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.area}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                      View Details
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Properties Found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCity("All Cities")
                setSelectedType("All Types")
                setPriceRange([0, 500000])
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Why Buy with PIRAMIDA Group */}
        <section className="mt-16 py-12 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Why Buy with PIRAMIDA Group?</h2>
            <p className="text-gray-300">Your trusted partner in Kosovo real estate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Guidance",
                description: "Professional advice throughout your buying journey",
                icon: "🏆",
              },
              {
                title: "Legal Support",
                description: "Complete legal assistance and documentation",
                icon: "📋",
              },
              {
                title: "Market Knowledge",
                description: "Deep understanding of Kosovo's property market",
                icon: "📊",
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
