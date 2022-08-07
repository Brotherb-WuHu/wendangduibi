"use strict";
var common_vendor = require("../common/vendor.js");
var network_fetch_index = require("../network/fetch/index.js");
const store = common_vendor.createStore({
  state: {
    "resList": [],
    "upFileName": [],
    "modifiedList": [],
    "modifiedSplit": [],
    "mixModifiedSplit": []
  },
  mutations: {
    updateState(state) {
      state.modifiedList = [];
      state.modifiedSplit = [];
      state.resList.length || network_fetch_index.fetchTags().then((res) => {
        state.resList = res;
        state.modifiedList.push(res.modified1);
        state.modifiedList.push(res.modified2);
        state.modifiedSplit.push(res.modified1.split("###"));
        state.modifiedSplit.push(res.modified2.split("###"));
        state.mixModifiedSplit = state.modifiedSplit[0];
        let mini = Math.min(state.modifiedSplit[0].length, state.modifiedSplit[1].length);
        for (let i = 0; i < mini; i++) {
          state.mixModifiedSplit.splice(2 * i + 1, 0, state.modifiedSplit[1][i]);
        }
      });
    },
    updateFileName(state, resData) {
      state.upFileName.push(resData);
    }
  },
  getters: {
    mixModifiedSplit(state) {
      let modifiedSplit1 = state.modifiedSplit[0];
      let modifiedSplit2 = state.modifiedSplit[1];
      let mixRes = modifiedSplit1;
      let mini = Math.min(modifiedSplit1.length, modifiedSplit2.length);
      for (let i = 0; i < mini; i++) {
        mixRes.splice(2 * i + 1, 0, modifiedSplit2[i]);
      }
      return mixRes;
    }
  }
});
exports.store = store;
