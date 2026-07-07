import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/HTML-Lv2-Workbook/',  // ← '/HTML-Lv2-Workbook/' に戻す
})