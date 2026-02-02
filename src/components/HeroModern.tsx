"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { FloatingShape } from "./FloatingShape";

interface HeroModernProps {
  heroImageUrl: string;
}

export function HeroModern({ heroImageUrl }: HeroModernProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "33.333333%",
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 1,
      },
    },
  };

  return (
    <section className="relative mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ y: backgroundY }}
      >
        <img
          src={heroImageUrl}
          alt="Hero background"
          className="h-[120%] w-full object-cover"
        />
      </motion.div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 -z-10 hero-gradient-overlay" />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <FloatingShape
          shape="circle"
          size={120}
          color="blue"
          className="top-[15%] left-[10%]"
          animationDuration={8}
          delay={0}
        />
        <FloatingShape
          shape="square"
          size={80}
          color="white"
          className="top-[25%] right-[15%]"
          animationDuration={10}
          delay={1}
        />
        <FloatingShape
          shape="ring"
          size={150}
          color="blue"
          className="bottom-[30%] left-[5%]"
          animationDuration={12}
          delay={2}
        />
        <FloatingShape
          shape="circle"
          size={60}
          color="white"
          className="top-[60%] right-[10%]"
          animationDuration={7}
          delay={0.5}
        />
        <FloatingShape
          shape="square"
          size={100}
          color="blue"
          className="bottom-[20%] right-[25%]"
          animationDuration={9}
          delay={1.5}
        />
        <FloatingShape
          shape="ring"
          size={90}
          color="white"
          className="top-[10%] right-[40%]"
          animationDuration={11}
          delay={3}
        />
      </div>

      {/* Main Content with Parallax */}
      <motion.div
        className="z-10 flex w-full flex-col items-center justify-center px-4 text-center text-white"
        style={{ y: contentY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* AWS Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 glass rounded-full px-4 py-2 text-sm font-medium text-white/90 border border-white/20"
        >
          AWS Certified Solutions Architect
        </motion.div>

        {/* Name - Split for staggered animation */}
        <motion.h1
          className="text-4xl font-extrabold sm:text-[70px] lg:text-[90px] leading-tight"
          variants={itemVariants}
        >
          <motion.span className="block" variants={itemVariants}>
            Peter
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Kaskonas
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-4 sm:mt-8 text-lg sm:text-2xl text-white/80 max-w-2xl"
        >
          Architecting Scalable Cloud Solutions
        </motion.p>

        {/* Animated Separator */}
        <motion.div
          className="my-6 sm:my-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          variants={lineVariants}
        />

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row justify-center space-x-6"
        >
          <a
            href="https://www.linkedin.com/in/giedrius-k-7a2880a5/"
            className="group glass rounded-full p-3 border border-white/20 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn
              size={24}
              className="transition-colors duration-300 group-hover:text-primary"
            />
          </a>
          <a
            href="https://github.com/gkaskonas"
            className="group glass rounded-full p-3 border border-white/20 transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]"
            aria-label="GitHub Profile"
          >
            <FaGithub
              size={24}
              className="transition-colors duration-300 group-hover:text-primary"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
