/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-05 10:58:35
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \base_vite_chrome_extension\src\options\main.js
 */
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import "uno.css";
import "@unocss/reset/tailwind.css";

const routes = [
  {
    path: "/page1",
    name: "page1",
    component: () => import("./router/page1.vue"),
  },
  {
    path: "/page2",
    name: "page2",
    component: () => import("./router/page2.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
