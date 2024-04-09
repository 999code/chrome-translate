/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-11-24 17:05:47
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \base_vite_chrome_extension\tailwind.config.cjs
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/content/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
