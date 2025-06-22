"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, CreditCard, FileText, Home, Star, User, ArrowRight, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface WorkflowStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "rejected"
  icon: any
}

interface PropertyWorkflow {
  id: number
  propertyTitle: string
  ownerName: string
  ownerEmail: string
  submittedAt: string
  currentStep: number
  selectedPlan?: string
  paymentStatus?: string
  steps: WorkflowStep[]
}

const planFeatures = {
  basic: {
    name: "Basic Listing",
    price: "€9.99",
    features: ["1 Year Listing", "Basic Details", "10 Photos", "Contact Form"],
    color: "gray",
  },
  featured: {
    name: "Featured Listing",
    price: "€24.99",
    features: ["Everything in Basic", "Featured Placement", "25 Photos", "Virtual Tour", "Social Media"],
    color: "yellow",
  },
  premium: {
    name: "Premium Certified",
    price: "€49.99",
    features: ["Everything in Featured", "Certified Badge", "Unlimited Photos", "Video Tour", "Account Manager"],
    color: "purple",
  },
}

export default function WorkflowPage() {
  const [workflows, setWorkflows] = useState<PropertyWorkflow[]>([])
  const [selectedWorkflow, setSelectedWorkflow] = useState<PropertyWorkflow | null>(null)
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  useEffect(() => {
    loadWorkflows()
  }, [])

  const loadWorkflows = () => {
    // Load property submissions and create workflows
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
    const workflowData = submissions.map((submission: any) => ({
      id: submission.id,
      propertyTitle: submission.title,
      ownerName: submission.ownerName,
      ownerEmail: submission.ownerEmail,
      submittedAt: submission.submittedAt,
      currentStep: submission.workflowStep || 0,
      selectedPlan: submission.selectedPlan,
      paymentStatus: submission.paymentStatus || "pending",
      steps: [
        {
          id: "submit",
          title: "Property Submitted",
          description: "Property details submitted for review",
          status: "completed",
          icon: FileText,
        },
        {
          id: "review",
          title: "Admin Review",
          description: "Property under admin review",
          status:
            submission.status === "approved"
              ? "completed"
              : submission.status === "rejected"
                ? "rejected"
                : "in-progress",
          icon: User,
        },
        {
          id: "plan",
          title: "Select Plan",
          description: "Choose your listing package",
          status: submission.selectedPlan ? "completed" : submission.status === "approved" ? "in-progress" : "pending",
          icon: Star,
        },
        {
          id: "payment",
          title: "Payment",
          description: "Complete payment for selected plan",
          status:
            submission.paymentStatus === "completed"
              ? "completed"
              : submission.selectedPlan
                ? "in-progress"
                : "pending",
          icon: CreditCard,
        },
        {
          id: "live",
          title: "Property Live",
          description: "Property published and live on website",
          status: submission.paymentStatus === "completed" ? "completed" : "pending",
          icon: Home,
        },
      ],
    }))
    setWorkflows(workflowData)
  }

  const handlePlanSelection = (workflowId: number, planType: string) => {
    // Update workflow with selected plan
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
    const updatedSubmissions = submissions.map((s: any) =>
      s.id === workflowId ? { ...s, selectedPlan: planType, workflowStep: 3 } : s,
    )
    localStorage.setItem("propertySubmissions", JSON.stringify(updatedSubmissions))
    loadWorkflows()
    alert(`${planFeatures[planType as keyof typeof planFeatures].name} selected! Please proceed to payment.`)
  }

  const handlePayment = async (workflowId: number) => {
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardName) {
      alert("Please fill in all payment details")
      return
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update payment status
    const submissions = JSON.parse(localStorage.getItem("propertySubmissions") || "[]")
    const updatedSubmissions = submissions.map((s: any) =>
      s.id === workflowId ? { ...s, paymentStatus: "completed", workflowStep: 4 } : s,
    )
    localStorage.setItem("propertySubmissions", JSON.stringify(updatedSubmissions))

    // Add to active listings
    const activeListings = JSON.parse(localStorage.getItem("activeListings") || "[]")
    const submission = submissions.find((s: any) => s.id === workflowId)
    if (submission) {
      const newListing = {
        id: Date.now(),
        title: submission.title,
        owner: submission.ownerName,
        type: submission.priceType,
        price: `€${submission.price}${submission.priceType === "rent" ? "/month" : ""}`,
        views: 0,
        inquiries: 0,
        status: "active",
        listedAt: new Date().toISOString().split("T")[0],
        plan: submission.selectedPlan,
      }
      activeListings.push(newListing)
      localStorage.setItem("activeListings", JSON.stringify(activeListings))
    }

    loadWorkflows()
    alert("Payment successful! Your property is now live on the website.")
  }

  const getStepProgress = (workflow: PropertyWorkflow) => {
    const completedSteps = workflow.steps.filter((step) => step.status === "completed").length
    return (completedSteps / workflow.steps.length) * 100
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
            <nav className="flex items-center space-x-6">
              <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                Admin Panel
              </Link>
              <Link href="/add-property" className="text-gray-400 hover:text-white transition-colors">
                Add Property
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Property Workflow
          </h1>
          <p className="text-xl text-gray-300">Track your property listing progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workflow List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Your Properties</h2>
            {workflows.length > 0 ? (
              workflows.map((workflow) => (
                <Card
                  key={workflow.id}
                  className={`bg-gray-900/50 backdrop-blur-sm border cursor-pointer transition-colors ${
                    selectedWorkflow?.id === workflow.id
                      ? "border-yellow-500"
                      : "border-gray-700 hover:border-yellow-500/50"
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-2">{workflow.propertyTitle}</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Submitted: {new Date(workflow.submittedAt).toLocaleDateString()}
                    </p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-yellow-400">{Math.round(getStepProgress(workflow))}%</span>
                      </div>
                      <Progress value={getStepProgress(workflow)} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          workflow.steps[workflow.currentStep]?.status === "completed"
                            ? "bg-green-500 text-white"
                            : workflow.steps[workflow.currentStep]?.status === "rejected"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-black"
                        }
                      >
                        {workflow.steps[workflow.currentStep]?.title || "Completed"}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No property submissions found</p>
                  <Link href="/add-property">
                    <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                      Add Your First Property
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Workflow Details */}
          <div className="lg:col-span-2">
            {selectedWorkflow ? (
              <div className="space-y-6">
                {/* Workflow Header */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{selectedWorkflow.propertyTitle}</CardTitle>
                    <CardDescription>
                      Owner: {selectedWorkflow.ownerName} • Submitted:{" "}
                      {new Date(selectedWorkflow.submittedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Overall Progress</span>
                        <span className="text-yellow-400">{Math.round(getStepProgress(selectedWorkflow))}%</span>
                      </div>
                      <Progress value={getStepProgress(selectedWorkflow)} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Workflow Steps */}
                <div className="space-y-4">
                  {selectedWorkflow.steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`bg-gray-900/50 backdrop-blur-sm border ${
                          step.status === "completed"
                            ? "border-green-500"
                            : step.status === "rejected"
                              ? "border-red-500"
                              : step.status === "in-progress"
                                ? "border-yellow-500"
                                : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                step.status === "completed"
                                  ? "bg-green-500"
                                  : step.status === "rejected"
                                    ? "bg-red-500"
                                    : step.status === "in-progress"
                                      ? "bg-yellow-500"
                                      : "bg-gray-600"
                              }`}
                            >
                              {step.status === "completed" ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : step.status === "rejected" ? (
                                <AlertCircle className="w-6 h-6 text-white" />
                              ) : step.status === "in-progress" ? (
                                <Clock className="w-6 h-6 text-black" />
                              ) : (
                                <step.icon className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                              <p className="text-gray-400 mb-4">{step.description}</p>

                              {/* Step-specific content */}
                              {step.id === "plan" && step.status === "in-progress" && (
                                <div className="space-y-4">
                                  <h4 className="text-white font-medium">Choose Your Listing Plan:</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.entries(planFeatures).map(([key, plan]) => (
                                      <Card key={key} className="bg-gray-800/50 border border-gray-600">
                                        <CardContent className="p-4">
                                          <div className="text-center mb-4">
                                            <h5 className="text-white font-semibold">{plan.name}</h5>
                                            <p className="text-yellow-400 text-xl font-bold">{plan.price}</p>
                                          </div>
                                          <ul className="space-y-2 mb-4">
                                            {plan.features.map((feature, idx) => (
                                              <li key={idx} className="text-gray-300 text-sm flex items-center">
                                                <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                                                {feature}
                                              </li>
                                            ))}
                                          </ul>
                                          <Button
                                            onClick={() => handlePlanSelection(selectedWorkflow.id, key)}
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                                          >
                                            Select Plan
                                          </Button>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {step.id === "payment" &&
                                step.status === "in-progress" &&
                                selectedWorkflow.selectedPlan && (
                                  <div className="space-y-4">
                                    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                                      <h4 className="text-white font-medium mb-2">Selected Plan:</h4>
                                      <div className="flex items-center justify-between">
                                        <span className="text-yellow-400 font-semibold">
                                          {
                                            planFeatures[selectedWorkflow.selectedPlan as keyof typeof planFeatures]
                                              .name
                                          }
                                        </span>
                                        <span className="text-white font-bold">
                                          {
                                            planFeatures[selectedWorkflow.selectedPlan as keyof typeof planFeatures]
                                              .price
                                          }
                                        </span>
                                      </div>
                                    </div>

                                    <h4 className="text-white font-medium">Payment Details:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <Input
                                        placeholder="Card Number"
                                        value={paymentForm.cardNumber}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                                        className="bg-gray-800 border-gray-600 text-white"
                                      />
                                      <Input
                                        placeholder="MM/YY"
                                        value={paymentForm.expiryDate}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                                        className="bg-gray-800 border-gray-600 text-white"
                                      />
                                      <Input
                                        placeholder="CVV"
                                        value={paymentForm.cvv}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                                        className="bg-gray-800 border-gray-600 text-white"
                                      />
                                      <Input
                                        placeholder="Cardholder Name"
                                        value={paymentForm.cardName}
                                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                                        className="bg-gray-800 border-gray-600 text-white"
                                      />
                                    </div>
                                    <Button
                                      onClick={() => handlePayment(selectedWorkflow.id)}
                                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      <CreditCard className="w-4 h-4 mr-2" />
                                      Complete Payment
                                    </Button>
                                  </div>
                                )}

                              {step.status === "completed" && (
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                              )}

                              {step.status === "rejected" && (
                                <Badge className="bg-red-500 text-white">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Rejected
                                </Badge>
                              )}

                              {step.status === "in-progress" && step.id !== "plan" && step.id !== "payment" && (
                                <Badge className="bg-yellow-500 text-black">
                                  <Clock className="w-3 h-3 mr-1" />
                                  In Progress
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a Property</h3>
                  <p className="text-gray-400">Choose a property from the list to view its workflow progress</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
