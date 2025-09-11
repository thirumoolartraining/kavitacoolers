import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: "/",
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: /^~/, replacement: '' } // Handle imports with ~ prefix
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    optimizeDeps: {
      esbuildOptions: {
        // Enable esbuild's automatic JSX runtime
        jsx: 'automatic',
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@radix-ui/react-dialog', 'class-variance-authority', 'clsx', 'zod'],
          },
        },
      },
    },
    // Ensure env vars are properly exposed to the client
    define: {
      'process.env': {},
      __APP_ENV__: JSON.stringify(env.NODE_ENV || 'production'),
    },
  };
});
