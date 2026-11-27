import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import aws from "astro-sst";

export default defineConfig({
  output: "static",
  adapter: aws(),
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
