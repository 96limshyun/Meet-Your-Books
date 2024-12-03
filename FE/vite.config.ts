import react from "@vitejs/plugin-react";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": `${__dirname}/src/components`,
      "@": `${__dirname}/src`,
    },
  },
});