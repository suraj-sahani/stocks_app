import nodemailer from 'nodemailer'
import { WELCOME_EMAIL_TEMPLATE } from './template'

export const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replaceAll('{{name}}', name)
    .replaceAll('{{intro}}', intro)

  const mailOptions = {
    from: '"Signalist" <signalist@stocks.com>',
    to: email,
    subject: `Welcome to Signalist. Your stock market companion`,
    text: 'Thanks for joining Signalist. We are excited to have you on board!',
    html: htmlTemplate
  }

  await transport.sendMail(mailOptions)
}
