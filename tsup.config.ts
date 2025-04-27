import { defineConfig } from 'tsup'
import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths'

const env = process.env.NODE_ENV;

export default defineConfig({
    dts: true,
    entry: ['src/**/*.ts'],
    minify: env === 'production',
    bundle: env === 'production',
    format: ['esm'],
    target: 'esnext',
    noExternal: ['*'],
    outDir: 'dist',
    sourcemap: true,
    tsconfig: './tsconfig.json',
    clean: true
})
