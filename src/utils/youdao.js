import CryptoJS from "crypto-js";
import request from "umi-request";

function truncate(q) {
  let len = q.length;
  console.log(q, len);
  if (len <= 20) return q;
  console.log(q.substring);
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

// 原生fetchapi
async function ajax(request, sendResponse) {
  let paramsStr = "";
  Object.keys(request.data).forEach((key) => {
    paramsStr += key + "=" + request.data[key] + "&";
  });
  fetch(request.url, {
    method: "POST",
    headers: {
      // 有道要求提交表单格式的formData数据
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    // 只有写成&拼接的参数才能作为formData提交
    body: paramsStr,
  })
    .then(function (json) {
      return sendResponse(json);
    })
    .catch(function (error) {
      return sendResponse(error);
    });
}

export function getTanslation({ word, from, to }) {
  let appKey = "3cc217297da88074";
  let key = "8yxd7nsfOSLPQcAcydTcs3FXSZ5ge55N"; //注意：暴露appSecret，有被盗用造成损失的风险
  let salt = new Date().getTime();
  let curtime = Math.round(new Date().getTime() / 1000);
  let query = word;
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  let str1 = appKey + truncate(query) + salt + curtime + key;
  let sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  let paramsStr = "",
    paramsObj = {
      q: query,
      appKey: appKey,
      salt: salt,
      from: from || "en",
      to: to || "zh-CHS",
      sign: sign,
      signType: "v3",
      curtime: curtime,
    };
  Object.keys(paramsObj).forEach((key) => {
    paramsStr += key + "=" + paramsObj[key] + "&";
  });
  return request
    .post("https://openapi.youdao.com/api", {
      headers: {
        // 有道要求提交表单格式的formData数据
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      data: paramsStr,
    })
    .then(function (data) {
      if (!data.translation.length) {
        console.log("没有返回中文");
        return;
      }
      return data;
    });

  // 原生fetch api
  // ajax({
  //     // 里面的值应该可以自定义，用于判断哪个请求之类的
  //     type: 'post',
  //     url: 'https://openapi.youdao.com/api', // 需要请求的url
  //     data:{
  //         q: query,
  //         appKey: appKey,
  //         salt: salt,
  //         from: from,
  //         to: to,
  //         sign: sign,
  //         signType: "v3",
  //         curtime: curtime,
  //     }
  // },async function(res){
  //     const data=await res.json()
  //     console.log(999,data);
  //     const translation={
  //         en:data.returnPhrase.join(""),
  //         cn:data.translation.join(""),
  //         youdao_url:data.webdict.url,
  //         web:data.web
  //     }
  //     console.log(translation);
  //     saveWordToVocabulary(translation)
  // })
}
