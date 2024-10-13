"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Code, Cloud, Globe } from "lucide-react";

interface IService {
  title: string;
  shortDescription: string;
  longDescription: string;
  image?: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);

  const services: IService[] = [
    {
      title: "Web Development",
      shortDescription:
        "I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS.",
      longDescription:
        "With years of experience in web development, I create robust and scalable web applications tailored to your specific needs. Using cutting-edge technologies like React and Next.js, I ensure your website is not only visually appealing but also performant and SEO-friendly. My expertise in Tailwind CSS allows for rapid development of custom, responsive designs that look great on all devices.",
      image: "/img/web-development.jpeg",
      icon: <Globe className="h-6 w-6" />,
      features: [
        "Responsive design",
        "SEO optimization",
        "Performance tuning",
        "Accessibility compliance",
        "Cross-browser compatibility",
      ],
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Node.js",
      ],
    },
    {
      title: "Full Stack Development",
      shortDescription:
        "I build full-stack applications using technologies like SST, Next.js, and more. I have experience in using NoSQL, SQL and other databases.",
      longDescription:
        "As a full-stack developer, I offer end-to-end solutions for your web applications. From designing efficient backend systems using SST and Next.js to creating intuitive front-end interfaces, I cover all aspects of the development process. My experience with various database technologies, including NoSQL and SQL, ensures that your data is managed effectively and securely.",
      image: "/img/wp10167050.jpg",
      icon: <Code className="h-6 w-6" />,
      features: [
        "End-to-end application development",
        "Database design and optimization",
        "API development",
        "Authentication and authorization",
        "Scalable architecture design",
      ],
      technologies: [
        "SST",
        "Next.js",
        "MongoDB",
        "PostgreSQL",
        "GraphQL",
        "REST",
      ],
    },
    {
      title: "Cloud Consulting",
      shortDescription:
        "I provide consulting services for a wide range of topics, including web development, design, AWS, Kubernetes and more.",
      longDescription:
        "My cloud consulting services cover a wide range of technologies and platforms. Whether you're looking to migrate to AWS, optimize your Kubernetes clusters, or need guidance on cloud-native development practices, I can help. I offer expert advice on cloud architecture, cost optimization, and best practices to ensure your cloud infrastructure is scalable, secure, and efficient.",
      image: "/img/cloud.jpg",
      icon: <Cloud className="h-6 w-6" />,
      features: [
        "Cloud migration strategies",
        "Kubernetes optimization",
        "Serverless architecture design",
        "Cost optimization",
        "Security best practices",
      ],
      technologies: [
        "AWS",
        "Kubernetes",
        "Docker",
        "Terraform",
        "Serverless Framework",
      ],
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
              </div>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  {service.icon}
                  <span className="ml-2">{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-600">
                  {service.shortDescription}
                </p>
                <Button onClick={() => setSelectedService(service)}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-3xl font-bold">
              {selectedService?.icon}
              <span className="ml-2">{selectedService?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-lg">
              {selectedService?.shortDescription}
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p className="">{selectedService?.longDescription}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {selectedService?.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="technologies" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {selectedService?.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-end">
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </motion.main>
  );
}
