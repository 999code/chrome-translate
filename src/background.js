/*
 * @Author: zz 2207677143@qq.com
 * @Date: 2023-09-10 10:47:11
 * @LastEditors: zz 2207677143@qq.com
 * @LastEditTime: 2023-09-24 12:11:53
 * @FilePath: \base_vite_chrome_extension\src\background.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getTanslation } from "./utils/youdao.js";
import { saveWord } from "./storages.js";
/**
 * @description: 创建右键收藏按钮
 * @return {*}
 */
function createContextMenus() {
  chrome.contextMenus.create({
    type: "normal",
    id: "savePage",
    contexts: ["selection"],
    title: "收藏单词",
    checked: false,
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已被安装");

  createContextMenus();
  chrome.contextMenus.onClicked.addListener(function (params) {
    console.log(params.selectionText);
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    getTanslation({
      word: params.selectionText,
    }).then((data) => {
      const translation = {
        en: data.query,
        cn: data.translation.join(""),
        youdao_url: data.webdict.url,
        web: data.web,
      };
      saveWord(translation);
    });
  });
});

//   chrome.runtime.onMessage.addListener(function(){

//   });
