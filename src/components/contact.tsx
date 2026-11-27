"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Enter an email address like you@company.co.uk")
    .min(2, "Email must be at least 2 characters")
    .max(50, "Email must be less than 50 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

const field =
  "w-full rounded border border-white/25 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/45 transition-colors hover:border-white/40 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Message sent. I’ll get back to you soon.");
        form.reset();
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast.error(
        "Your message didn’t send. Try again, or email contact@peterkaskonas.com directly.",
      );
    }
  }

  return (
    <section id="contact" className="relative mt-16 bg-[hsl(var(--band))] py-24 text-white lg:py-32">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-full block h-10 w-full sm:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
      >
        <path
          className="wave"
          style={{ ["--t" as string]: "18s" }}
          fill="hsl(var(--band) / 0.45)"
          d="M0 28q90-26 180 0t180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0V56H0Z"
        />
        <path
          className="wave"
          style={{ ["--t" as string]: "11s" }}
          fill="hsl(var(--band))"
          d="M0 36q90-20 180 0t180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0 180 0V56H0Z"
        />
      </svg>
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="wipe text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.02]">
            Tell me about your project
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/75">
            A few lines on what you need is plenty. The first conversation is free and there’s no
            obligation.
          </p>
          <p className="mt-10 text-white/75">Prefer email?</p>
          <a
            href="mailto:contact@peterkaskonas.com"
            className="mt-1 inline-block break-all text-xl font-bold underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            contact@peterkaskonas.com
          </a>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <input {...f} autoComplete="name" placeholder="Jane Smith…" className={field} />
                    </FormControl>
                    <FormMessage className="text-accent" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <input
                        {...f}
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="jane@business.co.uk…"
                        className={field}
                      />
                    </FormControl>
                    <FormMessage className="text-accent" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel className="text-white">What do you need?</FormLabel>
                  <FormControl>
                    <textarea
                      {...f}
                      rows={6}
                      autoComplete="off"
                      placeholder="A new website for my bakery in Bury St Edmunds…"
                      className={field + " resize-y"}
                    />
                  </FormControl>
                  <FormMessage className="text-accent" />
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="btn bg-accent text-accent-foreground hover:bg-white disabled:opacity-70"
            >
              {form.formState.isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
}
