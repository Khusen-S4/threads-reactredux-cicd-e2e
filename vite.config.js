import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})

// konfigurasi Vitest agar bisa mengenali environment testing.
// globals: true

// Memungkinkan penggunaan:

// describe()
// it()
// expect()