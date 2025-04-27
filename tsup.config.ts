import { defineConfig } from 'tsup'
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
    clean: true
})
