/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend"

export type QualificationFormData = {
  name: string
  email: string
  projectDescription: string
  timeline: string
  serviceInterest: {
    mvpDevelopment: boolean
    landingPage: boolean
    salesFunnel: boolean
    other: boolean
  }
  heardFrom: string
  additionalComments?: string
}

const resend = new Resend(process.env.RESEND_API_KEY || "")

export const sendQualificationEmail = async (formData: QualificationFormData): Promise<any> => {
  const { name, email, projectDescription, timeline, serviceInterest, heardFrom, additionalComments } = formData

  // Convert service interests to a readable list
  const selectedServices = Object.entries(serviceInterest)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, isSelected]) => isSelected)
    .map(([service]) => {
      switch (service) {
        case "mvpDevelopment":
          return "MVP Development"
        case "landingPage":
          return "Landing Page Creation"
        case "salesFunnel":
          return "Sales Funnel Design"
        case "other":
          return "Other"
        default:
          return service
      }
    })
    .join(", ")

  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Qualification Form Submission</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #f9f9f7;
                margin: 0;
                padding: 0;
                color: #333;
            }
        </style>
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f7; margin: 0; padding: 0; color: #333;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9f9f7;">
            <tr>
                <td align="center" style="padding: 30px 0;">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(to right, #3b82f6, #0ea5e9); padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Qualification Form Submission</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="margin-top: 0; font-size: 16px; line-height: 1.5; color: #555;">
                                    You have received a new qualification form submission for BuildQuick's unlimited web development service.
                                </p>
                                
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0; border: 1px solid #eaeaea; border-radius: 6px; overflow: hidden;">
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 12px 15px; font-weight: 600; color: #64748b; width: 140px; border-bottom: 1px solid #eaeaea;">
                                            Name
                                        </td>
                                        <td style="padding: 12px 15px; color: #334155; border-bottom: 1px solid #eaeaea;">
                                            ${name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 12px 15px; font-weight: 600; color: #64748b; width: 140px; border-bottom: 1px solid #eaeaea;">
                                            Email
                                        </td>
                                        <td style="padding: 12px 15px; color: #334155; border-bottom: 1px solid #eaeaea;">
                                            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 12px 15px; font-weight: 600; color: #64748b; width: 140px; border-bottom: 1px solid #eaeaea;">
                                            Timeline
                                        </td>
                                        <td style="padding: 12px 15px; color: #334155; border-bottom: 1px solid #eaeaea;">
                                            ${timeline}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 12px 15px; font-weight: 600; color: #64748b; width: 140px; border-bottom: 1px solid #eaeaea;">
                                            Service Interest
                                        </td>
                                        <td style="padding: 12px 15px; color: #334155; border-bottom: 1px solid #eaeaea;">
                                            ${selectedServices}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 12px 15px; font-weight: 600; color: #64748b; width: 140px; border-bottom: 1px solid #eaeaea;">
                                            Heard From
                                        </td>
                                        <td style="padding: 12px 15px; color: #334155; border-bottom: 1px solid #eaeaea;">
                                            ${heardFrom}
                                        </td>
                                    </tr>
                                </table>
                                
                                <div style="background-color: #f8fafc; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                                    <h3 style="margin-top: 0; margin-bottom: 10px; color: #334155; font-size: 16px;">Project Description:</h3>
                                    <p style="margin: 0; line-height: 1.6; color: #334155; white-space: pre-wrap;">${projectDescription}</p>
                                </div>
                                
                                ${
                                  additionalComments
                                    ? `
                                <div style="background-color: #f8fafc; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                                    <h3 style="margin-top: 0; margin-bottom: 10px; color: #334155; font-size: 16px;">Additional Comments:</h3>
                                    <p style="margin: 0; line-height: 1.6; color: #334155; white-space: pre-wrap;">${additionalComments}</p>
                                </div>
                                `
                                    : ""
                                }
                                
                                <div style="text-align: center; margin-top: 30px;">
                                    <a href="mailto:${email}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 500; font-size: 16px;">Reply to ${name}</a>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #eaeaea;">
                                <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} BuildQuick. All rights reserved.</p>
                                <p style="margin: 0;">This is an automated message from your qualification form.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `

  try {
    // Use the Resend library to send the email
    const data = await resend.emails.send({
      from: "Antonio Launch<info@codewithtoni.com>",
      to: 'antoniokodheli8@gmail.com', // Your email address to receive qualification form submissions
      replyTo: email,
      subject: `New Qualification Form: ${name} - ${selectedServices}`,
      html: emailContent,
    })
    return data
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`)
  }
}
