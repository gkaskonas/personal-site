import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import aws from "astro-sst";

export default defineConfig({
  output: "static",
  adapter: aws(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
