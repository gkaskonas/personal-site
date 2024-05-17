"use server";

import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { Resource } from "sst";

export async function sendEmail(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const { name, email, message } = formData;

  const resend = new Resend(Resource.ResendApiKey.value);

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
