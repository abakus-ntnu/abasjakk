import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from 'path';

export default ({ mode }) => defineConfig({
  plugins: [preact()],
  server: { port: 3000 },
  define: {
    "process.env": loadEnv(mode, process.cwd(), ""),
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
});