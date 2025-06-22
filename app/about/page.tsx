"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Award, TrendingUp, ArrowLeft, Star, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const teamMembers = [
  {
    name: "Sami Spahiu",
    position: "CEO & Founder",
    image: "/images/sami-spahiu.jpg",
    description: "15+ years experience in Kosovo real estate market",
  },
  {
    name: "Bindi Spahiu",
    position: "Assistant & Helper",
    image: "/placeholder.svg?height=300&width=300",
    description: "Dedicated support and administrative assistance",
  },
  {
    name: "Adi Musliu",
    position: "Designer, Programmer & Web Builder",
    image: "/placeholder.svg?height=300&width=300",
    description: "Full-stack developer and digital design specialist",
  },
]

const achievements = [
  {
    number: "15+",
    label: "Years of Experience",
    description: "Serving Kosovo's real estate market since 2008",
  },
  {
    number: "2,500+",
    label: "Properties Sold",
    description: "Successfully completed transactions",
  },
  {
    number: "1,000+",
    label: "Happy Clients",
    description: "Satisfied customers across Kosovo",
  },
  {
    number: "50+",
    label: "Partner Agents",
    description: "Professional network throughout the country",
  },
]

const services = [
  {
    title: "Property Sales",
    description: "Expert guidance through the entire buying and selling process",
    icon: Home,
  },
  {
    title: "Rental Services",
    description: "Comprehensive rental management for landlords and tenants",
    icon: Users,
  },
  {
    title: "Property Valuation",
    description: "Professional property assessment and market analysis",
    icon: TrendingUp,
  },
  {
    title: "Investment Consulting",
    description: "Strategic advice for real estate investment opportunities",
    icon: Award,
  },
]

export default function AboutPage() {
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              About PIRAMIDA Group
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Kosovo's premier real estate company, connecting dreams with reality since 2008. We are committed to
              providing exceptional service and expertise in the Kosovo property market.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-yellow-500 text-black px-4 py-2 text-lg">Established 2008</Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">Licensed & Certified</Badge>
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg">Award Winning</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2008, PIRAMIDA Group began as a small family business with a vision to transform the real
                  estate landscape in Kosovo. What started with a single office in Pristina has grown into the country's
                  most trusted real estate network.
                </p>
                <p>
                  Our founders recognized the need for professional, transparent, and client-focused real estate
                  services in Kosovo's emerging market. Through dedication, integrity, and innovation, we have built
                  lasting relationships with thousands of clients.
                </p>
                <p>
                  Today, PIRAMIDA Group stands as a symbol of excellence in Kosovo's real estate industry, with a team
                  of experienced professionals serving clients across all major cities.
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
                  Learn More About Our Services
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="/images/piramida-logo.webp"
                alt="PIRAMIDA Group Logo"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-300">Numbers that speak for our success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{achievement.number}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{achievement.label}</h3>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-300">Comprehensive real estate solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300">The professionals behind our success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="mx-auto max-w-sm"
              >
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-yellow-400 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-400 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6">
                    <Star className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To provide exceptional real estate services that exceed our clients' expectations while contributing
                    to the development of Kosovo's property market. We strive to make property transactions transparent,
                    efficient, and stress-free for everyone involved.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To be the leading real estate company in Kosovo, recognized for our integrity, innovation, and
                    commitment to excellence. We envision a future where every property transaction is conducted with
                    the highest standards of professionalism and client satisfaction.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Work With Us?</h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or renting, our experienced team is here to help you achieve your real
              estate goals in Kosovo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8"
                onClick={() => (window.location.href = "tel:+38344613293")}
              >
                <Phone className="w-5 h-5 mr-2" />
                +383 44 613 293
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-8"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
