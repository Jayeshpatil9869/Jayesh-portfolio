import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to handle .glsl files
function glslPlugin() {
  return {
    name: 'vite-plugin-glsl',
    transform(code, id) {
      if (id.endsWith('.glsl')) {
        // Return the shader code as a JavaScript string
        const transformedCode = `export default ${JSON.stringify(code)};`;
        return {
          code: transformedCode,
          map: null
        };
      }
    }
  };
}

export default defineConfig({
  server: {
    host: true, // Exposes the project on local network (Network: http://192.168.x.x:5173)
  },
  plugins: [tailwindcss(), react(), glslPlugin()],
  resolve: {
    alias: {
      // Must match tsconfig.app.json paths("@/*" -> "./src/*")
      "@": path.resolve(rootDir, "src"),
    },
  },
  assetsInclude: ['**/*.glb'],
  build: {
    // Hashed bundles go to /static so public/_headers can cache them immutably
    // (public/assets/* keeps stable, un-hashed file names).
    assetsDir: "static",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          gsap: ["gsap", "@gsap/react"],
          framer: ["framer-motion"],
        },
      },
    },
  },
});
