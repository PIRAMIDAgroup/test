"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, MapPin, Phone, Mail, Clock, ArrowLeft, Send, MessageSquare, Building } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const offices = [
  {
    city: "Pristina",
    address: "Rr. Nëna Terezë, 10000 Pristina",
    phone: "+383 44 613 293",
    email: "pristina@piramidagroup.net",
    hours: "Mon-Fri: 9:00-18:00, Sat: 9:00-14:00",
    isMain: true,
  },
  {
    city: "Prizren",
    address: "Rr. Shkëndija, 20000 Prizren",
    phone: "+383 44 613 293",
    email: "prizren@piramidagroup.net",
    hours: "Mon-Fri: 9:00-17:00, Sat: 9:00-13:00",
    isMain: false,
  },
  {
    city: "Peja",
    address: "Rr. UÇK, 30000 Peja",
    phone: "+383 44 613 293",
    email: "peja@piramidagroup.net",
    hours: "Mon-Fri: 9:00-17:00",
    isMain: false,
  },
]

const contactReasons = [
  "General Inquiry",
  "Buy Property",
  "Sell Property",
  "Rent Property",
  "Property Valuation",
  "Investment Consultation",
  "Partnership Opportunity",
  "Technical Support",
  "Other",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    reason: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your message! We'll get back to you within 24 hours.")
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      reason: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/piramida-logo-new.png"
                alt="PIRAMIDA Group"
                width={40}
                height={40}
                className="object-contain"
              />
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with Kosovo's premier real estate team. We're here to help you with all your property needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-yellow-400" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Your first name"
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Your last name"
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+383 XX XXX XXX"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    {/* Subject and Reason */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Brief subject of your inquiry"
                          className="bg-gray-800 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-white mb-2">
                          Reason for Contact
                        </label>
                        <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {contactReasons.map((reason) => (
                              <SelectItem key={reason} value={reason} className="text-white hover:bg-gray-700">
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                        required
                      />
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
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Contact</CardTitle>
                  <CardDescription>Get in touch immediately</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Call Us</p>
                      <p className="text-gray-400">+383 44 613 293</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email Us</p>
                      <p className="text-gray-400">info@piramidagroup.net</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Business Hours</p>
                      <p className="text-gray-400">Mon-Fri: 9:00-18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building className="w-5 h-5 mr-2 text-yellow-400" />
                    Our Offices
                  </CardTitle>
                  <CardDescription>Visit us at any of our locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold">{office.city}</h4>
                        {office.isMain && (
                          <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">Main Office</span>
                        )}
                      </div>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-blue-400" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-green-400" />
                          <span>{office.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-purple-400" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Emergency Contact</CardTitle>
                  <CardDescription>For urgent property matters outside business hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">24/7 Emergency Line</p>
                      <p className="text-gray-300">+383 44 613 293</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-center">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-center">Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "How quickly do you respond to inquiries?",
                    answer:
                      "We typically respond within 2-4 hours during business hours, and within 24 hours on weekends.",
                  },
                  {
                    question: "Do you offer property valuation services?",
                    answer:
                      "Yes, we provide professional property valuation services for both residential and commercial properties.",
                  },
                  {
                    question: "Can you help with property financing?",
                    answer:
                      "We work with trusted financial partners to help you secure the best financing options for your property purchase.",
                  },
                  {
                    question: "Do you handle rental management?",
                    answer:
                      "Yes, we offer comprehensive rental management services including tenant screening, rent collection, and maintenance coordination.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-white font-semibold">{faq.question}</h4>
                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}