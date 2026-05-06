import { defineConfig } from 'vite'
import react from '@vitejs/api-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // O 'base' garante que o site encontre os arquivos (JS, CSS, Imagens)
  // quando estiver rodando no link do GitHub Pages.
  // Substituí o placeholder pelo nome do seu projeto: movimento23
  base: "/movimento23/", 
  
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})