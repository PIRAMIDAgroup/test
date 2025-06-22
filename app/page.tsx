"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Home, Key, Star, Globe, User, LogIn, UserPlus, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

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

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "sq", name: "Shqip", flag: "🇦🇱" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
]

const translations = {
  en: {
    hero: "Find Your Dream Property in Kosovo",
    subtitle: "Discover the perfect home with PIRAMIDA Group - Kosovo's premier real estate platform",
    searchPlaceholder: "Search by city...",
    buy: "Buy",
    rent: "Rent",
    search: "Search Properties",
    featuredProperties: "Featured Properties",
    whyChooseUs: "Why Choose PIRAMIDA Group",
    experience: "15+ Years Experience",
    experienceDesc: "Trusted expertise in Kosovo real estate market",
    properties: "1000+ Properties",
    propertiesDesc: "Extensive portfolio across all major cities",
    support: "24/7 Support",
    supportDesc: "Dedicated customer service team",
    login: "Login",
    signup: "Sign Up",
    addProperty: "Add Property",
  },
  sq: {
    hero: "Gjeni Pronën Tuaj të Ëndrrave në Kosovë",
    subtitle: "Zbuloni shtëpinë perfekte me PIRAMIDA Group - platforma kryesore e pasurive të paluajtshme në Kosovë",
    searchPlaceholder: "Kërkoni sipas qytetit...",
    buy: "Bli",
    rent: "Qira",
    search: "Kërko Prona",
    featuredProperties: "Prona të Zgjedhura",
    whyChooseUs: "Pse të Zgjidhni PIRAMIDA Group",
    experience: "15+ Vite Përvojë",
    experienceDesc: "Ekspertizë e besuar në tregun e pasurive të paluajtshme në Kosovë",
    properties: "1000+ Prona",
    propertiesDesc: "Portofol i gjerë në të gjitha qytetet kryesore",
    support: "Mbështetje 24/7",
    supportDesc: "Ekip i dedikuar i shërbimit ndaj klientëve",
    login: "Hyrje",
    signup: "Regjistrohu",
    addProperty: "Shto Pronë",
  },
}

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState("en")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [searchType, setSearchType] = useState("buy")
  const [selectedCity, setSelectedCity] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [dynamicProperties, setDynamicProperties] = useState<any[]>([])

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

  const t = translations[currentLang as keyof typeof translations] || translations.en

  const loadDynamicProperties = () => {
    const activeListings = JSON.parse(localStorage.getItem("activeListings") || "[]")
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")

    // Combine all properties
    const allProperties = [
      ...activeListings.map((listing: any) => ({
        ...listing,
        id: listing.id,
        title: listing.title,
        price: listing.price,
        location: listing.location || listing.city,
        beds: listing.beds || 0,
        baths: listing.baths || 0,
        area: listing.area,
        image: listing.image,
        featured: listing.featured || listing.plan === "featured" || listing.plan === "premium",
        certified: listing.certified,
      })),
      ...submissions
        .filter((sub: any) => sub.status === "approved")
        .map((sub: any) => ({
          id: sub.id,
          title: sub.title,
          price: `€${sub.price}${sub.priceType === "rent" ? "/month" : ""}`,
          location: sub.city,
          beds: Number.parseInt(sub.bedrooms) || 0,
          baths: Number.parseInt(sub.bathrooms) || 0,
          area: `${sub.area}m²`,
          image: sub.images?.[0] || "/placeholder.svg?height=200&width=300",
          featured: false,
          certified: true,
        })),
    ]

    // Get featured properties (limit to 6)
    const featuredProperties = allProperties.filter((property) => property.featured).slice(0, 6)

    setDynamicProperties(featuredProperties)
  }

  const handleSearch = () => {
    // Navigate to properties page with search parameters
    const params = new URLSearchParams()
    if (searchType) params.set("type", searchType)
    if (selectedCity) params.set("city", selectedCity)

    window.location.href = `/properties?${params.toString()}`
  }

  const handlePropertyClick = (propertyId: number) => {
    // Navigate to property details
    window.location.href = `/property/${propertyId}`
  }

  const handleAuthSubmit = async (formData: any) => {
    if (authMode === "signup") {
      // Registration logic
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        registeredAt: new Date().toISOString(),
        provider: formData.provider || "email",
      }

      // Save user data
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if user already exists
      const existingUser = existingUsers.find((u: any) => u.email === formData.email)
      if (existingUser) {
        alert("User with this email already exists. Please login instead.")
        return
      }

      existingUsers.push(userData)
      localStorage.setItem("users", JSON.stringify(existingUsers))
      localStorage.setItem("userData", JSON.stringify(userData))

      setIsLoggedIn(true)
      setUser(userData)
      setShowAuthModal(false)

      if (formData.provider === "google") {
        alert("Successfully signed up with Google! Welcome to PIRAMIDA Group.")
      } else {
        alert("Registration successful! Welcome to PIRAMIDA Group.")
      }
    } else {
      // Login logic
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.email === formData.email)

      if (user) {
        localStorage.setItem("userData", JSON.stringify(user))
        setIsLoggedIn(true)
        setUser(user)
        setShowAuthModal(false)

        if (formData.provider === "google") {
          alert("Successfully logged in with Google! Welcome back.")
        } else {
          alert("Login successful! Welcome back.")
        }
      } else {
        alert("User not found. Please register first.")
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-yellow-400">PIRAMIDA Group</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link href="/properties" className="hover:text-yellow-400 transition-colors">
                Properties
              </Link>
              <Link href="/about" className="hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="text-white hover:text-yellow-400 hover:bg-yellow-400/10"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {languages.find((l) => l.code === currentLang)?.flag}
                </Button>
                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md border border-yellow-500/20 rounded-lg shadow-xl z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code)
                            setShowLangDropdown(false)
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-yellow-400/10 flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-white text-sm">Welcome, {user?.firstName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white hover:text-yellow-400 hover:bg-yellow-400/10"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAuthMode("login")
                        setShowAuthModal(true)
                      }}
                      className="text-white hover:text-yellow-400 hover:bg-yellow-400/10"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      {t.login}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      onClick={() => {
                        setAuthMode("signup")
                        setShowAuthModal(true)
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {t.signup}
                    </Button>
                  </motion.div>
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-yellow-500/20"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link
                  href="/"
                  className="block hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className="block hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Properties
                </Link>
                <Link
                  href="/about"
                  className="block hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact
                </Link>
                <div className="flex space-x-2 pt-4 border-t border-yellow-500/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAuthMode("login")
                      setShowAuthModal(true)
                      setShowMobileMenu(false)
                    }}
                    className="text-white hover:text-yellow-400 hover:bg-yellow-400/10"
                  >
                    {t.login}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setAuthMode("signup")
                      setShowAuthModal(true)
                      setShowMobileMenu(false)
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    {t.signup}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              {t.hero}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">{t.subtitle}</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  {/* Buy/Rent Toggle */}
                  <div className="flex bg-gray-800/50 rounded-lg p-1">
                    <Button
                      variant={searchType === "buy" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSearchType("buy")}
                      className={
                        searchType === "buy"
                          ? "bg-yellow-500 text-black hover:bg-yellow-600"
                          : "text-white hover:bg-gray-700"
                      }
                    >
                      <Key className="w-4 h-4 mr-2" />
                      {t.buy}
                    </Button>
                    <Button
                      variant={searchType === "rent" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSearchType("rent")}
                      className={
                        searchType === "rent"
                          ? "bg-yellow-500 text-black hover:bg-yellow-600"
                          : "text-white hover:bg-gray-700"
                      }
                    >
                      <Home className="w-4 h-4 mr-2" />
                      {t.rent}
                    </Button>
                  </div>

                  {/* City Selector */}
                  <div className="flex-1 min-w-0">
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                          <SelectValue placeholder={t.searchPlaceholder} />
                        </div>
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

                  {/* Search Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 shadow-lg"
                    >
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
                        <Search className="w-4 h-4" />
                      </div>
                      {t.search}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties - Only Real Properties */}
      {dynamicProperties.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t.featuredProperties}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynamicProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => handlePropertyClick(property.id)}
                >
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {property.featured && <Badge className="bg-yellow-500 text-black">Featured</Badge>}
                        {property.certified && (
                          <Badge className="bg-blue-500 text-white flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Certified
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-yellow-400 font-bold">{property.price}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
                      <p className="text-gray-400 mb-4 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                        {property.location}
                      </p>
                      <div className="flex justify-between text-sm text-gray-400">
                        {property.beds > 0 && <span>{property.beds} beds</span>}
                        {property.baths > 0 && <span>{property.baths} baths</span>}
                        <span>{property.area}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t.whyChooseUs}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t.experience,
                description: t.experienceDesc,
                icon: Star,
              },
              {
                title: t.properties,
                description: t.propertiesDesc,
                icon: Home,
              },
              {
                title: t.support,
                description: t.supportDesc,
                icon: User,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-black" />
                </div>
                <span className="text-lg font-bold text-yellow-400">PIRAMIDA Group</span>
              </div>
              <p className="text-gray-400 text-sm">
                Kosovo's premier real estate platform, connecting buyers, sellers, and renters since 2008.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/properties" className="hover:text-yellow-400 transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-yellow-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-yellow-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-yellow-400 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/buy" className="hover:text-yellow-400 transition-colors">
                    Buy Property
                  </Link>
                </li>
                <li>
                  <Link href="/rent" className="hover:text-yellow-400 transition-colors">
                    Rent Property
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="hover:text-yellow-400 transition-colors">
                    Sell Property
                  </Link>
                </li>
                <li>
                  <Link href="/valuation" className="hover:text-yellow-400 transition-colors">
                    Property Valuation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Pristina, Kosovo</li>
                <li>+383 44 613 293</li>
                <li>info@piramidagroup.net</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 PIRAMIDA Group. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-xl border border-yellow-500/30 p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{authMode === "login" ? t.login : t.signup}</h2>
                <p className="text-gray-400">{authMode === "login" ? "Welcome back!" : "Create your account"}</p>
              </div>

              <div className="space-y-4">
                {authMode === "signup" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="bg-gray-800 border-gray-600 text-white" />
                    <Input placeholder="Last Name" className="bg-gray-800 border-gray-600 text-white" />
                  </div>
                )}
                <Input placeholder="Email" type="email" className="bg-gray-800 border-gray-600 text-white" />
                <Input placeholder="Password" type="password" className="bg-gray-800 border-gray-600 text-white" />

                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  onClick={() => {
                    const formData = {
                      firstName:
                        (document.querySelector('input[placeholder="First Name"]') as HTMLInputElement)?.value || "",
                      lastName:
                        (document.querySelector('input[placeholder="Last Name"]') as HTMLInputElement)?.value || "",
                      email: (document.querySelector('input[placeholder="Email"]') as HTMLInputElement)?.value || "",
                      password:
                        (document.querySelector('input[placeholder="Password"]') as HTMLInputElement)?.value || "",
                      provider: "email",
                    }

                    // Basic validation
                    if (!formData.email || !formData.password) {
                      alert("Please fill in all required fields.")
                      return
                    }

                    if (authMode === "signup" && (!formData.firstName || !formData.lastName)) {
                      alert("Please fill in your first and last name.")
                      return
                    }

                    handleAuthSubmit(formData)
                  }}
                >
                  {authMode === "login" ? t.login : t.signup}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">or</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => {
                    // Simulate Google OAuth without browser notifications
                    const googleUserData = {
                      firstName: "Google",
                      lastName: "User",
                      email: `user${Date.now()}@gmail.com`, // Unique email each time
                      provider: "google",
                    }

                    handleAuthSubmit(googleUserData)
                  }}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-gray-400">
                  {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                    className="text-yellow-400 hover:underline"
                  >
                    {authMode === "login" ? "Sign up" : "Login"}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
