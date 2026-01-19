import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    outDir: 'dist',
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React core libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Ant Design (large library)
          'vendor-antd': ['antd', '@ant-design/icons'],
          // Utility libraries
          'vendor-utils': ['axios', 'zustand', 'i18next', 'react-i18next', 'clsx'],
          // Supabase client
          'vendor-supabase': ['@supabase/supabase-js'],
          // ePub reader
          'vendor-epub': ['epubjs'],
        },
      },
    },
  },
});
