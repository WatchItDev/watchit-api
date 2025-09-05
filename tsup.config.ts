import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  dts: false,
  entry: ['src/index.ts'],
  minify: true,
  bundle: true,
  format: ['esm'],
  target: 'esnext',
  platform: 'node',
  outDir: 'build',
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, 'src'),
    };
  },
  sourcemap: true,
  external: ['express'],
  tsconfig: './tsconfig.json',
  clean: true,
});
