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
  computed: __spreadValues({}, common_vendor.mapState({
    modified1: (state) => state.modifiedList[0],
    modified2: (state) => state.modifiedList[1]
  })),
  onLoad() {
    this.updateState(), this.Showloading();
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations(["updateState"])), {
    Showloading() {
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D"
      });
      setTimeout(function() {
        common_vendor.index.hideLoading();
      }, 4e3);
    }
  })
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.modified1,
    b: _ctx.modified2
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/vue/brotherb/pages/getRes/getRes.vue"]]);
wx.createPage(MiniProgramPage);
