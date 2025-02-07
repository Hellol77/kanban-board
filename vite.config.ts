import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능
    port: 5173, // 기본 포트 (변경 가능)
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
});
