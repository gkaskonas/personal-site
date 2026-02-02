"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, Code, Cloud, Globe, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Import optimized images
import webDevImage from "@/assets/img/web-development.jpeg";
import serverlessImage from "@/assets/img/wp10167050.jpg";
import cloudImage from "@/assets/img/cloud.jpg";

interface IService {
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
  technologies: {
    name: string;
    description: string;
  }[];
}

const services: IService[] = [
  {
    title: "Modern Web Development",
    shortDescription:
      "Fast, responsive, and SEO-optimized web applications built with Next.js 14, React 18, and edge computing",
    longDescription:
      "I build cutting-edge web applications using the latest frameworks and best practices:\n- Server components and streaming for optimal performance\n- Edge computing for global low-latency delivery\n- Core Web Vitals optimization for better search rankings\n- Type-safe development with TypeScript 5\n- Responsive design with modern CSS features\n\nMy focus on performance optimization typically results in 40-70% faster load times compared to traditional approaches.",
    image: webDevImage.src,
    icon: <Globe className="h-6 w-6" />,
    features: [
      "Next.js optimization",
      "TypeScript development",
      "Accessibility-focused UI",
      "Performance monitoring",
      "Third-party API integration",
    ],
    technologies: [
      { name: "Next.js", description: "React framework with server components for optimal performance" },
      { name: "TypeScript", description: "Typed JavaScript for improved code quality" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development" },
      { name: "Vercel", description: "Edge deployment platform for global content delivery" },
      { name: "Cloudflare", description: "Global CDN for edge caching and security" },
    ],
  },
  {
    title: "Serverless Cloud Development",
    shortDescription:
      "Cost-efficient serverless solutions with pay-per-use models that reduce cloud spend by up to 60%",
    longDescription:
      "I develop scalable cloud-native applications using:\n- AWS Lambda and serverless patterns\n- Infrastructure-as-Code with AWS CDK\n- Cost-optimized database solutions\n- CI/CD pipelines for automated deployments\n- Real-time data processing architectures\n\nRecent projects have achieved 30-50% cloud cost savings through architectural optimizations.",
    image: serverlessImage.src,
    icon: <Code className="h-6 w-6" />,
    features: [
      "Serverless architecture",
      "Cloud cost optimization",
      "Database design",
      "DevOps automation",
      "Microservices implementation",
    ],
    technologies: [
      { name: "AWS Lambda", description: "Serverless computing platform for running applications" },
      { name: "SST/CDK", description: "Serverless Stack Toolkit for deploying AWS infrastructure" },
      { name: "DynamoDB", description: "NoSQL database for high performance and scalability" },
      { name: "Serverless Framework", description: "Open-source framework for serverless applications" },
      { name: "GitHub Actions", description: "Automated workflow for CI/CD pipelines" },
    ],
  },
  {
    title: "Cloud Cost Optimization",
    shortDescription:
      "Strategic infrastructure reviews that reduce AWS bills while improving performance and scalability",
    longDescription:
      "I specialize in auditing and optimizing cloud infrastructure to maximize value:\n- Identify and eliminate idle or over-provisioned resources\n- Implement auto-scaling for workload-based cost management\n- Optimize data storage and transfer patterns\n- Right-size infrastructure to match actual usage patterns\n- Implement reserved instances and savings plans\n\nMy clients typically see a 30-60% reduction in monthly AWS bills after optimization.",
    image: cloudImage.src,
    icon: <Cloud className="h-6 w-6" />,
    features: [
      "Cost analysis",
      "Architecture review",
      "Resource right-sizing",
      "Monitoring setup",
      "Budget forecasting",
    ],
    technologies: [
      { name: "AWS Cost Explorer", description: "Web service for managing AWS costs and usage" },
      { name: "CloudWatch", description: "Monitoring and management service for AWS" },
      { name: "Kubernetes", description: "Open-source container orchestration platform" },
      { name: "Terraform", description: "Infrastructure as Code tool for managing infrastructure" },
      { name: "Prometheus", description: "Open-source monitoring system for metrics" },
    ],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<IService | null>(null);

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
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
            What I Do
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your vision into reality with expert full stack development
            and cutting-edge AWS cloud solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div
                className={cn(
                  "h-full flex flex-col overflow-hidden rounded-2xl",
                  "bg-white dark:bg-gray-900/50",
                  "border border-gray-200 dark:border-gray-800",
                  "card-glow cursor-pointer",
                  "transition-all duration-500"
                )}
                onClick={() => setSelectedService(service)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-primary">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-1">
                    {service.shortDescription}
                  </p>

                  {/* Learn More Link */}
                  <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-y-auto max-h-[90vh]"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {selectedService.icon}
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedService.title}
                      </DialogTitle>
                      <DialogDescription className="mt-1 text-gray-600 dark:text-gray-400">
                        {selectedService.shortDescription}
                      </DialogDescription>
                    </div>
                  </div>
                </div>

                {/* Tabs Content */}
                <Tabs defaultValue="overview" className="p-6">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="tech">Technologies</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    {selectedService.longDescription.split("\n").map((line, index) => {
                      const isListItem = line.startsWith("- ");
                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex items-start gap-3",
                            isListItem && "ml-2"
                          )}
                        >
                          {isListItem && (
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          )}
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {line.replace(/^- /, "")}
                          </p>
                        </div>
                      );
                    })}
                  </TabsContent>

                  <TabsContent value="features">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedService.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {feature}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tech">
                    <div className="grid gap-3">
                      {selectedService.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                              <Code className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {tech.name}
                              </h4>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 p-6 flex gap-3 justify-end">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <Button asChild>
                    <a href="#contact">Contact Me</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
