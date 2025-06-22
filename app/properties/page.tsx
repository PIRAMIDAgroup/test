"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Home, Bed, Bath, Square, Star, Heart, Filter, Grid, List, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

const propertyTypes = ["All Types", "Apartment", "House", "Villa", "Commercial", "Land", "Office", "Premises", "Others"]

export default function PropertiesPage() {
  // Initialize state variables outside the useEffect hook
  const [properties, setProperties] = useState([])
  const [searchType, setSearchType] = useState("all")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedType, setSelectedType] = useState("All Types")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [favorites, setFavorites] = useState<number[]>([])

  const loadProperties = () => {
    const activeListings = JSON.parse(localStorage.getItem("activeListings") || "[]")
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")

    // Combine properties from both sources
    const combinedProperties = [
      // Active listings (admin-created properties)
      ...activeListings.map((listing: any) => ({
        id: listing.id,
        title: listing.title,
        price: listing.price.replace("€", "").split("/")[0],
        type: listing.type,
        location: listing.location || listing.city,
        beds: listing.beds || 0,
        baths: listing.baths || 0,
        area: listing.area,
        image: listing.image,
        featured: listing.featured,
        certified: listing.certified,
        description:
          listing.description || `Beautiful ${listing.title.toLowerCase()} in ${listing.location || listing.city}`,
        amenities: listing.amenities || ["Parking", "Balcony", "Central Heating"],
        yearBuilt: listing.yearBuilt || 2020,
        propertyType: listing.propertyType || "Apartment",
        city: listing.city || listing.location,
        images: listing.images || [listing.image],
        address: listing.address,
        floor: listing.floor,
        totalFloors: listing.totalFloors,
        ownerName: listing.owner,
        ownerEmail: "info@piramidagroup.com",
        ownerPhone: "+383 44 613 293",
      })),
      // Approved submissions (user-submitted properties)
      ...submissions
        .filter((sub: any) => sub.status === "approved")
        .map((sub: any) => ({
          id: sub.id,
          title: sub.title,
          price: sub.price,
          type: sub.priceType,
          location: sub.city,
          beds: Number.parseInt(sub.bedrooms) || 0,
          baths: Number.parseInt(sub.bathrooms) || 0,
          area: `${sub.area}m²`,
          image: sub.images?.[0] || "/placeholder.svg?height=300&width=400",
          featured: false,
          certified: true,
          description: sub.description,
          amenities: sub.selectedAmenities || [],
          yearBuilt: Number.parseInt(sub.yearBuilt) || 2020,
          propertyType: sub.propertyType,
          city: sub.city,
          images: sub.images || [],
          address: sub.address,
          floor: sub.floor,
          totalFloors: sub.totalFloors,
          ownerName: sub.ownerName,
          ownerEmail: sub.ownerEmail,
          ownerPhone: sub.ownerPhone,
        })),
    ]

    // Remove duplicates based on ID
    const uniqueProperties = combinedProperties.filter(
      (property, index, self) => index === self.findIndex((p) => p.id === property.id),
    )

    setProperties(uniqueProperties)
  }

  useEffect(() => {
    loadProperties()
  }, [])

  useEffect(() => {
    // Real-time sync with admin changes
    const handlePropertiesUpdate = () => {
      loadProperties()
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "activeListings" || e.key === "propertySubmissions") {
        loadProperties()
      }
    }

    // Listen for admin panel updates
    window.addEventListener("propertiesUpdated", handlePropertiesUpdate)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("propertiesUpdated", handlePropertiesUpdate)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const filteredProperties = properties.filter((property) => {
    const matchesType = searchType === "all" || property.type === searchType
    const matchesCity = selectedCity === "All Cities" || property.city === selectedCity
    const matchesPropertyType = selectedType === "All Types" || property.propertyType === selectedType
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Price filtering (simplified for demo)
    const price = Number.parseInt(property.price.replace(/[€,]/g, "").split("/")[0])
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

    return matchesType && matchesCity && matchesPropertyType && matchesSearch && matchesPrice
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Properties in Kosovo
          </h1>
          <p className="text-xl text-gray-300">Find your perfect property from our extensive collection</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
            <CardContent className="p-6">
              {/* Main Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                {/* Buy/Rent/All Toggle */}
                <div className="flex bg-gray-800/50 rounded-lg p-1">
                  {[
                    { value: "all", label: "All" },
                    { value: "sale", label: "Buy" },
                    { value: "rent", label: "Rent" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={searchType === option.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSearchType(option.value)}
                      className={
                        searchType === option.value
                          ? "bg-yellow-500 text-black hover:bg-yellow-600"
                          : "text-white hover:bg-gray-700"
                      }
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
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
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-700 pt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Price Range */}
                      <div>
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

                      {/* Amenities */}
                      <div>
                        <label className="text-white font-medium mb-2 block">Amenities</label>
                        <div className="space-y-2">
                          {["Parking", "Balcony", "Garden", "Elevator"].map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox id={amenity} className="border-gray-600" />
                              <label htmlFor={amenity} className="text-sm text-gray-300">
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sort Options */}
                      <div>
                        <label className="text-white font-medium mb-2 block">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="newest" className="text-white">
                              Newest First
                            </SelectItem>
                            <SelectItem value="price-low" className="text-white">
                              Price: Low to High
                            </SelectItem>
                            <SelectItem value="price-high" className="text-white">
                              Price: High to Low
                            </SelectItem>
                            <SelectItem value="area" className="text-white">
                              Largest Area
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{filteredProperties.length} Properties Found</h2>
            <p className="text-gray-400">
              {selectedCity !== "All Cities" && `in ${selectedCity}`}
              {selectedType !== "All Types" && ` • ${selectedType}`}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-800/50 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid" ? "bg-yellow-500 text-black hover:bg-yellow-600" : "text-white hover:bg-gray-700"
              }
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-yellow-500 text-black hover:bg-yellow-600" : "text-white hover:bg-gray-700"
              }
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Properties Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card
                className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div className={`relative ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "list" ? "h-full" : "w-full h-48"
                    }`}
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
                      <span className="text-yellow-400 font-bold">
                        €{property.price}
                        {property.type === "rent" ? "/month" : ""}
                      </span>
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

                <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {property.title}
                    </h3>
                  </div>

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

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link href={`/property/${property.id}`} className="flex-1">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                        View Details
                      </Button>
                    </Link>
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
      </div>
    </div>
  )
}
