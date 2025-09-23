import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

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
  plugins: [tailwindcss(), react(), glslPlugin()],
  assetsInclude: ['**/*.glb'],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
