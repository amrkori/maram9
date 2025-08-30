
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/maram9/', // ← حط هنا اسم الريبو بتاعك
});
