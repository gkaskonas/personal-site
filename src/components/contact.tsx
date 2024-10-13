"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/app/actions";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(2, "Email must be at least 2 characters")
    .max(50, "Email must be less than 50 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

export default function Contact({ year }: { year: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const status = await sendEmail(values);
      if (status) {
        toast.success("Email sent successfully!");
        form.reset();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast.error("Error sending email. Please try again later.");
    }
  }

  return (
    <motion.section
      id="contact"
      className="flex flex-col bg-neutral-900 py-16 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="mx-auto mb-8 max-w-2xl text-center text-3xl font-bold sm:text-4xl"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Get in Touch
      </motion.h1>
      <motion.p
        className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-300"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        For any enquiries, please fill out the form below. I'll get back to you
        as soon as possible.
      </motion.p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md space-y-6"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none bg-neutral-800 text-white"
                      placeholder="Your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none bg-neutral-800 text-white"
                      placeholder="your.email@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-36 border-none bg-neutral-800 text-white"
                      placeholder="Your message here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-primary p-6 transition-colors hover:bg-orange-700"
            >
              {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </form>
      </Form>
      <motion.footer
        className="mt-16 flex flex-col items-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex space-x-6">
          <Link
            href="https://www.linkedin.com/in/giedrius-k-7a2880a5/"
            className="transition-colors duration-300 hover:text-primary"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn size={24} />
          </Link>
          <Link
            href="https://github.com/gkaskonas"
            className="transition-colors duration-300 hover:text-primary"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          © {year} Peter Kaskonas. All rights reserved.
        </p>
      </motion.footer>
    </motion.section>
  );
}
