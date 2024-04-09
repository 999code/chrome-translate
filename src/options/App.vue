<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:07:04
 * @LastEditTime: 2022-12-13 14:07:53
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \base_vite_chrome_extension\src\options\App.vue
-->
<template>
  <div class="py-12">
    <i class="block mx-auto i-ri-vuejs-line text-100px text-#42b883"></i>
    <div class="flex items-center justify-center p-12">options page</div>
    <div class="text-center">
      <router-link :to="{ name: 'page1' }">[page1]</router-link>
      <router-link :to="{ name: 'page2' }">[page2]</router-link>
    </div>
    <hr />
    <router-view class="text-center"></router-view>
  </div>
</template>
<style lang="scss">
html,
body {
  @apply text-base;
}
</style>
