<!--
 * @Author: zz 2207677143@qq.com
 * @Date: 2023-09-10 10:47:11
 * @LastEditors: zz 2207677143@qq.com
 * @LastEditTime: 2024-04-01 19:43:12
 * @FilePath: \base_vite_chrome_extension\src\components\PopInput.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
<div>
  <h3>
    中译英
  </h3>
  <input type="text" class="input-box" @keyup.enter="getEnglishTxt" @keydown.ctrl="addToLine1" v-model="chineseTxt"><button type="button" @click="getEnglishTxt">生成</button>
  <button type="button" @click="addToLine1">添加</button>
  <button type="button" @click="saveChineseTxt">收藏</button>
  <p>
    <span>{{englishResult}}</span>
  </p>
  <div>
    {{ englishResultSchedule1.join(",") }}
  </div>
</div>
<div>
  <h3>
    英译中
  </h3>
  <input type="text" class="input-box" @keyup.enter="getChineseTxt" @keydown.ctrl="addToLine2" v-model="englishTxt"><button type="button" @click="getChineseTxt">生成</button>
  <button type="button" @click="addToLine2">添加</button>
  <button type="button" @click="saveEnglishTxt">收藏</button>
  <p>
    <span>{{chineseResult}}</span>
  </p>
  <div>
    {{ englishResultSchedule2.join(",") }}
  </div>
</div>

</template>
<script setup>
import { ref } from "vue";
import {getTanslation} from "../utils/youdao.js"
import { saveWord } from "../storages.js";
const chineseRegex = /[\u4e00-\u9fa5]/;


const chineseTxt=ref("")
const englishTxt=ref("")
const englishResult=ref('')
const chineseResult=ref("")
const englishResultSchedule1=ref([])
const englishResultSchedule2=ref([])
let enCache=null

function addToLine1(e){
  if(e.keyCode!==13) return
  console.log("keyCode",e.keyCode);
  if(!!englishResult.value && !chineseRegex.test(englishResult.value)){
    englishResultSchedule1.value.push(englishResult.value);
    navigator.clipboard.writeText(englishResultSchedule1.value.join(","));
  }
}

function addToLine2(e){
  if(e.keyCode!==13) return
  console.log("keyCode",e.keyCode);
  if(!!englishTxt.value && !chineseRegex.test(englishTxt.value)){
    englishResultSchedule2.value.push(englishTxt.value)
    navigator.clipboard.writeText(englishResultSchedule2.value.join(","));
  }
}

function saveEnglishTxt(){
  if (enCache){
    saveWord(enCache)
  }
}



function saveChineseTxt(){
  getTanslation({
    word: englishResult.value,
  }).then(data=>{
    const translation = {
      en: data.query,
      cn: data.translation.join(""),
      youdao_url: data.webdict.url,
      web: data.web,
    };
    saveWord(translation)
  })
}


function getEnglishTxt(e){
  getTanslation({
    word: chineseTxt.value,
    from: "zh-CHS",
    to: "en",
  }).then(data=>{
    
    englishResult.value=data.translation.join(",")
  })
}

function getChineseTxt(e){
  getTanslation({
    word: englishTxt.value,
  }).then(data=>{
    const translation = {
      en: data.query,
      cn: data.translation.join(""),
      youdao_url: data.webdict.url,
      web: data.web,
    };
    enCache=translation
    chineseResult.value=data.translation.join(",")
    // navigator.clipboard.writeText(chineseResult.value);
  })
}

</script>

<style scoped>
.input-box{
  width: 80px;
}

</style>
