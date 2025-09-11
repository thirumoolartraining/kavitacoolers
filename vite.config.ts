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
      assetsInlineLimit: 0, // Ensure all assets are copied as files
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@radix-ui/react-dialog', 'class-variance-authority', 'clsx', 'zod'],
          },
          assetFileNames: (assetInfo) => {
            // Keep the original filename for all assets
            return assetInfo.name || '';
          },
        },
      },
    },
    server: {
      // Ensure static files are served correctly in development
      host: true,
      port: 3000,
    },
    // Ensure env vars are properly exposed to the client
    define: {
      'process.env': {},
      __APP_ENV__: JSON.stringify(env.NODE_ENV || 'production'),
    },
  };
});
