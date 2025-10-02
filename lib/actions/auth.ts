"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { inngest } from "../inngest/client"

export async function signUpWithEmail(data: SignUpFormData) {
  try {
    const { country, email, fullName
      , investmentGoals, password, preferredIndustry, riskTolerance } = data

    const response = await auth.api.signUpEmail({
      body: {
        email, password, name: fullName
      }
    })

    if (response) {
      await inngest.send({
        name: 'app/user.created',
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          preferredIndustry,
          riskTolerance
        }
      })
    }

    return { success: true, data: response }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to sign up. Please try again."
    }
  }
}

export async function signInWithEmail(data: SignInFormData) {
  try {
    const { email, password } = data
    const response = await auth.api.signInEmail({
      body: { email, password }
    })

    return {
      success: true,
      message: "Signed in successfully",
      data: response
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to sign in. Please check your credentials and try again."
    }
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers()
    })
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "Failed to sign out. Please try again."
    }
  }
}
