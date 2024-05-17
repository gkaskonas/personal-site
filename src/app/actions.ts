"use server";

import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "default");

export async function sendEmail(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const { name, email, message } = formData;
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "pkpersonal@proton.me",
      subject: "New Email from Peter Kaskonas Portfolio!",
      react: EmailTemplate({ name, email, message }),
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log(data);

    if (error) {
      console.log("Error sending email", error);
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
