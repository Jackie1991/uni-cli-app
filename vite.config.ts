import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: +(process.env.PORT || 3000),
    open: true,
  },
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/hooks'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        // 例如，添加 autoprefixer 插件
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', '> 1%'],
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/mixin.scss" as *;
        `,
      },
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
