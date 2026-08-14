"use client";

import { motion } from "framer-motion";
import {
  UploadCloud,
  Cpu,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Swap for the client's real name (and add a link) once they've approved it
const clientName = "a US-based company selling church media online";

const pipelineSteps = [
  {
    icon: <UploadCloud className="w-6 h-6" />,
    title: "Ingest",
    description: "Master files are uploaded to AWS and queued automatically",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Process",
    description: "Masters are transcoded into final download formats",
  },
  {
    icon: <Send className="w-6 h-6" />,
    title: "Deliver",
    description: "Products are published straight to their WordPress store",
  },
];

const results = [
  "Processing a bundle went from 18 hours to under 45 minutes",
  "A simple web app replaced command-line tools tied to office Macs",
  "Pay-per-use cloud costs instead of always-on servers",
  "Capacity that scales up and down with demand",
];

export default function FeaturedWork() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="work" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Featured Work
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Real Software, Real Results
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A recent project: a media pipeline SaaS built for {clientName}.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          {/* Story */}
          <motion.div variants={itemVariants}>
            <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 card-glow">
              <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                Case Study — Media Pipeline SaaS
              </span>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                From manual processing to an automated pipeline
              </h3>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Getting video ready for their online store was slow, hands-on
                work: every new product meant running clunky command-line
                tools on office Macs, then converting, checking and moving
                files by hand — capping how quickly the catalogue could grow.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I designed and built a cloud-based pipeline that handles the
                whole workflow automatically: master files are ingested into
                AWS, processed into the final downloadable formats, and
                published straight to their WordPress store (Easy Digital
                Downloads) — all on serverless infrastructure that only costs
                money while it&apos;s working.
              </p>

              <ul className="space-y-3">
                {results.map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {result}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pipeline Visual */}
          <motion.div variants={itemVariants}>
            <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white card-glow flex flex-col justify-center">
              <h4 className="text-lg font-semibold mb-8 text-center text-white/90">
                How the pipeline works
              </h4>

              <div className="space-y-2">
                {pipelineSteps.map((step, index) => (
                  <div key={step.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.2 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="p-3 rounded-lg bg-primary/20 text-primary">
                        {step.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-sm text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                    {index < pipelineSteps.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-4 bg-gradient-to-b from-primary/50 to-transparent" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Headline stat */}
              <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                <p className="text-3xl font-extrabold text-primary">
                  18h <span className="text-white/60 font-normal">→</span>{" "}
                  &lt;45min
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  time to process one product bundle
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["SaaS", "AWS", "Serverless", "WordPress", "Automation"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section CTA */}
        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Got a process that eats your team&apos;s time? Let&apos;s automate
            it.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="#contact">
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
