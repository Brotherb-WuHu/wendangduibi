"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../../../common/vendor.js");
class LsjFile {
  constructor(data) {
    this.dom = null;
    this.files = /* @__PURE__ */ new Map();
    this.debug = data.debug || false;
    this.id = data.id;
    this.width = data.width;
    this.height = data.height;
    this.option = data.option;
    this.instantly = data.instantly;
    this.prohibited = data.prohibited;
    this.onchange = data.onchange;
    this.onprogress = data.onprogress;
    this.uploadHandle = this._uploadHandle;
    this.uploadHandle = this._uploadHandleWX;
  }
  create(path) {
    if (!this.dom) {
      return this.dom;
    }
  }
  copyObject(obj) {
    if (typeof obj !== "undefined") {
      return JSON.parse(JSON.stringify(obj));
    } else {
      return obj;
    }
  }
  setValue(dataObj, name, value) {
    let dataValue;
    if (typeof value === "object") {
      dataValue = this.copyObject(value);
    } else {
      dataValue = value;
    }
    let regExp = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
    const patten = name.match(regExp);
    for (let i = 0; i < patten.length - 1; i++) {
      let keyName = patten[i];
      if (typeof dataObj[keyName] !== "object")
        dataObj[keyName] = {};
      dataObj = dataObj[keyName];
    }
    dataObj[patten[patten.length - 1]] = dataValue;
    this.debug && console.log("\u53C2\u6570\u66F4\u65B0\u540E", JSON.stringify(this.option));
  }
  setData() {
    let [name, value = ""] = arguments;
    if (typeof name === "object") {
      Object.assign(this.option, name);
    } else {
      this.setValue(this.option, name, value);
    }
    this.debug && console.log(JSON.stringify(this.option));
  }
  async upload(name = "") {
    if (!this.option.url) {
      throw Error("\u672A\u8BBE\u7F6E\u4E0A\u4F20\u5730\u5740");
    }
    if (name && this.files.has(name)) {
      await this.uploadHandle(this.files.get(name));
    } else {
      for (let item of this.files.values()) {
        if (item.type === "waiting" || item.type === "fail") {
          await this.uploadHandle(item);
        }
      }
    }
  }
  addFile(file) {
    let name = file.name;
    this.debug && console.log("\u6587\u4EF6\u540D\u79F0", name, "\u5927\u5C0F", file.size);
    if (file) {
      let path = "";
      let suffix = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
      let formats = this.prohibited.formats.toLowerCase();
      if (formats && !formats.includes(suffix)) {
        this.toast(`\u4E0D\u652F\u6301\u4E0A\u4F20${suffix.toUpperCase()}\u683C\u5F0F\u6587\u4EF6`);
        return false;
      }
      if (file.size > 1024 * 1024 * Math.abs(this.prohibited.size)) {
        this.toast(`\u9644\u4EF6\u5927\u5C0F\u8BF7\u52FF\u8D85\u8FC7${this.prohibited.size}M`);
        return false;
      }
      path = file.path;
      this.files.set(file.name, { file, path, name: file.name, size: file.size, progress: 0, type: "waiting" });
      return true;
    }
  }
  clear(name = "") {
    if (!name) {
      this.files.clear();
    } else {
      this.files.delete(name);
    }
    return this.onchange(this.files);
  }
  toast(msg) {
    common_vendor.index.showToast({
      title: msg,
      icon: "none"
    });
  }
  chooseMessageFile(type, count) {
    wx.chooseMessageFile({
      count,
      type,
      success: ({ tempFiles }) => {
        for (let file of tempFiles) {
          let next = this.addFile(file);
          if (!next) {
            return;
          }
        }
        this.onchange(this.files);
        this.instantly && this.upload();
      },
      fail: () => {
        this.toast(`\u6253\u5F00\u5931\u8D25`);
      }
    });
  }
  _overrideUrlLoading() {
    this.dom.overrideUrlLoading({ mode: "reject" }, (e) => {
      let { retype, item, files, end } = this._getRequest(e.url);
      let _this = this;
      switch (retype) {
        case "updateOption":
          this.dom.evalJS(`vm.setData('${JSON.stringify(_this.option)}')`);
          break;
        case "change":
          try {
            _this.files = new Map([..._this.files, ...JSON.parse(unescape(files))]);
          } catch (e2) {
            return console.error("\u51FA\u9519\u4E86\uFF0C\u8BF7\u68C0\u67E5\u4EE3\u7801");
          }
          _this.onchange(_this.files);
          break;
        case "progress":
          try {
            item = JSON.parse(unescape(item));
          } catch (e2) {
            return console.error("\u51FA\u9519\u4E86\uFF0C\u8BF7\u68C0\u67E5\u4EE3\u7801");
          }
          _this._changeFilesItem(item, end);
          break;
      }
    });
  }
  _getRequest(url) {
    let theRequest = new Object();
    let index = url.indexOf("?");
    if (index != -1) {
      let str = url.substring(index + 1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
  _changeFilesItem(item, end = false) {
    this.debug && console.log("onprogress", JSON.stringify(item));
    this.onprogress(item, end);
    this.files.set(item.name, item);
  }
  _uploadHandle(item) {
    item.type = "loading";
    delete item.responseText;
    return new Promise((resolve, reject) => {
      this.debug && console.log("option", JSON.stringify(this.option));
      let { url, name, method = "POST", header, formData } = this.option;
      let form = new FormData();
      for (let keys in formData) {
        form.append(keys, formData[keys]);
      }
      form.append(name, item.file);
      let xmlRequest = new XMLHttpRequest();
      xmlRequest.open(method, url, true);
      for (let keys in header) {
        xmlRequest.setRequestHeader(keys, header[keys]);
      }
      xmlRequest.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          let progress = Math.ceil(event.loaded * 100 / event.total);
          if (progress <= 100) {
            item.progress = progress;
            this._changeFilesItem(item);
          }
        }
      }, false);
      xmlRequest.ontimeout = () => {
        console.error("\u8BF7\u6C42\u8D85\u65F6");
        item.type = "fail";
        this._changeFilesItem(item, true);
        return resolve(false);
      };
      xmlRequest.onreadystatechange = (ev) => {
        if (xmlRequest.readyState == 4) {
          if (xmlRequest.status == 200) {
            this.debug && console.log("\u4E0A\u4F20\u5B8C\u6210\uFF1A" + xmlRequest.responseText);
            item["responseText"] = xmlRequest.responseText;
            item.type = "success";
            this._changeFilesItem(item, true);
            return resolve(true);
          } else if (xmlRequest.status == 0) {
            console.error("status = 0 :\u8BF7\u68C0\u67E5\u8BF7\u6C42\u5934Content-Type\u4E0E\u670D\u52A1\u7AEF\u662F\u5426\u5339\u914D\uFF0C\u670D\u52A1\u7AEF\u5DF2\u6B63\u786E\u5F00\u542F\u8DE8\u57DF\uFF0C\u5E76\u4E14nginx\u672A\u62E6\u622A\u963B\u6B62\u8BF7\u6C42");
          }
          console.error("--ERROR--\uFF1Astatus = " + xmlRequest.status);
          item.type = "fail";
          this._changeFilesItem(item, true);
          return resolve(false);
        }
      };
      xmlRequest.send(form);
    });
  }
  _uploadHandleWX(item) {
    item.type = "loading";
    delete item.responseText;
    return new Promise((resolve, reject) => {
      this.debug && console.log("option", JSON.stringify(this.option));
      let form = __spreadValues({ filePath: item.file.path }, this.option);
      form["fail"] = ({ errMsg = "" }) => {
        console.error("--ERROR--\uFF1A" + errMsg);
        item.type = "fail";
        this._changeFilesItem(item, true);
        return resolve(false);
      };
      form["success"] = (res) => {
        if (res.statusCode == 200) {
          this.debug && console.log("\u4E0A\u4F20\u5B8C\u6210,\u5FAE\u4FE1\u7AEF\u8FD4\u56DE\u4E0D\u4E00\u5B9A\u662F\u5B57\u7B26\u4E32\uFF0C\u6839\u636E\u63A5\u53E3\u8FD4\u56DE\u683C\u5F0F\u5224\u65AD\u662F\u5426\u9700\u8981JSON.parse\uFF1A" + res.data);
          item["responseText"] = res.data;
          item.type = "success";
          this._changeFilesItem(item, true);
          return resolve(true);
        }
        item.type = "fail";
        this._changeFilesItem(item, true);
        return resolve(false);
      };
      let xmlRequest = common_vendor.index.uploadFile(form);
      xmlRequest.onProgressUpdate(({ progress = 0 }) => {
        if (progress <= 100) {
          item.progress = progress;
          this._changeFilesItem(item);
        }
      });
    });
  }
}
exports.LsjFile = LsjFile;
