import typescript2 from '@rollup/plugin-typescript';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { injectHtml, minifyHtml } from 'vite-plugin-html';

export default defineConfig(({ command }) => {
  const configDir = dirname(fileURLToPath(import.meta.url));
  const srcDir = resolve(configDir, 'src');
  const rev = command === 'build' ? Date.now().toString(32) : '';
  const scriptPath =
    command === 'build'
      ? function (path) {
          return `${this.base}${path}`;
        }
      : function (path) {
          return `${path}`;
        };

  return {
    root: './src',
    base: './',
    plugins: [
      minifyHtml({
        removeAttributeQuotes: false,
        removeEmptyAttributes: false,
      }),
      injectHtml({
        injectData: { rev },
        injectOptions: {
          root: resolve(srcDir, 'template'),
          context: {
            base: null,
            setBase(base) {
              this.base = base;
            },
            scriptPath,
          },
        },
      }),
      {
        ...typescript2(),
        apply: 'build',
      },
    ],
    esbuild: command !== 'build',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          home: resolve(srcDir, 'index.html'),
          greeting: resolve(srcDir, 'greeting', 'index.html'),
        },
      },
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        ecma: 2019,
        module: true,
        toplevel: true,
        output: {
          ascii_only: true,
          comments: false,
        },
      },
    },
    server: {
      port: 4200,
    },
  };
});
