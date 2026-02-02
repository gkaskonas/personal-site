"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  "AWS",
  "Serverless",
  "Next.js",
  "React",
  "TypeScript",
  "Kubernetes",
];

const expertise = [
  "Serverless backend deployment",
  "AWS consultancy & architecture",
  "Next.js React development",
  "Full-stack development",
  "Cloud application lifecycle management",
  "Scalable and cost-effective solutions",
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 via-transparent to-transparent" />
      </div>

      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="mb-16 text-center" variants={itemVariants}>
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
            About Me
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Building the Future of Cloud
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={itemVariants}
          >
            <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 card-glow">
              <div className="absolute top-0 left-8 w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />

              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Certified AWS Solutions Architect with excellent communication and
                problem-solving skills. Over 5 years of experience in the AWS
                environment, encompassing a wide range of activities from
                deploying software solutions on existing infrastructure to
                building new, multi-account Landing Zones.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full",
                      "bg-gray-100 dark:bg-gray-800",
                      "text-gray-700 dark:text-gray-300",
                      "border border-gray-200 dark:border-gray-700",
                      "hover:border-primary/50 hover:text-primary transition-colors duration-300"
                    )}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Expertise Card */}
          <motion.div
            className="lg:col-span-5"
            variants={itemVariants}
          >
            <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white card-glow">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </span>
                Expertise
              </h3>
              <ul className="space-y-4">
                {expertise.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Contact Card */}
        <motion.div
          className="mt-8"
          variants={itemVariants}
        >
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 card-glow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Peter Kaskonas</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>United Kingdom</span>
                </div>
              </div>
              <a
                href="mailto:contact@peterkaskonas.com"
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
