"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
require("./network/fetch/index.js");
require("./network/http/index.js");
if (!Math) {
  "./pages/upload1/upload1.js";
  "./pages/upload2/upload2.js";
  "./pages/getRes/getRes.js";
  "./pages/getRes2/getRes2.js";
}
const _sfc_main = {};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/vue/brotherb/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
