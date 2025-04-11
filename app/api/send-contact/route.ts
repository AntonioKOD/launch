import { type NextRequest, NextResponse } from "next/server"
import { sendQualificationEmail, type QualificationFormData } from "@/lib/contact-email"

export async function POST(request: NextRequest) {
  try {
    const formData: QualificationFormData = await request.json()

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.projectDescription ||
      !formData.timeline ||
      !formData.heardFrom
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate that at least one service interest is selected
    const hasServiceInterest = Object.values(formData.serviceInterest).some((value) => value)
    if (!hasServiceInterest) {
      return NextResponse.json({ error: "Please select at least one service interest" }, { status: 400 })
    }

    // Send the email
    const emailResult = await sendQualificationEmail(formData)

    return NextResponse.json(
      { success: true, message: "Qualification form submitted successfully", data: emailResult },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing qualification form:", error)
    return NextResponse.json({ error: "Failed to process qualification form" }, { status: 500 })
  }
}
