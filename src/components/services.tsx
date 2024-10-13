"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IService {
  title: string;
  shortDescription: string;
  image?: string;
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);

  const services: IService[] = [
    {
      title: "Web Development",
      shortDescription:
        "I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS.",
      image: "/img/web-development.jpeg",
    },
    {
      title: "Full Stack Developer",
      shortDescription:
        "I build full-stack applications using technologies like SST, Next.js, and more. I have experience in using NoSQL, SQL and other databases.",
      image: "/img/wp10167050.jpg",
    },
    {
      title: "Cloud Consulting",
      shortDescription:
        "I provide consulting services for a wide range of topics, including web development, design, AWS, Kubernetes and more.",
      image: "/img/cloud.jpg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.main
      ref={ref}
      className="mx-auto px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.h1
        className="mb-4 text-center text-4xl font-bold"
        variants={itemVariants}
      >
        Services
      </motion.h1>
      <motion.h2
        className="mx-auto mb-12 max-w-2xl text-center text-xl text-slate-600"
        variants={itemVariants}
      >
        Transform your vision into reality with expert full stack development
        and cutting-edge AWS cloud solutions.
      </motion.h2>
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="h-full overflow-hidden bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="relative h-60 w-full">
                <Image
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  src={service.image!}
                  alt={`${service.title} image`}
                  fill
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out hover:bg-opacity-20" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-600">
                  {service.shortDescription}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
