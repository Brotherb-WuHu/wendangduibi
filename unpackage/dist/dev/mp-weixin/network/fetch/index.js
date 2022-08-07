"use strict";
var network_http_index = require("../http/index.js");
var store_index = require("../../store/index.js");
async function fetchTags() {
  return network_http_index.http({
    url: "",
    data: {
      file1: store_index.store.state.upFileName[0],
      file2: store_index.store.state.upFileName[1]
    }
  });
}
exports.fetchTags = fetchTags;
