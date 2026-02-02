"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "AWS", progress: 90 },
  { name: "CDK/SST", progress: 88 },
  { name: "DevOps", progress: 85 },
  { name: "Kubernetes", progress: 80 },
  { name: "TypeScript", progress: 75 },
];

const experience = [
  {
    company: "Lumar",
    roles: [
      { title: "DevOps Lead", period: "Dec 2022 - Present" },
      { title: "Senior DevOps Engineer", period: "Jul 2021 - Dec 2022" },
    ],
  },
  {
    company: "Inawisdom",
    roles: [{ title: "Cloud Engineer", period: "Sep 2020 - Jul 2021" }],
  },
  {
    company: "Ocado",
    roles: [{ title: "DevOps Engineer", period: "Sep 2019 - Sep 2020" }],
  },
];

export default function Experience() {
  const [animatedSkills, setAnimatedSkills] = React.useState(
    skills.map((s) => ({ ...s, progress: 0 }))
  );
  const [hasAnimated, setHasAnimated] = React.useState(false);

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

  const handleInView = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => {
        setAnimatedSkills(skills);
      }, 500);
    }
  };

  return (
    <section id="resume" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        onViewportEnter={handleInView}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Career
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Experience & Skills
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Education & Experience */}
          <div className="space-y-12">
            {/* Education */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Education
                </h3>
              </div>
              <div className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 card-glow">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    BSc in Games Technologies
                  </h4>
                  <p className="text-primary font-medium">Coventry University</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    2013 - 2017
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Experience
                </h3>
              </div>
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-6">
                {experience.map((job, jobIndex) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: jobIndex * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 card-glow">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {job.company}
                      </h4>
                      <div className="space-y-3">
                        {job.roles.map((role, roleIndex) => (
                          <div
                            key={roleIndex}
                            className={cn(
                              "pl-4 border-l-2",
                              roleIndex === 0
                                ? "border-primary"
                                : "border-gray-300 dark:border-gray-700"
                            )}
                          >
                            <p className="font-medium text-gray-900 dark:text-white">
                              {role.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {role.period}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Skills
              </h3>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 card-glow">
              <div className="space-y-8">
                {animatedSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {skill.progress}%
                      </span>
                    </div>
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                          delay: index * 0.15,
                        }}
                      />
                      {/* Animated glow effect */}
                      <motion.div
                        className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ left: "-10%" }}
                        animate={{ left: "110%" }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: 1 + index * 0.15,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
