"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "./ui/textarea";
import { sendEmail } from "@/app/actions";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { useState } from "react";

export default function Contact({ year }: { year: number }) {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email().min(2).max(50),
    message: z.string().min(10).max(500),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [message, setMessage] = useState<string>("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const status = await sendEmail(values);

    if (status) {
      setMessage("Email sent successfully!");
      form.reset();
    } else {
      setMessage("Error sending email. Please try again later.");
    }
  }

  return (
    <section id="contact" className="flex flex-col   bg-neutral-900 text-white">
      <h1 className="mx-auto mt-10 max-w-xs items-start justify-start text-2xl sm:max-w-xl lg:text-3xl">
        For any enquiries, please fill out the form below.
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 flex w-full max-w-xs flex-col space-y-8 sm:max-w-xl lg:max-w-3xl"
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
                    className="border-none bg-neutral-700 sm:w-1/2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="m-0 flex flex-col justify-between sm:w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="border-none bg-neutral-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-36 border-none bg-neutral-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-1/2 p-6 sm:w-1/4"
          >
            Submit
          </Button>
          <p className="text-white">{message}</p>
        </form>
      </Form>
      <footer className="max-w-screen-xs mx-auto mt-10 flex flex-col items-center space-y-5">
        <div className="mx-auto flex w-1/12 flex-row justify-center space-x-4">
          <Link
            href="https://www.linkedin.com/in/giedrius-k-7a2880a5/"
            className="mx-auto flex"
          >
            <Linkedin
              size={32}
              color="#ffffff"
              strokeWidth={0}
              absoluteStrokeWidth
              fill="currentColor"
              className="flex transition-colors duration-300 ease-in-out hover:text-orange-400"
            />
          </Link>
          <Link href="https://github.com/gkaskonas" className="mx-auto flex">
            <Github
              size={36}
              color="#ffffff"
              strokeWidth={1}
              absoluteStrokeWidth
              fill="currentColor"
              className="flex transition-colors duration-300 ease-in-out hover:text-orange-400"
            />
          </Link>
        </div>
        <p className="py-10 text-white">
          © {year} Peter Kaskonas. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
