"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Star,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  ChevronDown,
  Menu,
  X,
  Globe,
  Home,
  DollarSign,
  Users,
  Award,
  TrendingUp,
  Shield,
  CheckCircle,
  PlayCircle,
  ArrowRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import AuthModal from "@/components/auth-modal"

// Enhanced translations with all pages and navigation
const translations = {
  en: {
    // Navigation
    home: "Home",
    properties: "Properties",
    buy: "Buy",
    rent: "Rent",
    sell: "Sell",
    about: "About",
    contact: "Contact",
    pricing: "Pricing",
    valuation: "Valuation",
    workflow: "Workflow",

    // Main content
    heroTitle: "Find Your Dream Property in Kosovo",
    heroSubtitle: "Discover the best real estate opportunities with PIRAMIDA Group - your trusted partner since 2010",
    searchPlaceholder: "Search by location, property type...",
    searchButton: "Search Properties",
    buyProperties: "Buy",
    rentProperties: "Rent",
    allCities: "All Cities",
    allTypes: "All Types",

    // Property types
    apartment: "Apartment",
    house: "House",
    villa: "Villa",
    commercial: "Commercial",
    office: "Office",
    land: "Land",

    // Cities
    pristina: "Pristina",
    prizren: "Prizren",
    peja: "Peja",
    gjakova: "Gjakova",
    gjilan: "Gjilan",
    mitrovica: "Mitrovica",
    ferizaj: "Ferizaj",

    // Features
    featuredProperties: "Featured Properties",
    premiumProperties: "Premium Properties",
    newListings: "New Listings",
    viewAll: "View All",
    viewDetails: "View Details",
    contactAgent: "Contact Agent",

    // Property details
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area",
    yearBuilt: "Year Built",
    price: "Price",
    forSale: "For Sale",
    forRent: "For Rent",

    // Stats
    propertiesSold: "Properties Sold",
    happyClients: "Happy Clients",
    yearsExperience: "Years Experience",
    citiesCovered: "Cities Covered",

    // About section
    aboutTitle: "Why Choose PIRAMIDA Group?",
    aboutDescription: "With over a decade of experience in Kosovo's real estate market, we provide professional services and trusted expertise.",

    // Services
    buyingService: "Property Buying",
    sellingService: "Property Selling",
    rentingService: "Property Renting",
    valuationService: "Property Valuation",

    // Footer
    company: "Company",
    services: "Services",
    support: "Support",

    // Auth
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    addProperty: "Add Property",

    // Contact
    phoneNumber: "+383 44 613 293",
    email: "info@piramidagroup.com",
    address: "Gjilan, Kosovo",

    // Buttons
    getStarted: "Get Started",
    learnMore: "Learn More",
    bookValuation: "Book Valuation",
    scheduleViewing: "Schedule Viewing",
  },
  sq: {
    // Navigation
    home: "Kryefaqe",
    properties: "Pronësi",
    buy: "Bli",
    rent: "Qira",
    sell: "Shit",
    about: "Rreth Nesh",
    contact: "Kontakt",
    pricing: "Çmimet",
    valuation: "Vlerësim",
    workflow: "Workflow",

    // Main content
    heroTitle: "Gjeni Pronën Tuaj të Ëndrrave në Kosovë",
    heroSubtitle: "Zbuloni mundësitë më të mira të pasurive të patundshme me PIRAMIDA Group - partneri juaj i besuar që nga viti 2010",
    searchPlaceholder: "Kërko sipas vendndodhjes, llojit të pronës...",
    searchButton: "Kërko Prona",
    buyProperties: "Bli",
    rentProperties: "Qira",
    allCities: "Të Gjitha Qytetet",
    allTypes: "Të Gjitha Llojet",

    // Property types
    apartment: "Apartament",
    house: "Shtëpi",
    villa: "Vilë",
    commercial: "Komerciale",
    office: "Zyrë",
    land: "Tokë",

    // Cities
    pristina: "Prishtina",
    prizren: "Prizreni",
    peja: "Peja",
    gjakova: "Gjakova",
    gjilan: "Gjilani",
    mitrovica: "Mitrovica",
    ferizaj: "Ferizaj",

    // Features
    featuredProperties: "Prona të Veçanta",
    premiumProperties: "Prona Premium",
    newListings: "Shpallje të Reja",
    viewAll: "Shiko Të Gjitha",
    viewDetails: "Shiko Detajet",
    contactAgent: "Kontakto Agentin",

    // Property details
    bedrooms: "Dhoma Gjumi",
    bathrooms: "Banjo",
    area: "Sipërfaqja",
    yearBuilt: "Viti i Ndërtimit",
    price: "Çmimi",
    forSale: "Për Shitje",
    forRent: "Për Qira",

    // Stats
    propertiesSold: "Prona të Shitura",
    happyClients: "Klientë të Kënaqur",
    yearsExperience: "Vite Përvojë",
    citiesCovered: "Qytete të Mbuluara",

    // About section
    aboutTitle: "Pse të Zgjidhni PIRAMIDA Group?",
    aboutDescription: "Me më shumë se një dekadë përvojë në tregun e pasurive të patundshme në Kosovë, ne ofrojmë shërbime profesionale dhe ekspertizë të besuar.",

    // Services
    buyingService: "Blerje Prone",
    sellingService: "Shitje Prone",
    rentingService: "Qira Prone",
    valuationService: "Vlerësim Prone",

    // Footer
    company: "Kompania",
    services: "Shërbimet",
    support: "Mbështetja",

    // Auth
    login: "Hyrje",
    signup: "Regjistrohu",
    logout: "Dil",
    addProperty: "Shto Pronë",

    // Contact
    phoneNumber: "+383 44 613 293",
    email: "info@piramidagroup.com",
    address: "Gjilan, Kosovë",

    // Buttons
    getStarted: "Fillo Tani",
    learnMore: "Mëso Më Shumë",
    bookValuation: "Rezervo Vlerësim",
    scheduleViewing: "Planifiko Vizitë",
  },
}

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState("sq")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [searchType, setSearchType] = useState("buy")
  const [selectedCity, setSelectedCity] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [dynamicProperties, setDynamicProperties] = useState<any[]>([])

  const t = translations[currentLang as keyof typeof translations]

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("userData")
    if (userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }

    // Load dynamic properties from admin
    loadDynamicProperties()

    // Real-time sync listener
    const handleStorageChange = () => {
      loadDynamicProperties()
    }

    const handlePropertiesUpdate = () => {
      loadDynamicProperties()
    }

    // Listen for storage changes and custom events
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("propertiesUpdated", handlePropertiesUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("propertiesUpdated", handlePropertiesUpdate)
    }
  }, [])

  const loadDynamicProperties = () => {
    try {
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
            image: sub.images?.[0] || "/placeholder.svg?height=200&width=300",
            featured: false,
            certified: false,
          })),
      ]

      // Remove duplicates based on ID
      const uniqueProperties = combinedProperties.filter(
        (property, index, self) => index === self.findIndex((p) => p.id === property.id),
      )

      setDynamicProperties(uniqueProperties)
    } catch (error) {
      console.error("Error loading dynamic properties:", error)
    }
  }

  const handleAuth = (formData: any) => {
    // Simulate authentication
    const userData = {
      id: Date.now(),
      ...formData,
      registeredAt: new Date().toISOString(),
    }

    localStorage.setItem("userData", JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
    setShowAuthModal(false)

    alert(`Welcome ${formData.firstName || formData.email}! You have successfully ${authMode === "login" ? "logged in" : "registered"}.`)
  }

  const handleLogout = () => {
    localStorage.removeItem("userData")
    setUser(null)
    setIsLoggedIn(false)
    alert("You have been logged out successfully.")
  }

  const handleSearch = () => {
    const searchParams = new URLSearchParams()
    searchParams.set("type", searchType)
    if (selectedCity && selectedCity !== "all") searchParams.set("city", selectedCity);

    if (searchType === "buy") {
      window.location.href = `/buy?${searchParams.toString()}`
    } else {
      window.location.href = `/rent?${searchParams.toString()}`
    }
  }

  // Sample property data - mix with dynamic properties
  const sampleProperties = [
    {
      id: 1,
      title: "Modern Apartment in Pristina Center",
      price: "85000",
      type: "sale",
      location: "Pristina",
      beds: 2,
      baths: 1,
      area: "65m²",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      certified: false,
    },
    {
      id: 2,
      title: "Luxury Villa in Prizren",
      price: "250000",
      type: "sale",
      location: "Prizren",
      beds: 4,
      baths: 3,
      area: "180m²",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      certified: true,
    },
    {
      id: 3,
      title: "Cozy Studio for Rent",
      price: "300",
      type: "rent",
      location: "Gjilan",
      beds: 1,
      baths: 1,
      area: "35m²",
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      certified: false,
    },
  ]

  // Combine sample properties with dynamic ones
  const allProperties = [...dynamicProperties, ...sampleProperties].slice(0, 6)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/piramida-logo-new.png"
                alt="PIRAMIDA Group Logo"
                width={40}
                height={40}
                className="rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                }}
              />
              <div>
                <span className="text-xl font-bold text-yellow-400">PIRAMIDA Group</span>
                <div className="text-xs text-gray-400">Real Estate</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors group">
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.home}</span>
              </Link>
              <Link href="/properties" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors group">
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.properties}</span>
              </Link>
              <Link href="/buy" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors group">
                <DollarSign className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.buy}</span>
              </Link>
              <Link href="/rent" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors group">
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.rent}</span>
              </Link>
              <Link href="/about" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors group">
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.about}</span>
              </Link>
              <Link href="/contact" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.contact}</span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="text-white hover:text-yellow-400 btn-white-to-yellow"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {currentLang.toUpperCase()}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
                {showLangDropdown && (
                  <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50">
                    <button
                      onClick={() => {
                        setCurrentLang("en")
                        setShowLangDropdown(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        setCurrentLang("sq")
                        setShowLangDropdown(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                      SQ
                    </button>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-300">Hello, {user?.firstName || user?.email}</span>
                  <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-yellow-400 btn-white-to-yellow">
                    {t.logout}
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthMode("login")
                      setShowAuthModal(true)
                    }}
                    className="text-white hover:text-yellow-400 btn-white-to-yellow"
                  >
                    {t.login}
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode("signup")
                      setShowAuthModal(true)
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    {t.signup}
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-700 py-4"
              >
                <div className="flex flex-col space-y-4">
                  <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
                    {t.home}
                  </Link>
                  <Link href="/properties" className="text-white hover:text-yellow-400 transition-colors">
                    {t.properties}
                  </Link>
                  <Link href="/buy" className="text-white hover:text-yellow-400 transition-colors">
                    {t.buy}
                  </Link>
                  <Link href="/rent" className="text-white hover:text-yellow-400 transition-colors">
                    {t.rent}
                  </Link>
                  <Link href="/about" className="text-white hover:text-yellow-400 transition-colors">
                    {t.about}
                  </Link>
                  <Link href="/contact" className="text-white hover:text-yellow-400 transition-colors">
                    {t.contact}
                  </Link>

                  {isLoggedIn ? (
                    <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                      <span className="text-sm text-gray-300">Hello, {user?.firstName || user?.email}</span>
                      <Button variant="ghost" onClick={handleLogout} className="w-full text-white hover:text-yellow-400 btn-white-to-yellow">
                        {t.logout}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setAuthMode("login")
                          setShowAuthModal(true)
                          setShowMobileMenu(false)
                        }}
                        className="w-full text-white hover:text-yellow-400 btn-white-to-yellow"
                      >
                        {t.login}
                      </Button>
                      <Button
                        onClick={() => {
                          setAuthMode("signup")
                          setShowAuthModal(true)
                          setShowMobileMenu(false)
                        }}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                      >
                        {t.signup}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-yellow-400/5 rounded-full blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Search Bar */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/20">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex bg-gray-800 rounded-lg overflow-hidden">
                  <Button
                    variant={searchType === "buy" ? "default" : "ghost"}
                    onClick={() => setSearchType("buy")}
                    className={`px-6 py-3 ${
                      searchType === "buy" ? "bg-yellow-500 text-black" : "text-white hover:text-yellow-400"
                    }`}
                  >
                    {t.buyProperties}
                  </Button>
                  <Button
                    variant={searchType === "rent" ? "default" : "ghost"}
                    onClick={() => setSearchType("rent")}
                    className={`px-6 py-3 ${
                      searchType === "rent" ? "bg-yellow-500 text-black" : "text-white hover:text-yellow-400"
                    }`}
                  >
                    {t.rentProperties}
                  </Button>
                </div>

                <div className="flex-1 w-full">
                  <Input
                    placeholder={t.searchPlaceholder}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 h-12"
                  />
                </div>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white h-12">
                    <SelectValue placeholder={t.allCities} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">{t.allCities}</SelectItem>
                    <SelectItem value="Pristina" className="text-white hover:bg-gray-700">{t.pristina}</SelectItem>
                    <SelectItem value="Prizren" className="text-white hover:bg-gray-700">{t.prizren}</SelectItem>
                    <SelectItem value="Gjilan" className="text-white hover:bg-gray-700">{t.gjilan}</SelectItem>
                    <SelectItem value="Peja" className="text-white hover:bg-gray-700">{t.peja}</SelectItem>
                    <SelectItem value="Gjakova" className="text-white hover:bg-gray-700">{t.gjakova}</SelectItem>
                    <SelectItem value="Mitrovica" className="text-white hover:bg-gray-700">{t.mitrovica}</SelectItem>
                    <SelectItem value="Ferizaj" className="text-white hover:bg-gray-700">{t.ferizaj}</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={handleSearch}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 h-12 font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {t.searchButton}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Home, value: "1,200+", label: t.propertiesSold },
              { icon: Users, value: "850+", label: t.happyClients },
              { icon: Calendar, value: "14", label: t.yearsExperience },
              { icon: MapPin, value: "25", label: t.citiesCovered },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.featuredProperties}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our hand-picked selection of premium properties across Kosovo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {property.featured && (
                        <Badge className="bg-yellow-500 text-black">Featured</Badge>
                      )}
                      {property.certified && (
                        <Badge className="bg-green-500 text-white">Certified</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-white text-lg group-hover:text-yellow-400 transition-colors">
                        {property.title}
                      </h3>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {property.type === "sale" ? t.forSale : t.forRent}
                      </Badge>
                    </div>

                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.beds}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.baths}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-yellow-400">
                        €{property.price}
                        {property.type=== "rent" && <span<replit_final_file>
 className="text-sm text-gray-400">/month</span>}
                      </div>
                      <Link href={`/property/${property.id}`}>
                        <Button 
                          size="sm" 
                          className="bg-yellow-500 hover:bg-yellow-600 text-black"
                        >
                          {t.viewDetails}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/properties">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3">
                {t.viewAll}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.aboutTitle}</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {t.aboutDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Shield, title: "Trusted Partner", desc: "14+ years in business" },
                  { icon: Award, title: "Quality Service", desc: "850+ satisfied clients" },
                  { icon: TrendingUp, title: "Market Leader", desc: "Top real estate agency" },
                  { icon: CheckCircle, title: "Verified Properties", desc: "All properties checked" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-yellow-500/20 p-2 rounded-lg">
                      <feature.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    {t.learnMore}
                  </Button>
                </Link>
                <Link href="/valuation">
                  <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black btn-white-to-yellow">
                    {t.bookValuation}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-yellow-400/20 to-transparent p-8 rounded-2xl">
                <Image
                  src="/images/sami-spahiu.jpg"
                  alt="Sami Spahiu - PIRAMIDA Group Founder"
                  width={500}
                  height={600}
                  className="rounded-xl shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=600&width=500"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-xl font-bold mb-2">Sami Spahiu</h3>
                  <p className="text-gray-300">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Complete real estate solutions for all your property needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: t.buyingService,
                desc: "Expert guidance for property purchases",
                link: "/buy",
              },
              {
                icon: Calendar,
                title: t.rentingService,
                desc: "Find the perfect rental property",
                link: "/rent",
              },
              {
                icon: Users,
                title: "Property Management",
                desc: "Professional property management services",
                link: "/contact",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 p-6 text-center group cursor-pointer">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-6 group-hover:bg-yellow-500/30 transition-colors">
                      <service.icon className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400">{service.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Contact us today and let our experts help you with all your real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us Today
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black btn-white-to-yellow"
                onClick={() => window.open(`tel:${t.phoneNumber}`, "_self")}
              >
                <Phone className="w-5 h-5 mr-2" />
                {t.phoneNumber}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                src="/images/piramida-logo-new.png"
                alt="PIRAMIDA Group"
                width={40}
                height={40}
                className="object-contain"
              />
                <span className="text-lg font-bold text-yellow-400">PIRAMIDA Group</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted real estate partner in Kosovo since 2010.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.phoneNumber}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {t.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.address}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t.company}</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.about}
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.contact}
                </Link>
                <Link href="/workflow" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.workflow}
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t.services}</h3>
              <div className="space-y-2">
                <Link href="/buy" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.buy}
                </Link>
                <Link href="/rent" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.rent}
                </Link>
                <Link href="/add-property" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  Add Property
                </Link>
              </div>
            </div>

            {/* Properties */}
            <div>
              <h3 className="text-white font-semibold mb-4">Properties</h3>
              <div className="space-y-2">
                <Link href="/properties" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.properties}
                </Link>
                <Link href="/properties?type=apartment" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.apartment}
                </Link>
                <Link href="/properties?type=house" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.house}
                </Link>
                <Link href="/properties?type=villa" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  {t.villa}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 PIRAMIDA Group. All rights reserved. | Powered by Replit
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSubmit={handleAuth}
        translations={t}
      />
    </div>
  )
}