import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = inngest.createFunction(
  {
    id: "send-signup-email",
  },
  {
    event: "app/user.created",
  },
  async ({ event, step }) => {
    const userProfile = `
    - Country : ${event.data.country}
    - Investment goals : ${event.data.investmentGoals}
    - Risk tolerance : ${event.data.riskTolerance}
    - Preferred industry : ${event.data.preferredIndustry}
  `

    const propmt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replaceAll('{{userProfile}', userProfile)
    const response = await step.ai.infer('generate-welcome-intor', {
      model: step.ai.models.gemini({ model: 'gemini-2.0-flash-lite' }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: propmt }]
          }
        ]
      },
    })
    await step.run('send-welcome-email', async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0]
      const introText = (part && 'text' in part ? part.text : null)
        ||
        'Thanks for joining us. We are excited to have you on board!'

      // Email Send Logic
      const { data: { email, name } } = event

      return await sendWelcomeEmail({
        email, name, intro: introText
      })
    })

    return {
      success: true,
      message: 'Welcome email sent successfully'
    }
  },
)
