import * as path from "path"

import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      localsConvention: "dashes",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
})
