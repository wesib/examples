import typescript2 from '@rollup/plugin-typescript';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(({ command }) => {

  const configDir = dirname(fileURLToPath(import.meta.url));
  const srcDir = resolve(configDir, 'src');
  const rev = command === 'build' ? Date.now().toString(32) : '';

  return ({
    root: './src',
    base: './',
    plugins: [
      handlebars({
        partialDirectory: resolve(srcDir, 'template'),
        context: {
          rev,
          common: {},
        },
        runtimeOptions: {
          helpers: {
            'set-base'(base) {
              this.common.base = base;
            },
            'script-path'(path) {
              return `${this.common.base}${path}`;
            },
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
  });
});
