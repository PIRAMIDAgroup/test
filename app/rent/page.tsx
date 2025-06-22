"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Home, Bed, Bath, Square, Star, Heart, Filter, ArrowLeft, Calendar } from "lucide-react"
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

const propertyTypes = ["All Types", "Apartment", "House", "Studio", "Commercial", "Office"]

const propertiesForRent = [
  {
    id: 1,
    title: "Cozy Studio in City Center",
    price: "€400/month",
    location: "Pristina Center",
    beds: 1,
    baths: 1,
    area: "45m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    certified: true,
    description: "Perfect studio apartment for students or young professionals, fully furnished.",
    propertyType: "Studio",
    city: "Pristina",
    furnished: true,
    available: "Immediately",
  },
  {
    id: 2,
    title: "Modern 2BR Apartment",
    price: "€650/month",
    location: "Pristina New District",
    beds: 2,
    baths: 1,
    area: "70m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    certified: false,
    description: "Newly renovated apartment with modern amenities and parking space.",
    propertyType: "Apartment",
    city: "Pristina",
    furnished: false,
    available: "March 1st",
  },
  {
    id: 3,
    title: "Family House with Garden",
    price: "€800/month",
    location: "Prizren Suburbs",
    beds: 3,
    baths: 2,
    area: "120m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    certified: true,
    description: "Spacious family house with private garden, perfect for families with children.",
    propertyType: "House",
    city: "Prizren",
    furnished: true,
    available: "February 15th",
  },
  {
    id: 4,
    title: "Commercial Space Downtown",
    price: "€1,200/month",
    location: "Peja Center",
    beds: 0,
    baths: 2,
    area: "100m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    certified: false,
    description: "Prime commercial location perfect for retail or office space with high visibility.",
    propertyType: "Commercial",
    city: "Peja",
    furnished: false,
    available: "Immediately",
  },
  {
    id: 5,
    title: "Luxury Apartment with Balcony",
    price: "€750/month",
    location: "Gjakova Center",
    beds: 2,
    baths: 2,
    area: "85m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    certified: true,
    description: "High-end apartment with beautiful balcony views and premium finishes.",
    propertyType: "Apartment",
    city: "Gjakova",
    furnished: true,
    available: "March 15th",
  },
  {
    id: 6,
    title: "Office Space in Business District",
    price: "€900/month",
    location: "Gjilan Business Park",
    beds: 0,
    baths: 1,
    area: "80m²",
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    certified: true,
    description: "Modern office space in new business district with parking and security.",
    propertyType: "Office",
    city: "Gjilan",
    furnished: false,
    available: "April 1st",
  },
]

export default function RentPage() {
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedType, setSelectedType] = useState("All Types")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [furnishedOnly, setFurnishedOnly] = useState(false)

  const filteredProperties = propertiesForRent.filter((property) => {
    const matchesCity = selectedCity === "All Cities" || property.city === selectedCity
    const matchesType = selectedType === "All Types" || property.propertyType === selectedType
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    const price = Number.parseInt(property.price.replace(/[€,/month]/g, ""))
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
    const matchesFurnished = !furnishedOnly || property.furnished

    return matchesCity && matchesType && matchesSearch && matchesPrice && matchesFurnished
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
              Rent Property in Kosovo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find your perfect rental home from our curated selection of apartments, houses, and commercial spaces
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
                  placeholder="Search rental properties..."
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
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-700 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Monthly Rent: €{priceRange[0]} - €{priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  {/* Furnished Filter */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="furnished"
                      checked={furnishedOnly}
                      onChange={(e) => setFurnishedOnly(e.target.checked)}
                      className="rounded border-gray-600"
                    />
                    <label htmlFor="furnished" className="text-white font-medium">
                      Furnished only
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{filteredProperties.length} Properties for Rent</h2>
            <p className="text-gray-400">
              {selectedCity !== "All Cities" && `in ${selectedCity}`}
              {selectedType !== "All Types" && ` • ${selectedType}`}
              {furnishedOnly && " • Furnished"}
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
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    {property.featured && <Badge className="bg-yellow-500 text-black">Featured</Badge>}
                    {property.certified && (
                      <Badge className="bg-blue-500 text-white flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Certified
                      </Badge>
                    )}
                    {property.furnished && <Badge className="bg-green-500 text-white">Furnished</Badge>}
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

                  <p className="text-gray-400 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    {property.location}
                  </p>

                  <p className="text-green-400 mb-4 flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Available: {property.available}
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
                setPriceRange([0, 2000])
                setFurnishedOnly(false)
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Rental Guide */}
        <section className="mt-16 py-12 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Rental Guide</h2>
            <p className="text-gray-300">Everything you need to know about renting in Kosovo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Documentation",
                description: "Required documents for rental applications",
                icon: "📋",
              },
              {
                title: "Tenant Rights",
                description: "Know your rights and responsibilities as a tenant",
                icon: "⚖️",
              },
              {
                title: "Moving Tips",
                description: "Expert advice for a smooth moving process",
                icon: "📦",
              },
            ].map((guide, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-400">{guide.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
