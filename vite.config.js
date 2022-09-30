import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2011,
  },
  plugins: [react()],
  test: {
    globals: true,
  },
});
