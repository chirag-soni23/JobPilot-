// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

function inDocker() {
  try {
    if (fs.existsSync('/.dockerenv')) return true
    const cgroup = fs.readFileSync('/proc/1/cgroup', 'utf8')
    return /docker|containerd/i.test(cgroup)
  } catch {
    return false
  }
}

const target = inDocker() ? 'http://backend:5000' : 'http://localhost:5000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // (optional) HMR fix when running via Docker on Windows/Mac
    // hmr: { host: 'localhost', protocol: 'ws', port: 5173 },
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['lucide-react'],
          vendor: ['axios'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
