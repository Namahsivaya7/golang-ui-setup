import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'golang-ui-setup.onrender.com', // ✅ hostname only
      'localhost',                    // optional for local dev
    ],
    port: 5173,
  },
});
