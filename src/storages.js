/*
 * @Author: zz 2207677143@qq.com
 * @Date: 2023-09-24 10:14:56
 * @LastEditors: zz 2207677143@qq.com
 * @LastEditTime: 2023-10-11 14:54:00
 * @FilePath: \base_vite_chrome_extension\src\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description: 数组去重检测
 * @return BOOLEAN
 */
function getWordSet(wordsheet, word) {
  const enSet = wordsheet.map((i) => i.en);
  return enSet.includes(word.en);
}
/**
 * @description: 保存非单词
 * @return {*}
 */
export function saveOtherToVocabulary(word) {
  chrome.storage.sync.get({ OTHERSHEET: [] }, function (items) {
    console.log(items.OTHERSHEET,'other');
    if (getWordSet(items.OTHERSHEET, word)) {
      console.log("该单词重复添加");
      return;
    }
    // 保存数据
    chrome.storage.sync.set(
      { OTHERSHEET: [...items.OTHERSHEET, word] },
      function () {
        console.log("保存成功！");
      }
    );
  });
}

/**
 * @description: 保存单词
 * @return {*}
 */

export function saveWordToVocabulary(word) {
  chrome.storage.sync.get({ WORDSHEET: [] }, function (items) {
    console.log(items.WORDSHEET);
    if (getWordSet(items.WORDSHEET, word)) {
      console.log("该单词重复添加");
      return;
    }
    // 保存数据
    chrome.storage.sync.set(
      { WORDSHEET: [word] },
      function () {
        console.log("保存成功！");
      }
    );
  });
}
/**
 * @description: 保存函数
 * @param {*} word 单词对象
 * @return {*}
 */
export function saveWord(word) {
  const words = word.en.split(" ");
  if (words.length > 1) {
    saveOtherToVocabulary(word);
  } else {
    saveWordToVocabulary(word);
  }
}
