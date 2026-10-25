import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
/* global process */
export default defineConfig(() => {
  // Mặc định bật; chỉ tắt khi REACT_COMPILER=off
  const compilerEnabled = process.env.REACT_COMPILER !== 'off'

  console.log(
    `[React Compiler] ${compilerEnabled ? 'ON' : 'OFF'}`
  )

  return {
    plugins: [
      react(),
      ...(compilerEnabled
        ? [babel({ presets: [reactCompilerPreset()] })]
        : []),
    ],
  }
})