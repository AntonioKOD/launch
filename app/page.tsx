"use client"

import type React from "react"


import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import logo from '@/public/logo_buildquick.svg'



export default function QualifyPage() {
  // Update the formState to include the new fields
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectDescription: "",
    timeline: "ASAP",
    serviceInterest: {
      mvpDevelopment: false,
      landingPage: false,
      salesFunnel: false,
      other: false,
    },
    heardFrom: "",
    additionalComments: "",
    submitted: false,
    loading: false,
    error: "",
  })

  // Update the handleSubmit function to validate that at least one service interest is selected
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if at least one service interest is selected
    const hasServiceInterest = Object.values(formState.serviceInterest).some((value) => value)

    if (!hasServiceInterest) {
      setFormState((prev) => ({
        ...prev,
        error: "Please select at least one service interest.",
      }))
      return
    }

    setFormState((prev) => ({ ...prev, loading: true, error: "" }))

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          projectDescription: formState.projectDescription,
          timeline: formState.timeline,
          serviceInterest: formState.serviceInterest,
          heardFrom: formState.heardFrom,
          additionalComments: formState.additionalComments,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit form")
      }

      setFormState((prev) => ({ ...prev, submitted: true, loading: false }))
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      }))
    }
  }

  // Update the handleChange function to handle different input types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Add a function to handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      serviceInterest: {
        ...prev.serviceInterest,
        [name]: checked,
      },
    }))
  }

  return (

    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:max-w-3xl md:py-16">
          {/* Header */}
          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="relative h-50 w-50 overflow-hidden">
                <Image src={logo} alt="BuildQuick Logo"  className="object-contain" />
              </div>  
            </div>
          </div>

          {/* Main Content */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-primary opacity-20 md:-left-8 md:-top-8 md:h-24 md:w-24"></div>
            <div className="absolute -right-4 bottom-4 h-16 w-16 rounded-full bg-secondary opacity-20 md:-right-8 md:bottom-8 md:h-24 md:w-24"></div>

            <div className="relative rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(27,31,59,1)] md:p-8">
              <div className="mb-8 text-center">
                <h1 className="mb-4 font-serif text-3xl font-bold text-[#1B1F3B] md:text-4xl">
                  See if you <span className="italic">qualify</span> for our unlimited web development service
                </h1>
                <div className="mx-auto mb-6 h-1 w-24 bg-[#1B1F3B]"></div>
                <p className="text-[#444444]">
                  We help businesses build unlimited websites, MVPs, AI agents, and sales funnels for one flat monthly
                  fee.
                </p>
              </div>

              <div className="mb-8 rounded-lg border-2 border-[#1B1F3B] bg-[#F9F9F9] p-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-[#1B1F3B]">Unlimited website development & revisions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-[#1B1F3B]">MVPs, AI agents, landing pages & sales funnels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-[#1B1F3B]">
                      One flat monthly fee of $799 - pause or cancel anytime
                    </span>
                  </div>
                </div>
              </div>

              {formState.submitted ? (
                // Update the success message to be more detailed
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#1B1F3B]">Thank You!</h3>
                  <p className="mb-4 text-[#444444]">
                    Your qualification request has been submitted successfully. We&apos;ll review your information and get
                    back to you within 24 hours.
                  </p>
                  <Button
                    className="h-10 rounded-md border-2 border-[#1B1F3B] bg-primary px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
                    variant="default"
                    onClick={() =>
                      setFormState({
                        name: "",
                        email: "",
                        projectDescription: "",
                        timeline: "ASAP",
                        serviceInterest: {
                          mvpDevelopment: false,
                          landingPage: false,
                          salesFunnel: false,
                          other: false,
                        },
                        heardFrom: "",
                        additionalComments: "",
                        submitted: false,
                        loading: false,
                        error: "",
                      })
                    }
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                // Replace the form with the new optimized form
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#1B1F3B]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="h-12 rounded-md border-2 border-[#1B1F3B] bg-white px-4 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#1B1F3B]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="h-12 rounded-md border-2 border-[#1B1F3B] bg-white px-4 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectDescription" className="text-sm font-medium text-[#1B1F3B]">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      placeholder="Briefly describe your project or idea."
                      required
                      rows={4}
                      value={formState.projectDescription}
                      onChange={handleChange}
                      className="rounded-md border-2 border-[#1B1F3B] bg-white px-4 py-2 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-medium text-[#1B1F3B]">
                      Desired Timeline <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      value={formState.timeline}
                      onChange={handleChange}
                      className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-white px-4 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] focus-visible:ring-primary"
                    >
                      <option value="ASAP">ASAP</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1B1F3B]">
                      Service Interest <span className="text-red-500">*</span>
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="mvpDevelopment"
                          name="mvpDevelopment"
                          checked={formState.serviceInterest.mvpDevelopment}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-[#1B1F3B] text-primary focus:ring-primary"
                        />
                        <label htmlFor="mvpDevelopment" className="text-sm text-[#444444]">
                          MVP Development
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="landingPage"
                          name="landingPage"
                          checked={formState.serviceInterest.landingPage}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-[#1B1F3B] text-primary focus:ring-primary"
                        />
                        <label htmlFor="landingPage" className="text-sm text-[#444444]">
                          Landing Page Creation
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="salesFunnel"
                          name="salesFunnel"
                          checked={formState.serviceInterest.salesFunnel}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-[#1B1F3B] text-primary focus:ring-primary"
                        />
                        <label htmlFor="salesFunnel" className="text-sm text-[#444444]">
                          Sales Funnel Design
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="other"
                          name="other"
                          checked={formState.serviceInterest.other}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-[#1B1F3B] text-primary focus:ring-primary"
                        />
                        <label htmlFor="other" className="text-sm text-[#444444]">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="heardFrom" className="text-sm font-medium text-[#1B1F3B]">
                      How Did You Hear About Us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="heardFrom"
                      name="heardFrom"
                      required
                      value={formState.heardFrom}
                      onChange={handleChange}
                      className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-white px-4 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] focus-visible:ring-primary"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Google">Google</option>
                      <option value="Reddit">Reddit</option>
                      <option value="Referral">Referral</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="additionalComments" className="text-sm font-medium text-[#1B1F3B]">
                      Additional Comments (Optional)
                    </label>
                    <Textarea
                      id="additionalComments"
                      name="additionalComments"
                      placeholder="Any specific requirements or questions?"
                      rows={3}
                      value={formState.additionalComments}
                      onChange={handleChange}
                      className="rounded-md border-2 border-[#1B1F3B] bg-white px-4 py-2 shadow-[2px_2px_0px_0px_rgba(27,31,59,1)] focus-visible:ring-primary"
                    />
                  </div>

                  {formState.error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">{formState.error}</div>
                  )}

                  <Button
                    type="submit"
                    disabled={formState.loading}
                    className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-primary px-6 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
                  >
                    {formState.loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Check Qualification <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-foreground/70">
            <p>© {new Date().getFullYear()} BuildQuick. All rights reserved.</p>
            <p className="mt-1">
              Questions? Email us at{" "}
              <a href="mailto:hello@buildquick.io" className="underline hover:text-primary">
                hello@buildquick.io
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
    
  )
}
