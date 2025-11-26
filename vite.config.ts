import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@stories": path.resolve(__dirname, "src/stories"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
});
