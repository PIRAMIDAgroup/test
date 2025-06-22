"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, Star, Crown, Home, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const pricingPlans = [
  {
    id: "basic",
    name: "Basic Listing",
    price: "€9.99",
    duration: "1 Year",
    description: "Perfect for individual property owners",
    features: [
      "Property listing for 1 year",
      "Basic property details",
      "Photo gallery (up to 10 photos)",
      "Contact form integration",
      "Standard listing placement",
    ],
    icon: Home,
    color: "from-gray-400 to-gray-600",
    popular: false,
  },
  {
    id: "featured",
    name: "Featured Listing",
    price: "€24.99",
    duration: "1 Year",
    description: "Get maximum visibility for your property",
    features: [
      "Everything in Basic",
      "Featured placement at top",
      "Priority in search results",
      "Enhanced property showcase",
      "Photo gallery (up to 25 photos)",
      "Virtual tour integration",
      "Social media promotion",
    ],
    icon: Star,
    color: "from-yellow-400 to-yellow-600",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Certified",
    price: "€49.99",
    duration: "1 Year",
    description: "Ultimate package with certified badge",
    features: [
      "Everything in Featured",
      "Certified seller badge",
      "Premium support priority",
      "Professional photography tips",
      "Market analysis report",
      "Unlimited photo gallery",
      "Video tour integration",
      "Dedicated account manager",
    ],
    icon: Crown,
    color: "from-purple-400 to-purple-600",
    popular: false,
  },
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    propertyTitle: "",
    propertyDescription: "",
    price: "",
    location: "",
    propertyType: "",
    fullName: "",
    email: "",
    iban: "",
    bankName: "",
    accountHolder: "",
  })

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setShowPaymentForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    // Here you would typically send the data to your backend
    alert("Your request has been submitted for approval. You will receive a confirmation email shortly.")
    setShowPaymentForm(false)
    setSelectedPlan(null)
  }

  const selectedPlanData = pricingPlans.find((plan) => plan.id === selectedPlan)

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

      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!showPaymentForm ? (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Choose Your Listing Package
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Select the perfect package to showcase your property and reach qualified buyers and renters across
                  Kosovo
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-yellow-500 text-black px-4 py-1 text-sm font-semibold">Most Popular</Badge>
                      </div>
                    )}

                    <Card
                      className={`h-full bg-gray-900/50 backdrop-blur-sm border-2 ${
                        plan.popular ? "border-yellow-500" : "border-gray-700"
                      } hover:border-yellow-500/50 transition-all duration-300`}
                    >
                      <CardHeader className="text-center pb-8">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                        >
                          <plan.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                        <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                          <span className="text-gray-400 ml-2">/ {plan.duration}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => handlePlanSelect(plan.id)}
                            className={`w-full py-3 font-semibold ${
                              plan.popular
                                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                                : "bg-gray-700 hover:bg-gray-600 text-white"
                            }`}
                          >
                            Choose {plan.name}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-16 text-center">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">Important Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">Approval Process</h4>
                      <p className="text-gray-300 text-sm">
                        All listings require admin approval before going live. You'll receive a notification once your
                        property is reviewed.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">Payment Method</h4>
                      <p className="text-gray-300 text-sm">
                        Secure bank transfer payment. Your listing will be activated after payment confirmation and
                        approval.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">Support</h4>
                      <p className="text-gray-300 text-sm">
                        Our team is available to help you create the perfect listing. Contact us at
                        info@piramidagroup.net
                      </p>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">Guarantee</h4>
                      <p className="text-gray-300 text-sm">
                        If you're not satisfied with our service, we offer a 30-day money-back guarantee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Payment Form */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Complete Your Listing</h2>
                  <p className="text-gray-400">
                    You've selected: <span className="text-yellow-400 font-semibold">{selectedPlanData?.name}</span> -{" "}
                    {selectedPlanData?.price}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Property Information */}
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Property Information</CardTitle>
                      <CardDescription>Tell us about your property</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="propertyTitle" className="text-white">
                          Property Title
                        </Label>
                        <Input
                          id="propertyTitle"
                          value={formData.propertyTitle}
                          onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                          placeholder="e.g., Modern 3BR Apartment in Pristina"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="propertyDescription" className="text-white">
                          Description
                        </Label>
                        <Textarea
                          id="propertyDescription"
                          value={formData.propertyDescription}
                          onChange={(e) => setFormData({ ...formData, propertyDescription: e.target.value })}
                          placeholder="Describe your property..."
                          className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price" className="text-white">
                            Price
                          </Label>
                          <Input
                            id="price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="€120,000"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-white">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Pristina"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="propertyType" className="text-white">
                          Property Type
                        </Label>
                        <Input
                          id="propertyType"
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          placeholder="Apartment, House, Commercial, etc."
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Payment & Contact Information</CardTitle>
                      <CardDescription>Your contact and payment details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName" className="text-white">
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Your full name"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-4">
                        <h4 className="text-white font-semibold mb-3">Bank Transfer Details</h4>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="iban" className="text-white">
                              IBAN
                            </Label>
                            <Input
                              id="iban"
                              value={formData.iban}
                              onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                              placeholder="XK05 1212 0123 4567 8901"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="bankName" className="text-white">
                              Bank Name
                            </Label>
                            <Input
                              id="bankName"
                              value={formData.bankName}
                              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                              placeholder="Your bank name"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="accountHolder" className="text-white">
                              Account Holder
                            </Label>
                            <Input
                              id="accountHolder"
                              value={formData.accountHolder}
                              onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                              placeholder="Account holder name"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <p className="text-yellow-400 text-sm">
                          <strong>Payment Instructions:</strong> After submitting this form, you'll receive bank
                          transfer details via email. Your listing will be activated after payment confirmation and
                          admin approval.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Terms and Submit */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="border-gray-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-yellow-400 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-yellow-400 hover:underline">
                        Privacy Policy
                      </Link>
                      . I understand that my listing requires admin approval and payment confirmation before going live.
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPaymentForm(false)}
                      className="border-gray-600 text-white hover:bg-gray-800"
                    >
                      Back to Plans
                    </Button>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleSubmit}
                        disabled={!agreedToTerms}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
                      >
                        Submit for Approval
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
