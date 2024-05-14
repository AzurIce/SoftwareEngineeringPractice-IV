import { defineConfig } from 'vite';
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    UnoCSS(),
    suidPlugin(), 
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
