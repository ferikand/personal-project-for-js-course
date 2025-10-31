import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  port: 5173,
  open: true,

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
