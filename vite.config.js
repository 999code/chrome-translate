/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 10:18:29
 * @LastEditTime: 2022-12-13 14:06:18
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \base_vite_chrome_extension\vite.config.js
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json"; // Node 14 & 16
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";
import transformerDirectives from "@unocss/transformer-directives";
import presetRemToPx from "@unocss/preset-rem-to-px";

const presets = [
  presetAttributify(),
  presetUno(),
  presetIcons(),
  presetRemToPx(),
];
const transformers = [transformerDirectives()];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
    Unocss({
      mode: "shadow-dom",
      include: ["src/content/*"],
      presets,
      transformers,
    }),
    Unocss({
      include: ["src/options/*", "src/popup/*", "src/test/*"],
      presets,
      transformers,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        test: "pages/test.html",
      },
    },
  },
});
