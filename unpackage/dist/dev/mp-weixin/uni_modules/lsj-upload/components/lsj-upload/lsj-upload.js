"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_lsjUpload_components_lsjUpload_LsjFile = require("./LsjFile.js");
const _sfc_main = {
  name: "Lsj-upload",
  props: {
    debug: { type: Boolean, default: false },
    instantly: { type: Boolean, default: false },
    option: { type: Object, default: () => {
    } },
    size: { type: Number, default: 10 },
    count: { type: Number, default: 9 },
    formats: { type: String, default: "" },
    accept: { type: String, default: "" },
    wxFileType: { type: String, default: "all" },
    childId: { type: String, default: "lsjUpload" },
    width: { type: String, default: "100%" },
    height: { type: String, default: "80rpx" },
    top: { type: [String, Number], default: "" },
    left: { type: [String, Number], default: "" },
    bottom: { type: [String, Number], default: "" },
    right: { type: [String, Number], default: "" },
    position: {
      type: String,
      default: "static"
    }
  },
  data() {
    return {};
  },
  watch: {
    option(v) {
    }
  },
  updated() {
  },
  computed: {
    getStyles() {
      let styles = {
        width: this.width,
        height: this.height
      };
      if (this.position == "absolute") {
        styles["top"] = this.top;
        styles["bottom"] = this.bottom;
        styles["left"] = this.left;
        styles["right"] = this.right;
        styles["position"] = "fixed";
      }
      return styles;
    }
  },
  mounted() {
    this._size = 0;
    this.lsjFile = new uni_modules_lsjUpload_components_lsjUpload_LsjFile.LsjFile({
      debug: this.debug,
      id: this.childId,
      width: this.width,
      height: this.height,
      option: this.option,
      instantly: this.instantly,
      prohibited: {
        size: this.size,
        formats: this.formats,
        accept: this.accept,
        count: this.count
      },
      onchange: this.onchange,
      onprogress: this.onprogress
    });
    this.create();
  },
  beforeDestroy() {
  },
  methods: {
    setFiles(array) {
      if (array instanceof Map) {
        for (let [key, item] of array) {
          item["progress"] = 100;
          item["type"] = "success";
          this.lsjFile.files.set(key, item);
        }
      } else if (Array.isArray(array)) {
        array.forEach((item) => {
          if (item.name) {
            item["progress"] = 100;
            item["type"] = "success";
            this.lsjFile.files.set(item.name, item);
          }
        });
      }
      this.onchange(this.lsjFile.files);
    },
    setData() {
      this.lsjFile && this.lsjFile.setData(...arguments);
    },
    getDomStyles(callback) {
      let view = common_vendor.index.createSelectorQuery().in(this).select(".lsj-file");
      view.fields({
        size: true,
        rect: true
      }, ({ height, width, top, left, right, bottom }) => {
        common_vendor.index.createSelectorQuery().selectViewport().scrollOffset(({ scrollTop }) => {
          return callback({
            top: parseInt(top) + parseInt(scrollTop) + "px",
            left: parseInt(left) + "px",
            width: parseInt(width) + "px",
            height: parseInt(height) + "px"
          });
        }).exec();
      }).exec();
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    upload(name) {
      this.lsjFile && this.lsjFile.upload(name);
    },
    onchange(files) {
      this.$emit("change", files);
      this._size = files.size;
      return files.size >= this.count ? this.hide() : this.show();
    },
    onprogress(item, end = false) {
      this.$emit("progress", item);
      if (end) {
        setTimeout(() => {
          this.$emit("uploadEnd", item);
        }, 0);
      }
    },
    clear(name) {
      this.lsjFile.clear(name);
    },
    create() {
      let path = "/uni_modules/lsj-upload/hybrid/html/uploadFile.html";
      this.lsjFile.create(path);
      this.show();
    },
    onClick() {
      if (this._size >= this.count) {
        this.toast(`\u53EA\u5141\u8BB8\u4E0A\u4F20${this.count}\u4E2A\u6587\u4EF6`);
        return;
      }
      if (!this.isShow) {
        return;
      }
      let count = this.count - this._size;
      this.lsjFile.chooseMessageFile(this.wxFileType, count);
    },
    toast(msg) {
      common_vendor.index.showToast({
        title: msg,
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.getStyles),
    b: common_vendor.s($options.getStyles),
    c: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    d: common_vendor.s($options.getStyles)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8724a0b6"], ["__file", "D:/vue/brotherb/uni_modules/lsj-upload/components/lsj-upload/lsj-upload.vue"]]);
wx.createComponent(Component);
