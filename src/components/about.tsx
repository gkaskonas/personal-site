"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, User } from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="flex items-center justify-center  text-gray-900 dark:text-white"
    >
      <motion.div
        className="mx-auto max-w-6xl space-y-8 px-4 py-20 sm:px-6 lg:px-8"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">About Me</h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Certified AWS Solutions Architect with excellent communication and
              problem-solving skills. Over 5 years of experience in the AWS
              environment, encompassing a wide range of activities from
              deploying software solutions on existing infrastructure to
              building new, multi-account Landing Zones.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary">AWS</Badge>
              <Badge variant="secondary">Serverless</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Full-Stack</Badge>
            </div>
          </div>
          <Card className="border-gray-200  dark:border-neutral-700 ">
            <CardContent className="p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-300">
                Expertise
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Serverless backend deployment</li>
                <li>AWS consultancy</li>
                <li>Next.js React development</li>
                <li>Full-stack development</li>
                <li>Cloud application lifecycle management</li>
                <li>Scalable and cost-effective AWS solutions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8 border-gray-200  dark:border-neutral-700 ">
          <CardContent className="p-6">
            <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-300">
              Contact
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <User className="mr-2 h-4 w-4" />
                <span>Peter Kaskonas</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="mr-2 h-4 w-4" />
                <span>United Kingdom</span>
              </div>
              <Link
                href="mailto:contact@peterkaskonas.com"
                className="flex items-center text-gray-700 transition-colors hover:text-primary dark:text-gray-300"
              >
                <Mail className="mr-2 h-4 w-4" />
                <span>contact@peterkaskonas.com</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
