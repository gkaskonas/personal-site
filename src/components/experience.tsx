"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Experience() {
  const [skills, setSkills] = React.useState([
    { name: "AWS", progress: 13 },
    { name: "CDK", progress: 13 },
    { name: "Devops", progress: 13 },
    { name: "Kubernetes", progress: 13 },
    { name: "Typescript", progress: 13 },
  ]);

  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          const timer = setTimeout(() => {
            setSkills([
              { name: "AWS", progress: 90 },
              { name: "CDK", progress: 88 },
              { name: "Devops", progress: 85 },
              { name: "Kubernetes", progress: 80 },
              { name: "Typescript", progress: 70 },
            ]);
          }, 500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="flex flex-col text-2xl font-semibold">
      {children}
      <motion.div className="mt-1 h-1 bg-blue-200" />
    </h2>
  );

  return (
    <motion.section
      id="resume"
      ref={sectionRef}
      className="mx-auto mt-10 flex max-w-xs flex-col space-y-8 sm:max-w-2xl lg:max-w-4xl"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <motion.div
        className="flex flex-col justify-between space-y-5 text-left sm:flex-row sm:space-y-0"
        variants={sectionVariants}
      >
        <SectionTitle>Education</SectionTitle>
        <motion.li
          className="flex basis-1/2 flex-col justify-between"
          variants={listItemVariants}
        >
          <ul className="flex flex-col">
            <h3 className="text-xl font-semibold">Bsc in Games Technologies</h3>
            <p className="text-base italic text-muted-foreground">
              Coventry University
            </p>
            <p className="text-base text-muted-foreground">2013-2017</p>
          </ul>
        </motion.li>
      </motion.div>
      <Separator className="bg-primary/20" />
      <motion.div
        className="flex flex-col justify-between space-y-5 text-left sm:flex-row sm:space-y-0"
        variants={sectionVariants}
      >
        <SectionTitle>Experience</SectionTitle>
        <li className="flex basis-1/2 list-outside flex-col justify-between space-y-6">
          {[
            {
              company: "Lumar",
              roles: [
                { title: "Devops Lead", period: "Dec 2022 - Present" },
                {
                  title: "Senior Devops Engineer",
                  period: "Jul 2021 - Dec 2022",
                },
              ],
            },
            {
              company: "Inawisdom",
              roles: [
                { title: "Cloud Engineer", period: "Sep 2020 - Jul 2021" },
              ],
            },
            {
              company: "Ocado",
              roles: [
                { title: "Devops Engineer", period: "Sep 2019 - Sep 2020" },
              ],
            },
          ].map((job, index) => (
            <motion.ul
              key={job.company}
              className="flex flex-col space-y-2"
              variants={listItemVariants}
            >
              <h3 className="text-xl font-semibold">{job.company}</h3>
              {job.roles.map((role, roleIndex) => (
                <motion.div
                  key={roleIndex}
                  className="border-l-2 border-primary pl-4"
                  variants={listItemVariants}
                >
                  <p className="text-base font-medium">{role.title}</p>
                  <p className="text-sm text-muted-foreground">{role.period}</p>
                </motion.div>
              ))}
            </motion.ul>
          ))}
        </li>
      </motion.div>
      <Separator className="bg-primary/20" />
      <motion.div
        className="flex flex-col justify-between space-y-5 text-left sm:flex-row sm:space-y-0"
        variants={sectionVariants}
      >
        <SectionTitle>Skills</SectionTitle>
        <li className="flex basis-1/2 list-outside flex-col justify-between space-y-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex flex-col"
              variants={skillVariants}
            >
              <h3 className="mb-2 text-lg font-semibold">{skill.name}</h3>
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="mt-1 text-right text-sm text-muted-foreground">
                {skill.progress}%
              </p>
            </motion.div>
          ))}
        </li>
      </motion.div>
    </motion.section>
  );
}
