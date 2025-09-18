import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist' // <- this is what Vercel expects
  }
});
