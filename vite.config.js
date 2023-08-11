import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginRewriteAll from "vite-plugin-rewrite-all"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
   base:"/",
  resolve:{
    alias: {
    "@": path.resolve(__dirname, "./src")
  },
 },
 root: './',
    build: {
        outDir: 'dist', 
    },
    publicDir: 'public',
  plugins: [vue(),pluginRewriteAll()]
})
