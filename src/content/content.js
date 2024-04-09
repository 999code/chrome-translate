/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:23:06
 * @LastEditTime: 2022-12-02 11:14:00
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \base_vite_chrome_extension\src\content\content.js
 */

import { defineCustomElement } from "vue";
import App from "./Content.ce.vue";

const AppShadow = defineCustomElement(App);

const id = Math.floor(Math.random() * 100000);
customElements.define(`ext-app-${id}`, AppShadow);
document.body.append(
  new AppShadow({
    test: 1,
  }),
);
