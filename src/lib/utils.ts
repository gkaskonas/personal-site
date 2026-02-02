import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate estimated reading time for a text
 * @param text - The content to calculate reading time for
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
