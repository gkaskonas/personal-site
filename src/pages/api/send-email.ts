import type { APIRoute } from "astro";
import { Resend } from "resend";
// @ts-ignore - SST Resource types are generated at build time
import { Resource } from "sst";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get API key from SST Resource linking
    let resendApiKey: string | undefined;

    try {
      resendApiKey = Resource.ResendApiKey.value;
    } catch {
      // Fallback to environment variable for local development
      resendApiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    }

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: "Personal Portfolio Update <no-reply@peterkaskonas.com>",
      to: "contact@peterkaskonas.com",
      subject: "New Email from Peter Kaskonas Portfolio!",
      html: `
        <div style="font-family: sans-serif; padding: 24px; max-width: 400px; border: 1px solid #ccc; border-radius: 8px;">
          <h2 style="margin-bottom: 16px; font-weight: bold;">New contact!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
