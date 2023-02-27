import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: false,
    }),
    Unocss({
      presets: [
        presetUno(), // 预设 tailwind\Windi css
        presetAttributify(), // 属性模式 https://github.com/unocss/unocss/tree/main/packages/preset-attributify
        presetIcons({
          prefix: 'i-',
          extraProperties: {
            'display': 'inline-block',
            'cursor': 'pointer',
            'font-size': '20px',
          },
        }), // css图标 https://github.com/unocss/unocss/tree/main/packages/preset-icons
        presetRemToPx({
          baseFontSize: 4,
        }),
      ],
      rules: [],
      shortcuts: [{}],
      include: [/\.vue$/, /\.js$/],
    }),
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: `
  <script>
  document.write("<script type='text/javascript' src='./config.js?v=" + Date.now() + "'><\\/script>");
  </script>
  `,
        },
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/breakpoint.less'
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
