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
import { CheckCircle, Code, Cloud, Globe, CircleCheck } from "lucide-react";

interface IService {
  title: string;
  shortDescription: string;
  longDescription: string;
  image?: string;
  icon: React.ReactNode;
  features: string[];
  technologies: {
    name: string;
    description: string;
  }[];
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);

  const services: IService[] = [
    {
      title: "Modern Web Development",
      shortDescription:
        "Fast, responsive, and SEO-optimized web applications built with Next.js 14, React 18, and edge computing",
      longDescription:
        "I build cutting-edge web applications using the latest frameworks and best practices:\n- Server components and streaming for optimal performance\n- Edge computing for global low-latency delivery\n- Core Web Vitals optimization for better search rankings\n- Type-safe development with TypeScript 5\n- Responsive design with modern CSS features\n\nMy focus on performance optimization typically results in 40-70% faster load times compared to traditional approaches.",

      image: "/img/web-development.jpeg",
      icon: <Globe className="h-6 w-6" />,
      features: [
        "Next.js optimization",
        "TypeScript development",
        "Accessibility-focused UI",
        "Performance monitoring",
        "Third-party API integration",
      ],
      technologies: [
        {
          name: "Next.js",
          description:
            "React framework with server components for optimal performance",
        },
        {
          name: "TypeScript",
          description:
            "Typed JavaScript for improved code quality and developer experience",
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid UI development",
        },
        {
          name: "Vercel",
          description: "Edge deployment platform for global content delivery",
        },
        {
          name: "Cloudflare",
          description: "Global CDN for edge caching and security",
        },
      ],
    },
    {
      title: "Serverless Cloud Development",
      shortDescription:
        "Cost-efficient serverless solutions with pay-per-use models that reduce cloud spend by up to 60%",
      longDescription:
        "I develop scalable cloud-native applications using:\n- AWS Lambda and serverless patterns\n- Infrastructure-as-Code with AWS CDK\n- Cost-optimized database solutions\n- CI/CD pipelines for automated deployments\n- Real-time data processing architectures\n\nRecent projects have achieved 30-50% cloud cost savings through architectural optimizations.",
      image: "/img/wp10167050.jpg",
      icon: <Code className="h-6 w-6" />,
      features: [
        "Serverless architecture",
        "Cloud cost optimization",
        "Database design",
        "DevOps automation",
        "Microservices implementation",
      ],
      technologies: [
        {
          name: "AWS Lambda",
          description: "Serverless computing platform for running applications",
        },
        {
          name: "SST/CDK",
          description:
            "Serverless Stack Toolkit for deploying AWS infrastructure",
        },
        {
          name: "DynamoDB",
          description: "NoSQL database for high performance and scalability",
        },
        {
          name: "Serverless Framework",
          description:
            "Open-source framework for deploying serverless applications",
        },
        {
          name: "GitHub Actions",
          description: "Automated workflow for CI/CD pipelines",
        },
      ],
    },
    {
      title: "Cloud Cost Optimization",
      shortDescription:
        "Strategic infrastructure reviews that reduce AWS bills while improving performance and scalability",
      longDescription:
        "I specialize in auditing and optimizing cloud infrastructure to maximize value:\n- Identify and eliminate idle or over-provisioned resources\n- Implement auto-scaling for workload-based cost management\n- Optimize data storage and transfer patterns\n- Right-size infrastructure to match actual usage patterns\n- Implement reserved instances and savings plans\n\nMy clients typically see a 30-60% reduction in monthly AWS bills after optimization, with one recent project cutting costs from $12,000/month to $4,500/month while improving performance.",
      image: "/img/cloud.jpg",
      icon: <Cloud className="h-6 w-6" />,
      features: [
        "Cost analysis",
        "Architecture review",
        "Resource right-sizing",
        "Monitoring setup",
        "Budget forecasting",
      ],
      technologies: [
        {
          name: "AWS Cost Explorer",
          description: "Web service for managing AWS costs and usage",
        },
        {
          name: "CloudWatch",
          description: "Monitoring and management service for AWS",
        },
        {
          name: "Kubernetes",
          description: "Open-source container orchestration platform",
        },
        {
          name: "Terraform",
          description:
            "Infrastructure as Code tool for managing and provisioning infrastructure",
        },
        {
          name: "Prometheus",
          description: "Open-source monitoring system for metrics",
        },
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
      className="mx-auto  px-4 py-16  sm:px-6 lg:max-w-7xl lg:px-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.h1
        className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white"
        variants={itemVariants}
      >
        Services
      </motion.h1>
      <motion.h2
        className="mx-auto mb-12 max-w-2xl text-center text-xl text-gray-600 dark:text-gray-300"
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
            <Card className="flex h-full flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="relative h-60 w-full">
                <Image
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  src={service.image!}
                  alt={`${service.title} image`}
                  fill
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                  {service.icon}
                  <span className="ml-2">{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.shortDescription}
                  </p>
                </div>
                <Button
                  onClick={() => setSelectedService(service)}
                  className="mt-6 w-1/3"
                >
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
        <DialogContent className="overflow-hidden border-none bg-gradient-to-b from-white to-gray-50 p-0 dark:from-gray-900 dark:to-gray-950 sm:max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pt-6">
              <div className="mb-4 flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30"
                >
                  {selectedService?.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <DialogTitle className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                    {selectedService?.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-base font-medium text-gray-600 dark:text-gray-300">
                    {selectedService?.shortDescription}
                  </DialogDescription>
                </motion.div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-2">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                  <TabsTrigger
                    value="overview"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger
                    value="technologies"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Technologies
                  </TabsTrigger>
                </TabsList>
              </div>

              <motion.div
                className="px-6 py-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TabsContent
                  value="overview"
                  className="mt-2 focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    className="space-y-4 text-gray-600 dark:text-gray-300"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {selectedService?.longDescription
                      .split("\n")
                      .map((line, index) => {
                        const isListItem = line.startsWith("- ");
                        return (
                          <motion.div
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            className={`flex items-start ${
                              isListItem ? "space-x-3" : ""
                            }`}
                          >
                            {isListItem && (
                              <CircleCheck className="mt-1 h-4 w-4 flex-shrink-0 text-blue-500" />
                            )}
                            <p className="leading-relaxed">
                              {line.replace(/^- /, "")}
                            </p>
                          </motion.div>
                        );
                      })}
                  </motion.div>
                </TabsContent>

                <TabsContent
                  value="features"
                  className="mt-2 focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {selectedService?.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          }}
                          className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all dark:bg-gray-800/40"
                        >
                          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-500/10 dark:bg-blue-500/5" />
                          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />

                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {feature}
                              </h4>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent
                  value="technologies"
                  className="mt-2 focus-visible:outline-none focus-visible:ring-0"
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {selectedService?.technologies.map((tech, index) => {
                        // Define descriptions for common technologies
                        const descriptions: Record<string, string> = {
                          "Next.js":
                            "React framework with server components for optimal performance",
                          TypeScript:
                            "Typed JavaScript for improved code quality and developer experience",
                          "Tailwind CSS":
                            "Utility-first CSS framework for rapid UI development",
                          Vercel:
                            "Edge deployment platform for global content delivery",
                          Cloudflare:
                            "Global CDN for edge caching and security",
                          "AWS Lambda":
                            "Serverless compute service for event-driven applications",
                          PostgreSQL:
                            "Powerful open-source relational database",
                          DynamoDB:
                            "Fully managed NoSQL database with single-digit millisecond performance",
                          SST: "Infrastructure as code framework for AWS serverless applications",
                          Docker:
                            "Containerization platform for consistent deployment environments",
                          "AWS Cost Explorer":
                            "AWS service for visualizing and managing cloud spending",
                          CloudWatch:
                            "Monitoring and observability service for AWS resources",
                          Kubernetes:
                            "Container orchestration system for automated deployment and scaling",
                          Terraform:
                            "Infrastructure as code tool for multi-cloud provisioning",
                          Prometheus:
                            "Monitoring and alerting toolkit for container environments",
                        };

                        // Get description or use a generic one if not found
                        const description =
                          tech.description ||
                          descriptions[
                            tech.name as keyof typeof descriptions
                          ] ||
                          "Modern technology for efficient development and deployment";

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="flex gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                          >
                            <div className="mt-0.5 rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                              <Code className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {tech.name}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </TabsContent>
              </motion.div>
            </Tabs>

            <motion.div
              className="mt-3 flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DialogClose asChild>
                <Button variant="outline" className="rounded-full px-4">
                  Close
                </Button>
              </DialogClose>
              <Button
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 shadow-md transition-all hover:from-blue-700 hover:to-indigo-700"
                onClick={() =>
                  (window.location.href =
                    "mailto:contact@peterkaskonas.com.com?subject=Service Inquiry")
                }
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.main>
  );
}
