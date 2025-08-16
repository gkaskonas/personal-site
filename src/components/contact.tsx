"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
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

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const year = new Date().getFullYear();

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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="flex flex-col py-16"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1
        className="mx-auto mb-8 max-w-2xl text-center text-3xl font-bold sm:text-4xl"
        variants={itemVariants}
      >
        Get in Touch
      </motion.h1>
      <motion.p
        className="mx-auto mb-12 max-w-2xl text-center text-lg"
        variants={itemVariants}
      >
        For any enquiries, please fill out the form below. I'll get back to you
        as soon as possible.
      </motion.p>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-lg space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-300 dark:border-gray-600"
                      placeholder="Your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-gray-300 dark:border-gray-600"
                      placeholder="your.email@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-36 border-gray-300 dark:border-gray-600"
                      placeholder="Your message here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-primary p-6 transition-colors hover:bg-primary/80"
            >
              {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </motion.form>
      </Form>
      <motion.footer
        className="mt-16 flex flex-col items-center space-y-6"
        variants={itemVariants}
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
        <p className="text-sm">
          © {year} Peter Kaskonas. All rights reserved.
        </p>
      </motion.footer>
    </motion.section>
  );
}
