"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      option: {
        url: "https://www.falvzhushou.cn:8001/api/upload",
        name: "file",
        formData: {
          "file2": "FileName2"
        }
      },
      instantly: true,
      width: "650rpx",
      height: "10rem",
      formats: "docx,doc",
      size: 1,
      files: /* @__PURE__ */ new Map(),
      wxFiles: [],
      debug: false
    };
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations(["updateFileName"])), {
    onuploadEnd(item) {
      console.log(`${item.name}\u5DF2\u4E0A\u4F20\u7ED3\u675F\uFF0C\u4E0A\u4F20\u72B6\u6001=${item.type}`);
      this.files.set(item.name, item);
      if (item["responseText"]) {
        let responseText = this.files.get(item.name).responseText;
        responseText = JSON.parse(item.responseText);
        this.updateFileName(responseText.data);
      }
      this.wxFiles = [...this.files.values()];
      this.$forceUpdate();
      if (item.type == "success") {
        this.$refs.suspop.open("bottom");
      } else if (item.type == "fail") {
        this.$refs.faipop.open("bottom");
      }
    },
    onChange(files) {
      this.files = files;
      this.$forceUpdate();
      this.wxFiles = [...this.files.values()];
    }
  })
};
if (!Array) {
  const _easycom_lsj_upload2 = common_vendor.resolveComponent("lsj-upload");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_lsj_upload2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_lsj_upload = () => "../../uni_modules/lsj-upload/components/lsj-upload/lsj-upload.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_lsj_upload + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.width,
    b: $data.height,
    c: common_vendor.sr("lsjUpload", "e2495742-0"),
    d: common_vendor.o(() => {
    }),
    e: common_vendor.o($options.onChange),
    f: common_vendor.o($options.onuploadEnd),
    g: common_vendor.p({
      childId: "upload1",
      width: $data.width,
      height: $data.height,
      option: $data.option,
      size: $data.size,
      formats: $data.formats,
      debug: $data.debug,
      instantly: $data.instantly
    }),
    h: common_vendor.p({
      type: "success",
      message: "\u6210\u529F\u4E0A\u4F20!",
      duration: 3e3
    }),
    i: common_vendor.sr("suspop", "e2495742-1"),
    j: common_vendor.p({
      type: "message"
    }),
    k: common_vendor.p({
      type: "error",
      message: "\u4E0A\u4F20\u5931\u8D25!!",
      duration: 3e3
    }),
    l: common_vendor.sr("faipop", "e2495742-3"),
    m: common_vendor.p({
      type: "message"
    }),
    n: common_vendor.f($data.wxFiles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.size),
        c: common_vendor.t(item.progress),
        d: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/vue/brotherb/pages/upload2/upload2.vue"]]);
wx.createPage(MiniProgramPage);
