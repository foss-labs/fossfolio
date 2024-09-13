import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    dir: "./__tests__",
    exclude: ["./e2e"],
    alias: {
      "@app": path.resolve(__dirname),
    },
  },
});
