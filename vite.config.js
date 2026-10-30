import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
/* global process */
export default defineConfig(({ command }) => {
  // Mặc định bật; chỉ tắt khi REACT_COMPILER=off
  const compilerEnabled = process.env.REACT_COMPILER !== 'off'
  const isBuild = command === 'build'
  console.log(
    `[React Compiler] ${compilerEnabled ? 'ON' : 'OFF'}`
  )

  return {
    resolve: {
      alias: isBuild
        ? [
          {
            find: /^react-router\/dom$/,
            replacement: fileURLToPath(
              new URL(
                './node_modules/react-router/dist/production/dom-export.mjs',
                import.meta.url
              )
            ),
          },
          {
            find: /^react-router$/,
            replacement: fileURLToPath(
              new URL(
                './node_modules/react-router/dist/production/index.mjs',
                import.meta.url
              )
            ),
          },
        ]
        : [],
    },
    plugins: [
      react(),
      ...(compilerEnabled
        ? [babel({ presets: [reactCompilerPreset()] })]
        : []),
      visualizer({
        filename: "stats.html",
        open: true,
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  }
})