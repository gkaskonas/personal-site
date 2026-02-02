"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingShapeProps {
  shape: "circle" | "square" | "ring";
  size: number;
  color?: "blue" | "white";
  className?: string;
  animationDuration?: number;
  delay?: number;
}

export function FloatingShape({
  shape,
  size,
  color = "blue",
  className,
  animationDuration = 6,
  delay = 0,
}: FloatingShapeProps) {
  const colorClasses = {
    blue: "bg-primary/10 border-primary/20",
    white: "bg-white/10 border-white/20",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg rotate-45",
    ring: "rounded-full bg-transparent border-2",
  };

  return (
    <motion.div
      className={cn(
        "absolute",
        shape !== "ring" && colorClasses[color],
        shape === "ring" && `bg-transparent border-2 ${color === "blue" ? "border-primary/20" : "border-white/20"}`,
        shapeClasses[shape],
        className
      )}
      style={{
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
        y: [0, -20, 0],
        rotate: shape === "square" ? [45, 50, 45] : [0, 5, 0],
      }}
      transition={{
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}
