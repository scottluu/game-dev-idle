import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8080",
      "/public-api": "http://127.0.0.1:8080",
    },
  },
  plugins: [react()],
  define: {
    global: {},
  },
});
